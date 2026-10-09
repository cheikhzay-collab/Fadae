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
          name_ar: "1. الفهم والإشكال (4 نقاط)",
          name_fr: "1. Compréhension (4 pts)",
          desc_ar: "تأطير موضوع القولة ضمن مجزوءتها ومفهومها، وإبراز المفارقة وصياغة الأسئلة الموجهة."
        },
        {
          name_ar: "2. التحليل والحجاج (5 نقاط)",
          name_fr: "2. Analyse (5 pts)",
          desc_ar: "تحديد أطروحة القولة وشرح مفاهيمها المركزية وبيان العلاقات بينها، وبناء الحجاج المفترض للدفاع عنها."
        },
        {
          name_ar: "3. المناقشة النقدية (5 نقاط)",
          name_fr: "3. Discussion (5 pts)",
          desc_ar: "إبراز القيمة الفلسفية للأطروحة ومكاسبها الفكرية، ومساءلة حدودها بالانفتاح على أطروحات مغايرة."
        },
        {
          name_ar: "4. التركيب والخلاصة (3 نقاط)",
          name_fr: "4. Synthèse (3 pts)",
          desc_ar: "استخلاص نتائج التحليل والمناقشة، وإبداء الرأي الشخصي المبني بحياد فلسفي موضوعي."
        },
        {
          name_ar: "5. الجوانب الشكلية (3 نقاط)",
          name_fr: "5. Présentation (3 pts)",
          desc_ar: "سلامة اللغة والتعبير، تنظيم الفقرات، ونظافة ورقة التحرير."
        }
      ]
    },
    {
      id: "meth-text",
      title_ar: "منهجية تحليل ومناقشة النص الفلسفي",
      title_fr: "Méthodologie de l'analyse et discussion de Texte philosophique",
      duration_read: "12 دقيقة",
      rubrics: [
        {
          name_ar: "1. مطلب الفهم (4 نقاط)",
          name_fr: "1. Compréhension du texte (4 pts)",
          desc_ar: "تحديد موضوع النص وإشكاله المركزي، وصياغة الأسئلة الموجهة للتحليل والمناقشة."
        },
        {
          name_ar: "2. مطلب التحليل (5 نقاط)",
          name_fr: "2. Analyse textuelle (5 pts)",
          desc_ar: "استخراج أطروحة صاحب النص بدقة، وتفكيك شبكته المفاهيمية ورصد بنيته الحجاجية واستدلالاته."
        },
        {
          name_ar: "3. مطلب المناقشة (5 نقاط)",
          name_fr: "3. Discussion critique (5 pts)",
          desc_ar: "إبراز الرهان الفلسفي للنص وقيمته المعرفية، ومقارنته بالمواقف المؤيدة والمعارضة في تاريخ الفلسفة."
        },
        {
          name_ar: "4. مطلب التركيب (3 نقاط)",
          name_fr: "4. Synthèse (3 pts)",
          desc_ar: "استجماع عناصر التحليل والمناقشة، وتقديم تركيب نقدي تركيبي مدعم بموقف شخصي رصين."
        },
        {
          name_ar: "5. الجوانب الشكلية (3 نقاط)",
          name_fr: "5. Éléments formels (3 pts)",
          desc_ar: "تماسك الروابط المنطقية، جودة الصياغة الإنشائية، والالتزام بضوابط الكتابة الفلسفية."
        }
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // بنك الأسئلة والاختبارات التفاعلية (Interactive Quizzes - QCM الفلسفي)
  // --------------------------------------------------------------------------
  quizzes: [
    {
      id: "q-1",
      moduleId: "mod-human-condition",
      level: "2bac",
      concept: "الشخص والهوية",
      question_ar: "على ماذا يؤسس رينيه ديكارت هوية الشخص وثبات الأنا؟",
      question_fr: "Sur quoi René Descartes fonde-t-il l'identité de la personne et la permanence du Moi ?",
      options_ar: [
        "على التفكير المجرد المستمر (الكوجيطو)",
        "على الذاكرة والوعي الحسي المقترن بالأفعال",
        "على إرادة الحياة والجسد المادي",
        "على الطبع والسلوك الاجتماعي المكتسب"
      ],
      options_fr: [
        "Sur la pensée pure et le Cogito",
        "Sur la mémoire et la conscience sensorielle",
        "Sur le vouloir-vivre et le corps matériel",
        "Sur le comportement social acquis"
      ],
      correctIndex: 0,
      explanation_ar: "يرى ديكارت في كتابه (التأملات الميتافيزيقية) أن الشخص جوهر مفكر (Res cogitans)، وأن التفكير هو الخاصية الوحيدة التي لا تنفصل عن الذات وتحدد هويتها وثباتها: «أنا أشك، إذن أنا أفكر، إذن أنا موجود».",
      explanation_fr: "Descartes établit que la substance pensante (Cogito) est le fondement indubitable de l'identité personnelle : tant que je pense, je suis.",
      philosopher: "رينيه ديكارت"
    },
    {
      id: "q-2",
      moduleId: "mod-human-condition",
      level: "2bac",
      concept: "الشخص والهوية",
      question_ar: "ما هو العنصر الحاسم في تحديد هوية الشخص عند الفيلسوف الإنجليزي جون لوك؟",
      question_fr: "Quel est l'élément déterminant de l'identité personnelle selon John Locke ?",
      options_ar: [
        "الجوهر الروحي المفارق",
        "الوعي الحسي المصحوب بالذاكرة الممتدة في الماضي",
        "تطابق الصورة الجسدية للمرء أمام المرآة",
        "الإرادة العاقلة المتصلة بالأخلاق"
      ],
      options_fr: [
        "La substance spirituelle transcendante",
        "La conscience liée aux sens et la mémoire",
        "La ressemblance corporelle dans le miroir",
        "La volonté morale rationnelle"
      ],
      correctIndex: 1,
      explanation_ar: "انتقد جون لوك التصور الديكارتي، معتبراً أن النفس صفحة بيضاء وأن الوعي المقترن بالإدراك الحسي والذاكرة التي تستحضر الأفعال الماضية هو ما يصنع وحدة الذات وهوية الشخص عبر الزمان.",
      explanation_fr: "Locke soutient que l'identité personnelle réside dans la continuité de la conscience accompagnée par la mémoire empirique.",
      philosopher: "جون لوك"
    },
    {
      id: "q-3",
      moduleId: "mod-human-condition",
      level: "2bac",
      concept: "الشخص بوصفه قيمة",
      question_ar: "لماذا يمتلك الشخص (قيمة مطلقة) وكرامة في نظر إيمانويل كانط؟",
      question_fr: "Pourquoi la personne humaine possède-t-elle une valeur absolue (dignité) selon Emmanuel Kant ?",
      options_ar: [
        "لكونه كائناً عاقلاً أخلاقياً يُعد غاية في ذاته ولا يمكن تسعيره",
        "بسبب مكانته الاجتماعية ووظيفته في الدولة",
        "بفضل قوته البيولوجية وقدرته على السيطرة على الطبيعة",
        "لأنه قادر على إنتاج الثروة والممتلكات"
      ],
      options_fr: [
        "Parce qu'il est un être rationnel et moral, fin en soi",
        "En raison de son statut social et de son utilité",
        "Grâce à sa force biologique et son pouvoir",
        "Parce qu'il produit de la richesse matérielle"
      ],
      correctIndex: 0,
      explanation_ar: "يميز كانط بين (الأشياء) التي لها سعر نسبي ووسيلة، وبين (الأشخاص) الذين يتمتعون بكرامة وقيمة مطلقة لكونهم كائنات عاقلة تخضع للقانون الأخلاقي الواجب احترامه كغاية في ذاته.",
      explanation_fr: "Pour Kant, les choses ont un prix (relatif), tandis que la personne possède une dignité intrinsèque inestimable en tant que fin en soi.",
      philosopher: "إيمانويل كانط"
    },
    {
      id: "q-4",
      moduleId: "mod-human-condition",
      level: "2bac",
      concept: "وجود الغير",
      question_ar: "كيف وصف جان بول سارتر دور (الغير) في وعي الأنا بذاتها في تجربة (الخجل ونظرة الغير)؟",
      question_fr: "Comment Jean-Paul Sartre qualifie-t-il le rôle d'Autrui dans la prise de conscience de soi (le regard) ?",
      options_ar: [
        "الغير وسيط ضروري بيني وبين ذاتي، لكنه في الوقت ذاته يُشيّئ حريتي",
        "الغير مجرد وهم بصري لا يؤثر في استقلالية الذات",
        "الغير مصدر للمحبة الخالصة والتوافق الفطري التام دائماً",
        "الغير كائن متطابق معي تماماً في الفكر والإرادة"
      ],
      options_fr: [
        "Médiateur indispensable qui m'objective par son regard",
        "Une illusion sensorielle sans effet sur le Moi",
        "Une source d'harmonie et d'amour inconditionnel",
        "Un être strictement identique à ma conscience"
      ],
      correctIndex: 0,
      explanation_ar: "يعتبر سارتر في (الوجود والعدم) أن نظرة الغير تضعني أمام حقيقتي الموضوعية (أنا خجل مما يراني عليه الغير)، فالغير وسيط لا غنى عنه لمعرفة ذاتي، لكنه يجمد حريتي ويحولني إلى موضوع.",
      explanation_fr: "Sartre explique : « Autrui est le médiateur indispensable entre moi et moi-même », son regard fige ma liberté et m'objective.",
      philosopher: "جان بول سارتر"
    },
    {
      id: "q-5",
      moduleId: "mod-knowledge",
      level: "2bac",
      concept: "النظرية والتجربة",
      question_ar: "ما هي الخطوات الأربع المنهجية التي حددها كلود برنار للمنهج التجريبي الصارم في العلوم الحية؟",
      question_fr: "Quelles sont les étapes de la démarche expérimentale selon Claude Bernard ?",
      options_ar: [
        "الملاحظة، صياغة الفرضية، إنجاز التجربة، استنباط القانون العلمي",
        "الشك المنهجي، الحدس الرياضي، التحليل، والتركيب",
        "التأمل الميتافيزيقي، الاستدلال المنطقي، الإقناع البلاغي",
        "جمع الآراء الشائعة، التصويت عليها، تطبيقها عملياً"
      ],
      options_fr: [
        "Observation, Hypothèse, Expérimentation, Loi scientifique",
        "Doute méthodique, Intuition, Déduction, Synthèse",
        "Méditation métaphysique et rhétorique",
        "Recueil d'opinions et consensus populaire"
      ],
      correctIndex: 0,
      explanation_ar: "في كتاب (المدخل لدراسة الطب التجريبي)، وضع كلود برنار الأركان الأربعة: الملاحظة الموضوعية للواقعة، ابتكار فكرة أو فرضية تفسيرية، إخضاعها للتجريب المعملي للتحقق منها، والوصول إلى قانون علمي محدد.",
      explanation_fr: "Claude Bernard formalise la démarche O.H.E.R.I.C : Observation -> Hypothèse -> Expérience -> Interprétation -> Loi.",
      philosopher: "كلود برنار"
    },
    {
      id: "q-6",
      moduleId: "mod-knowledge",
      level: "2bac",
      concept: "العقلانية العلمية",
      question_ar: "ما هو الأصل الحقيقي للمبادئ والمفاهيم الفيزيائية المعاصرة حسب ألبرت أينشتاين؟",
      question_fr: "Quelle est la véritable source des concepts scientifiques modernes selon Albert Einstein ?",
      options_ar: [
        "الإنشاءات الحرة للعقل البشري والنسق الرياضي البديهي",
        "التراكم العشوائي للمشاهدات الحسية المباشرة فقط",
        "الأساطير والتقاليد الشعبية الموروثة",
        "القوانين التي تفرضها السلطة السياسية على الباحثين"
      ],
      options_fr: [
        "Les créations libres de l'esprit humain et le formalisme mathématique",
        "La simple accumulation passive de données sensorielles",
        "Les mythes et traditions transmises",
        "Les normes dictées par le pouvoir politique"
      ],
      correctIndex: 0,
      explanation_ar: "يؤكد أينشتاين أن النسق النظري للفيزياء الحديثة يتكون من مفاهيم وقوانين هي (إبداعات حرة للعقل البشري)، وأن الرياضيات هي التي تقدم المبدأ الخلاق، بينما تبقى التجربة وسيلة للتوجيه والاختبار فقط.",
      explanation_fr: "Einstein affirme que la théorie est une construction déductive libre de la raison mathématique, l'expérience ne servant qu'à guider le choix.",
      philosopher: "ألبرت أينشتاين"
    },
    {
      id: "q-7",
      moduleId: "mod-knowledge",
      level: "2bac",
      concept: "معايير علمية النظريات",
      question_ar: "ما هو المعيار الإبستيمولوجي الشهير الذي وضعه كارل بوبر لتمييز النظريات العلمية عن النظريات الزائفة؟",
      question_fr: "Quel est le critère épistémologique fondamental proposé par Karl Popper ?",
      options_ar: [
        "معيار القابلية للتكذيب أو التفنيد (Falsifiabilité)",
        "معيار المطابقة التامة مع رغبات الجمهور",
        "معيار الثبات الأبدي وعدم التغير",
        "معيار الإجماع الديني والأخلاقي حول النظرية"
      ],
      options_fr: [
        "Le critère de réfutabilité / falsifiabilité",
        "La conformité avec les désirs de la majorité",
        "L'inviolabilité absolue et l'immuabilité",
        "Le consensus religieux ou moral"
      ],
      correctIndex: 0,
      explanation_ar: "اعتبر كارل بوبر أن النظرية لا تكون علمية إلا إذا كانت تقبل أن تُختبر وأن تُكذّب بالتجربة (Falsifiability)؛ فالنظرية التي تدعي تفسير كل شيء ولا تقبل الدحض هي نظرية دغمائية لا علمية.",
      explanation_fr: "Popper pose la réfutabilité comme ligne de démarcation : une proposition n'est scientifique que si elle est susceptible d'être réfutée par un fait empirique.",
      philosopher: "كارل بوبر"
    },
    {
      id: "q-8",
      moduleId: "mod-politics",
      level: "2bac",
      concept: "مشروعية الدولة وغاياتها",
      question_ar: "ما هي الغاية الأسمى من تأسيس الدولة والمجتمع المدني في فلسفة باروخ سبينوزا؟",
      question_fr: "Quelle est la fin suprême de l'institution étatique selon Baruch Spinoza ?",
      options_ar: [
        "الحرية وتمكين الأفراد من تنمية عقولهم وأجسادهم في أمان",
        "إرهاب المواطنين وإخضاعهم بالقوة المطلقة لحاكم مستبد",
        "شن الحروب المستمرة على الدول المجاورة للتوسع",
        "فرض معتقد ديني واحد بالقوة الجبرية"
      ],
      options_fr: [
        "La liberté et l'émancipation rationnelle des citoyens",
        "La terreur et la domination absolue",
        "L'expansionnisme militaire continu",
        "L'imposition coercitive d'un culte unique"
      ],
      correctIndex: 0,
      explanation_ar: "يصرح سبينوزا في (رسالة في اللاهوت والسياسة): «إن الغاية الحقيقية من تأسيس الدولة هي في الواقع الحرية»، وليس تحويل الكائنات العاقلة إلى بهائم أو آلات مسلوبة الإرادة.",
      explanation_fr: "Spinoza démontre que la véritable fin de l'État n'est pas la domination par la peur, mais la libération de l'homme afin qu'il use de sa raison.",
      philosopher: "باروخ سبينوزا"
    },
    {
      id: "q-9",
      moduleId: "mod-politics",
      level: "2bac",
      concept: "طبيعة السلطة السياسية",
      question_ar: "ماذا نصح نيقولا ماكيافيلي الأمير في تدبير شؤون الحكم والصراع السياسي؟",
      question_fr: "Quel conseil Nicolas Machiavel prodigue-t-il au Prince pour gouverner efficacement ?",
      options_ar: [
        "أن يجمع بين طباع الأسد (لترهيب الذئاب) وطباع الثعلب (لكشف الفخاخ)",
        "أن يلتزم بالمثالية الأخلاقية حتى لو خسر ملكه",
        "أن يتنازل عن جميع صلاحياته للمواطنين بالتساوي",
        "أن يعتزل السياسة ويفوضها للحكماء فقط"
      ],
      options_fr: [
        "Être à la fois lion (pour effrayer) et renard (pour ruser)",
        "Maintenir une vertu naïve même au prix de sa chute",
        "Renoncer à tout pouvoir autoritaire",
        "Déléguer la gouvernance aux ermites"
      ],
      correctIndex: 0,
      explanation_ar: "في كتاب (الأمير)، أسس ماكيافيلي للواقعية السياسية: يجب على الحاكم أن يكون حذراً ومراوغاً كالثعلب حتى لا يقع في الشباك، وقوياً كالأسد ليرهب الأعداء، فالغاية عنده تبرر استخدام الوسائل المتاحة.",
      explanation_fr: "Machiavel formule le réalisme politique : « Il faut être renard pour connaître les pièges, et lion pour effrayer les loups ».",
      philosopher: "نيقولا ماكيافيلي"
    },
    {
      id: "q-10",
      moduleId: "mod-politics",
      level: "2bac",
      concept: "العدالة بين المساواة والإنصاف",
      question_ar: "لماذا اعتبر أرسطو أن (الإنصاف) أسمى وأفضل من (العدالة الحرفية للقانون)؟",
      question_fr: "Pourquoi Aristote considère-t-il l'équité comme supérieure à la stricte justice légale ?",
      options_ar: [
        "لأن القوانين تصاغ بصفة عامة، والإنصاف يصحح جمود القانون عند تطبيقه على الحالات الخاصة",
        "لأن الإنصاف يلغي جميع القوانين ويشيع الفوضى",
        "لأن القضاة معصومون من الخطأ ولا يحتاجون لقوانين",
        "لأن العدالة القانونية تضر دائماً بالطبقة الحاكمة"
      ],
      options_fr: [
        "Parce que la loi est générale et l'équité rectifie les cas particuliers",
        "Parce que l'équité supprime toute règle formelle",
        "Parce que les juges n'ont plus besoin de textes écrits",
        "Parce que la stricte légalité sert toujours la tyrannie"
      ],
      correctIndex: 0,
      explanation_ar: "يوضح أرسطو في (أخلاق نيقوماخوس) أن عمومية القوانين المكتوبة تجعلها قاصرة أمام خصوصية كل نازلة، والإنصاف هو تصحيح حكيم للقانون لتجاوز ظلمه الناجم عن صرامته الحرفية.",
      explanation_fr: "Aristote enseigne que l'équitable est un correctif de la justice légale là où celle-ci se révèle déficiente en raison de son universalité.",
      philosopher: "أرسطو"
    },
    {
      id: "q-11",
      moduleId: "mod-ethics",
      level: "2bac",
      concept: "الواجب والإكراه",
      question_ar: "ما هو الفرق عند إيمانويل كانط بين (الأمر الشرطي) و(الأمر القطعي المطلق) في الواجب الأخلاقي؟",
      question_fr: "Quelle est la différence fondamentale chez Kant entre impératif hypothétique et impératif catégorique ?",
      options_ar: [
        "الأمر الشرطي مشروط بتحقيق مصلحة أو منفعة، بينما القطعي واجب في ذاته دون قيد أو شرط",
        "الأمر الشرطي خاص برجال الدين والقطعي خاص بالملوك",
        "الأمر الشرطي ثابت أبدي والقطعي نسبي يتغير يومياً",
        "كلاهما يقومان على المصلحة الشخصية واللذة المادية فقط"
      ],
      options_fr: [
        "L'hypothétique vise un intérêt empirique, le catégorique commande inconditionnellement",
        "L'hypothétique est théologique et le catégorique est profane",
        "L'hypothétique est universel et le catégorique est subjectif",
        "Les deux reposent exclusivement sur la recherche du plaisir"
      ],
      correctIndex: 0,
      explanation_ar: "يؤكد كانط أن الفعل الأخلاقي الحق ينبع من (أمر قطعي - Catégorique) نابع من العقل العملي لذاته (افعل الواجب لأنه واجب)، أما الأوامر المشروطة بمنفعة أو سمعة فلا ترقى إلى مرتبة الأخلاقية الخالصة.",
      explanation_fr: "L'impératif catégorique commande l'action pour elle-même, sans viser aucune fin extérieure ni utilité sensible.",
      philosopher: "إيمانويل كانط"
    },
    {
      id: "q-12",
      moduleId: "mod-ethics",
      level: "2bac",
      concept: "الحرية والحتمية",
      question_ar: "ما هو الموقف الجذري لـ جان بول سارتر من مسألة الحرية الإنسانية في الفلسفة الوجودية؟",
      question_fr: "Quelle est la thèse radicale de Jean-Paul Sartre concernant la liberté dans l'existentialisme ?",
      options_ar: [
        "الإنسان محكوم عليه بأن يكون حراً، والوجود يسبق الماهية وهو المسؤول الوحيد عن اختياراته",
        "الإنسان خاضع بالكامل للحتميات البيولوجية والوراثية دون أي إرادة",
        "الحرية مقصورة على طبقة معينة من الفلاسفة والمفكرين فقط",
        "الحرية شعور وهمي خادع لا وجود له في الواقع الموضوعي"
      ],
      options_fr: [
        "L'homme est condamné à être libre, l'existence précède l'essence",
        "L'homme est totalement déterminé par la génétique",
        "La liberté est un privilège d'aristocrates",
        "La liberté n'est qu'une illusion d'optique cérébrale"
      ],
      correctIndex: 0,
      explanation_ar: "يؤكد سارتر أن «الوجود يسبق الماهية»، فالإنسان يوجد أولاً في العالم ثم يصنع نفسه باختياراته الحرة، ولا عذر له في التنصل من مسؤوليته الكاملة عن مصيره وعن الإنسانية جمعاء.",
      explanation_fr: "Sartre déclare que « l'homme est condamné à être libre » car créé sans notice, il invente sa propre essence par chacun de ses actes.",
      philosopher: "جان بول سارتر"
    }
  ],

  // --------------------------------------------------------------------------
  // الخرائط المفاهيمية البصرية التفاعلية للمقرر المغربي (Mind Maps)
  // --------------------------------------------------------------------------
  mindmaps: [
    {
      id: "map-human-condition",
      moduleId: "mod-human-condition",
      title_ar: "خريطة مجزوءة الوضع البشري",
      title_fr: "Carte Conceptuelle : La Condition Humaine",
      badge_ar: "الذاتية • التفاعلية • التاريخ",
      concepts: [
        {
          name_ar: "1. مفهوم الشخص (La Personne)",
          axes: [
            {
              problem_ar: "الإشكال الأول: هوية الشخص وثبات الأنا عبر الزمن",
              philosophers: [
                { name: "رينيه ديكارت", stance: "تأسيس الهوية على جوهر الفكر المجرد (الكوجيطو)." },
                { name: "جون لوك", stance: "تأسيس الهوية على الوعي الحسي المقترن بامتداد الذاكرة." },
                { name: "أرثر شوبنهاور", stance: "هوية الشخص ترتكز على نواة عميقة لا تتغير هي إرادة الحياة." }
              ]
            },
            {
              problem_ar: "الإشكال الثاني: الشخص بوصفه قيمة (أخلاقية وحقوقية)",
              philosophers: [
                { name: "إيمانويل كانط", stance: "الشخص غاية في ذاته وله كرامة مطلقة تميزه عن سائر الموجودات." },
                { name: "جورج غوسدورف", stance: "قيمة الشخص لا تتحقق في العزلة، بل بالمشاركة والانفتاح التضامني." }
              ]
            },
            {
              problem_ar: "الإشكال الثالث: الشخص بين الضرورة والحرية",
              philosophers: [
                { name: "باروخ سبينوزا", stance: "القول بالحرية ناتج عن وعي الرغبات والجهل بالعلل والحتميات المحددة لها." },
                { name: "جان بول سارتر", stance: "الإنسان مشروع حر يتجاوز كل إشراط موضوعي بصنع ماهيته واختياراته." }
              ]
            }
          ]
        },
        {
          name_ar: "2. مفهوم الغير (Autrui)",
          axes: [
            {
              problem_ar: "الإشكال الأول: وجود الغير (بين الضرورة والتطاول)",
              philosophers: [
                { name: "رينيه ديكارت", stance: "الشك في وجود الآخرين وافتراضه بالاستدلال العقلي والمماثلة." },
                { name: "جان بول سارتر", stance: "الغير وسيط ضروري بيني وبين ذاتي، لكنه في الوقت ذاته جحيم يشيّئني بنظرته." }
              ]
            },
            {
              problem_ar: "الإشكال الثاني: معرفة الغير (ممكنة أم مستحيلة؟)",
              philosophers: [
                { name: "نيكولا مالبرانش", stance: "معرفة الغير بالتمثيل والتخمين تقريبية لا ترقى إلى اليقين." },
                { name: "موريس ميرلوبونتي", stance: "معرفة الغير ممكنة عبر التواصل الجسدي والتعاطف اللغوي المتبادل." }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "map-knowledge",
      moduleId: "mod-knowledge",
      title_ar: "خريطة مجزوءة المعرفة",
      title_fr: "Carte Conceptuelle : La Connaissance",
      badge_ar: "الإبستيمولوجيا • الحقيقة • المنهج",
      concepts: [
        {
          name_ar: "1. النظرية والتجربة (Théorie et Expérience)",
          axes: [
            {
              problem_ar: "الإشكال الأول: التجربة والتجريب في العلم",
              philosophers: [
                { name: "كلود برنار", stance: "التجريب العلمي هو المعيار الأوحد لاختبار الفرضيات (المنهج التجريبي)." },
                { name: "رينيه طوم", stance: "التجريب الأعمى عقيم، والخيال النظري والرياضي شرط لتفسير الظواهر." }
              ]
            },
            {
              problem_ar: "الإشكال الثاني: العقلانية العلمية وبناء المعرفة",
              philosophers: [
                { name: "ألبرت أينشتاين", stance: "المفاهيم العلمية إبداعات حرة للعقل الرياضي الخلاق." },
                { name: "غاستون باشلار", stance: "العقلانية المطبقة: حوار جدلي دائم ومتبادل بين العقل والتجربة." }
              ]
            },
            {
              problem_ar: "الإشكال الثالث: معايير علمية النظريات",
              philosophers: [
                { name: "كارل بوبر", stance: "قابلية النظرية للتفنيد والتكذيب هي معيار علميتها." },
                { name: "بيير دوهيم", stance: "معيار الصدق هو تماسك النسق النظري ومطابقته للتجربة الفيزيائية." }
              ]
            }
          ]
        },
        {
          name_ar: "2. مفهوم الحقيقة (La Vérité)",
          axes: [
            {
              problem_ar: "الإشكال الأول: معايير الحقيقة",
              philosophers: [
                { name: "رينيه ديكارت", stance: "معيار البداهة والوضوح والتماسك العقلي الميتافيزيقي." },
                { name: "ويليام جيمس", stance: "المعيار البراغماتي: الحقيقة هي الفكرة القابلة للتطبيق والمفيدة عملياً." }
              ]
            },
            {
              problem_ar: "الإشكال الثاني: قيمة الحقيقة والرهان عليها",
              philosophers: [
                { name: "إيمانويل كانط", stance: "الحقيقة واجب أخلاقي مطلق غير مشروط لا يجوز نقضه بالكذب مطلقاً." },
                { name: "فريدريك نيتشه", stance: "الحقيقة وهم استعاري تم نسيان طابعه المجازي لتسهيل العيش." }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "map-politics",
      moduleId: "mod-politics",
      title_ar: "خريطة مجزوءة السياسة",
      title_fr: "Carte Conceptuelle : La Politique",
      badge_ar: "السلطة • القانون • العدالة",
      concepts: [
        {
          name_ar: "1. مفهوم الدولة (L'État)",
          axes: [
            {
              problem_ar: "الإشكال الأول: مشروعية الدولة وغاياتها",
              philosophers: [
                { name: "طوماس هوبز", stance: "حماية أرواح الناس من الفوضى والتوحش في حالة الطبيعة (التنازل الكلي للحاكم)." },
                { name: "جون لوك", stance: "صيانة الحقوق الطبيعية للإنسان: الملكية، الحرية، والأمان." },
                { name: "باروخ سبينوزا", stance: "الغاية الحقيقية من تأسيس الدولة هي الحرية وتنمية العقول." }
              ]
            },
            {
              problem_ar: "الإشكال الثاني: طبيعة السلطة السياسية",
              philosophers: [
                { name: "نيقولا ماكيافيلي", stance: "الواقعية السياسية: الجمع بين القوة (الأسد) والمكر والحيلة (الثعلب)." },
                { name: "مونتيسكيو", stance: "فصل السلط (التشريعية، التنفيذية، القضائية) لمنع الاستبداد." }
              ]
            }
          ]
        },
        {
          name_ar: "2. الحق والعدالة (Le Droit et la Justice)",
          axes: [
            {
              problem_ar: "الإشكال الأول: الحق الطبيعي والحق الوضعي",
              philosophers: [
                { name: "طوماس هوبز", stance: "الحق الطبيعي هو حق القوة والحرية المطلقة لاستخدام كل الوسائل للبقاء." },
                { name: "جون جاك روسو", stance: "الانتقال إلى الحق الوضعي التعاقدي المبني على الإرادة العامة والسيادة." }
              ]
            },
            {
              problem_ar: "الإشكال الثاني: العدالة بين المساواة والإنصاف",
              philosophers: [
                { name: "أرسطو", stance: "الإنصاف يصحح جمود القوانين العامة عند تطبيقها على الوقائع المتفردة." },
                { name: "جون رولز", stance: "العدالة كإنصاف: تكافؤ الفرص وحماية الفئات الأقل حظاً في المجتمع." }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "map-ethics",
      moduleId: "mod-ethics",
      title_ar: "خريطة مجزوءة الأخلاق",
      title_fr: "Carte Conceptuelle : La Morale",
      badge_ar: "الواجب • الحرية • المسؤولية",
      concepts: [
        {
          name_ar: "1. مفهوم الواجب (Le Devoir)",
          axes: [
            {
              problem_ar: "الإشكال الأول: الواجب بين الإكراه والالتزام الحر",
              philosophers: [
                { name: "إيمانويل كانط", stance: "الواجب التزام عقلي نابع من الإرادة الحرة الطيبة والخضوع للقانون الأخلاقي." },
                { name: "إميل دوركهايم", stance: "الواجب إكراه اجتماعي مفروض من الضمير الجمعي والمؤسسات." }
              ]
            }
          ]
        },
        {
          name_ar: "2. مفهوم الحرية (La Liberté)",
          axes: [
            {
              problem_ar: "الإشكال الأول: الحرية والحتمية",
              philosophers: [
                { name: "باروخ سبينوزا", stance: "الحرية وهم؛ الإنسان خاضع لحتميات كونية وطبيعية شاملة." },
                { name: "جان بول سارتر", stance: "الحرية مطلقة ولا حدود لها سوى رفض الحرية ذاتها (مسؤولية الوجود)." }
              ]
            }
          ]
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
};

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
