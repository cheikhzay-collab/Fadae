<?php
/**
 * فضاء الحكمة والمعرفة - إدارة الجذاذات والوثائق التربوية
 * API REST pour la gestion des fiches pédagogiques
 */

require_once __DIR__ . '/config.php';

$pdo = get_db_connection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $level = $_GET['level'] ?? null;

    if ($pdo) {
        try {
            $sql = "SELECT * FROM pedagogy WHERE 1=1";
            $params = [];
            if ($level && $level !== 'all') {
                $sql .= " AND level_id = :level";
                $params[':level'] = $level;
            }
            $sql .= " ORDER BY created_at DESC";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $items = $stmt->fetchAll();

            send_json_response(['success' => true, 'count' => count($items), 'data' => $items]);
        } catch (Exception $e) {
            send_json_response(['success' => false, 'error' => $e->getMessage()], 500);
        }
    } else {
        send_json_response(['success' => false, 'message' => 'قاعدة البيانات غير متصلة'], 503);
    }
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $title_ar = trim($input['title_ar'] ?? '');
    $title_fr = trim($input['title_fr'] ?? '');
    $level_id = trim($input['level_id'] ?? '2bac');
    $type = trim($input['type'] ?? 'جذاذة نموذجية');
    $author = trim($input['author'] ?? 'أستاذ المادة');

    if (empty($title_ar)) {
        send_json_response(['success' => false, 'message' => 'عنوان الجذاذة مطلوب'], 400);
    }

    if ($pdo) {
        try {
            $id = 'ped-' . substr(uniqid(), -6);
            $stmt = $pdo->prepare("
                INSERT INTO pedagogy (id, level_id, title_ar, title_fr, type, author, semester, created_at)
                VALUES (:id, :lvl, :tar, :tfr, :type, :auth, 'الدورة الأولى', CURDATE())
            ");
            $stmt->execute([
                ':id' => $id,
                ':lvl' => $level_id,
                ':tar' => $title_ar,
                ':tfr' => $title_fr,
                ':type' => $type,
                ':auth' => $author
            ]);

            send_json_response(['success' => true, 'message' => 'تمت إضافة الجذاذة بنجاح', 'id' => $id], 201);
        } catch (Exception $e) {
            send_json_response(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
