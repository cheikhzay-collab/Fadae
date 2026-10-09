<?php
/**
 * فضاء الحكمة والمعرفة - واجهة برمجة التطبيقات لبنك الاختبارات التفاعلية
 * API REST - Quizzes & QCM Management
 */

require_once __DIR__ . '/config.php';

$pdo = get_db_connection();
$method = $_SERVER['REQUEST_METHOD'];

// ----------------------------------------------------------------------------
// 1. استرجاع قائمة أسئلة الاختبارات التفاعلية (GET)
// ----------------------------------------------------------------------------
if ($method === 'GET') {
    $moduleId = isset($_GET['module_id']) ? trim($_GET['module_id']) : null;
    $action = isset($_GET['action']) ? trim($_GET['action']) : 'list';

    if (!$pdo) {
        // إذا لم يكن الاتصال متاحاً، إرجاع إشعار مع بيانات فارغة
        send_json_response([
            'success' => false,
            'message' => 'Database offline, using client fallback',
            'data' => []
        ], 200);
    }

    try {
        if ($action === 'results') {
            // استرجاع سجل أفضل النتائج
            $stmt = $pdo->query("SELECT * FROM `quiz_results` ORDER BY `created_at` DESC LIMIT 20");
            $results = $stmt->fetchAll();
            send_json_response([
                'success' => true,
                'data' => $results
            ]);
        }

        if ($moduleId && $moduleId !== 'all') {
            $stmt = $pdo->prepare("SELECT * FROM `quizzes` WHERE `module_id` = ? ORDER BY `id` ASC");
            $stmt->execute([$moduleId]);
        } else {
            $stmt = $pdo->query("SELECT * FROM `quizzes` ORDER BY `module_id`, `id` ASC");
        }

        $rows = $stmt->fetchAll();
        $formatted = [];
        foreach ($rows as $r) {
            $options = json_decode($r['options_json'], true) ?: [];
            $formatted[] = [
                'id' => $r['id'],
                'moduleId' => $r['module_id'],
                'level' => $r['level_id'],
                'concept' => $r['concept'],
                'question_ar' => $r['question_ar'],
                'question_fr' => $r['question_fr'],
                'options_ar' => $options,
                'options_fr' => $options,
                'correctIndex' => (int)$r['correct_index'],
                'explanation_ar' => $r['explanation_ar'],
                'explanation_fr' => $r['explanation_fr'],
                'philosopher' => $r['philosopher_name'],
                'points' => (int)$r['points']
            ];
        }

        send_json_response([
            'success' => true,
            'count' => count($formatted),
            'data' => $formatted
        ]);
    } catch (PDOException $e) {
        // إذا لم يكن الجدول قد تم استيراده بعد في phpMyAdmin، إرجاع رد آمن 200
        send_json_response([
            'success' => true,
            'count' => 0,
            'data' => [],
            'notice' => 'Table quizzes will be active after importing database.sql into phpMyAdmin'
        ], 200);
    }
}


// ----------------------------------------------------------------------------
// 2. إرسال نتيجة اختبار أو إضافة سؤال جديد (POST)
// ----------------------------------------------------------------------------
if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        send_json_response(['success' => false, 'message' => 'Invalid JSON payload'], 400);
    }

    $action = isset($input['action']) ? $input['action'] : 'submit_result';

    if (!$pdo) {
        send_json_response(['success' => false, 'message' => 'Database unavailable'], 503);
    }

    try {
        if ($action === 'submit_result') {
            // حفظ نتيجة المتعلم
            $moduleId = isset($input['module_id']) ? $input['module_id'] : 'all';
            $score = isset($input['score']) ? (int)$input['score'] : 0;
            $total = isset($input['total_questions']) ? (int)$input['total_questions'] : 0;
            $percentage = $total > 0 ? round(($score / $total) * 100) : 0;
            $studentName = isset($input['student_name']) ? trim($input['student_name']) : 'تلميذ زائر';
            $city = isset($input['city']) ? trim($input['city']) : 'المغرب';
            $deviceType = isset($input['device_type']) ? trim($input['device_type']) : 'Web App';

            $stmt = $pdo->prepare("INSERT INTO `quiz_results` (`module_id`, `score`, `total_questions`, `percentage`, `student_name`, `city`, `device_type`) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$moduleId, $score, $total, $percentage, $studentName, $city, $deviceType]);

            send_json_response([
                'success' => true,
                'message' => 'Quiz result saved successfully',
                'result_id' => $pdo->lastInsertId()
            ]);
        } elseif ($action === 'add_question') {
            // إضافة سؤال جديد (خاص بالإدارة)
            $id = 'q-' . time();
            $moduleId = $input['module_id'];
            $levelId = isset($input['level_id']) ? $input['level_id'] : '2bac';
            $concept = $input['concept'];
            $questionAr = $input['question_ar'];
            $questionFr = isset($input['question_fr']) ? $input['question_fr'] : null;
            $optionsJson = is_array($input['options']) ? json_encode($input['options'], JSON_UNESCAPED_UNICODE) : $input['options'];
            $correctIndex = (int)$input['correct_index'];
            $explanationAr = $input['explanation_ar'];
            $explanationFr = isset($input['explanation_fr']) ? $input['explanation_fr'] : null;
            $philosopher = isset($input['philosopher_name']) ? $input['philosopher_name'] : null;

            $stmt = $pdo->prepare("INSERT INTO `quizzes` (`id`, `module_id`, `level_id`, `concept`, `question_ar`, `question_fr`, `options_json`, `correct_index`, `explanation_ar`, `explanation_fr`, `philosopher_name`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$id, $moduleId, $levelId, $concept, $questionAr, $questionFr, $optionsJson, $correctIndex, $explanationAr, $explanationFr, $philosopher]);

            send_json_response([
                'success' => true,
                'message' => 'Question added successfully',
                'id' => $id
            ]);
        }
    } catch (PDOException $e) {
        send_json_response([
            'success' => false,
            'message' => 'Database write error: ' . $e->getMessage()
        ], 500);
    }
}
