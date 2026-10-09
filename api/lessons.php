<?php
/**
 * فضاء الحكمة والمعرفة - إدارة الدروس والموارد الفلسفية
 * API REST pour la gestion des cours et contenus
 */

require_once __DIR__ . '/config.php';

$pdo = get_db_connection();
$method = $_SERVER['REQUEST_METHOD'];

// ============================================================================
// 1. جلب الدروس (GET)
// ============================================================================
if ($method === 'GET') {
    $level = $_GET['level'] ?? null;
    $module = $_GET['module'] ?? null;
    $search = $_GET['search'] ?? null;

    if ($pdo) {
        try {
            $sql = "SELECT * FROM lessons WHERE 1=1";
            $params = [];

            if ($level && $level !== 'all') {
                $sql .= " AND level_id = :level";
                $params[':level'] = $level;
            }
            if ($module && $module !== 'all') {
                $sql .= " AND module_id = :module";
                $params[':module'] = $module;
            }
            if ($search) {
                $sql .= " AND (title_ar LIKE :q OR title_fr LIKE :q OR author LIKE :q OR tags_ar LIKE :q OR summary_ar LIKE :q)";
                $params[':q'] = "%{$search}%";
            }

            $sql .= " ORDER BY is_featured DESC, created_at DESC";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $lessons = $stmt->fetchAll();
            foreach ($lessons as &$l) {
                $l['moduleId'] = $l['module_id'] ?? '';
                $l['levelId'] = $l['level_id'] ?? '';
                $l['pdfUrl'] = $l['pdf_url'] ?? '#';
                $l['docUrl'] = $l['doc_url'] ?? '#';
                $l['isFeatured'] = !empty($l['is_featured']);
                $l['date'] = $l['created_at'] ?? date('Y-m-d');
                if (isset($l['tags_ar']) && is_string($l['tags_ar'])) {
                    $l['tags_ar'] = array_values(array_filter(array_map('trim', explode(',', $l['tags_ar']))));
                }
                if (isset($l['tags_fr']) && is_string($l['tags_fr'])) {
                    $l['tags_fr'] = array_values(array_filter(array_map('trim', explode(',', $l['tags_fr']))));
                }
            }
            unset($l);

            send_json_response(['success' => true, 'count' => count($lessons), 'data' => $lessons]);
        } catch (Exception $e) {
            send_json_response(['success' => false, 'error' => $e->getMessage()], 500);
        }
    } else {
        // إذا لم تكن قاعدة البيانات مربوطة بعد، استجابة برسالة واضحة
        send_json_response(['success' => false, 'message' => 'قاعدة البيانات غير متصلة، يتم استخدام البيانات المحلية'], 503);
    }
}

// ============================================================================
// 2. إضافة أو تعديل درس (POST)
// ============================================================================
if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $id = trim($input['id'] ?? '');
    $title_ar = trim($input['title_ar'] ?? '');
    $title_fr = trim($input['title_fr'] ?? '');
    $level_id = trim($input['level_id'] ?? $input['levelId'] ?? '2bac');
    $module_id = trim($input['module_id'] ?? $input['moduleId'] ?? 'mod-human-condition');
    $author = trim($input['author'] ?? 'ذ. أستاذ الفلسفة');
    $summary_ar = trim($input['summary_ar'] ?? '');
    $content_ar = trim($input['content_ar'] ?? '');
    $tags_raw = $input['tags_ar'] ?? '';
    $tags_ar = is_array($tags_raw) ? implode(', ', $tags_raw) : trim($tags_raw);

    if (empty($title_ar) || empty($summary_ar) || empty($content_ar)) {
        send_json_response(['success' => false, 'message' => 'جميع الحقول الأساسية مطلوبة'], 400);
    }

    if ($pdo) {
        try {
            // التحقق مما إذا كان المعرف موجوداً لتحديثه (UPDATE)
            if (!empty($id)) {
                $check = $pdo->prepare("SELECT id FROM lessons WHERE id = :id");
                $check->execute([':id' => $id]);
                if ($check->fetch()) {
                    $stmt = $pdo->prepare("
                        UPDATE lessons SET
                            module_id = :mod,
                            level_id = :lvl,
                            title_ar = :tar,
                            title_fr = :tfr,
                            author = :auth,
                            summary_ar = :sum,
                            content_ar = :cnt,
                            tags_ar = :tags
                        WHERE id = :id
                    ");
                    $stmt->execute([
                        ':id' => $id,
                        ':mod' => $module_id,
                        ':lvl' => $level_id,
                        ':tar' => $title_ar,
                        ':tfr' => $title_fr,
                        ':auth' => $author,
                        ':sum' => $summary_ar,
                        ':cnt' => $content_ar,
                        ':tags' => $tags_ar
                    ]);

                    send_json_response(['success' => true, 'message' => 'تم تحديث الدرس بنجاح في قاعدة البيانات', 'id' => $id]);
                }
            }

            // إضافة درس جديد (INSERT)
            $newId = !empty($id) ? $id : ('les-' . substr(uniqid(), -6));
            $stmt = $pdo->prepare("
                INSERT INTO lessons (id, module_id, level_id, title_ar, title_fr, author, summary_ar, content_ar, tags_ar, created_at, status)
                VALUES (:id, :mod, :lvl, :tar, :tfr, :auth, :sum, :cnt, :tags, CURDATE(), 'published')
            ");
            $stmt->execute([
                ':id' => $newId,
                ':mod' => $module_id,
                ':lvl' => $level_id,
                ':tar' => $title_ar,
                ':tfr' => $title_fr,
                ':auth' => $author,
                ':sum' => $summary_ar,
                ':cnt' => $content_ar,
                ':tags' => $tags_ar
            ]);

            send_json_response(['success' => true, 'message' => 'تمت إضافة الدرس بنجاح إلى قاعدة البيانات', 'id' => $newId], 201);
        } catch (Exception $e) {
            send_json_response(['success' => false, 'error' => $e->getMessage()], 500);
        }
    } else {
        send_json_response(['success' => false, 'message' => 'تعذر الحفظ: قاعدة البيانات غير متصلة'], 503);
    }
}

// ============================================================================
// 3. حذف درس (DELETE)
// ============================================================================
if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        send_json_response(['success' => false, 'message' => 'معرف الدرس مطلوب'], 400);
    }

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("DELETE FROM lessons WHERE id = :id");
            $stmt->execute([':id' => $id]);
            send_json_response(['success' => true, 'message' => 'تم حذف الدرس بنجاح من قاعدة البيانات']);
        } catch (Exception $e) {
            send_json_response(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
