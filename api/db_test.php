<?php
/**
 * فضاء الحكمة والمعرفة - أداة فحص واختبار الاتصال بقاعدة البيانات
 * Script de test de connexion MySQL / MariaDB pour Hostinger
 */

require_once __DIR__ . '/config.php';

header('Content-Type: text/html; charset=UTF-8');

$pdo = get_db_connection();
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>فحص اتصال قاعدة البيانات | فضاء الحكمة</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #0b0f19;
      color: #f8fafc;
      padding: 2rem;
      margin: 0;
      line-height: 1.6;
    }
    .card {
      max-width: 650px;
      margin: 2rem auto;
      background: #111827;
      border: 1px solid #1f2937;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    }
    .badge-success {
      background: #10b981;
      color: #0b0f19;
      padding: 0.35rem 0.8rem;
      border-radius: 20px;
      font-weight: bold;
      display: inline-block;
    }
    .badge-warning {
      background: #f59e0b;
      color: #0b0f19;
      padding: 0.35rem 0.8rem;
      border-radius: 20px;
      font-weight: bold;
      display: inline-block;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1.5rem;
    }
    th, td {
      border: 1px solid #1f2937;
      padding: 0.75rem 1rem;
      text-align: right;
    }
    th {
      background: #1f2937;
      color: #f59e0b;
    }
    code {
      background: #1e293b;
      color: #38bdf8;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: monospace;
    }
    .btn {
      display: inline-block;
      margin-top: 1.5rem;
      padding: 0.6rem 1.4rem;
      background: #d97706;
      color: #0b0f19;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="card">
    <h2>🏛️ فضاء الحكمة والمعرفة — حالة قاعدة البيانات</h2>
    <hr style="border-color: #1f2937; margin: 1.5rem 0;">

    <?php if ($pdo): ?>
      <div>
        <span class="badge-success">✓ تم الاتصال بنجاح بقاعدة البيانات</span>
        <p style="margin-top: 1rem;">الخادم متصل حالياً بقاعدة بيانات MySQL على Hostinger.</p>
      </div>

      <h3>📊 الجداول الموجودة وعدد السجلات:</h3>
      <table>
        <thead>
          <tr>
            <th>اسم الجدول</th>
            <th>عدد السجلات</th>
          </tr>
        </thead>
        <tbody>
          <?php
            $tables = ['admins', 'levels', 'modules', 'lessons', 'pedagogy', 'exams', 'philosophers', 'site_stats'];
            foreach ($tables as $t) {
              try {
                $count = $pdo->query("SELECT COUNT(*) FROM `{$t}`")->fetchColumn();
                echo "<tr><td><code>{$t}</code></td><td><strong>{$count}</strong></td></tr>";
              } catch (Exception $e) {
                echo "<tr><td><code>{$t}</code></td><td style='color: #ef4444;'>غير موجود (يرجى استيراد database.sql)</td></tr>";
              }
            }
          ?>
        </tbody>
      </table>

    <?php else: ?>
      <div>
        <span class="badge-warning">⚠️ لم يتم الاتصال بقاعدة البيانات بعد</span>
        <p style="margin-top: 1rem;">يرجى التأكد من تحديث بيانات الاتصال في ملف <code>api/config.php</code>:</p>
        <ul>
          <li><strong>DB_HOST:</strong> <code>localhost</code></li>
          <li><strong>DB_NAME:</strong> اسم قاعدة البيانات المنشأة في Hostinger</li>
          <li><strong>DB_USER:</strong> اسم المستخدم في Hostinger</li>
          <li><strong>DB_PASS:</strong> كلمة مرور القاعدة في Hostinger</li>
        </ul>
        <p>لا تنسَ استيراد ملف <code>database.sql</code> داخل <strong>phpMyAdmin</strong> بعد إنشاء القاعدة!</p>
      </div>
    <?php endif; ?>

    <a href="../index.html" class="btn">العودة إلى واجهة المنصة ←</a>
  </div>
</body>
</html>
