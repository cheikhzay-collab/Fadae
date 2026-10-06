/**
 * فضاء الحكمة والمعرفة - ملف الترجمة والتعريب
 * Dictionnaire bilingue Arabe / Français
 */

const TRANSLATIONS = {
  ar: {
    // الهوية العامة
    top_bar_kingdom: "المملكة المغربية — وزارة التربية الوطنية والتعليم الأولي والرياضة",
    top_bar_announcement: "المنصة البيداغوجية الرسمية لمادة الفلسفة بالثانوي التأهيلي • الموسم 2025 - 2026",
    top_badge_official: "المقرر المحيّن",
    site_title: "فضاء الحكمة والمعرفة",
    site_subtitle: "المنصة الرقمية المتخصصة لأساتذة مادة الفلسفة بالثانوي التأهيلي بالمغرب",
    portal_tagline: "ملتقى البيداغوجيا الفلسفية، ديداكتيك المادة والتميز الإشهادي",
    hero_quote: "«الفلسفة ليست مجرد حقل معرفي مغلق، بل هي فن ممارسة التفكير النقدي وإيقاظ الوعي الإنساني»",
    hero_quote_author: "— ذ. أبو الوليد ابن رشد، فيلسوف قرطبة ومراكش",
    
    // شريط التنقل
    nav_home: "الرئيسية",
    nav_lessons: "الدروس والمجزوءات",
    nav_pedagogy: "الديداكتيك والجذاذات",
    nav_exams: "الامتحانات الوطنية",
    nav_methodology: "المنهجيات المعتمدة",
    nav_philosophers: "أعلام الفلسفة",
    nav_philosophers_short: "الأعلام",
    section_levels_short: "المستويات",
    nav_admin: "لوحة الإدارة",
    nav_switch_lang: "Français",
    nav_theme_dark: "الوضع الليلي",
    nav_theme_light: "الوضع النهاري",
    nav_login_teacher: "فضاء الأستاذ",
    
    // الصفحة الرئيسية - الإحصاءات السريعة
    stat_teachers: "أستاذ مسجل بالمغرب",
    stat_lessons: "درساً ومفخرة تربوية",
    stat_sheets: "جذاذة ديداكتيكية رسمية",
    stat_exams: "امتحاناً وطنياً مع عناصر الإجابة",
    
    // أقسام وفلاتر
    section_levels: "الأسلاك والمستويات الدراسية",
    section_levels_desc: "توزيع المنهاج الوزاري المغربي لمادة الفلسفة حسب المستويات والشعب",
    section_featured_lessons: "أحدث الدروس والموارد الديداكتيكية",
    section_featured_lessons_desc: "عروض تربوية ومضامين مفصلة من إعداد وتنسيق أساتذة ومفتشي المادة",
    section_pedagogy_title: "الوثائق التربوية والديداكتيك",
    section_pedagogy_desc: "الجذاذات النموذجية، الأطر المرجعية، والتوزيعات الدورية للدروس",
    section_exams_title: "بنك الامتحانات الوطنية الموحدة",
    section_exams_desc: "مواضيع البكالوريا الرسمية الموزعة حسب السنوات والشعب وعناصر الإجابة وشبكات التنقيط",
    section_methodology_title: "المنهجيات الفلسفية الإشهادية",
    section_philosophers_title: "رواق أعلام الفلسفة والمفاهيم",
    
    // أزرار وبطاقات
    btn_explore: "استكشف الدروس",
    btn_download_pdf: "تحميل PDF",
    btn_download_doc: "تحميل Word",
    btn_view_details: "عرض التفاصيل",
    btn_read_more: "قراءة الدرس كاملاً",
    btn_exam_sujets: "عرض المواضيع",
    btn_exam_answers: "عناصر الإجابة الرسمية",
    btn_admin_portal: "دخول لوحة التحكم",
    btn_add_resource: "إضافة مورد جديد",
    btn_save: "حفظ المورد",
    btn_cancel: "إلغاء",
    btn_edit: "تعديل",
    btn_delete: "حذف",
    btn_search: "بحث",
    btn_filter_all: "الكل",
    btn_switch_to_site: "العودة للواجهة الرئيسية",

    // نصوص البحث والتصفية
    search_placeholder: "ابحث عن درس، مفهوم، فيلسوف، أو موضوع امتحان...",
    filter_by_level: "تصفية حسب المستوى",
    filter_by_module: "تصفية حسب المجزوءة",
    no_results_found: "لم يتم العثور على أي نتائج تطابق بحثك.",
    all_levels: "جميع المستويات",
    all_modules: "جميع المجزوءات",
    
    // شارات وتسميات
    badge_national: "الامتحان الوطني",
    badge_continuous: "المراقبة المستمرة",
    badge_official: "معتمد وزارياً",
    badge_featured: "مورد متميز",
    label_author: "المؤطر / الأستاذ:",
    label_date: "تاريخ النشر:",
    label_duration: "المدة الزمنية:",
    label_level: "المستوى:",
    label_stream: "المسلك / الشعبة:",
    label_downloads: "تحميل:",
    label_views: "مشاهدة:",
    
    // لوحة الإدارة (Tableau de Bord)
    admin_title: "لوحة القيادة والإدارة التربوية",
    admin_subtitle: "إدارة الموارد، المنشورات الديداكتيكية، وإحصاءات منصة فضاء الحكمة",
    admin_tab_overview: "نظرة عامة وإحصائيات",
    admin_tab_content: "إدارة الدروس والموارد",
    admin_tab_pedagogy: "إدارة الجذاذات",
    admin_tab_exams: "إدارة الامتحانات",
    admin_tab_teachers: "الأساتذة والمنخرطون",
    admin_tab_settings: "إعدادات المنصة",
    
    admin_stat_downloads_total: "إجمالي التحميلات",
    admin_stat_monthly_visits: "الزيارات الشهرية",
    admin_stat_satisfaction: "نسبة رضا الأساتذة",
    admin_stat_active_teachers: "الأساتذة النشطون الآن",
    
    admin_table_title: "عنوان المورد",
    admin_table_category: "الصنف والمستوى",
    admin_table_author: "الأستاذ / المفتش",
    admin_table_status: "الحالة",
    admin_table_actions: "الإجراءات",
    admin_status_published: "منشور ومتاح",
    admin_status_draft: "مسودة قيد المراجعة",
    admin_btn_new_lesson: "إضافة درس جديد",
    admin_btn_new_sheet: "إضافة جذاذة بيداغوجية",
    admin_btn_new_exam: "إضافة موضوع امتحان",
    
    // نموذج الإضافة والتحرير
    modal_add_title: "إضافة مورد فلسفي جديد",
    form_label_title_ar: "العنوان بالعربية",
    form_label_title_fr: "العنوان بالفرنسية",
    form_label_level: "المستوى الدراسي",
    form_label_module: "المجزوءة الفلسفية",
    form_label_author: "اسم الأستاذ / صاحب العمل",
    form_label_summary_ar: "ملخص أو تقديم للمحتوى",
    form_label_content_ar: "المتن الفلسفي وتفاصيل الدرس",
    form_label_tags: "الكلمات المفتاحية (مفصولة بفاصلة)",
    form_save_success: "تم حفظ وتحديث المورد بنجاح في المنصة!",
    delete_confirm: "هل أنت متأكد من رغبتك في حذف هذا المورد؟ لا يمكن التراجع عن هذه العملية.",
    
    // الفوتر
    footer_desc: "منصة تعليمية وتربوية موجهة لهيئة تدريس مادة الفلسفة بالثانوي التأهيلي في المملكة المغربية، تهدف إلى تجويد الممارسة الديداكتيكية ونشر ثقافة التفلسف.",
    footer_quick_links: "روابط سريعة",
    footer_official_links: "روابط ومصادر رسمية",
    footer_link_men: "وزارة التربية الوطنية والتعليم الأولي والرياضة",
    footer_link_cne: "المركز الوطني للتقويم والامتحانات",
    footer_rights: "جميع الحقوق محفوظة لمنصة فضاء الحكمة والمعرفة © 2026",
    footer_dev_note: "تم التصميم والبرمجة وفق المعايير البيداغوجية المغربية الحديثة",
    footer_admin_login: "تسجيل الدخول كمدير",
    footer_admin_quick: "🔐 فضاء المدير التربوي",
    admin_login_title: "تسجيل الدخول كمدير",
    admin_username_label: "اسم المستخدم / المعرف",
    admin_password_label: "كلمة المرور",
    btn_login_submit: "تسجيل الدخول كمدير",
    btn_logout_admin: "تسجيل الخروج والعودة",
    admin_login_error: "اسم المستخدم أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.",
    admin_login_success: "مرحباً بك! تم تسجيل الدخول كمدير بنجاح.",
    admin_logout_success: "تم تسجيل الخروج من فضاء الإدارة بنجاح."
  },

  fr: {
    // Identité générale
    top_bar_kingdom: "Royaume du Maroc — Ministère de l'Éducation Nationale",
    top_bar_announcement: "Portail Officiel de Philosophie — Secondaire Qualifiant • 2025 - 2026",
    top_badge_official: "Programme Homologué",
    site_title: "Espace Sagesse & Savoir",
    site_subtitle: "Plateforme numérique dédiée aux professeurs de philosophie du secondaire qualifiant au Maroc",
    portal_tagline: "Carrefour de la pédagogie philosophique, de la didactique et de l'excellence aux examens",
    hero_quote: "« La philosophie n'est point un savoir clos, mais l'art suprême de l'esprit critique et de l'éveil humain »",
    hero_quote_author: "— Averroès (Ibn Rushd), Philosophe de Cordoue et de Marrakech",

    // Navigation
    nav_home: "Accueil",
    nav_lessons: "Leçons & Modules",
    nav_pedagogy: "Didactique & Fiches",
    nav_exams: "Examens Nationaux",
    nav_methodology: "Méthodologies",
    nav_philosophers: "Grands Penseurs",
    nav_philosophers_short: "Penseurs",
    section_levels_short: "Niveaux",
    nav_admin: "Tableau de Bord",
    nav_switch_lang: "العربية",
    nav_theme_dark: "Mode Sombre",
    nav_theme_light: "Mode Clair",
    nav_login_teacher: "Espace Enseignant",

    // Statistiques rapides
    stat_teachers: "Professeurs au Maroc",
    stat_lessons: "Ressources & Cours",
    stat_sheets: "Fiches Pédagogiques",
    stat_exams: "Sujets & Corrigés Types",

    // Sections & Filtres
    section_levels: "Cycles et Niveaux d'Enseignement",
    section_levels_desc: "Structuration du programme marocain officiel de philosophie par filière et niveau",
    section_featured_lessons: "Dernières Leçons & Ressources Didactiques",
    section_featured_lessons_desc: "Cours élaborés et validés par les enseignants et inspecteurs de la discipline",
    section_pedagogy_title: "Documents Pédagogiques & Didactique",
    section_pedagogy_desc: "Fiches didactiques types, cadres de référence et planifications annuelles",
    section_exams_title: "Banque des Épreuves du Baccalauréat",
    section_exams_desc: "Archives des examens nationaux marocains avec corrigés officiels et grilles d'évaluation",
    section_methodology_title: "Méthodologies Officielles d'Examen",
    section_philosophers_title: "Galerie des Philosophes et Notions Clés",

    // Boutons
    btn_explore: "Explorer les cours",
    btn_download_pdf: "Télécharger PDF",
    btn_download_doc: "Télécharger Word",
    btn_view_details: "Voir les détails",
    btn_read_more: "Lire le cours complet",
    btn_exam_sujets: "Consulter les sujets",
    btn_exam_answers: "Corrigés officiels",
    btn_admin_portal: "Accès Administration",
    btn_add_resource: "Nouvelle Ressource",
    btn_save: "Enregistrer",
    btn_cancel: "Annuler",
    btn_edit: "Modifier",
    btn_delete: "Supprimer",
    btn_search: "Rechercher",
    btn_filter_all: "Tous",
    btn_switch_to_site: "Retour au site public",

    // Recherche
    search_placeholder: "Rechercher une notion, un cours, un philosophe, un examen...",
    filter_by_level: "Filtrer par niveau",
    filter_by_module: "Filtrer par module",
    no_results_found: "Aucun résultat ne correspond à votre recherche.",
    all_levels: "Tous les niveaux",
    all_modules: "Tous les modules",

    // Badges & Labels
    badge_national: "Examen National",
    badge_continuous: "Contrôle Continu",
    badge_official: "Homologué MEN",
    badge_featured: "Sélection d'excellence",
    label_author: "Auteur / Inspecteur :",
    label_date: "Date de publication :",
    label_duration: "Durée pédagogique :",
    label_level: "Niveau :",
    label_stream: "Filière / Série :",
    label_downloads: "Téléchargements :",
    label_views: "Vues :",

    // Tableau de Bord Admin
    admin_title: "Tableau de Bord & Pilotage Pédagogique",
    admin_subtitle: "Gestion des contenus didactiques, ressources officielles et statistiques d'accès",
    admin_tab_overview: "Vue d'ensemble & Stats",
    admin_tab_content: "Gestion des Cours",
    admin_tab_pedagogy: "Gestion des Fiches",
    admin_tab_exams: "Gestion des Examens",
    admin_tab_teachers: "Professeurs & Membres",
    admin_tab_settings: "Configuration",

    admin_stat_downloads_total: "Téléchargements totaux",
    admin_stat_monthly_visits: "Visites mensuelles",
    admin_stat_satisfaction: "Satisfaction enseignants",
    admin_stat_active_teachers: "Professeurs en ligne",

    admin_table_title: "Titre du document",
    admin_table_category: "Module & Niveau",
    admin_table_author: "Auteur / Encadrant",
    admin_table_status: "Statut",
    admin_table_actions: "Actions",
    admin_status_published: "Publié & Accessible",
    admin_status_draft: "Brouillon en révision",
    admin_btn_new_lesson: "Ajouter une leçon",
    admin_btn_new_sheet: "Ajouter une fiche didactique",
    admin_btn_new_exam: "Ajouter une épreuve",

    // Formulaire
    modal_add_title: "Ajouter une nouvelle ressource philosophique",
    form_label_title_ar: "Titre en arabe",
    form_label_title_fr: "Titre en français",
    form_label_level: "Niveau scolaire",
    form_label_module: "Module philosophique",
    form_label_author: "Nom de l'auteur / enseignant",
    form_label_summary_ar: "Résumé introductif (Arabe/Fr)",
    form_label_content_ar: "Contenu philosophique détaillé",
    form_label_tags: "Mots-clés (séparés par virgules)",
    form_save_success: "Ressource enregistrée et actualisée avec succès !",
    delete_confirm: "Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.",

    // Footer
    footer_desc: "Portail éducatif marocain dédié au corps enseignant de philosophie au cycle secondaire qualifiant. Conçu pour valoriser la didactique et promouvoir la pensée critique.",
    footer_quick_links: "Accès Rapide",
    footer_official_links: "Sources Officielles",
    footer_link_men: "Ministère de l'Éducation Nationale (Maroc)",
    footer_link_cne: "Centre National des Examens et de l'Évaluation",
    footer_link_orientation: "Portail des Curricula et Programmes",
    footer_rights: "Tous droits réservés — Espace Sagesse & Savoir © 2026",
    footer_dev_note: "Développé selon les orientations pédagogiques officielles marocaines",
    footer_admin_login: "Connexion Espace Directeur",
    footer_admin_quick: "🔐 Espace Directeur / Admin",
    admin_login_title: "Connexion Espace Direction",
    admin_username_label: "Identifiant / Utilisateur",
    admin_password_label: "Mot de passe",
    btn_login_submit: "Se connecter comme directeur",
    btn_logout_admin: "Déconnexion et retour",
    admin_login_error: "Identifiant ou mot de passe incorrect. Veuillez réessayer.",
    admin_login_success: "Bienvenue ! Connexion réussie à l'espace administration.",
    admin_logout_success: "Déconnexion réussie de l'espace administration."
  }
};

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem("philo_lang") || "ar";
    document.documentElement.lang = this.currentLang;
    document.documentElement.dir = this.currentLang === "ar" ? "rtl" : "ltr";
  }

  getLang() {
    return this.currentLang;
  }

  setLang(lang) {
    if (lang !== "ar" && lang !== "fr") return;
    this.currentLang = lang;
    localStorage.setItem("philo_lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    
    // Toggle class for RTL/LTR body
    if (lang === "ar") {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }

    this.updateDom();
    // Dispatch custom event so modules can re-render if needed
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang } }));
  }

  toggleLang() {
    const nextLang = this.currentLang === "ar" ? "fr" : "ar";
    this.setLang(nextLang);
  }

  t(key) {
    const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ar;
    return dict[key] || TRANSLATIONS.ar[key] || key;
  }

  updateDom() {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
      const key = el.getAttribute("data-i18n");
      const translation = this.t(key);
      if (translation) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = translation;
        } else {
          el.innerHTML = translation;
        }
      }
    });

    // Also update any attributes with data-i18n-attr
    const attrElements = document.querySelectorAll("[data-i18n-placeholder]");
    attrElements.forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      el.placeholder = this.t(key);
    });

    const titleElements = document.querySelectorAll("[data-i18n-title]");
    titleElements.forEach(el => {
      const key = el.getAttribute("data-i18n-title");
      el.title = this.t(key);
    });
  }
}

window.i18n = new I18nManager();
