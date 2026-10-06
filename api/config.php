<?php
/**
 * فضاء الحكمة والمعرفة - ملف الاتصال بقاعدة البيانات
 * Configuration de la connexion MySQL / MariaDB (Hostinger)
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// --------------------------------------------------------------------------
// بيانات الاتصال بقاعدة بيانات Hostinger
// (يمكنك تعديل هذه القيم مباشرة أو وضعها في متغيرات البيئة)
// --------------------------------------------------------------------------
$DB_HOST = getenv('DB_HOST') ?: 'localhost';
$DB_NAME = getenv('DB_NAME') ?: 'u123456789_fadae';
$DB_USER = getenv('DB_USER') ?: 'u123456789_admin';
$DB_PASS = getenv('DB_PASS') ?: '';

$DB_CONNECTION_ERROR = null;

function get_db_connection() {
    global $DB_HOST, $DB_NAME, $DB_USER, $DB_PASS, $DB_CONNECTION_ERROR;
    
    try {
        $dsn = "mysql:host={$DB_HOST};dbname={$DB_NAME};charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
        ];
        return new PDO($dsn, $DB_USER, $DB_PASS, $options);
    } catch (PDOException $e) {
        $DB_CONNECTION_ERROR = $e->getMessage();
        return null;
    }
}

function send_json_response($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}
