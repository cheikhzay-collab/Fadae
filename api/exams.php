<?php
/**
 * فضاء الحكمة والمعرفة - إدارة الامتحانات الوطنية الموحدة
 * API REST pour la gestion des examens nationaux
 */

require_once __DIR__ . '/config.php';

$pdo = get_db_connection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $year = $_GET['year'] ?? null;

    if ($pdo) {
        try {
            $sql = "SELECT * FROM exams WHERE 1=1";
            $params = [];
            if ($year && $year !== 'all') {
                $sql .= " AND year = :yr";
                $params[':yr'] = intval($year);
            }
            $sql .= " ORDER BY year DESC, session ASC";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $exams = $stmt->fetchAll();

            send_json_response(['success' => true, 'count' => count($exams), 'data' => $exams]);
        } catch (Exception $e) {
            send_json_response(['success' => false, 'error' => $e->getMessage()], 500);
        }
    } else {
        send_json_response(['success' => false, 'message' => 'قاعدة البيانات غير متصلة'], 503);
    }
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $year = intval($input['year'] ?? date('Y'));
    $session = trim($input['session'] ?? 'الدورة العادية');
    $branch_ar = trim($input['branch_ar'] ?? 'جميع الشعب');
    $branch_fr = trim($input['branch_fr'] ?? 'Toutes Séries');
    $topic = trim($input['topic_summary'] ?? '');
    $answers = trim($input['answer_keys_summary'] ?? '');

    if (empty($topic)) {
        send_json_response(['success' => false, 'message' => 'نص أو موضوع الامتحان مطلوب'], 400);
    }

    if ($pdo) {
        try {
            $id = 'exam-' . $year . '-' . substr(uniqid(), -4);
            $stmt = $pdo->prepare("
                INSERT INTO exams (id, year, session, branch_ar, branch_fr, topic_summary, answer_keys_summary, created_at)
                VALUES (:id, :yr, :sess, :bar, :bfr, :top, :ans, CURDATE())
            ");
            $stmt->execute([
                ':id' => $id,
                ':yr' => $year,
                ':sess' => $session,
                ':bar' => $branch_ar,
                ':bfr' => $branch_fr,
                ':top' => $topic,
                ':ans' => $answers
            ]);

            send_json_response(['success' => true, 'message' => 'تم حفظ الامتحان بنجاح', 'id' => $id], 201);
        } catch (Exception $e) {
            send_json_response(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
