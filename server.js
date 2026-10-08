/**
 * منصة فضاء الحكمة والمعرفة - خادم محلي للتطوير والمعاينة
 * Serveur local HTTP pour Espace Sagesse et Savoir
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

function readJsonFile(filename, fallback = []) {
  const filePath = path.join(PUBLIC_DIR, filename);
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (e) {
      return fallback;
    }
  }
  return fallback;
}

function writeJsonFile(filename, data) {
  const filePath = path.join(PUBLIC_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function setCorsHeaders(res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

const server = http.createServer((req, res) => {
  let reqUrl = decodeURI(req.url.split('?')[0]);

  // Redirections de base
  if (reqUrl === '/' || reqUrl === '') {
    reqUrl = '/index.html';
  } else if (reqUrl === '/admin' || reqUrl === '/admin/') {
    res.writeHead(302, { 'Location': '/#admin' });
    res.end();
    return;
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS' && reqUrl.startsWith('/api/')) {
    setCorsHeaders(res);
    res.writeHead(200);
    res.end();
    return;
  }

  // --- API 1: AUTHENTIFICATION ---
  if (reqUrl === '/api/auth' || reqUrl === '/api/auth.php') {
    setCorsHeaders(res);
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const { username, password } = JSON.parse(body || '{}');
          if (username && username.toLowerCase() === 'admin' && (password === 'admin2026' || password === 'admin')) {
            res.writeHead(200);
            res.end(JSON.stringify({
              success: true,
              message: 'تم تسجيل الدخول بنجاح',
              user: {
                id: 1,
                username: 'admin',
                full_name: 'مدير المنصة (محلي)',
                role: 'super_admin'
              },
              token: 'local_token_' + Date.now()
            }));
          } else {
            res.writeHead(401);
            res.end(JSON.stringify({ success: false, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' }));
          }
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, message: 'بيانات غير صالحة' }));
        }
      });
      return;
    }
  }

  // --- API 2: LEÇONS / COURS ---
  if (reqUrl === '/api/lessons' || reqUrl === '/api/lessons.php') {
    setCorsHeaders(res);
    let lessons = readJsonFile('data_lessons.json');

    if (req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, count: lessons.length, data: lessons }));
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const item = JSON.parse(body);
          if (!item.id) item.id = 'les-' + Date.now();
          const existingIdx = lessons.findIndex(l => l.id === item.id);
          if (existingIdx !== -1) {
            lessons[existingIdx] = item;
          } else {
            lessons.unshift(item);
          }
          writeJsonFile('data_lessons.json', lessons);
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, message: 'تم حفظ الدرس بنجاح', data: item }));
        } catch (err) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
      });
      return;
    }

    if (req.method === 'DELETE') {
      const urlParams = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      const idToDelete = urlParams.searchParams.get('id');
      if (idToDelete) {
        lessons = lessons.filter(l => l.id !== idToDelete);
        writeJsonFile('data_lessons.json', lessons);
        res.writeHead(200);
        res.end(JSON.stringify({ success: true, message: 'تم حذف الدرس بنجاح' }));
      } else {
        res.writeHead(400);
        res.end(JSON.stringify({ success: false, message: 'معرف الدرس مطلوب' }));
      }
      return;
    }
  }

  // --- API 3: EXAMENS ---
  if (reqUrl === '/api/exams' || reqUrl === '/api/exams.php') {
    setCorsHeaders(res);
    let exams = readJsonFile('data_exams.json');

    if (req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, count: exams.length, data: exams }));
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const item = JSON.parse(body);
          if (!item.id) item.id = 'exam-' + Date.now();
          exams.unshift(item);
          writeJsonFile('data_exams.json', exams);
          res.writeHead(201);
          res.end(JSON.stringify({ success: true, message: 'تمت إضافة الامتحان بنجاح', id: item.id }));
        } catch (err) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
      });
      return;
    }
  }

  // --- API 4: PÉDAGOGIE ---
  if (reqUrl === '/api/pedagogy' || reqUrl === '/api/pedagogy.php') {
    setCorsHeaders(res);
    let pedagogy = readJsonFile('data_pedagogy.json');

    if (req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, count: pedagogy.length, data: pedagogy }));
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const item = JSON.parse(body);
          if (!item.id) item.id = 'ped-' + Date.now();
          pedagogy.unshift(item);
          writeJsonFile('data_pedagogy.json', pedagogy);
          res.writeHead(201);
          res.end(JSON.stringify({ success: true, message: 'تمت إضافة البطاقة بنجاح', id: item.id }));
        } catch (err) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
      });
      return;
    }
  }

  // --- API 5: TEST DB / STATUS ---
  if (reqUrl === '/api/db_test.php') {
    setCorsHeaders(res);
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      message: 'الخادم المحلي Node.js يعمل بشكل مثالي!',
      mode: 'Local Development Server',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // Static File Serving
  const filePath = path.join(PUBLIC_DIR, reqUrl);

  // Sécurité anti directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<h2>404 - الصفحة غير موجودة</h2><p><a href="/">العودة إلى الرئيسية</a></p>`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 تم تشغيل خادم فضاء الحكمة والمعرفة بنجاح`);
  console.log(`🌐 الرابط المحلي: http://localhost:${PORT}`);
  console.log(`🔐 لوحة التحكم: http://localhost:${PORT}/#admin`);
  console.log(`👤 بيانات الدخول: admin / admin2026`);
  console.log(`====================================================`);
});