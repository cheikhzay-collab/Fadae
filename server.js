/**
 * خادم محلي خفيف لتشغيل منصة فضاء الحكمة والمعرفة
 * Serveur local HTTP léger pour Espace Sagesse et Savoir
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
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let reqUrl = decodeURI(req.url.split('?')[0]);
  if (reqUrl === '/' || reqUrl === '') {
    reqUrl = '/index.html';
  } else if (reqUrl === '/admin' || reqUrl === '/admin/') {
    res.writeHead(302, { 'Location': '/#admin' });
    res.end();
    return;
  }

  // التعامل مع طلبات API الدروس محلياً لحفظ وتعديل وحذف الدروس
  if (reqUrl === '/api/lessons' || reqUrl === '/api/lessons.php') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    const dataFile = path.join(PUBLIC_DIR, 'data_lessons.json');
    let storedLessons = [];
    if (fs.existsSync(dataFile)) {
      try {
        storedLessons = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
      } catch (e) {}
    }

    if (req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, count: storedLessons.length, data: storedLessons }));
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const item = JSON.parse(body);
          if (!item.id) item.id = 'les-' + Date.now();
          const existingIdx = storedLessons.findIndex(l => l.id === item.id);
          if (existingIdx !== -1) {
            storedLessons[existingIdx] = item;
          } else {
            storedLessons.unshift(item);
          }
          fs.writeFileSync(dataFile, JSON.stringify(storedLessons, null, 2), 'utf-8');
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, message: 'تم الحفظ بنجاح', data: item }));
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
        storedLessons = storedLessons.filter(l => l.id !== idToDelete);
        fs.writeFileSync(dataFile, JSON.stringify(storedLessons, null, 2), 'utf-8');
        res.writeHead(200);
        res.end(JSON.stringify({ success: true, message: 'تم الحذف بنجاح' }));
      } else {
        res.writeHead(400);
        res.end(JSON.stringify({ success: false, message: 'معرف الدرس مطلوب' }));
      }
      return;
    }
  }

  const filePath = path.join(PUBLIC_DIR, reqUrl);

  // حماية المسار
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
  console.log(`🏛️ منصة فضاء الحكمة والمعرفة قيد التشغيل الآن`);
  console.log(`🌐 الرابط المحلي: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
