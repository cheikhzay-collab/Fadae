<?php
/**
 * فضاء الحكمة والمعرفة - أداة استيراد وترقية قاعدة البيانات التلقائية
 * Automated Database Migration & Setup Tool for Hostinger
 */

require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=UTF-8');

// مفتاح الأمان لحماية التشغيل
$token = isset($_GET['token']) ? $_GET['token'] : (isset($_POST['token']) ? $_POST['token'] : '');
if ($token !== 'fadae_migrate_2026') {
    send_json_response([
        'success' => false,
        'message' => 'Unauthorized: Invalid migration security token.'
    ], 403);
}

$pdo = get_db_connection();
if (!$pdo) {
    global $DB_CONNECTION_ERROR;
    send_json_response([
        'success' => false,
        'message' => 'Database connection failed: ' . ($DB_CONNECTION_ERROR ?: 'Unknown error')
    ], 500);
}

$sqlFile = __DIR__ . '/../database.sql';
if (!file_exists($sqlFile)) {
    send_json_response([
        'success' => false,
        'message' => 'database.sql file not found on server.'
    ], 404);
}

$sqlContent = file_get_contents($sqlFile);
if (empty($sqlContent)) {
    send_json_response([
        'success' => false,
        'message' => 'database.sql is empty.'
    ], 400);
}

try {
    // تعطيل فحص المفاتيح الأجنبية مؤقتاً لضمان الإنشاء النظيف
    $pdo->exec("SET NAMES utf8mb4;");
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 0;");

    // تنظيف وتقسيم الاستعلامات
    // إزالة التعليقات
    $lines = explode("\n", $sqlContent);
    $cleanSql = "";
    foreach ($lines as $line) {
        $trimmed = trim($line);
        if (strpos($trimmed, "--") === 0 || strpos($trimmed, "/*") === 0) {
            continue;
        }
        $cleanSql .= $line . "\n";
    }

    $statements = array_filter(array_map('trim', explode(";", $cleanSql)));
    
    $executedCount = 0;
    $errors = [];

    foreach ($statements as $stmt) {
        if (!empty($stmt)) {
            try {
                $pdo->exec($stmt);
                $executedCount++;
            } catch (PDOException $e) {
                $errors[] = [
                    'query' => substr($stmt, 0, 100) . '...',
                    'error' => $e->getMessage()
                ];
            }
        }
    }

    $pdo->exec("SET FOREIGN_KEY_CHECKS = 1;");

    // فحص الجداول بعد الترقية
    $tables = [
        'admins', 'levels', 'modules', 'lessons', 'pedagogy', 'exams',
        'philosophers', 'quizzes', 'quiz_results', 'mindmaps', 'methodologies',
        'books', 'quotes', 'teachers', 'contact_messages', 'admin_logs', 'site_stats'
    ];

    $tableReport = [];
    foreach ($tables as $t) {
        try {
            $cnt = $pdo->query("SELECT COUNT(*) FROM `{$t}`")->fetchColumn();
            $tableReport[$t] = (int)$cnt;
        } catch (Exception $e) {
            $tableReport[$t] = 'NOT_CREATED: ' . $e->getMessage();
        }
    }

    send_json_response([
        'success' => true,
        'message' => 'Database migration executed successfully! All tables ready.',
        'executed_statements' => $executedCount,
        'errors_count' => count($errors),
        'errors' => $errors,
        'tables_status' => $tableReport
    ]);

} catch (Exception $e) {
    send_json_response([
        'success' => false,
        'message' => 'Fatal migration error: ' . $e->getMessage()
    ], 500);
}
