-- ============================================================================
-- فضاء الحكمة والمعرفة - قاعدة بيانات MySQL الشاملة والكاملة
-- Espace Sagesse et Savoir - Base de Données Complète MySQL 5.7+ / MariaDB
-- متوافقة 100% مع استضافة Hostinger (phpMyAdmin / Cloud Hosting)
-- تتضمن جداول تخزين كافة موارد المنصة: الدروس، الامتحانات، الجذاذات، الفلاسفة،
-- الاختبارات التفاعلية QCM، الخرائط الذهنية، المنهجيات، الكتب، الأقوال، والأساتذة
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
-- 8. جدول بنك الاختبارات والمسابقات التفاعلية الذكية (quizzes)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `quizzes`;
CREATE TABLE `quizzes` (
  `id` VARCHAR(50) PRIMARY KEY,
  `module_id` VARCHAR(40) NOT NULL,
  `level_id` VARCHAR(20) NOT NULL DEFAULT '2bac',
  `concept` VARCHAR(100) NOT NULL,
  `question_ar` TEXT NOT NULL,
  `question_fr` TEXT DEFAULT NULL,
  `options_json` TEXT NOT NULL,
  `correct_index` TINYINT NOT NULL DEFAULT 0,
  `explanation_ar` TEXT NOT NULL,
  `explanation_fr` TEXT DEFAULT NULL,
  `philosopher_name` VARCHAR(100) DEFAULT NULL,
  `points` INT DEFAULT 10,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `quizzes` (`id`, `module_id`, `level_id`, `concept`, `question_ar`, `question_fr`, `options_json`, `correct_index`, `explanation_ar`, `philosopher_name`) VALUES
('q-1', 'mod-human-condition', '2bac', 'الشخص والهوية', 'على ماذا يؤسس رينيه ديكارت هوية الشخص وثبات الأنا؟', 'Sur quoi René Descartes fonde-t-il l''identité de la personne et la permanence du Moi ?', '["على التفكير المجرد المستمر (الكوجيطو)", "على الذاكرة والوعي الحسي المقترن بالأفعال", "على إرادة الحياة والجسد المادي", "على الطبع والسلوك الاجتماعي المكتسب"]', 0, 'يرى ديكارت في (التأملات) أن الشخص جوهر مفكر وأن التفكير هو الخاصية الوحيدة التي لا تنفصل عن الذات.', 'رينيه ديكارت'),
('q-2', 'mod-human-condition', '2bac', 'الشخص والهوية', 'ما هو العنصر الحاسم في تحديد هوية الشخص عند الفيلسوف الإنجليزي جون لوك؟', 'Quel est l''élément déterminant de l''identité personnelle selon John Locke ?', '["الجوهر الروحي المفارق", "الوعي الحسي المصحوب بالذاكرة الممتدة في الماضي", "تطابق الصورة الجسدية أمام المرآة", "الإرادة العاقلة المتصلة بالأخلاق"]', 1, 'يعتبر جون لوك أن الوعي المقترن بالإدراك الحسي والذاكرة هو ما يصنع وحدة الذات وهوية الشخص عبر الزمان.', 'جون لوك'),
('q-3', 'mod-human-condition', '2bac', 'الشخص بوصفه قيمة', 'لماذا يمتلك الشخص (قيمة مطلقة) وكرامة في نظر إيمانويل كانط؟', 'Pourquoi la personne possède-t-elle une valeur absolue (dignité) selon Kant ?', '["لكونه كائناً عاقلاً أخلاقياً يُعد غاية في ذاته ولا يمكن تسعيره", "بسبب مكانته الاجتماعية ووظيفته في الدولة", "بفضل قوته البيولوجية وسيطرته على الطبيعة", "لأنه قادر على إنتاج الثروة والممتلكات"]', 0, 'يميز كانط بين الأشياء التي لها سعر، وبين الأشخاص الذين يتمتعون بكرامة وقيمة مطلقة لكونهم غاية في ذاتهم.', 'إيمانويل كانط'),
('q-4', 'mod-human-condition', '2bac', 'وجود الغير', 'كيف وصف جان بول سارتر دور (الغير) في وعي الأنا بذاتها في تجربة الخجل؟', 'Comment Sartre qualifie-t-il le rôle d''Autrui dans la conscience de soi ?', '["الغير وسيط ضروري بيني وبين ذاتي، لكنه في الوقت ذاته يُشيّئ حريتي", "الغير مجرد وهم بصري لا يؤثر في استقلالية الذات", "الغير مصدر للمحبة الخالصة والتوافق الفطري التام", "الغير كائن متطابق معي تماماً في الفكر والإرادة"]', 0, 'يعتبر سارتر أن نظرة الغير تضعني أمام حقيقتي، فالغير وسيط لا غنى عنه لمعرفة ذاتي مع تهديده لحريتي.', 'جان بول سارتر'),
('q-5', 'mod-knowledge', '2bac', 'النظرية والتجربة', 'ما هي الخطوات الأربع المنهجية التي حددها كلود برنار للمنهج التجريبي الصارم؟', 'Quelles sont les étapes de la démarche expérimentale selon Claude Bernard ?', '["الملاحظة، صياغة الفرضية، إنجاز التجربة، استنباط القانون العلمي", "الشك المنهجي، الحدس الرياضي، التحليل، والتركيب", "التأمل الميتافيزيقي، الاستدلال المنطقي، الإقناع البلاغي", "جمع الآراء الشائعة، التصويت عليها، تطبيقها عملياً"]', 0, 'وضع كلود برنار خطوات المنهج التجريبي: الملاحظة، ابتكار الفرضية، إجراء التجربة، والوصول إلى القانون العلمي.', 'كلود برنار'),
('q-6', 'mod-knowledge', '2bac', 'العقلانية العلمية', 'ما هو الأصل الحقيقي للمفاهيم الفيزيائية المعاصرة حسب ألبرت أينشتاين؟', 'Quelle est la source des concepts scientifiques modernes selon Einstein ?', '["الإنشاءات الحرة للعقل البشري والنسق الرياضي البديهي", "التراكم العشوائي للمشاهدات الحسية المباشرة فقط", "الأساطير والتقاليد الشعبية الموروثة", "القوانين التي تفرضها السلطة السياسية"]', 0, 'يؤكد أينشتاين أن المفاهيم العلمية هي إبداعات حرة للعقل الرياضي، والتجربة وسيلة للتوجيه والاختبار.', 'ألبرت أينشتاين'),
('q-7', 'mod-knowledge', '2bac', 'معايير علمية النظريات', 'ما هو المعيار الإبستيمولوجي الشهير الذي وضعه كارل بوبر لتمييز النظريات العلمية؟', 'Quel est le critère fondamental proposé par Karl Popper ?', '["معيار القابلية للتكذيب أو التفنيد (Falsifiabilité)", "معيار المطابقة التامة مع رغبات الجمهور", "معيار الثبات الأبدي وعدم التغير", "معيار الإجماع الديني والأخلاقي حول النظرية"]', 0, 'اعتبر كارل بوبر أن النظرية لا تكون علمية إلا إذا كانت تقبل أن تُختبر وتُكذّب بالتجربة والوقائع.', 'كارل بوبر'),
('q-8', 'mod-politics', '2bac', 'مشروعية الدولة وغاياتها', 'ما هي الغاية الأسمى من تأسيس الدولة في فلسفة باروخ سبينوزا؟', 'Quelle est la fin suprême de l''État selon Baruch Spinoza ?', '["الحرية وتمكين الأفراد من تنمية عقولهم وأجسادهم في أمان", "إرهاب المواطنين وإخضاعهم بالقوة لحاكم مستبد", "شن الحروب المستمرة على الدول المجاورة", "فرض معتقد ديني واحد بالقوة الجبرية"]', 0, 'يصرح سبينوزا: «إن الغاية الحقيقية من تأسيس الدولة هي في الواقع الحرية»، وتنمية العقول في أمان.', 'باروخ سبينوزا'),
('q-9', 'mod-politics', '2bac', 'طبيعة السلطة السياسية', 'ماذا نصح نيقولا ماكيافيلي الأمير في تدبير شؤون الحكم والصراع السياسي؟', 'Quel conseil Machiavel prodigue-t-il au Prince ?', '["أن يجمع بين طباع الأسد وطباع الثعلب", "أن يلتزم بالمثالية الأخلاقية حتى لو خسر ملكه", "أن يتنازل عن جميع صلاحياته للمواطنين بالتساوي", "أن يعتزل السياسة ويفوضها للحكماء فقط"]', 0, 'أسس ماكيافيلي للواقعية السياسية: يجب على الحاكم الجمع بين قوة الأسد لترهيب الخصوم ودهاء الثعلب لكشف الفخاخ.', 'نيقولا ماكيافيلي'),
('q-10', 'mod-politics', '2bac', 'العدالة بين المساواة والإنصاف', 'لماذا اعتبر أرسطو أن (الإنصاف) أسمى وأفضل من (العدالة الحرفية للقانون)؟', 'Pourquoi Aristote considère-t-il l''équité comme supérieure à la stricte justice légale ?', '["لأن القوانين عامة، والإنصاف يصحح جمود القانون عند تطبيقه على الحالات الخاصة", "لأن الإنصاف يلغي جميع القوانين ويشيع الفوضى", "لأن القضاة معصومون من الخطأ ولا يحتاجون لقوانين", "لأن العدالة القانونية تضر دائماً بالطبقة الحاكمة"]', 0, 'يوضح أرسطو أن عمومية القوانين المكتوبة تجعلها قاصرة، والإنصاف يصحح عيوب هذا الجمود.', 'أرسطو'),
('q-11', 'mod-ethics', '2bac', 'الواجب والإكراه', 'ما هو الفرق عند إيمانويل كانط بين الأمر الشرطي والأمر القطعي المطلق؟', 'Quelle est la différence fondamentale chez Kant entre impératif hypothétique et catégorique ?', '["الأمر الشرطي مشروط بتحقيق مصلحة، بينما القطعي واجب في ذاته دون قيد أو شرط", "الأمر الشرطي خاص برجال الدين والقطعي خاص بالملوك", "الأمر الشرطي ثابت أبدي والقطعي نسبي يتغير يومياً", "كلاهما يقومان على المصلحة الشخصية واللذة المادية فقط"]', 0, 'يؤكد كانط أن الفعل الأخلاقي الحق ينبع من أمر قطعي نابع من العقل العملي لذاته: افعل الواجب لأنه واجب.', 'إيمانويل كانط'),
('q-12', 'mod-ethics', '2bac', 'الحرية والحتمية', 'ما هو الموقف الجذري لـ جان بول سارتر من مسألة الحرية الإنسانية؟', 'Quelle est la thèse radicale de Sartre concernant la liberté ?', '["الإنسان محكوم عليه بأن يكون حراً، والوجود يسبق الماهية", "الإنسان خاضع بالكامل للحتميات البيولوجية والوراثية", "الحرية مقصورة على طبقة معينة من الفلاسفة فقط", "الحرية شعور وهمي خادع لا وجود له في الواقع الموضوعي"]', 0, 'يؤكد سارتر أن الوجود يسبق الماهية، فالإنسان يوجد أولاً ثم يصنع نفسه باختياراته الحرة والمسؤولة.', 'جان بول سارتر');

-- ----------------------------------------------------------------------------
-- 9. جدول نتائج وتقييمات المتعلمين في اختبارات QCM (quiz_results)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `quiz_results`;
CREATE TABLE `quiz_results` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `module_id` VARCHAR(40) DEFAULT 'all',
  `score` INT NOT NULL,
  `total_questions` INT NOT NULL,
  `percentage` INT NOT NULL,
  `student_name` VARCHAR(100) DEFAULT 'تلميذ زائر',
  `city` VARCHAR(80) DEFAULT NULL,
  `device_type` VARCHAR(50) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `quiz_results` (`module_id`, `score`, `total_questions`, `percentage`, `student_name`, `city`) VALUES
('all', 11, 12, 92, 'ياسين الفيلالي (2 باك علوم)', 'فاس'),
('mod-human-condition', 4, 4, 100, 'أمينة التازي (2 باك آداب)', 'الرباط'),
('mod-politics', 3, 3, 100, 'حمزة المصباحي (2 باك علوم رياضية)', 'طنجة');

-- ----------------------------------------------------------------------------
-- 10. جدول الخرائط المفاهيمية البصرية التفاعلية (mindmaps)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `mindmaps`;
CREATE TABLE `mindmaps` (
  `id` VARCHAR(50) PRIMARY KEY,
  `module_id` VARCHAR(40) NOT NULL,
  `title_ar` VARCHAR(150) NOT NULL,
  `title_fr` VARCHAR(150) DEFAULT NULL,
  `badge_ar` VARCHAR(100) DEFAULT NULL,
  `concepts_data` LONGTEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `mindmaps` (`id`, `module_id`, `title_ar`, `title_fr`, `badge_ar`, `concepts_data`) VALUES
('map-human-condition', 'mod-human-condition', 'خريطة مجزوءة الوضع البشري', 'Carte : La Condition Humaine', 'الذاتية • التفاعلية • التاريخ', '[{"name":"مفهوم الشخص","axes":["هوية الشخص (ديكارت vs لوك vs شوبنهاور)","قيمة الشخص (كانط vs غوسدورف)","الشخص بين الضرورة والحرية (سبينوزا vs سارتر)"]},{"name":"مفهوم الغير","axes":["وجود الغير (سارتر vs ميرلوبونتي)","معرفة الغير (مالبرانش vs سارتر vs ميرلوبونتي)"]}]'),
('map-knowledge', 'mod-knowledge', 'خريطة مجزوءة المعرفة', 'Carte : La Connaissance', 'الإبستيمولوجيا • الحقيقة • المنهج', '[{"name":"النظرية والتجربة","axes":["التجربة والتجريب (كلود برنار vs رينيه طوم)","العقلانية العلمية (أينشتاين vs باشلار)","معايير العلمية (كارل بوبر vs دوهيم)"]},{"name":"مفهوم الحقيقة","axes":["معايير الحقيقة (ديكارت vs ويليام جيمس)","قيمة الحقيقة (كانط vs نيتشه)"]}]'),
('map-politics', 'mod-politics', 'خريطة مجزوءة السياسة', 'Carte : La Politique', 'السلطة • القانون • العدالة', '[{"name":"مفهوم الدولة","axes":["مشروعية الدولة وغاياتها (هوبز vs لوك vs سبينوزا)","طبيعة السلطة السياسية (ماكيافيلي vs مونتيسكيو)"]},{"name":"الحق والعدالة","axes":["الحق الطبيعي والوضعي (هوبز vs روسو)","العدالة بين المساواة والإنصاف (أرسطو vs جون رولز)"]}]'),
('map-ethics', 'mod-ethics', 'خريطة مجزوءة الأخلاق', 'Carte : La Morale', 'الواجب • الحرية • المسؤولية', '[{"name":"مفهوم الواجب","axes":["الواجب بين الإكراه والالتزام (كانط vs دوركهايم)"]},{"name":"مفهوم الحرية","axes":["الحرية والحتمية (سبينوزا vs سارتر)"]}]');

-- ----------------------------------------------------------------------------
-- 11. جدول المنهجيات المعتمدة وزارياً وسلم التنقيط (methodologies)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `methodologies`;
CREATE TABLE `methodologies` (
  `id` VARCHAR(50) PRIMARY KEY,
  `title_ar` VARCHAR(150) NOT NULL,
  `title_fr` VARCHAR(150) DEFAULT NULL,
  `type` VARCHAR(50) NOT NULL,
  `total_points` INT DEFAULT 20,
  `duration_read` VARCHAR(50) DEFAULT '10 دقائق',
  `rubrics_data` LONGTEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `methodologies` (`id`, `title_ar`, `title_fr`, `type`, `rubrics_data`) VALUES
('meth-question', 'منهجية معالجة السؤال الإشكالي المفتوح', 'Méthodologie de la Question Ouverte', 'question', '[{"step":"الفهم (4ن)","desc":"إدراك مجال السؤال وتحديد موضوعه وصياغة المفارقة والتساؤلات الإشكالية."},{"step":"التحليل (5ن)","desc":"تفكيك عناصر السؤال والمفاهيم وشرح الأطروحة المفترضة بحجج مدعمة."},{"step":"المناقشة (5ن)","desc":"إبراز حدود الأطروحة والانفتاح على مواقف وتصورات فلسفية مؤيدة ومعارضة."},{"step":"التركيب (3ن)","desc":"خلاصة استنتاجية تركيبية مع إبداء الرأي الشخصي المبني."},{"step":"الجوانب الشكلية (3ن)","desc":"سلامة اللغة والأسلوب والخط وتماسك الروابط."}]'),
('meth-quote', 'منهجية تحليل ومناقشة القولة الفلسفية المرفقة بسؤال', 'Méthodologie de la Citation Philosophique', 'quote', '[{"step":"الفهم (4ن)","desc":"تحديد موضوع القولة ومجالها وصياغة الإشكال وأسئلته الموجهة."},{"step":"التحليل (5ن)","desc":"تحديد أطروحة القولة وشرحها والتعريف بمفاهيمها ورصد بنيتها الحجاجية."},{"step":"المناقشة (5ن)","desc":"مساءلة منطلقات القولة ومقارنتها بأطروحات فلاسفة المنهاج."},{"step":"التركيب (3ن)","desc":"استخلاص تركيبي لأبعاد النقاش مع اتخاذ موقف مبرر."},{"step":"الجوانب الشكلية (3ن)","desc":"وضوح الخط وتنظيم فقرات العرض واللغة الفلسفية السليمة."}]'),
('meth-text', 'منهجية تحليل ومناقشة النص الفلسفي', 'Méthodologie du Texte Philosophique', 'text', '[{"step":"الفهم (4ن)","desc":"تأطير النص ضمن مجزوءته ومفهومه وصياغة إشكاله المحوري."},{"step":"التحليل (5ن)","desc":"استخراج أطروحة صاحب النص وشبكتها المفاهيمية وبنيتها الحجاجية النصية."},{"step":"المناقشة (5ن)","desc":"إبراز قيمة الأطروحة وحدودها ومقارنتها بمواقف مؤيدة ومعارضة."},{"step":"التركيب (3ن)","desc":"تركيب متوازن لنتائج التحليل والمناقشة مع رأي شخصي رصين."},{"step":"الجوانب الشكلية (3ن)","desc":"التناسق المنطقي والتماسك الإنشائي وسلامة التعبير."}]');

-- ----------------------------------------------------------------------------
-- 12. جدول أمهات الكتب والمؤلفات الفلسفية (books)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `id` VARCHAR(50) PRIMARY KEY,
  `title_ar` VARCHAR(150) NOT NULL,
  `title_fr` VARCHAR(150) DEFAULT NULL,
  `author_ar` VARCHAR(100) NOT NULL,
  `author_fr` VARCHAR(100) DEFAULT NULL,
  `year_published` VARCHAR(50) DEFAULT NULL,
  `summary_ar` TEXT NOT NULL,
  `summary_fr` TEXT DEFAULT NULL,
  `notion_ar` VARCHAR(100) DEFAULT NULL,
  `philosopher_id` VARCHAR(50) DEFAULT NULL,
  `pdf_url` VARCHAR(255) DEFAULT '#',
  `downloads` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `books` (`id`, `title_ar`, `title_fr`, `author_ar`, `author_fr`, `year_published`, `summary_ar`, `notion_ar`, `philosopher_id`, `downloads`) VALUES
('book-republic', 'الجمهورية', 'La République', 'أفلاطون', 'Platon', '375 ق.م', 'المدينة الفاضلة، نظرية المثل، وأسطورة الكهف والعدالة في النفس والمجتمع.', 'العدالة والدولة', 'plato', 2410),
('book-tahafut', 'تهافت التهافت', 'Tahafut al-Tahafut', 'ابن رشد (أبو الوليد)', 'Averroès', '1180 م', 'دفاع فلسفي برهاني رصين عن الفلسفة والسببية ضد نقد الإمام الغزالي.', 'العقلانية والبرهان', 'ibn-rushd', 1890),
('book-meditations', 'التأملات في الفلسفة الأولى', 'Méditations Métaphysiques', 'رينيه ديكارت', 'René Descartes', '1641 م', 'الشك المنهجي، إثبات وجود الذات المفكرة (الكوجيطو) ووجود الله والنفس.', 'الشخص والهوية', 'descartes', 3120),
('book-critique', 'نقد العقل الخالص', 'Critique de la Raison Pure', 'إيمانويل كانط', 'Immanuel Kant', '1781 م', 'ثورة كوبرنيكية في نظرية المعرفة تحدد شروط وحدود العقل البشري.', 'المعرفة والعلم', 'kant', 2780),
('book-contract', 'في العقد الاجتماعي', 'Du Contrat Social', 'جان جاك روسو', 'Jean-Jacques Rousseau', '1762 م', 'تأسيس مشروعية الحكم المدني على الإرادة العامة والسيادة الشعبية والحرية.', 'الدولة والحق', 'rousseau', 2340),
('book-being', 'الوجود والعدم', 'L''Être et le Néant', 'جان بول سارتر', 'Jean-Paul Sartre', '1943 م', 'بيان أن الوجود يسبق الماهية، وأن الإنسان مشروع حر يصنع ذاته باختياراته.', 'الوجود والحرية والغير', 'sartre', 1950);

-- ----------------------------------------------------------------------------
-- 13. جدول الحكم والأقوال الفلسفية الخالدة (quotes)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `quotes`;
CREATE TABLE `quotes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `quote_ar` TEXT NOT NULL,
  `quote_fr` TEXT DEFAULT NULL,
  `philosopher_id` VARCHAR(50) DEFAULT NULL,
  `author_name` VARCHAR(100) NOT NULL,
  `concept_ar` VARCHAR(100) DEFAULT NULL,
  `era` VARCHAR(80) DEFAULT NULL,
  `likes_count` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `quotes` (`quote_ar`, `author_name`, `concept_ar`, `era`, `likes_count`) VALUES
('الحياة غير المفحوصة لا تستحق العيش', 'سقراط', 'فحص الذات والحكمة', 'الفلسفة اليونانية', 342),
('الحق لا يضاد الحق، بل يوافقه ويشهد له', 'أبو الوليد ابن رشد', 'التوافق بين العقل والشرع', 'الفلسفة الإسلامية', 289),
('أنا أشك، إذن أنا أفكر، إذن أنا موجود', 'رينيه ديكارت', 'الكوجيطو والهوية', 'العصر الحديث', 512),
('تصرف بحيث تعامل الإنسانية في شخصك وفي غيرك كغاية لا كمجرد وسيلة', 'إيمانويل كانط', 'كرامة الشخص والأخلاق', 'عصر الأنوار', 420),
('إن الغاية الحقيقية من تأسيس الدولة هي في الواقع الحرية', 'باروخ سبينوزا', 'مشروعية الدولة', 'العصر الحديث', 395),
('الإنسان محكوم عليه بأن يكون حراً ومسؤولاً عن العالم', 'جان بول سارتر', 'الحرية والمسؤولية', 'الفلسفة المعاصرة', 460),
('العدالة هي الفضيلة الأولى للمؤسسات الاجتماعية كما هي الحقيقة للأنظمة الفكرية', 'جون رولز', 'العدالة كإنصاف', 'الفلسفة السياسية المعاصرة', 215);

-- ----------------------------------------------------------------------------
-- 14. جدول الأساتذة والمنخرطين بالمنصة (teachers)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(120) NOT NULL UNIQUE,
  `phone` VARCHAR(30) DEFAULT NULL,
  `city` VARCHAR(80) NOT NULL,
  `institution` VARCHAR(150) NOT NULL,
  `role` VARCHAR(50) DEFAULT 'أستاذ ممارس',
  `status` ENUM('active', 'pending', 'inactive') DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `teachers` (`full_name`, `email`, `city`, `institution`, `role`) VALUES
('ذ. عبد الرحيم الصديقي', 'seddiki@fadae.ma', 'الدار البيضاء', 'ثانوية شوقي التأهيلية', 'أستاذ باحث'),
('ذة. مريم العباسي', 'abbassi@fadae.ma', 'الرباط', 'المديرية الإقليمية بالرباط', 'مفتشة تربوية'),
('ذ. يوسف التلمساني', 'telmssani@fadae.ma', 'مراكش', 'ثانوية ابن عباد التأهيلية', 'أستاذ ممارس'),
('ذ. سفيان البوعناني', 'bouanani@fadae.ma', 'طنجة', 'المركز الجهوي لمهن التربية والتكوين', 'أستاذ متدرب');

-- ----------------------------------------------------------------------------
-- 15. جدول رسائل واستفسارات التواصل (contact_messages)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `contact_messages`;
CREATE TABLE `contact_messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `sender_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(120) NOT NULL,
  `subject` VARCHAR(150) NOT NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('unread', 'read', 'replied') DEFAULT 'unread',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `contact_messages` (`sender_name`, `email`, `subject`, `message`) VALUES
('أستاذ من فاس', 'prof.fes@gmail.com', 'طلب إضافة جذاذة', 'السلام عليكم، حبذا لو تمت إضافة جذاذات خاصة بمسألة العلمية في العلوم الإنسانية لشعبة الآداب.');

-- ----------------------------------------------------------------------------
-- 16. جدول سجل نشاط الإدارة والمشرفين (admin_logs)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `admin_logs`;
CREATE TABLE `admin_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `admin_username` VARCHAR(50) NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `resource_type` VARCHAR(50) NOT NULL,
  `resource_id` VARCHAR(50) DEFAULT NULL,
  `details` TEXT DEFAULT NULL,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `admin_logs` (`admin_username`, `action`, `resource_type`, `resource_id`, `details`) VALUES
('admin', 'INITIALIZE_DATABASE', 'SYSTEM', 'v3.0', 'تهيئة قاعدة البيانات الشاملة لجميع موارد المنصة.');

-- ----------------------------------------------------------------------------
-- 17. جدول إحصائيات ومقاييس المنصة الرسمية (site_stats)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `site_stats`;
CREATE TABLE `site_stats` (
  `stat_key` VARCHAR(50) PRIMARY KEY,
  `stat_value` INT NOT NULL DEFAULT 0,
  `label_ar` VARCHAR(100) NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `site_stats` (`stat_key`, `stat_value`, `label_ar`) VALUES
('total_teachers', 1845, 'الأساتذة المسجلون بالمغرب'),
('total_lessons', 128, 'الدروس والموارد المنشورة'),
('total_pedagogy', 64, 'الجذاذات البيداغوجية الرسمية'),
('total_exams', 36, 'الامتحانات الوطنية المحلولة'),
('total_quizzes', 12, 'أسئلة بنك QCM التفاعلي'),
('total_mindmaps', 4, 'الخرائط الذهنية للمجزوءات'),
('total_methodologies', 3, 'الصيغ الإنشائية المعتمدة'),
('total_books', 6, 'أمهات الكتب الفلسفية'),
('total_quotes', 7, 'الحكم والأقوال الموثقة'),
('total_downloads', 48920, 'إجمالي التحميلات'),
('total_views', 142300, 'إجمالي المشاهدات والزيارات');

SET FOREIGN_KEY_CHECKS = 1;

