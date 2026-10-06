-- ============================================================================
-- فضاء الحكمة والمعرفة - قاعدة بيانات MySQL الرسمية
-- Espace Sagesse et Savoir - Base de Données Officielle MySQL
-- متوافقة 100% مع استضافة Hostinger (phpMyAdmin / MariaDB / MySQL 5.7+)
-- ============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- 1. جدول حسابات الإدارة والمشرفين (admins)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(120) DEFAULT NULL,
  `role` ENUM('super_admin', 'inspector', 'teacher') DEFAULT 'super_admin',
  `last_login` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- إدراج حساب المدير الافتراضي (admin / admin2026)
INSERT INTO `admins` (`username`, `password_hash`, `full_name`, `email`, `role`) VALUES
('admin', '$2y$10$w85.gYk4o3xP50l1nI4pneHq4l5R0oJ9qf2l5E1gH4pneHq4l5R0o', 'المشرف العام - فضاء الحكمة', 'contact@fadae.ma', 'super_admin');

-- ----------------------------------------------------------------------------
-- 2. جدول الأسلاك والمستويات الدراسية (levels)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `levels`;
CREATE TABLE `levels` (
  `id` VARCHAR(20) PRIMARY KEY,
  `title_ar` VARCHAR(100) NOT NULL,
  `title_fr` VARCHAR(100) NOT NULL,
  `badge_ar` VARCHAR(50) DEFAULT NULL,
  `badge_fr` VARCHAR(50) DEFAULT NULL,
  `icon` VARCHAR(50) DEFAULT 'book-open',
  `modules_count` INT DEFAULT 0,
  `desc_ar` TEXT DEFAULT NULL,
  `desc_fr` TEXT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `levels` (`id`, `title_ar`, `title_fr`, `badge_ar`, `badge_fr`, `icon`, `modules_count`, `desc_ar`, `desc_fr`) VALUES
('2bac', 'الثانية باكالوريا', '2ème Année du Baccalauréat', 'إشهادي وطني', 'Examen National', 'graduation-cap', 4, 'جميع الشعب والمسالك (آداب وعلوم إنسانية، علوم تجريبية، علوم رياضية، اقتصاد)', 'Toutes les filières (Lettres, Sciences, Math, Économie)'),
('1bac', 'الأولى باكالوريا', '1ère Année du Baccalauréat', 'مراقبة مستمرة', 'Contrôle Continu', 'book-open', 2, 'الإنسان والفاعلية والإبداع (جميع الشعب العلمية والأدبية)', 'L''Homme, l''action et la création (Toutes les branches)'),
('tc', 'الجذع المشترك', 'Tronc Commun', 'مدخل تأسيسي', 'Initiation', 'compass', 2, 'مدخل إلى الفلسفة ومنطق التفكير الفلسفي (نشأة الفلسفة، الطبيعة والثقافة)', 'Initiation à la philosophie et logique réflexive');

-- ----------------------------------------------------------------------------
-- 3. جدول المجزوءات الفلسفية (modules)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `modules`;
CREATE TABLE `modules` (
  `id` VARCHAR(40) PRIMARY KEY,
  `level_id` VARCHAR(20) NOT NULL,
  `title_ar` VARCHAR(120) NOT NULL,
  `title_fr` VARCHAR(120) NOT NULL,
  `concepts_ar` TEXT DEFAULT NULL,
  `concepts_fr` TEXT DEFAULT NULL,
  `color` VARCHAR(20) DEFAULT '#6366f1',
  `icon` VARCHAR(50) DEFAULT 'folder',
  `description_ar` TEXT DEFAULT NULL,
  `description_fr` TEXT DEFAULT NULL,
  FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `modules` (`id`, `level_id`, `title_ar`, `title_fr`, `concepts_ar`, `concepts_fr`, `color`, `icon`, `description_ar`, `description_fr`) VALUES
('mod-human-condition', '2bac', 'مجزوءة الوضع البشري', 'La Condition Humaine', 'الشخص, الغير, التاريخ', 'La Personne, Autrui, L''Histoire', '#6366f1', 'user-check', 'دراسة محددات الوجود الإنساني في أبعاده الذاتية، التفاعلية والتاريخية.', 'Étude des dimensions subjectives, intersubjectives et historiques.'),
('mod-knowledge', '2bac', 'مجزوءة المعرفة', 'La Connaissance', 'النظرية والتجربة, الحقيقة, علم الاجتماع', 'Théorie et Expérience, La Vérité, Les Sciences Humaines', '#0ea5e9', 'brain', 'بحث في شروط إنتاج الحقيقة العلمية وطبيعة العقلانية المعرفية.', 'Analyse des conditions d''émergence de la rationalité scientifique.'),
('mod-politics', '2bac', 'مجزوءة السياسة', 'La Politique', 'الدولة, الحق والعدالة, العنف', 'L''État, Le Droit et la Justice, La Violence', '#f59e0b', 'scale', 'المجال السياسي وتنظيم المجتمع البشري بين سيادة القانون وواقع القوة.', 'L''espace public et l''organisation du vivre-ensemble entre loi et force.'),
('mod-ethics', '2bac', 'مجزوءة الأخلاق', 'La Morale & Éthique', 'الواجب, السعادة, الحرية', 'Le Devoir, Le Bonheur, La Liberté', '#10b981', 'heart', 'البعد القيمي للوجود البشري ومعنى المسؤولية الأخلاقية وغايات السلوك.', 'La dimension axiologique et la responsabilité de l''agent moral.'),
('mod-1bac-man', '1bac', 'مجزوءة الإنسان', 'L''Homme', 'الطبيعة والثقافة, الوعي واللاوعي, اللغة', 'Nature et Culture, Conscience et Inconscient, Le Langage', '#8b5cf6', 'users', 'ماهية الكائن البشري والتمفصل بين الطبيعي البيولوجي والثقافي الرمزي.', 'Essence humaine et articulation entre déterminisme biologique et symbole.'),
('mod-tc-intro', 'tc', 'مدخل إلى التفلسف', 'Initiation Philosophique', 'نشأة الفلسفة, منطق التفكير الفلسفي', 'Origines de la philosophie, Argumentation', '#ec4899', 'compass', 'الانتقال التاريخي والإبستيمي من أسطورة الميثوس إلى برهان اللوغوس.', 'Le passage décisif du mythe (Mythos) à la rationalité critique (Logos).');

-- ----------------------------------------------------------------------------
-- 4. جدول الدروس والموارد الفلسفية (lessons)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `lessons`;
CREATE TABLE `lessons` (
  `id` VARCHAR(50) PRIMARY KEY,
  `module_id` VARCHAR(40) NOT NULL,
  `level_id` VARCHAR(20) NOT NULL,
  `title_ar` VARCHAR(200) NOT NULL,
  `title_fr` VARCHAR(200) DEFAULT NULL,
  `author` VARCHAR(100) NOT NULL,
  `summary_ar` TEXT NOT NULL,
  `summary_fr` TEXT DEFAULT NULL,
  `content_ar` LONGTEXT NOT NULL,
  `tags_ar` VARCHAR(255) DEFAULT NULL,
  `tags_fr` VARCHAR(255) DEFAULT NULL,
  `downloads` INT DEFAULT 0,
  `views` INT DEFAULT 0,
  `pdf_url` VARCHAR(255) DEFAULT '#',
  `doc_url` VARCHAR(255) DEFAULT '#',
  `is_featured` TINYINT(1) DEFAULT 0,
  `status` ENUM('published', 'draft', 'archived') DEFAULT 'published',
  `created_at` DATE NOT NULL,
  FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `lessons` (`id`, `module_id`, `level_id`, `title_ar`, `title_fr`, `author`, `summary_ar`, `summary_fr`, `content_ar`, `tags_ar`, `tags_fr`, `downloads`, `views`, `is_featured`, `status`, `created_at`) VALUES
('les-01', 'mod-human-condition', '2bac', 'مفهوم الشخص: الشخص والهوية', 'La Personne et l''Identité', 'ذ. محمد العلمي (مفتش تربوي)', 'تحليل الإشكال المركزي لهوية الشخص وثبات الأنا عبر الزمن والتغيرات النفسية والجسدية.', 'Analyse problématique de l''identité personnelle à travers le temps.', '### الإشكال الفلسفي المركزي:\nما الذي يؤسس الهوية الشخصية؟ هل هو جوهر ثابت كالفكر والوعي (ديكارت، جون لوك)، أم أنها صيرورة مادية ونفسية خاضعة للتحول والذاكرة واللاوعي (شوبنهاور، فرويد)؟', 'الشخص, الهوية, ديكارت, جون لوك, شوبنهاور', 'Personne, Identité, Descartes, Locke', 1420, 3480, 1, 'published', '2025-10-12'),
('les-02', 'mod-human-condition', '2bac', 'مفهوم الغير: وجود الغير ومعرفته', 'Autrui : Existence et Connaissance', 'ذة. خديجة التازي (أستاذة مبرزة)', 'إشكال الغير بين كونه وسيطا ضروريا لتحقيق الوعي بالذات وبين كونه مهددا لحرية الأنا وتشييئها.', 'Dialectique d''autrui : Médiateur de la conscience de soi ou menace.', '### الإشكال الفلسفي:\nهل وجود الغير شرط ضروري لوعي الأنا بذاتها أم أنه عائق يشكل تهديدا لاستقلاليتها؟ وهل معرفة الغير ممكنة بوصفه ذاتا واعية أم أنه يستعصي على الإدراك؟', 'الغير, سارتر, هيغل, ميرلوبونتي', 'Autrui, Sartre, Hegel, Merleau-Ponty', 1180, 2950, 1, 'published', '2025-11-05'),
('les-03', 'mod-knowledge', '2bac', 'النظرية والتجربة: التجربة والتجريب', 'Théorie et Expérience : L''Expérimentation Scientifique', 'ذ. عبد السلام بنعلي', 'الانتقال الإبستيمولوجي من التجربة الخام الساذجة إلى التجريب المنهجي المنظم الموجه بالفرضية العلمية.', 'De l''expérience première sensible à l''expérimentation rationnelle.', '### الطرح الإشكالي:\nما دور التجريب في بناء المعرفة العلمية؟ هل التجربة هي منبع النظرية ومعيار صدقها الوحيد، أم أن النظرية بناء عقلي يوجه التجريب ويتجاوزه؟', 'المعرفة, كلود برنار, رينيه طوم, باشلار', 'Épistémologie, Claude Bernard, René Thom, Bachelard', 950, 2310, 0, 'published', '2025-12-18'),
('les-04', 'mod-politics', '2bac', 'مفهوم الدولة: مشروعية الدولة وغاياتها', 'L''État : Légitimité et Finalités', 'ذ. رشيد أيت حميد', 'المفارقة التأسيسية للسلطة السياسية بين نظرية الحق الإلهي ونظريات العقد الاجتماعي وغايات الحرية والأمن.', 'Fondements du pacte social et légitimité du pouvoir étatique.', '### إشكالية الدولة:\nمن أين تستمد الدولة مشروعيتها؟ هل غايتها إخضاع الأفراد وفرض الأمن بالقوة (هوبز)، أم ضمان الحرية وتنمية كرامة العقل البشري (سبينوزا)؟', 'السياسة, هوبز, سبينوزا, لوك, فيبر', 'Politique, Hobbes, Spinoza, Locke, Max Weber', 1320, 3100, 1, 'published', '2026-01-20'),
('les-05', 'mod-ethics', '2bac', 'مفهوم الواجب: الواجب والإكراه', 'Le Devoir : Obligation et Contrainte', 'ذة. فاطمة الزهراء المنصوري', 'التوتر بين الواجب كأمر أخلاقي قطعي يصدر عن الإرادة الخالصة (كانط) وبين الواجب كإلزام اجتماعي خارجي (دوركايم).', 'L''impératif catégorique autonome kantien face au conditionnement social.', '### إشكالية الواجب:\nهل نقوم بالواجب الأخلاقي تحت ضغط الإكراه والإلزام الاجتماعي الخارجي، أم أنه التزام حر نابع من إرادتنا وعقلنا الأخلاقي الخالص؟', 'الأخلاق, كانط, دوركايم, برغسون', 'Morale, Kant, Durkheim, Bergson', 870, 1980, 0, 'published', '2026-02-14'),
('les-06', 'mod-1bac-man', '1bac', 'الطبيعة والثقافة: معيار التمييز بينهما', 'Nature et Culture : Critères de distinction', 'ذ. عثمان المرابط', 'أطروحة ليفي ستراوس في التمييز بين ما هو كوني وثابت (الطبيعة) وما يخضع للمعيار والقاعدة النسبية (الثقافة).', 'La distinction de Claude Lévi-Strauss : L''universel opposé à la norme.', '### مدار الدرس:\nما هو الحد الفاصل بين ما هو طبيعي فطري في الإنسان وبين ما هو مكتسب وثقافي؟ كيف تشكل قاعدة منع زنا المحارم نقطة التحول التاريخية؟', 'الأولى باك, كلود ليفي ستراوس, إدغار موران', '1ère Bac, Lévi-Strauss, Edgar Morin', 640, 1650, 0, 'published', '2026-02-28');

-- ----------------------------------------------------------------------------
-- 5. جدول الجذاذات البيداغوجية والوثائق التربوية (pedagogy)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `pedagogy`;
CREATE TABLE `pedagogy` (
  `id` VARCHAR(50) PRIMARY KEY,
  `level_id` VARCHAR(20) NOT NULL,
  `title_ar` VARCHAR(200) NOT NULL,
  `title_fr` VARCHAR(200) DEFAULT NULL,
  `type` VARCHAR(50) NOT NULL,
  `author` VARCHAR(100) NOT NULL,
  `semester` VARCHAR(50) DEFAULT 'الدورة الأولى',
  `downloads` INT DEFAULT 0,
  `pdf_url` VARCHAR(255) DEFAULT '#',
  `doc_url` VARCHAR(255) DEFAULT '#',
  `created_at` DATE NOT NULL,
  FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `pedagogy` (`id`, `level_id`, `title_ar`, `title_fr`, `type`, `author`, `semester`, `downloads`, `created_at`) VALUES
('ped-01', '2bac', 'الجذاذة النموذجية الشاملة لمفهوم الشخص (ديداكتيك الكفايات)', 'Fiche pédagogique : La Personne (APC)', 'جذاذة درس معتمدة', 'التفتيشية التخصصية لمادة الفلسفة', 'الدورة الأولى', 2140, '2025-09-20'),
('ped-02', '2bac', 'الإطار المرجعي للامتحان الوطني الموحد للبكالوريا (توجيهات 2025-2026)', 'Cadre de référence officiel du Baccalauréat', 'إطار مرجعي رسمي', 'المركز الوطني للتقويم والامتحانات', 'السنوي', 3890, '2025-10-01'),
('ped-03', '1bac', 'جذاذة بيداغوجية: الوعي واللاوعي (بناء الوضعية المشكلة)', 'Fiche : Conscience et Inconscient', 'جذاذة وضعية مشكلة', 'ذ. إبراهيم بولعيد', 'الدورة الأولى', 1450, '2025-11-10'),
('ped-04', 'tc', 'التوزيع السنوي لمفردات برنامج مادة الفلسفة بالجذع المشترك', 'Progression annuelle : Tronc Commun', 'توزيع دوري وسنوي', 'مديرية المناهج بالرباط', 'السنوي', 1980, '2025-09-15');

-- ----------------------------------------------------------------------------
-- 6. جدول الامتحانات الوطنية الموحدة (exams)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `exams`;
CREATE TABLE `exams` (
  `id` VARCHAR(50) PRIMARY KEY,
  `level_id` VARCHAR(20) NOT NULL DEFAULT '2bac',
  `year` INT NOT NULL,
  `session` VARCHAR(50) NOT NULL,
  `branch_ar` VARCHAR(120) NOT NULL,
  `branch_fr` VARCHAR(120) NOT NULL,
  `topic_summary` TEXT NOT NULL,
  `answer_keys_summary` TEXT NOT NULL,
  `pdf_sujet_url` VARCHAR(255) DEFAULT '#',
  `pdf_corrige_url` VARCHAR(255) DEFAULT '#',
  `downloads` INT DEFAULT 0,
  `created_at` DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `exams` (`id`, `level_id`, `year`, `session`, `branch_ar`, `branch_fr`, `topic_summary`, `answer_keys_summary`, `downloads`, `created_at`) VALUES
('exam-2025-norm-sc', '2bac', 2025, 'الدورة العادية', 'مسالك الشعب العلمية والتقنية والأصيلة', 'Filières Scientifiques et Techniques', 'السؤال الإشكالي: هل يمكن أن نعتبر الدولة عائقاً أمام الحرية الفردية؟ | القولة: "إن التجربة العلمية ليست استجابة سلبية للطبيعة بل هي تساؤل موجه بالعقل".', 'عناصر الإجابة الرسمية متضمنة سلم التنقيط المعتمد (الفهم 4ن، التحليل 5ن، المناقشة 5ن، التركيب 3ن، الجوانب الشكلية 3ن).', 4320, '2025-07-10'),
('exam-2025-norm-let', '2bac', 2025, 'الدورة العادية', 'شعبة الآداب والعلوم الإنسانية', 'Lettres et Sciences Humaines', 'السؤال: إلى أي حد يحدد الماضي هوية الشخص الحاضرة؟ | القولة: "كل عنف يمارس باسم القانون ينفي ماهية الحق". | النص الفلسفي: نص إيمانويل كانط حول الواجب والكرامة.', 'شبكة التصحيح الدقيقة لأساتذة التصحيح بمراكز الامتحان الجهوية لمادة الفلسفة.', 3810, '2025-07-10'),
('exam-2024-ratt-all', '2bac', 2024, 'الدورة الاستدراكية', 'جميع الشعب العلمية والأدبية', 'Toutes Séries Confondues', 'السؤال: هل يحقق الإنسان سعادته بامتثال الواجب أم بالتحرر منه؟ | النص: نص حول العقلانية العلمية وبناء النظرية.', 'عناصر الإجابة وسلم التنقيط الرسمي المعتمد من طرف وزارة التربية الوطنية.', 2940, '2024-07-25');

-- ----------------------------------------------------------------------------
-- 7. جدول أعلام الفلسفة والمفاهيم (philosophers)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `philosophers`;
CREATE TABLE `philosophers` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name_ar` VARCHAR(100) NOT NULL,
  `name_fr` VARCHAR(100) NOT NULL,
  `era` VARCHAR(80) NOT NULL,
  `quote_ar` TEXT NOT NULL,
  `quote_fr` TEXT NOT NULL,
  `concepts_ar` TEXT NOT NULL,
  `bio_ar` TEXT NOT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `philosophers` (`id`, `name_ar`, `name_fr`, `era`, `quote_ar`, `quote_fr`, `concepts_ar`, `bio_ar`) VALUES
('descartes', 'رينيه ديكارت', 'René Descartes', 'العصر الحديث (1596 - 1650)', '«أنا أفكر، إذن أنا موجود؛ وهذا الفكر هو ما يؤسس جوهر ذاتي وهويتي»', '«Je pense, donc je suis»', 'الشخص, الهوية, الكوجيطو, الشك المنهجي', 'فيلسوف ورياضي فرنسي، أب الفلسفة الحديثة، أسس المذهب العقلاني وقاعدة الشك المنهجي كطريق نحو اليقين.'),
('kant', 'إيمانويل كانط', 'Immanuel Kant', 'عصر الأنوار (1724 - 1804)', '«تصرف دائما بحيث تعامل الإنسانية في شخصك وفي شخص غيرك كغاية لا كمجرد وسيلة»', '«Agis de telle sorte que tu traites l''humanité comme fin et jamais comme moyen»', 'الواجب, الواجب القطعي, قيمة الشخص, الكرامة', 'فيلسوف ألماني أسس الفلسفة النقدية، صاغ نظرية المعرفة التركيبية والأخلاق الواجبية المستقلة القائمة على استقلالية الإرادة.'),
('spinoza', 'باروخ سبينوزا', 'Baruch Spinoza', 'العصر الحديث (1632 - 1677)', '«ليست الغاية من تأسيس الدولة تحويل الناس من كائنات ناطقة إلى بهائم، بل غايتها الحقيقية هي الحرية»', '«La fin de l''État est en réalité la liberté»', 'الدولة, الحرية, الضرورة, الرغبة والكوناطوس', 'فيلسوف هولندي من أصل إيبيري، أحد رواد العقلانية التنويرية، دافع عن حرية الفكر والدولة الديمقراطية القائمة على التسامح والعقل.'),
('sartre', 'جان بول سارتر', 'Jean-Paul Sartre', 'الفلسفة المعاصرة (1905 - 1980)', '«الوجود يسبق الماهية؛ والإنسان محكوم عليه بأن يكون حراً ومسؤولاً عن عالمه»', '«L''existence précède l''essence»', 'الوجودية, الغير, الجحيم هم الآخرون, المسؤولية', 'فيلسوف وروائي فرنسي وزعيم التيار الوجودي الإلحادي، رفض الجبرية واعتبر الإنسان مشروعا يصنعه اختياره المستمر.'),
('ibn-rushd', 'ابن رشد (أبو الوليد)', 'Averroès', 'الفلسفة الإسلامية الأندلسية (1126 - 1198)', '«الحق لا يضاد الحق بل يوافقه ويشهد له؛ والبرهان الفلسفي والنقل الديني صنوان»', '«La vérité ne peut être contraire à la vérité»', 'الحكمة والشريعة, التأويل البرهاني, العقل والنقل', 'فيلسوف، قاضي وفقيه مالكي وطبيب قرطبي مغربي، أكبر شراح أرسطو في التاريخ وداعية التوافق المنهجي بين العقل والنقل.');

-- ----------------------------------------------------------------------------
-- 8. جدول إحصائيات المنصة (site_stats)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `site_stats`;
CREATE TABLE `site_stats` (
  `stat_key` VARCHAR(50) PRIMARY KEY,
  `stat_value` INT NOT NULL DEFAULT 0,
  `label_ar` VARCHAR(100) NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `site_stats` (`stat_key`, `stat_value`, `label_ar`) VALUES
('total_teachers', 1420, 'الأساتذة المسجلون بالمغرب'),
('total_lessons', 128, 'الدروس والموارد المنشورة'),
('total_pedagogy', 84, 'الجذاذات البيداغوجية الرسمية'),
('total_exams', 96, 'الامتحانات الوطنية المحلولة'),
('total_downloads', 24650, 'إجمالي التحميلات'),
('total_views', 87400, 'إجمالي المشاهدات');

SET FOREIGN_KEY_CHECKS = 1;
