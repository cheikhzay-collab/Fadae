/**
 * فضاء الحكمة والمعرفة - قاعدة البيانات الأولية
 * Base de données initiale - Espace Sagesse et Savoir
 * مخصصة لمقرر الفلسفة بالثانوي التأهيلي المغربي
 */

const PHILO_DATA = {
  // المستويات الدراسية والشعب
  levels: [
    {
      id: "2bac",
      title_ar: "الثانية باكالوريا",
      title_fr: "2ème Année du Baccalauréat",
      badge_ar: "إشهادي وطني",
      badge_fr: "Examen National",
      icon: "graduation-cap",
      modulesCount: 4,
      desc_ar: "جميع الشعب والمسالك (آداب وعلوم إنسانية، علوم تجريبية، علوم رياضية، اقتصاد)",
      desc_fr: "Toutes les filières (Lettres & Sciences Humaines, Sciences Expérimentales, Mathématiques, Économie)"
    },
    {
      id: "1bac",
      title_ar: "الأولى باكالوريا",
      title_fr: "1ère Année du Baccalauréat",
      badge_ar: "مراقبة مستمرة",
      badge_fr: "Contrôle Continu",
      icon: "book-open",
      modulesCount: 2,
      desc_ar: "الإنسان والفاعلية والإبداع (جميع الشعب العلمية والأدبية)",
      desc_fr: "L'Homme, l'action et la création (Toutes les branches)"
    },
    {
      id: "tc",
      title_ar: "الجذع المشترك",
      title_fr: "Tronc Commun",
      badge_ar: "مدخل تأسيسي",
      badge_fr: "Initiation",
      icon: "compass",
      modulesCount: 2,
      desc_ar: "مدخل إلى الفلسفة ومنطق التفكير الفلسفي (نشأة الفلسفة، الطبيعة والثقافة)",
      desc_fr: "Initiation à la philosophie et logique réflexive"
    }
  ],

  // المجزوءات الفلسفية
  modules: [
    {
      id: "mod-human-condition",
      levelId: "2bac",
      title_ar: "مجزوءة الوضع البشري",
      title_fr: "La Condition Humaine",
      concepts_ar: ["الشخص", "الغير", "التاريخ (خاص بالآداب)"],
      concepts_fr: ["La Personne", "Autrui", "L'Histoire (Lettres)"],
      color: "#6366f1",
      icon: "user-check",
      description_ar: "دراسة محددات الوجود الإنساني في أبعاده الذاتية، التفاعلية والتاريخية.",
      description_fr: "Étude des dimensions subjectives, intersubjectives et historiques de l'existence humaine."
    },
    {
      id: "mod-knowledge",
      levelId: "2bac",
      title_ar: "مجزوءة المعرفة",
      title_fr: "La Connaissance",
      concepts_ar: ["النظرية والتجربة", "الحقيقة", "مسألة العلمية في العلوم الإنسانية (خاص بالآداب)"],
      concepts_fr: ["La Théorie et l'Expérience", "La Vérité", "La scientificité des sc. humaines"],
      color: "#0ea5e9",
      icon: "brain",
      description_ar: "مساءلة أسس المعرفة العلمية وإشكالية الحقيقة والمناهج الإبستيمولوجية.",
      description_fr: "Questionnement épistémologique sur la science, la méthode expérimentale et la vérité."
    },
    {
      id: "mod-politics",
      levelId: "2bac",
      title_ar: "مجزوءة السياسة",
      title_fr: "La Politique",
      concepts_ar: ["الدولة", "الحق والعدالة", "العنف (خاص بالآداب)"],
      concepts_fr: ["L'État", "Le Droit et la Justice", "La Violence (Lettres)"],
      color: "#f59e0b",
      icon: "shield",
      description_ar: "تحليل تنظيم العيش المشترك، السلطة، المشروعية وعلاقة الحق بالقوة والعدالة.",
      description_fr: "Analyse du vivre-ensemble, de la légitimité du pouvoir et de la dialectique droit/justice."
    },
    {
      id: "mod-ethics",
      levelId: "2bac",
      title_ar: "مجزوءة الأخلاق",
      title_fr: "La Morale",
      concepts_ar: ["الواجب", "السعادة", "الحرية (خاص بالآداب)"],
      concepts_fr: ["Le Devoir", "Le Bonheur", "La Liberté (Lettres)"],
      color: "#10b981",
      icon: "heart-handshake",
      description_ar: "استكشاف القيم والغايات الأخلاقية المنظمة للسلوك الإنساني والمسؤولية الأخلاقية.",
      description_fr: "Exploration des valeurs déontologiques, du souverain bien et de la liberté responsable."
    },
    {
      id: "mod-1bac-man",
      levelId: "1bac",
      title_ar: "مجزوءة الإنسان",
      title_fr: "L'Homme",
      concepts_ar: ["الطبيعة والثقافة", "الوعي واللاوعي", "الرغبة", "اللغة"],
      concepts_fr: ["Nature et Culture", "Conscience et Inconscient", "Le Désir", "Le Langage"],
      color: "#ec4899",
      icon: "smile",
      description_ar: "الخصائص المميزة للإنسان بوصفه كائنا ثقافيا واعيا ولغويا.",
      description_fr: "Spécificités ontologiques de l'homme comme être de culture et de conscience."
    },
    {
      id: "mod-tc-philosophy",
      levelId: "tc",
      title_ar: "مدخل إلى الفلسفة",
      title_fr: "Introduction à la Philosophie",
      concepts_ar: ["نشأة الفلسفة في اليونان", "المعجزة اليونانية والأسطورة", "منطق الفلسفة وأدوات التفلسف"],
      concepts_fr: ["Genèse grecque du philosopher", "Du Mythe au Logos", "Outils de la pensée critique"],
      color: "#8b5cf6",
      icon: "sparkles",
      description_ar: "بناء التعاقد الديداكتيكي وتدريب المتعلم على النقد وطرح الإشكال والتفلسف.",
      description_fr: "Fondations de la pensée critique et apprentissage du questionnement philosophique."
    }
  ],

  // الدروس والمضامين التعليمية
  lessons: [
    {
      id: "les-01",
      moduleId: "mod-human-condition",
      levelId: "2bac",
      title_ar: "مفهوم الشخص: الشخص والهوية",
      title_fr: "La Personne : Identité et Conscience",
      author: "ذ. محمد الإدريسي (مفتش تربوي مميز)",
      date: "2025-10-12",
      downloads: 1420,
      views: 3840,
      tags_ar: ["الوضع البشري", "الشخص", "ديكارت", "لوك", "شوبنهاور"],
      tags_fr: ["Condition Humaine", "Personne", "Descartes", "Locke", "Schopenhauer"],
      summary_ar: "معالجة المفارقة الفلسفية: ما الذي يحدد هوية الشخص وثباتها عبر الزمان؟ الفكر المجرد (ديكارت)، الذاكرة والوعي الحسي (لوك)، أم إرادة الحياة (شوبنهاور).",
      summary_fr: "Problématique de la permanence du moi à travers le temps : Cogito cartésien, conscience empirique chez Locke, ou volonté de vivre chez Schopenhauer.",
      content_ar: `### الإشكال الفلسفي:
إذا كان الشخص يتغير جسمياً ونفسياً عبر مراحل حياته المختلفة، فما الذي يجعله هو هو مطابقاً لذاته ومتميزاً عن غيره؟ هل تتأسس هوية الشخص على جوهر ثابت كالفكر والوعي، أم أنها محصلة شروط متغيرة؟

#### المحاور التفاعلية:
1. **أطروحة رينيه ديكارت:** الأنا المفكر والجوهر العاقل كأساس للهوية.
2. **أطروحة جون لوك:** الوعي والذاكرة الحسية المقترنة بالإدراك.
3. **أطروحة آرثر شوبنهاور:** نقد الذاكرة وتأسيس الهوية على "إرادة الحياة والخلود الروحي".`,
      pdfUrl: "#",
      docUrl: "#",
      isFeatured: true,
      status: "published"
    },
    {
      id: "les-02",
      moduleId: "mod-human-condition",
      levelId: "2bac",
      title_ar: "مفهوم الغير: وجود الغير ومعرفته",
      title_fr: "Autrui : Existence et Connaissance",
      author: "ذة. خديجة التازي (أستاذة مبرزة)",
      date: "2025-11-05",
      downloads: 1180,
      views: 2950,
      tags_ar: ["الغير", "سارتر", "هيغل", "ميرلوبونتي"],
      tags_fr: ["Autrui", "Sartre", "Hegel", "Merleau-Ponty"],
      summary_ar: "إشكال الغير بين كونه وسيطا ضروريا لتحقيق الوعي بالذات وبين كونه مهددا لحرية الأنا وتشييئها.",
      summary_fr: "Dialectique d'autrui : Médiateur indispensable de la conscience de soi ou menace aliénante.",
      content_ar: `### الإشكال الفلسفي:
هل وجود الغير شرط ضروري لوعي الأنا بذاتها أم أنه عائق يشكل تهديدا لاستقلاليتها؟ وهل معرفة الغير ممكنة بوصفه ذاتا واعية أم أنه يستعصي على الإدراك؟`,
      pdfUrl: "#",
      docUrl: "#",
      isFeatured: true,
      status: "published"
    },
    {
      id: "les-03",
      moduleId: "mod-knowledge",
      levelId: "2bac",
      title_ar: "النظرية والتجربة: التجربة والتجريب",
      title_fr: "Théorie et Expérience : L'Expérimentation Scientifique",
      author: "ذ. عبد السلام بنعلي",
      date: "2025-12-18",
      downloads: 950,
      views: 2310,
      tags_ar: ["المعرفة", "كلود برنار", "رينيه طوم", "باشلار"],
      tags_fr: ["Épistémologie", "Claude Bernard", "René Thom", "Bachelard"],
      summary_ar: "الانتقال الإبستيمولوجي من التجربة الخام الساذجة إلى التجريب المنهجي المنظم الموجه بالفرضية العلمية.",
      summary_fr: "De l'expérience première sensible à l'expérimentation rationnelle guidée par l'hypothèse théorique.",
      content_ar: `### الطرح الإشكالي:
ما دور التجريب في بناء المعرفة العلمية؟ هل التجربة هي منبع النظرية ومعيار صدقها الوحيد، أم أن النظرية بناء عقلي يوجه التجريب ويتجاوزه؟`,
      pdfUrl: "#",
      docUrl: "#",
      isFeatured: false,
      status: "published"
    },
    {
      id: "les-04",
      moduleId: "mod-politics",
      levelId: "2bac",
      title_ar: "مفهوم الدولة: مشروعية الدولة وغاياتها",
      title_fr: "L'État : Légitimité et Finalités",
      author: "ذ. رشيد أيت حميد",
      date: "2026-01-20",
      downloads: 1320,
      views: 3100,
      tags_ar: ["السياسة", "هوبز", "سبينوزا", "لوك", "فيبر"],
      tags_fr: ["Politique", "Hobbes", "Spinoza", "Locke", "Max Weber"],
      summary_ar: "المفارقة التأسيسية للسلطة السياسية بين نظرية الحق الإلهي ونظريات العقد الاجتماعي وغايات الحرية والأمن.",
      summary_fr: "Fondements du pacte social et légitimité rationnelle-légale du pouvoir étatique.",
      content_ar: `### إشكالية الدولة:
من أين تستمد الدولة مشروعيتها؟ هل غايتها إخضاع الأفراد وفرض الأمن بالقوة (هوبز)، أم ضمان الحرية وتنمية كرامة العقل البشري (سبينوزا)؟`,
      pdfUrl: "#",
      docUrl: "#",
      isFeatured: true,
      status: "published"
    },
    {
      id: "les-05",
      moduleId: "mod-ethics",
      levelId: "2bac",
      title_ar: "مفهوم الواجب: الواجب والإكراه",
      title_fr: "Le Devoir : Obligation et Contrainte",
      author: "ذة. فاطمة الزهراء المنصوري",
      date: "2026-02-14",
      downloads: 870,
      views: 1980,
      tags_ar: ["الأخلاق", "كانط", "دوركايم", "برغسون"],
      tags_fr: ["Morale", "Kant", "Durkheim", "Bergson"],
      summary_ar: "التوتر بين الواجب كأمر أخلاقي قطعي يصدر عن الإرادة الخالصة (كانط) وبين الواجب كإلزام اجتماعي خارجي (دوركايم).",
      summary_fr: "L'impératif catégorique autonome kantien face au conditionnement social hétéronome durkheimien.",
      content_ar: `### إشكالية الواجب:
هل نقوم بالواجب الأخلاقي تحت ضغط الإكراه والإلزام الاجتماعي الخارجي، أم أنه التزام حر نابع من إرادتنا وعقلنا الأخلاقي الخالص؟`,
      pdfUrl: "#",
      docUrl: "#",
      isFeatured: false,
      status: "published"
    },
    {
      id: "les-06",
      moduleId: "mod-1bac-man",
      levelId: "1bac",
      title_ar: "الطبيعة والثقافة: معيار التمييز بينهما",
      title_fr: "Nature et Culture : Critères de distinction",
      author: "ذ. عثمان المرابط",
      date: "2026-02-28",
      downloads: 640,
      views: 1650,
      tags_ar: ["الأولى باك", "كلود ليفي ستراوس", "إدغار موران"],
      tags_fr: ["1ère Bac", "Lévi-Strauss", "Edgar Morin"],
      summary_ar: "أطروحة ليفي ستراوس في التمييز بين ما هو كوني وثابت (الطبيعة) وما يخضع للمعيار والقاعدة النسبية (الثقافة).",
      summary_fr: "La distinction de Claude Lévi-Strauss : L'universel instinctif opposé à la norme conventionnelle.",
      content_ar: `### مدار الدرس:
ما هو الحد الفاصل بين ما هو طبيعي فطري في الإنسان وبين ما هو مكتسب وثقافي؟ كيف تشكل قاعدة منع زنا المحارم نقطة التحول التاريخية؟`,
      pdfUrl: "#",
      docUrl: "#",
      isFeatured: false,
      status: "published"
    }
  ],

  // الجذاذات البيداغوجية والديداكتيك (ديداكتيك الفلسفة بالمغرب)
  pedagogy: [
    {
      id: "ped-01",
      title_ar: "جذاذة ديداكتيكية نموذجية: مفهوم الشخص والهوية",
      title_fr: "Fiche pédagogique type : La Personne et l'Identité",
      level: "2bac",
      stream_ar: "جميع المسالك والشعب",
      stream_fr: "Toutes les séries",
      duration: "4 ساعات تعليمية",
      author: "فريق التفتيش التربوي المركزي",
      competencies_ar: [
        "القدرة على أشكلة المفهوم وبناء المفارقة",
        "القدرة على المفهمة والمقارنة بين أطروحة ديكارت ولوك",
        "القدرة على المحاجة والمناقشة الفلسفية المستقلة"
      ],
      competencies_fr: [
        "Problématisation et construction du paradoxe",
        "Conceptualisation dialectique Descartes/Locke",
        "Argumentation et réflexion critique autonome"
      ],
      steps_ar: [
        "وضعية الانطلاق: مشهد فقدان الذاكرة أو تطور ملامح الشخص عبر الصور",
        "استخراج المفارقة وطرح التساؤلات الإشكالية الموجهة للدرس",
        "لحظة التحليل: الاشتغال على نص جون لوك 'الهوية والوعي'",
        "لحظة المناقشة: مساءلة حدود الأطروحة بموقف شوبنهاور",
        "التركيب والتقويم التكويني: صياغة خلاصة تركيبية متماسكة"
      ],
      steps_fr: [
        "Situation déclenchante : Amnésie ou évolution temporelle du visage",
        "Extraction du paradoxe et formulation des questions directrices",
        "Moment d'analyse : Étude guidée du texte de John Locke",
        "Moment de confrontation critique : Thèse de Schopenhauer",
        "Synthèse réflexive et évaluation formative continue"
      ],
      pdfUrl: "#",
      wordUrl: "#"
    },
    {
      id: "ped-02",
      title_ar: "الإطار المرجعي للامتحان الوطني الموحد للبكالوريا - مادة الفلسفة",
      title_fr: "Cadre de Référence de l'Examen National - Philosophie",
      level: "2bac",
      stream_ar: "شعبة الآداب والعلوم الإنسانية والمسالك العلمية",
      stream_fr: "Filières littéraires et scientifiques",
      duration: "المرجع الرسمي المحين",
      author: "المركز الوطني للتقويم والامتحانات - وزارة التربية الوطنية",
      competencies_ar: [
        "تحديد مواصفات مواضيع الامتحان الوطني الثلاثة (السؤال، القولة، النص)",
        "معايير التنقيط الموحدة: الفهم (4ن)، التحليل (5ن)، المناقشة (5ن)، التركيب (3ن)، الجوانب الشكلية (3ن)",
        "لائحة المجزوءات والمفاهيم الإلزامية في الاختبار"
      ],
      competencies_fr: [
        "Spécifications des 3 sujets d'examen (Question, Citation, Texte)",
        "Grille officielle de notation (Compréhension 4, Analyse 5, Discussion 5, Synthèse 3, Forme 3)",
        "Délimitation des notions obligatoires au programme"
      ],
      steps_ar: [
        "مطلب الفهم: تحديد موضوع المطلب، صياغة الإشكال وأسئلته الموجهة",
        "مطلب التحليل: تحديد الأطروحة، المفاهيم والحجاج المعتمد",
        "مطلب المناقشة: إبراز قيمة الأطروحة وحدودها واستحضار مواقف مقابلة",
        "مطلب التركيب: خلاصة التحليل والمناقشة وتقديم رأي شخصي معلل",
        "الجوانب الشكلية: سلامة اللغة، الخط، والتماسك المنطقي للإنشاء"
      ],
      steps_fr: [
        "Compréhension : Cadrage thématique et problématique",
        "Analyse : Thèse, réseaux conceptuels et argumentation",
        "Discussion : Valeur et limites de la position, confrontations",
        "Synthèse : Bilan nuancé et prise de position argumentée",
        "Aspects formels : Clarté rédactionnelle, orthographe et logique"
      ],
      pdfUrl: "#",
      wordUrl: "#"
    },
    {
      id: "ped-03",
      title_ar: "جذاذة ديداكتيكية: منهجية تحليل ومناقشة السؤال الإشكالي المفتوح",
      title_fr: "Fiche didactique : Méthodologie de la Question Ouverte",
      level: "2bac",
      stream_ar: "السنة الختامية من سلك البكالوريا",
      stream_fr: "Année terminale",
      duration: "ساعتان",
      author: "التنسيق التفتيشي الجهوي - فاس مكناس",
      competencies_ar: [
        "تفكيك البنية الاستفهامية لأدوات السؤال (هل، إلى أي حد، كيف...)",
        "إبراز المفارقة الكامنة والمفاهيم الفلسفية المركزية",
        "بناء أطروحة مفترضة للإجابة ودعمها بحجج واستشهادات فلسفية"
      ],
      competencies_fr: [
        "Déconstruction des opérateurs interrogatifs",
        "Mise au jour des paradoxes sous-jacents",
        "Construction d'une réponse argumentée structurée"
      ],
      steps_ar: [
        "الوقوف عند حرف الاستفهام وما يفترضه من إمكانات",
        "تحديد مجال السؤال ومفهومه المحوري",
        "إبراز التقابل أو الإحراج الفلسفي الكامن وراء السؤال",
        "تدريب التلاميذ على ورشة كتابة نموذجية وفق السلم التنقيطي"
      ],
      steps_fr: [
        "Analyse linguistique et conceptuelle de la formule interrogative",
        "Mise en évidence de la tension ou de l'aporie",
        "Atelier d'écriture collective et auto-évaluation"
      ],
      pdfUrl: "#",
      wordUrl: "#"
    },
    {
      id: "ped-04",
      title_ar: "التوزيع السنوي لدروس مادة الفلسفة (الجذاذة التوجيهية)",
      title_fr: "Planification Annuelle des Apprentissages",
      level: "2bac",
      stream_ar: "المسالك العلمية والتقنية والاقتصادية (ساعتان أسبوعياً)",
      stream_fr: "Séries scientifiques (2h / semaine)",
      duration: "الموسم الدراسي الكامل",
      author: "الأستاذ حسن العروي",
      competencies_ar: [
        "توزيع حصص المجزوءات الأربعة على مدار الأسدسين الأول والثاني",
        "برمجة فروض المراقبة المستمرة وأنشطة الدعم والاستدراك",
        "تخصيص حصص للمنهجية والتدريب على الامتحانات الوطنية"
      ],
      competencies_fr: [
        "Répartition des 4 modules sur les semestres 1 et 2",
        "Planification des contrôles continus et remédiation",
        "Sessions d'entraînement aux épreuves du Baccalauréat"
      ],
      steps_ar: [
        "الأسدوس الأول: مجزوءة الوضع البشري (24 س) + مجزوءة المعرفة (20 س)",
        "الأسدوس الثاني: مجزوءة السياسة (20 س) + مجزوءة الأخلاق (18 س)",
        "حصص التقويم التوليفي والمحاكاة الإشهادية قبل الامتحان الوطني"
      ],
      steps_fr: [
        "Semestre 1 : Condition humaine & Connaissance",
        "Semestre 2 : Politique & Morale",
        "Examens blancs et révisions méthodologiques ciblées"
      ],
      pdfUrl: "#",
      wordUrl: "#"
    }
  ],

  // الامتحانات الوطنية الموحدة وعناصر الإجابة الرسمية
  exams: [
    {
      id: "ex-2024-reg",
      year: 2024,
      session_ar: "الدورة العادية",
      session_fr: "Session Normale",
      stream_ar: "مسلك الآداب والعلوم الإنسانية",
      stream_fr: "Série Lettres & Sciences Humaines",
      sujets: [
        {
          type_ar: "الموضوع الأول (سؤال إشكالي مفتوح)",
          type_fr: "Sujet 1 (Question ouverte)",
          text_ar: "هل يمكن اعتبار التجربة العلمية معياراً وحيداً لبلوغ الحقيقة؟",
          text_fr: "L'expérimentation scientifique peut-elle être considérée comme le seul critère de la vérité ?",
          notion_ar: "مجزوءة المعرفة (النظرية والتجربة / الحقيقة)",
          notion_fr: "La Connaissance (Théorie, Expérience, Vérité)"
        },
        {
          type_ar: "الموضوع الثاني (قولة مرفقة بسؤال)",
          type_fr: "Sujet 2 (Citation avec consigne)",
          text_ar: "«لا توجد دولة عادلة بدون سيادة كاملة للقانون يرتضيها المواطنون بحرية». انطلاقاً من القولة، بيّن طبيعة العلاقة بين الحق والدولة.",
          text_fr: "« Il n'y a pas d'État juste sans primauté absolue de la loi consentie librement par les citoyens ». Montrez la relation entre Droit et État.",
          notion_ar: "مجزوءة السياسة (الدولة / الحق والعدالة)",
          notion_fr: "La Politique (État / Droit et Justice)"
        },
        {
          type_ar: "الموضوع الثالث (نص للتحليل والمناقشة)",
          type_fr: "Sujet 3 (Texte à analyser et discuter)",
          text_ar: "نص فلسفي للمفكر الفرنسي بول ريكور حول 'الشخص والهوية السردية والغير'.",
          text_fr: "Texte de Paul Ricœur sur l'identité narrative et l'altérité.",
          notion_ar: "مجزوءة الوضع البشري (الشخص والغير)",
          notion_fr: "Condition Humaine (Personne et Autrui)"
        }
      ],
      hasCorriges: true,
      downloads: 4120
    },
    {
      id: "ex-2024-sci",
      year: 2024,
      session_ar: "الدورة العادية",
      session_fr: "Session Normale",
      stream_ar: "شعبة العلوم التجريبية والرياضية والتقنية",
      stream_fr: "Sciences Expérimentales, Mathématiques & Techniques",
      sujets: [
        {
          type_ar: "الموضوع الأول (سؤال)",
          type_fr: "Sujet 1 (Question)",
          text_ar: "هل تنحصر قيمة الشخص في مكانته الاجتماعية؟",
          text_fr: "La valeur de la personne se réduit-elle à son statut social ?",
          notion_ar: "مجزوءة الوضع البشري (قيمة الشخص)",
          notion_fr: "La Condition Humaine (Valeur de la personne)"
        },
        {
          type_ar: "الموضوع الثاني (قولة)",
          type_fr: "Sujet 2 (Citation)",
          text_ar: "«إن التجريب بدون نظرية عقلية توجهه يظل عملاً عشوائياً ضريراً». حلل القولة وناقشها.",
          text_fr: "« L'expérimentation sans théorie rationnelle directrice demeure un tâtonnement aveugle ». Analysez et discutez.",
          notion_ar: "مجزوءة المعرفة (العقلانية العلمية)",
          notion_fr: "La Connaissance (Rationalisme scientifique)"
        },
        {
          type_ar: "الموضوع الثالث (نص)",
          type_fr: "Sujet 3 (Texte)",
          text_ar: "نص لباروخ سبينوزا يعالج الغاية الحقيقية من تأسيس الدولة بوصفها الحرية ونفي الخوف.",
          text_fr: "Texte de Spinoza sur la liberté comme finalité suprême de l'État.",
          notion_ar: "مجزوءة السياسة (مشروعية الدولة وغاياتها)",
          notion_fr: "La Politique (Légitimité de l'État)"
        }
      ],
      hasCorriges: true,
      downloads: 5690
    },
    {
      id: "ex-2023-ratt",
      year: 2023,
      session_ar: "الدورة الاستدراكية",
      session_fr: "Session de Rattrapage",
      stream_ar: "جميع المسالك",
      stream_fr: "Toutes séries",
      sujets: [
        {
          type_ar: "الموضوع الأول (سؤال)",
          type_fr: "Sujet 1 (Question)",
          text_ar: "هل يمكن تأسيس العدالة على قاعدة الإنصاف وحدها؟",
          text_fr: "Peut-on fonder la justice sur le seul principe d'équité ?",
          notion_ar: "مجزوءة السياسة (الحق والعدالة / جون رولز وأرسطو)",
          notion_fr: "La Politique (Justice et Équité / Rawls et Aristote)"
        }
      ],
      hasCorriges: true,
      downloads: 2840
    }
  ],

  // أعلام الفلسفة والمفاهيم المقررة
  philosophers: [
    {
      id: "phil-averroes",
      name_ar: "ابن رشد (أبو الوليد)",
      name_fr: "Averroès (Ibn Rushd)",
      era_ar: "الفلسفة الإسلامية والأندلسية (القرن 12م)",
      era_fr: "Philosophie islamique andalouse (XIIe s.)",
      keyConcept_ar: "التوفيق بين الحكمة والشريعة (فصل المقال)",
      keyConcept_fr: "Harmonie entre foi et raison philosophique",
      quote_ar: "«الحق لا يضاد الحق، بل يوافقه ويشهد له»",
      quote_fr: "« La vérité ne saurait contredire la vérité ; au contraire, elle s'accorde avec elle et témoigne pour elle. »",
      modules_ar: ["مدخل الفلسفة", "المعرفة والبرهان"],
      modules_fr: ["Introduction", "Démonstration rationnelle"]
    },
    {
      id: "phil-descartes",
      name_ar: "رينيه ديكارت",
      name_fr: "René Descartes",
      era_ar: "العصر الحديث - العقلانية (1596 - 1650)",
      era_fr: "Modernité - Rationalisme classique",
      keyConcept_ar: "الكوجيطو: أنا أفكر إذن أنا موجود، الجوهر المفكر",
      keyConcept_fr: "Le Cogito cartésien et la substance pensante",
      quote_ar: "«أنا أشك، إذن أنا أفكر، إذن أنا موجود»",
      quote_fr: "« Je pense, donc je suis (Cogito, ergo sum) »",
      modules_ar: ["الوضع البشري (الشخص)", "المعرفة والحقيقة"],
      modules_fr: ["La Personne", "La Vérité"]
    },
    {
      id: "phil-kant",
      name_ar: "إيمانويل كانط",
      name_fr: "Emmanuel Kant",
      era_ar: "فلسفة الأنوار والنقدية (1724 - 1804)",
      era_fr: "Siècle des Lumières - Idéalisme critique",
      keyConcept_ar: "الأمر الأخلاقي المطلق، كرامة الشخص بوصفه غاية في ذاته",
      keyConcept_fr: "L'Impératif catégorique et la personne comme fin en soi",
      quote_ar: "«تصرف على نحو تعامل معه الإنسانية في شخصك وفي غيرك كغاية لا كمجرد وسيلة»",
      quote_fr: "« Agis de telle sorte que tu traites l'humanité toujours comme une fin et jamais simplement comme un moyen. »",
      modules_ar: ["قيمة الشخص", "الواجب الأخلاقي", "النظرية والتجربة"],
      modules_fr: ["Valeur morale", "Devoir", "Épistémologie"]
    },
    {
      id: "phil-spinoza",
      name_ar: "باروخ سبينوزا",
      name_fr: "Baruch Spinoza",
      era_ar: "العقلانية الحديثة (1632 - 1677)",
      era_fr: "Rationalisme moderne hollandais",
      keyConcept_ar: "الحرية كفهم للضرورة، ونفي الحتمية الوهمية، غاية الدولة الحرية",
      keyConcept_fr: "Nécessité comprise, conatus et fin libératrice de l'État",
      quote_ar: "«إن الغاية الحقيقية من تأسيس الدولة هي في الواقع الحرية»",
      quote_fr: "« La fin dernière de l'État n'est pas de dominer les hommes, mais de libérer l'individu de la peur. »",
      modules_ar: ["مشروعية الدولة", "الحرية والضرورة"],
      modules_fr: ["L'État", "La Liberté"]
    },
    {
      id: "phil-sartre",
      name_ar: "جان بول سارتر",
      name_fr: "Jean-Paul Sartre",
      era_ar: "الفلسفة الوجودية المعاصرة (1905 - 1980)",
      era_fr: "Existentialisme athée contemporain",
      keyConcept_ar: "الوجود يسبق الماهية، حرية الاختيار، نظرة الغير التشييئية",
      keyConcept_fr: "L'existence précède l'essence, le regard d'autrui",
      quote_ar: "«الإنسان محكوم عليه بأن يكون حراً، ومسؤولاً عن العالم بأسره»",
      quote_fr: "« L'homme est condamné à être libre ; car une fois jeté dans le monde, il est responsable de tout ce qu'il fait. »",
      modules_ar: ["الشخص بين الضرورة والحرية", "وجود الغير"],
      modules_fr: ["Liberté de la personne", "Existence d'autrui"]
    },
    {
      id: "phil-rawls",
      name_ar: "جون رولز",
      name_fr: "John Rawls",
      era_ar: "الفلسفة السياسية المعاصرة (1921 - 2002)",
      era_fr: "Philosophie politique et éthique libérale",
      keyConcept_ar: "العدالة كإنصاف، حجاب الجهل، ومبدأ الاختلاف المنصف",
      keyConcept_fr: "La justice comme équité et le voile d'ignorance",
      quote_ar: "«العدالة هي الفضيلة الأولى للمؤسسات الاجتماعية كما هي الحقيقة للأنظمة الفكرية»",
      quote_fr: "« La justice est la première vertu des institutions sociales comme la vérité est celle des systèmes de pensée. »",
      modules_ar: ["الحق والعدالة كإنصاف"],
      modules_fr: ["Droit et Justice"]
    }
  ],

  // مقالات ومنهجيات التحليل الفلسفي
  methodologies: [
    {
      id: "meth-question",
      title_ar: "الدليل الشامل لكتابة إنشاء فلسفي انطلاقاً من السؤال الإشكالي",
      title_fr: "Guide méthodologique complet : Dissertation sur Question Ouverte",
      duration_read: "10 دقائق قراءة وتطبيق",
      rubrics: [
        {
          name_ar: "1. مطلب الفهم (4 نقاط)",
          name_fr: "1. Phase de Compréhension (4 pts)",
          desc_ar: "تحديد مجال السؤال وموضوعه، صياغة المفارقة الفلسفية بدقة، وطرح الأسئلة الموجهة للتحليل والمناقشة."
        },
        {
          name_ar: "2. مطلب التحليل (5 نقاط)",
          name_fr: "2. Phase d'Analyse (5 pts)",
          desc_ar: "تحليل البنية الاستفهامية، تفكيك المفاهيم والعلاقات بينها، واستدعاء أطروحة مفترضة للإجابة مع حججها المنطقية."
        },
        {
          name_ar: "3. مطلب المناقشة (5 نقاط)",
          name_fr: "3. Phase de Discussion (5 pts)",
          desc_ar: "إبراز القيمة الفلسفية للأطروحة، استكشاف حدودها ونقاط ضعفها، وفتح أفق التفكير بمواقف فلسفية بديلة أو مكملة."
        },
        {
          name_ar: "4. مطلب التركيب (3 نقاط)",
          name_fr: "4. Phase de Synthèse (3 pts)",
          desc_ar: "استخلاص نتائج التحليل والمناقشة، تقديم رأي شخصي مبني ومعلل، وفتح أفق إشكالي جديد دون تناقض."
        },
        {
          name_ar: "5. الجوانب الشكلية (3 نقاط)",
          name_fr: "5. Qualité rédactionnelle (3 pts)",
          desc_ar: "سلامة اللغة والأسلوب الفلسفي الرصين، مقروئية الخط، وتماسك علامات الترقيم والتدرج المنطقي."
        }
      ]
    },
    {
      id: "meth-quote",
      title_ar: "منهجية القولة الفلسفية المرفقة بسؤال أو مطلب",
      title_fr: "Méthodologie du commentaire de Citation philosophique",
      duration_read: "8 دقائق",
      rubrics: [
        {
          name_ar: "الفهم والتأطير",
          name_fr: "Cadrage conceptuel",
          desc_ar: "التعرف على المفهوم المركزي والإشكال الموجه الذي تضمره القولة."
        },
        {
          name_ar: "التحليل المفاهيمي والحجاجي",
          name_fr: "Développement des thèses",
          desc_ar: "توسيع منطوق القولة وشرح أبعادها وتقديم براهين عقلية تدعمها."
        },
        {
          name_ar: "المناقشة المعمقة",
          name_fr: "Confrontation critique",
          desc_ar: "مساءلة المسلّمات الضمنية ومقارنتها بالتيارات الفلسفية المقابلة."
        }
      ]
    }
  ],

  // إحصائيات لوحة الإدارة الأولية
  adminStats: {
    totalTeachers: 1845,
    activeLessons: 128,
    pedagogySheets: 64,
    nationalExams: 36,
    totalDownloads: 48920,
    monthlyVisits: 142300,
    recentLogins: [
      { name: "ذ. عبد الرحيم الصديقي", role: "أستاذ باحث", city: "الدار البيضاء", time: "منذ 15 دقيقة", status: "online" },
      { name: "ذة. مريم العباسي", role: "مفتشة تربوية", city: "الرباط", time: "منذ 45 دقيقة", status: "online" },
      { name: "ذ. يوسف التلمساني", role: "أستاذ ممارس", city: "مراكش", time: "منذ ساعتين", status: "away" },
      { name: "ذ. سفيان البوعناني", role: "أستاذ متدرب", city: "طنجة", time: "منذ 3 ساعات", status: "offline" }
    ]
  }
// استرجاع الدروس والبيانات المحفوظة محلياً إن وجدت لضمان عدم ضياع التعديلات والإضافات
try {
  const savedLessons = localStorage.getItem("philo_stored_lessons");
  if (savedLessons) {
    const parsed = JSON.parse(savedLessons);
    if (Array.isArray(parsed) && parsed.length > 0) {
      PHILO_DATA.lessons = parsed;
    }
  }
} catch (e) {
  console.warn("Could not read localStorage lessons:", e);
}

// جعل البيانات متاحة على النافذة العامة
window.PHILO_DATA = PHILO_DATA;
