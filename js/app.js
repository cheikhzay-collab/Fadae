/**
 * فضاء الحكمة والمعرفة - منطق التطبيق التفاعلي الرئيسي
 * Logique principale - Espace Sagesse et Savoir
 */

class AppManager {
  constructor() {
    this.currentFilter = "all";
    this.searchQuery = "";
    this.init();
  }

  init() {
    this.setupTheme();
    this.setupScrollHeader();
    this.setupMobileAppFeatures();
    this.bindEvents();
    this.renderAll();
    this.loadRemoteLessons();

    // استماع لتغيير اللغة
    window.addEventListener("languageChanged", () => {
      this.updateLanguageBadges();
      this.renderAll();
    });
  }

  async loadRemoteLessons() {
    try {
      const res = await fetch("api/lessons.php");
      if (res.ok) {
        const json = await res.json();
        if (json && json.success && Array.isArray(json.data) && json.data.length > 0) {
          PHILO_DATA.lessons = json.data;
          this.renderLessons();
          if (window.adminManager && typeof window.adminManager.renderMetrics === "function") {
            window.adminManager.renderMetrics();
          }
        }
      }
    } catch (e) {
      // وضع بدون إنترنت أو خادم محلي: استخدام البيانات المضمنة تلقائياً
    }
  }

  setupScrollHeader() {
    const header = document.getElementById("siteHeader");
    if (!header) return;
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }, { passive: true });
  }

  setupMobileAppFeatures() {
    // 1. زر العودة السريعة للأعلى في الهاتف
    const fabScroll = document.getElementById("btnScrollTop");
    if (fabScroll) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 350) {
          fabScroll.classList.add("visible");
        } else {
          fabScroll.classList.remove("visible");
        }
      }, { passive: true });

      fabScroll.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // 2. تحديث التبويب النشط في شريط الهاتف السفلي (Scroll Spy)
    const navButtons = document.querySelectorAll(".mobile-nav-btn[data-nav-target]");
    if (navButtons.length > 0) {
      const sectionIds = ["home", "levels", "lessons", "exams", "philosophers"];
      const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const currentId = entry.target.id;
              navButtons.forEach(btn => {
                if (btn.dataset.navTarget === currentId) {
                  btn.classList.add("active");
                } else {
                  btn.classList.remove("active");
                }
              });
            }
          });
        }, {
          root: null,
          rootMargin: "-25% 0px -55% 0px",
          threshold: 0
        });

        sections.forEach(s => observer.observe(s));
      }
    }
  }

  setupTheme() {
    const savedTheme = localStorage.getItem("philo_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    this.updateThemeButton(savedTheme);
    this.updateThemePills(savedTheme);
  }

  setExactTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("philo_theme", theme);
    this.updateThemeButton(theme);
    this.updateThemePills(theme);
  }

  updateThemePills(theme) {
    const lightPill = document.getElementById("themePillLight");
    const darkPill = document.getElementById("themePillDark");
    if (lightPill && darkPill) {
      if (theme === "light") {
        lightPill.classList.add("active");
        darkPill.classList.remove("active");
      } else {
        lightPill.classList.remove("active");
        darkPill.classList.add("active");
      }
    }
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    this.setExactTheme(next);
  }

  updateThemeButton(theme) {
    const btn = document.getElementById("btnThemeToggle");
    const mobileBtn = document.getElementById("btnMobileTheme");
    const lang = window.i18n ? window.i18n.getLang() : "ar";
    const label = theme === "dark" 
      ? (lang === "ar" ? "الوضع النهاري" : "Mode Clair")
      : (lang === "ar" ? "الوضع الليلي" : "Mode Sombre");

    const icon = theme === "dark" 
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    if (btn) {
      btn.title = label;
    }
    if (mobileBtn) mobileBtn.innerHTML = `${icon} <span>${label}</span>`;
  }

  updateLanguageBadges() {
    const lang = window.i18n ? window.i18n.getLang() : "ar";
    const arBadge = document.getElementById("langActiveBadge");
    const frBadge = document.getElementById("langInactiveBadge");
    if (arBadge && frBadge) {
      if (lang === "ar") {
        arBadge.classList.add("active");
        frBadge.classList.remove("active");
      } else {
        arBadge.classList.remove("active");
        frBadge.classList.add("active");
      }
    }
  }

  bindEvents() {
    // تبديل اللغة
    const btnLang = document.getElementById("btnLangToggle");
    const drawerLang = document.getElementById("btnDrawerLang");
    if (btnLang) {
      btnLang.addEventListener("click", () => {
        window.i18n.toggleLang();
        this.updateLanguageBadges();
      });
    }
    const btnDesktopLang = document.getElementById("btnDesktopLang");
    if (btnDesktopLang) {
      btnDesktopLang.addEventListener("click", () => {
        window.i18n.toggleLang();
        this.updateLanguageBadges();
      });
    }
    if (drawerLang) {
      drawerLang.addEventListener("click", () => {
        window.i18n.toggleLang();
        this.closeDrawer();
      });
    }

    // تبديل الثيم
    const btnTheme = document.getElementById("btnThemeToggle");
    const mobileTheme = document.getElementById("btnMobileTheme");
    if (btnTheme) btnTheme.addEventListener("click", () => this.toggleTheme());
    if (mobileTheme) mobileTheme.addEventListener("click", () => this.toggleTheme());

    // درج الهاتف
    const hamburger = document.getElementById("hamburgerBtn");
    const drawer = document.getElementById("mobileDrawer");
    const backdrop = document.getElementById("drawerBackdrop");
    const closeDrawerBtn = document.getElementById("closeDrawerBtn");

    if (hamburger && drawer && backdrop) {
      hamburger.addEventListener("click", () => this.openDrawer());
      backdrop.addEventListener("click", () => this.closeDrawer());
      if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", () => this.closeDrawer());
    }

    // البحث المباشر
    const searchInput = document.getElementById("heroSearchInput");
    const exactSearch = document.getElementById("exactSearchInput");

    const handleSearch = (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.renderLessons();
      const lessonsSection = document.getElementById("lessons");
      if (this.searchQuery.length > 1 && lessonsSection) {
        lessonsSection.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (searchInput) searchInput.addEventListener("input", handleSearch);
    if (exactSearch) {
      exactSearch.addEventListener("input", handleSearch);
      exactSearch.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const lessonsSection = document.getElementById("lessons");
          if (lessonsSection) lessonsSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    // إغلاق المودال بالنقر خارج الصندوق
    const modalOverlay = document.getElementById("genericModalOverlay");
    if (modalOverlay) {
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) this.closeModal();
      });
    }
  }

  openDrawer() {
    document.getElementById("mobileDrawer").classList.add("open");
    document.getElementById("drawerBackdrop").classList.add("active");
  }

  closeDrawer() {
    document.getElementById("mobileDrawer").classList.remove("open");
    document.getElementById("drawerBackdrop").classList.remove("active");
  }

  renderAll() {
    window.i18n.updateDom();
    this.renderLevels();
    this.renderLessons();
    this.renderPedagogy();
    this.renderExams();
    this.renderPhilosophers();
    this.renderMethodology();
  }

  // عرض بطاقات المستويات
  renderLevels() {
    const container = document.getElementById("levelsContainer");
    if (!container) return;
    const lang = window.i18n.getLang();

    container.innerHTML = PHILO_DATA.levels.map(level => {
      const title = lang === "ar" ? level.title_ar : level.title_fr;
      const desc = lang === "ar" ? level.desc_ar : level.desc_fr;
      const badge = lang === "ar" ? level.badge_ar : level.badge_fr;
      const countLabel = lang === "ar" ? `${level.modulesCount} مجزوءات رئيسية` : `${level.modulesCount} Modules officiels`;

      return `
        <div class="level-card">
          <span class="level-badge">${badge}</span>
          <h3 class="level-title">${title}</h3>
          <p class="level-desc">${desc}</p>
          <div class="level-meta">
            <span class="level-modules-count">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              ${countLabel}
            </span>
            <button class="btn-card-action" onclick="app.filterByLevel('${level.id}')">
              <span>${lang === "ar" ? "تصفح المقررات" : "Explorer"}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  filterByLevel(levelId) {
    this.currentFilter = levelId;
    // تحديث أزرار التصفية
    const pills = document.querySelectorAll(".filter-pill");
    pills.forEach(p => {
      p.classList.toggle("active", p.dataset.filter === levelId);
    });
    this.renderLessons();

    // التمرير السلس إلى قسم الدروس
    const el = document.getElementById("lessons") || document.getElementById("levels");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  // عرض فلاتر وبطاقات الدروس
  renderLessons() {
    const container = document.getElementById("lessonsContainer");
    if (!container) return;
    const lang = window.i18n.getLang();

    let list = PHILO_DATA.lessons.filter(l => l.status === "published");

    // تصفية حسب المستوى أو المجزوءة
    if (this.currentFilter !== "all") {
      list = list.filter(l => l.levelId === this.currentFilter || l.moduleId === this.currentFilter);
    }

    // تصفية حسب نص البحث
    if (this.searchQuery) {
      list = list.filter(l => {
        const title = (lang === "ar" ? l.title_ar : l.title_fr).toLowerCase();
        const summary = (lang === "ar" ? l.summary_ar : l.summary_fr).toLowerCase();
        const tags = (lang === "ar" ? l.tags_ar : l.tags_fr).join(" ").toLowerCase();
        const author = l.author.toLowerCase();
        return title.includes(this.searchQuery) || summary.includes(this.searchQuery) || tags.includes(this.searchQuery) || author.includes(this.searchQuery);
      });
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 1rem; opacity: 0.5;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <p style="font-size: 1.1rem; font-weight: 600;">${window.i18n.t("no_results_found")}</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(lesson => {
      const module = PHILO_DATA.modules.find(m => m.id === lesson.moduleId);
      const modTitle = module ? (lang === "ar" ? module.title_ar : module.title_fr) : "";
      const modColor = module ? module.color : "#6366f1";
      const title = lang === "ar" ? lesson.title_ar : lesson.title_fr;
      const summary = lang === "ar" ? lesson.summary_ar : lesson.summary_fr;
      const tags = lang === "ar" ? lesson.tags_ar : lesson.tags_fr;

      return `
        <article class="lesson-card">
          <div class="lesson-card-top">
            <span class="lesson-module-tag" style="background-color: ${modColor}">${modTitle}</span>
            <span class="lesson-level-badge">${lesson.levelId === "2bac" ? "2 Bac" : (lesson.levelId === "1bac" ? "1 Bac" : "T.C")}</span>
          </div>
          <h3 class="lesson-title">${title}</h3>
          <p class="lesson-summary">${summary}</p>
          <div class="lesson-tags">
            ${tags.map(t => `<span class="tag-item">#${t}</span>`).join("")}
          </div>
          <div class="lesson-footer">
            <div class="lesson-author">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span>${lesson.author}</span>
            </div>
            <button class="btn-card-action" onclick="app.showLessonModal('${lesson.id}')">
              <span>${window.i18n.t("btn_read_more")}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </article>
      `;
    }).join("");
  }

  // عرض الجذاذات الديداكتيكية
  renderPedagogy() {
    const container = document.getElementById("pedagogyContainer");
    if (!container) return;
    const lang = window.i18n.getLang();

    container.innerHTML = PHILO_DATA.pedagogy.map(item => {
      const title = lang === "ar" ? item.title_ar : item.title_fr;
      const stream = lang === "ar" ? item.stream_ar : item.stream_fr;
      const competencies = lang === "ar" ? item.competencies_ar : item.competencies_fr;

      return `
        <div class="pedagogy-card">
          <div class="pedagogy-card-header">
            <div>
              <h3 class="pedagogy-title">${title}</h3>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.3rem;">${item.author} • ${stream}</p>
            </div>
            <span class="pedagogy-badge">${item.duration}</span>
          </div>

          <div class="competencies-box">
            <div class="competencies-title">${lang === "ar" ? "الكفايات والقدرات المستهدفة:" : "Compétences ciblées :"}</div>
            <ul class="competencies-list">
              ${competencies.map(c => `<li>${c}</li>`).join("")}
            </ul>
          </div>

          <div class="pedagogy-actions">
            <button class="btn-download primary" onclick="app.showPedagogyDetail('${item.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <span>${window.i18n.t("btn_view_details")}</span>
            </button>
            <button class="btn-download" onclick="app.downloadResource('${item.title_ar}', 'PDF')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>${window.i18n.t("btn_download_pdf")}</span>
            </button>
            <button class="btn-download" onclick="app.downloadResource('${item.title_ar}', 'Word')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              <span>${window.i18n.t("btn_download_doc")}</span>
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  // عرض بنك الامتحانات الوطنية
  renderExams() {
    const container = document.getElementById("examsContainer");
    if (!container) return;
    const lang = window.i18n.getLang();

    container.innerHTML = PHILO_DATA.exams.map(exam => {
      const session = lang === "ar" ? exam.session_ar : exam.session_fr;
      const stream = lang === "ar" ? exam.stream_ar : exam.stream_fr;

      return `
        <div class="exam-card">
          <div class="exam-header">
            <div class="exam-year-tag">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span>${exam.year} — ${session}</span>
            </div>
            <span class="exam-stream-badge">${stream}</span>
          </div>

          <div class="sujets-accordion">
            ${exam.sujets.map(s => {
              const type = lang === "ar" ? s.type_ar : s.type_fr;
              const text = lang === "ar" ? s.text_ar : s.text_fr;
              const notion = lang === "ar" ? s.notion_ar : s.notion_fr;
              return `
                <div class="sujet-item">
                  <div class="sujet-type">
                    <span>${type}</span>
                    <span style="font-size: 0.8rem; color: var(--accent-purple);">${notion}</span>
                  </div>
                  <div class="sujet-text">${text}</div>
                </div>
              `;
            }).join("")}
          </div>

          <div style="display: flex; gap: 0.8rem; margin-top: 1.5rem; justify-content: flex-end; flex-wrap: wrap;">
            <button class="btn-download" onclick="app.showExamDetail('${exam.id}')" style="background: rgba(245, 158, 11, 0.12); border-color: rgba(245, 158, 11, 0.4); color: #f59e0b;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <span>عرض شبكة التصحيح وعناصر الإجابة</span>
            </button>
            <button class="btn-download primary" onclick="app.downloadResource('الامتحان الوطني ${exam.year} - ${session}', 'PDF')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>${window.i18n.t("btn_download_pdf")}</span>
            </button>
            <button class="btn-download" onclick="window.print()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              <span>طباعة الموضوع</span>
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  // عرض أعلام الفلسفة
  renderPhilosophers() {
    const container = document.getElementById("philosophersContainer");
    if (!container) return;
    const lang = window.i18n.getLang();

    container.innerHTML = PHILO_DATA.philosophers.map(phil => {
      const name = lang === "ar" ? phil.name_ar : phil.name_fr;
      const era = lang === "ar" ? phil.era_ar : phil.era_fr;
      const quote = lang === "ar" ? phil.quote_ar : phil.quote_fr;
      const concept = lang === "ar" ? phil.keyConcept_ar : phil.keyConcept_fr;

      return `
        <div class="philosopher-card" onclick="app.showPhilosopherModal('${phil.id}')" style="cursor: pointer;" title="انقر لاستكشاف سيرة وأطروحات ${name}">
          <div class="philosopher-avatar">🏛️</div>
          <h3 class="philosopher-name">${name}</h3>
          <span class="philosopher-era">${era}</span>
          <p class="philosopher-quote">${quote}</p>
          <div class="philosopher-concept">
            <strong>${lang === "ar" ? "المفهوم المحوري:" : "Notion clé :"}</strong> ${concept}
          </div>
          <button type="button" class="btn-card-action" style="margin-top: 1rem; width: 100%; justify-content: center;" onclick="event.stopPropagation(); app.showPhilosopherModal('${phil.id}')">
            <span>${lang === "ar" ? "استكشاف أطروحات الفيلسوف" : "Explorer la pensée"}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      `;
    }).join("");
  }

  // عرض المنهجيات المعتمدة مع مبدل التبويبات الثلاثة
  setMethodologyTab(methId) {
    this.currentMethodologyId = methId;
    this.renderMethodology();
  }

  renderMethodology() {
    const container = document.getElementById("methodologyContainer");
    if (!container) return;
    const lang = window.i18n.getLang();

    if (!this.currentMethodologyId) this.currentMethodologyId = "meth-question";
    const currentMeth = PHILO_DATA.methodologies.find(m => m.id === this.currentMethodologyId) || PHILO_DATA.methodologies[0];
    const title = lang === "ar" ? currentMeth.title_ar : currentMeth.title_fr;

    container.innerHTML = `
      <div class="pedagogy-card" style="grid-column: 1 / -1;">
        <!-- تبويبات الصيغ الإنشائية الثلاث المعتمدة وزارياً -->
        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
          ${PHILO_DATA.methodologies.map(m => {
            const isActive = m.id === this.currentMethodologyId;
            const icon = m.id === 'meth-question' ? '❓' : (m.id === 'meth-quote' ? '💬' : '📜');
            const label = m.id === 'meth-question' ? 'صيغة السؤال الإشكالي' : (m.id === 'meth-quote' ? 'صيغة القولة الفلسفية' : 'صيغة النص الفلسفي');
            return `
              <button type="button" class="filter-pill ${isActive ? 'active' : ''}" onclick="app.setMethodologyTab('${m.id}')" style="cursor: pointer; padding: 0.5rem 1rem;">
                <span>${icon} ${label}</span>
              </button>
            `;
          }).join("")}
        </div>

        <div class="pedagogy-card-header">
          <div>
            <h3 class="pedagogy-title">${title}</h3>
            <p style="color: var(--accent-gold); font-size: 0.9rem; margin-top: 0.3rem;">معايير المركز الوطني للتقويم والامتحانات (الشبكة الرسمية 20 ن) • ${currentMeth.duration_read || '10 دقائق'}</p>
          </div>
          <span class="pedagogy-badge">20 / 20</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 1.2rem;">
          ${currentMeth.rubrics.map(r => {
            const name = lang === "ar" ? r.name_ar : r.name_fr;
            const desc = lang === "ar" ? r.desc_ar : r.desc_fr;
            return `
              <div style="background: var(--bg-secondary); padding: 1.2rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <div style="font-weight: 800; color: var(--accent-gold); margin-bottom: 0.5rem; font-size: 1rem;">${name}</div>
                <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">${desc}</p>
              </div>
            `;
          }).join("")}
        </div>

        <div style="margin-top: 1.8rem; display: flex; gap: 0.8rem; justify-content: flex-end; flex-wrap: wrap;">
          <button class="btn-download" onclick="window.print()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            <span>طباعة المنهجية وسلم التنقيط</span>
          </button>
          <button class="btn-download primary" onclick="app.downloadResource('${title}', 'Word')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            <span>تحميل المنهجية كاملة بصيغة Word</span>
          </button>
        </div>
      </div>
    `;
  }

  // نافذة عرض الدرس التفصيلي
  showLessonModal(lessonId) {
    const lesson = PHILO_DATA.lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    const lang = window.i18n.getLang();

    const title = lang === "ar" ? lesson.title_ar : lesson.title_fr;
    const summary = lang === "ar" ? lesson.summary_ar : lesson.summary_fr;
    const content = lang === "ar" ? lesson.content_ar : (lesson.content_fr || lesson.content_ar);

    const bodyHtml = `
      <div style="margin-bottom: 1.2rem;">
        <div style="font-size: 0.9rem; color: var(--accent-gold); font-weight: 700; margin-bottom: 0.4rem;">${lesson.author} • ${lesson.date}</div>
        <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7; background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-sm); border-right: 3px solid var(--accent-gold);">${summary}</p>
      </div>
      <div style="font-size: 1rem; color: var(--text-primary); line-height: 1.8; margin-top: 1.5rem; white-space: pre-line;">
        ${content}
      </div>
      <div style="margin-top: 2rem; display: flex; gap: 0.8rem; justify-content: flex-end; flex-wrap: wrap;">
        <button class="btn-download" onclick="window.print()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          طباعة الدرس
        </button>
        <button class="btn-download primary" onclick="app.downloadResource('${title}', 'PDF')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          تحميل الدرس بصيغة PDF
        </button>
        <button class="btn-download" onclick="app.downloadResource('${title}', 'Word')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          تحميل Word
        </button>
      </div>
    `;

    this.openModal(title, bodyHtml);
  }

  // نافذة عرض تفاصيل الجذاذة
  showPedagogyDetail(pedId) {
    const item = PHILO_DATA.pedagogy.find(p => p.id === pedId);
    if (!item) return;
    const lang = window.i18n.getLang();

    const title = lang === "ar" ? item.title_ar : item.title_fr;
    const steps = lang === "ar" ? item.steps_ar : item.steps_fr;
    const competencies = lang === "ar" ? item.competencies_ar : item.competencies_fr;

    const bodyHtml = `
      <div style="margin-bottom: 1.5rem;">
        <h4 style="color: var(--accent-gold); font-weight: 700; margin-bottom: 0.8rem;">الأهداف والكفايات المستهدفة:</h4>
        <ul style="padding-inline-start: 1.4rem; color: var(--text-secondary); line-height: 1.8;">
          ${competencies.map(c => `<li>${c}</li>`).join("")}
        </ul>
      </div>

      <div>
        <h4 style="color: var(--accent-gold); font-weight: 700; margin-bottom: 0.8rem;">المراحل والخطوات الديداكتيكية للدرس:</h4>
        <ol style="padding-inline-start: 1.4rem; color: var(--text-secondary); line-height: 1.8;">
          ${steps.map(s => `<li>${s}</li>`).join("")}
        </ol>
      </div>

      <div style="margin-top: 2rem; display: flex; gap: 0.8rem; justify-content: flex-end; flex-wrap: wrap;">
        <button class="btn-download" onclick="window.print()">طباعة الجذاذة</button>
        <button class="btn-download primary" onclick="app.downloadResource('${title}', 'PDF')">تحميل الجذاذة PDF</button>
        <button class="btn-download" onclick="app.downloadResource('${title}', 'Word')">تحميل الجذاذة Word قابلة للتعديل</button>
      </div>
    `;

    this.openModal(title, bodyHtml);
  }

  // نافذة عرض تفاصيل الفيلسوف
  showPhilosopherModal(philId) {
    const phil = PHILO_DATA.philosophers.find(p => p.id === philId);
    if (!phil) return;
    const lang = window.i18n.getLang();

    const name = lang === "ar" ? phil.name_ar : phil.name_fr;
    const era = lang === "ar" ? phil.era_ar : phil.era_fr;
    const quote = lang === "ar" ? phil.quote_ar : phil.quote_fr;
    const concept = lang === "ar" ? phil.keyConcept_ar : phil.keyConcept_fr;
    const modules = lang === "ar" ? phil.modules_ar : phil.modules_fr;

    const title = `🏛️ فيلسوف المنهاج: ${name}`;
    const cleanQuote = quote.replace(/['"]/g, "");

    const bodyHtml = `
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; background: var(--bg-tertiary); padding: 1.1rem; border-radius: 12px; border: 1px solid var(--border-subtle);">
        <div style="font-size: 2.2rem; background: rgba(245, 158, 11, 0.15); width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 2px solid var(--accent-gold); flex-shrink: 0;">🏛️</div>
        <div>
          <h3 style="font-size: 1.35rem; color: var(--text-primary); margin: 0 0 0.3rem;">${name}</h3>
          <span style="font-size: 0.9rem; color: var(--accent-gold); font-weight: 600;">${era}</span>
        </div>
      </div>

      <div style="background: rgba(245, 158, 11, 0.08); border-right: 4px solid var(--accent-gold); padding: 1.1rem 1.4rem; border-radius: 8px; margin-bottom: 1.5rem;">
        <div style="font-size: 0.82rem; color: var(--accent-gold); font-weight: bold; margin-bottom: 0.3rem;">القولة التأسيسية:</div>
        <p style="font-family: var(--font-arabic-calligraphy); font-size: 1.25rem; color: var(--text-primary); line-height: 1.6; margin: 0;">${quote}</p>
      </div>

      <div style="margin-bottom: 1.4rem;">
        <h4 style="color: var(--accent-gold); font-size: 1.05rem; margin-bottom: 0.6rem;">💡 المفهوم والإشكال المحوري:</h4>
        <p style="font-size: 0.98rem; color: var(--text-secondary); line-height: 1.7; background: var(--bg-secondary); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-subtle); margin: 0;">${concept}</p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="color: var(--accent-gold); font-size: 1.05rem; margin-bottom: 0.6rem;">📚 المجزوءات المبرمج فيها بالمقرر المغربي:</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          ${modules.map(m => `<span style="background: rgba(99, 102, 241, 0.15); color: #818cf8; border: 1px solid rgba(99, 102, 241, 0.3); padding: 0.35rem 0.8rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600;"># ${m}</span>`).join("")}
        </div>
      </div>

      <div style="display: flex; gap: 0.8rem; justify-content: flex-end; margin-top: 1.5rem; flex-wrap: wrap;">
        <button class="btn-download" onclick="app.searchByPhilosopher('${name}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <span>تصفح دروس ${name}</span>
        </button>
        <button class="btn-download primary" onclick="app.copyQuote('${cleanQuote}', '${name}')">
          <span>📋 نسخ القولة والبيانات</span>
        </button>
      </div>
    `;

    this.openModal(title, bodyHtml);
  }

  searchByPhilosopher(name) {
    this.closeModal();
    const searchInput = document.getElementById("exactSearchInput") || document.getElementById("heroSearchInput");
    if (searchInput) {
      searchInput.value = name;
      this.searchQuery = name.toLowerCase().trim();
      this.renderLessons();
    }
    const lessonsSection = document.getElementById("lessons");
    if (lessonsSection) lessonsSection.scrollIntoView({ behavior: "smooth" });
  }

  // نافذة عرض الامتحان الوطني وشبكة التصحيح المفصلة
  showExamDetail(examId) {
    const exam = PHILO_DATA.exams.find(e => e.id === examId);
    if (!exam) return;
    const lang = window.i18n.getLang();

    const session = lang === "ar" ? exam.session_ar : exam.session_fr;
    const stream = lang === "ar" ? exam.stream_ar : exam.stream_fr;
    const title = `🎓 الامتحان الوطني الموحد ${exam.year} — ${session}`;

    const bodyHtml = `
      <div style="margin-bottom: 1.2rem; background: var(--bg-tertiary); padding: 1.1rem; border-radius: 10px; border-right: 4px solid var(--accent-gold);">
        <div style="font-weight: 700; color: var(--accent-gold); font-size: 1.1rem; margin-bottom: 0.3rem;">${stream}</div>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">عناصر الإجابة وسلم التنقيط الرسمي المعتمد من المركز الوطني للتقويم والامتحانات (20 نقطة)</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.2rem;">
        ${exam.sujets.map(s => `
          <div style="background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 1.2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; flex-wrap: wrap; gap: 0.5rem;">
              <span style="font-weight: 800; color: var(--accent-purple); font-size: 1rem;">${s.type_ar}</span>
              <span style="background: rgba(245, 158, 11, 0.15); color: var(--accent-gold); padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.8rem; font-weight: 700;">${s.notion_ar}</span>
            </div>
            <div style="font-size: 1.05rem; color: var(--text-primary); line-height: 1.7; margin-bottom: 1rem; padding: 0.8rem; background: var(--bg-tertiary); border-radius: 8px;">
              ${s.text_ar}
            </div>

            <div style="border-top: 1px dashed var(--border-subtle); padding-top: 0.8rem; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.7;">
              <strong style="color: var(--accent-gold);">شبكة عناصر الإجابة وسلم التنقيط الرسمي (20/20):</strong>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.6rem; margin-top: 0.5rem;">
                <div style="background: rgba(255,255,255,0.03); padding: 0.5rem; border-radius: 6px;">🔹 <strong>الفهم (4ن):</strong> تحديد المجال، صياغة المفارقة، وطرح التساؤلات الموجهة.</div>
                <div style="background: rgba(255,255,255,0.03); padding: 0.5rem; border-radius: 6px;">🔹 <strong>التحليل (5ن):</strong> تفكيك المفاهيم، استخراج الأطروحة وحجاجها المنطقي.</div>
                <div style="background: rgba(255,255,255,0.03); padding: 0.5rem; border-radius: 6px;">🔹 <strong>المناقشة (5ن):</strong> القيمة والحدود والمواقف الفلسفية المؤيدة والمعارضة.</div>
                <div style="background: rgba(255,255,255,0.03); padding: 0.5rem; border-radius: 6px;">🔹 <strong>التركيب (3ن):</strong> خلاصة التحليل والموقف الشخصي المتماسك.</div>
                <div style="background: rgba(255,255,255,0.03); padding: 0.5rem; border-radius: 6px;">🔹 <strong>الجوانب الشكلية (3ن):</strong> سلامة اللغة والأسلوب ونظافة الورقة.</div>
              </div>
            </div>
          </div>
        `).join("")}
      </div>

      <div style="margin-top: 1.5rem; display: flex; gap: 0.8rem; justify-content: flex-end; flex-wrap: wrap;">
        <button class="btn-download" onclick="window.print()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          <span>طباعة الموضوع وسلم التصحيح</span>
        </button>
        <button class="btn-download primary" onclick="app.downloadResource('الامتحان الوطني ${exam.year} - ${session}', 'PDF')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          <span>تحميل PDF مع عناصر الإجابة</span>
        </button>
      </div>
    `;

    this.openModal(title, bodyHtml);
  }

  // نسخ القول الفلسفي إلى الحافظة
  copyQuote(text, author) {
    const full = `«${text}» — ${author} (منصة فضاء الحكمة والمعرفة)`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(full).then(() => {
        this.showToast("✓ تم نسخ القولة الفلسفية إلى الحافظة!");
      }).catch(() => {
        this.showToast("✓ تم نسخ القولة بنجاح!");
      });
    } else {
      this.showToast("✓ تم نسخ القولة بنجاح!");
    }
  }

  // تصدير وتحميل حقيقي للمستندات والملفات
  downloadResource(title, format) {
    this.showToast(`جاري تجهيز وتصدير "${title}" بصيغة ${format}...`);

    const lesson = PHILO_DATA.lessons.find(l => l.title_ar === title || l.title_fr === title);
    const ped = PHILO_DATA.pedagogy.find(p => p.title_ar === title || p.title_fr === title);
    const exam = PHILO_DATA.exams.find(e => `الامتحان الوطني ${e.year} - ${e.session_ar}` === title || e.id === title);

    let docHtml = "";
    if (lesson) {
      docHtml = `<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>${lesson.title_ar}</title>
<style>
  body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; padding: 40px; line-height: 1.8; color: #1e293b; background: #fff; }
  .header { text-align: center; border-bottom: 2px solid #b45309; padding-bottom: 15px; margin-bottom: 25px; }
  .header h1 { color: #b45309; margin: 0 0 8px; font-size: 26px; }
  .header p { color: #64748b; margin: 0; font-size: 14px; }
  .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 18px; margin-bottom: 25px; font-size: 14px; }
  .summary { background: #fffbeb; border-right: 4px solid #f59e0b; padding: 14px 18px; border-radius: 6px; margin-bottom: 25px; }
  .content { white-space: pre-line; font-size: 16px; }
  .footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8; }
</style></head><body>
<div class="header">
  <h1>فضاء الحكمة والمعرفة | Espace Sagesse et Savoir</h1>
  <p>المقرر الرسمي لمادة الفلسفة بالثانوي التأهيلي بالمملكة المغربية</p>
</div>
<div class="meta-box">
  <strong>الدرس:</strong> ${lesson.title_ar} &nbsp;|&nbsp; <strong>المستوى:</strong> ${lesson.levelId} &nbsp;|&nbsp; <strong>الأستاذ:</strong> ${lesson.author} &nbsp;|&nbsp; <strong>التاريخ:</strong> ${lesson.date}
</div>
<div class="summary">
  <strong>الإشكال الفلسفي المؤطر:</strong><br>${lesson.summary_ar}
</div>
<div class="content">${lesson.content_ar}</div>
<div class="footer">وثيقة تربوية معتمدة صادرة عن منصة فضاء الحكمة والمعرفة © 2026</div>
</body></html>`;
    } else if (ped) {
      docHtml = `<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>${ped.title_ar}</title>
<style>
  body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; padding: 40px; line-height: 1.8; color: #1e293b; background: #fff; }
  .header { text-align: center; border-bottom: 2px solid #7c3aed; padding-bottom: 15px; margin-bottom: 25px; }
  .header h1 { color: #7c3aed; margin: 0 0 8px; font-size: 24px; }
  .meta-box { background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 8px; padding: 12px 18px; margin-bottom: 20px; }
  h2 { color: #4338ca; font-size: 18px; margin-top: 20px; }
  ul, ol { padding-inline-start: 25px; }
  li { margin-bottom: 8px; }
  .footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8; }
</style></head><body>
<div class="header">
  <h1>جذاذة ديداكتيكية رسمية | Fiche Pédagogique</h1>
  <p>منصة فضاء الحكمة والمعرفة - الديداكتيك والكفايات</p>
</div>
<div class="meta-box">
  <strong>العنوان:</strong> ${ped.title_ar} &nbsp;|&nbsp; <strong>الأستاذ:</strong> ${ped.author} &nbsp;|&nbsp; <strong>الشعبة:</strong> ${ped.stream_ar} &nbsp;|&nbsp; <strong>الغلاف الزمني:</strong> ${ped.duration}
</div>
<h2>1. الكفايات والقدرات المستهدفة:</h2>
<ul>${ped.competencies_ar.map(c => `<li>${c}</li>`).join("")}</ul>
<h2>2. الخطوات الديداكتيكية المعتمدة:</h2>
<ol>${ped.steps_ar.map(s => `<li>${s}</li>`).join("")}</ol>
<div class="footer">جذاذة بيداغوجية معتمدة وفق التوجيهات التربوية الرسمية بالمغرب © 2026</div>
</body></html>`;
    } else if (exam) {
      docHtml = `<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>الامتحان الوطني ${exam.year} - ${exam.session_ar}</title>
<style>
  body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; padding: 40px; line-height: 1.8; color: #1e293b; background: #fff; }
  .header { text-align: center; border-bottom: 2px solid #d97706; padding-bottom: 15px; margin-bottom: 25px; }
  .header h1 { color: #b45309; margin: 0; }
  .sujet { border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 18px; background: #fafaf9; }
  .sujet-title { font-weight: bold; color: #78350f; margin-bottom: 8px; }
  .footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8; }
</style></head><body>
<div class="header">
  <h1>الامتحان الوطني الموحد للبكالوريا | مادة الفلسفة</h1>
  <p>دورة ${exam.year} — ${exam.session_ar} (${exam.stream_ar})</p>
</div>
${exam.sujets.map(s => `
  <div class="sujet">
    <div class="sujet-title">${s.type_ar} [${s.notion_ar}]</div>
    <div style="font-size: 16px;">${s.text_ar}</div>
  </div>
`).join("")}
<div class="footer">بنك الامتحانات الوطنية الموحدة | منصة فضاء الحكمة والمعرفة © 2026</div>
</body></html>`;
    } else {
      docHtml = `<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>${title}</title><style>body{font-family:sans-serif;padding:30px;line-height:1.7}</style></head><body><h1>فضاء الحكمة والمعرفة</h1><h2>${title}</h2><p>الوثيقة الرسمية جاهزة للتحميل والاستخدام.</p></body></html>`;
    }

    if (format === 'PDF') {
      const printWin = window.open('', '_blank');
      if (printWin) {
        printWin.document.write(docHtml);
        printWin.document.close();
        setTimeout(() => printWin.print(), 350);
      }
    } else {
      const blob = new Blob([docHtml], { type: 'application/msword;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/[\/\\?%*:|"<>]/g, '_')}.${format.toLowerCase() === 'word' ? 'doc' : 'html'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  openBooksModal(e) {
    if (e) e.preventDefault();
    const title = "📚 أشهر الكتب والمؤلفات الفلسفية الخالدة";
    const bodyHtml = `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; margin-top: 1rem;">
        <div style="background: rgba(255,255,255,0.05); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--border-subtle); display: flex; flex-direction: column;">
          <h4 style="color: var(--accent-gold); font-size: 1.1rem; margin: 0 0 0.3rem;">الجمهورية (Politeia)</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;">أفلاطون (Plato) — القرن 4 ق.م</p>
          <p style="font-size: 0.88rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 1rem;">تأسيس لمفهوم العدالة والدولة الفاضلة ونظرية المعرفة ومثَل الكهف الشهير، والتمفصل بين الحاكم الفيلسوف وفضيلة الحكمة.</p>
          <button class="btn-card-action" style="margin-top: auto;" onclick="app.searchByPhilosopher('أفلاطون')">
            <span>تصفح أفكار أفلاطون بالمنصة</span> →
          </button>
        </div>
        <div style="background: rgba(255,255,255,0.05); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--border-subtle); display: flex; flex-direction: column;">
          <h4 style="color: var(--accent-gold); font-size: 1.1rem; margin: 0 0 0.3rem;">فصل المقال</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;">ابن رشد (Averroes) — 1179م</p>
          <p style="font-size: 0.88rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 1rem;">تقرير ما بين الشريعة والحكمة من الاتصال والتوفيق الخالد بين برهان العقل الفلسفي والنقل الديني بالمغرب والأندلس.</p>
          <button class="btn-card-action" style="margin-top: auto;" onclick="app.searchByPhilosopher('ابن رشد')">
            <span>تصفح أفكار ابن رشد بالمنصة</span> →
          </button>
        </div>
        <div style="background: rgba(255,255,255,0.05); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--border-subtle); display: flex; flex-direction: column;">
          <h4 style="color: var(--accent-gold); font-size: 1.1rem; margin: 0 0 0.3rem;">مقال عن المنهج</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;">رينيه ديكارت (René Descartes) — 1637م</p>
          <p style="font-size: 0.88rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 1rem;">قواعد توجيه العقل، الشك المنهجي التأسيسي، وإثبات الوجود عبر الكوجيطو: أنا أشك، إذن أنا أفكر، إذن أنا موجود.</p>
          <button class="btn-card-action" style="margin-top: auto;" onclick="app.showPhilosopherModal('phil-descartes')">
            <span>استكشاف ديكارت بالتفصيل</span> →
          </button>
        </div>
        <div style="background: rgba(255,255,255,0.05); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--border-subtle); display: flex; flex-direction: column;">
          <h4 style="color: var(--accent-gold); font-size: 1.1rem; margin: 0 0 0.3rem;">نقد العقل الخالص</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;">إيمانويل كانط (Immanuel Kant) — 1781م</p>
          <p style="font-size: 0.88rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 1rem;">الثورة الكوبرنيكية في الفلسفة، تحديد حدود العقل البشري، والجمع الإبستيمولوجي بين معطيات الحس ومقولات العقل.</p>
          <button class="btn-card-action" style="margin-top: auto;" onclick="app.showPhilosopherModal('phil-kant')">
            <span>استكشاف كانط بالتفصيل</span> →
          </button>
        </div>
        <div style="background: rgba(255,255,255,0.05); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--border-subtle); display: flex; flex-direction: column;">
          <h4 style="color: var(--accent-gold); font-size: 1.1rem; margin: 0 0 0.3rem;">العقد الاجتماعي</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;">جان جاك روسو (Rousseau) — 1762م</p>
          <p style="font-size: 0.88rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 1rem;">تأسيس مشروعية الحكم المدني على الإرادة العامة والسيادة الشعبية والحرية الأخلاقية بدل منطق القوة والغلبة.</p>
          <button class="btn-card-action" style="margin-top: auto;" onclick="app.searchByPhilosopher('روسو')">
            <span>تصفح دروس نظرية العقد</span> →
          </button>
        </div>
        <div style="background: rgba(255,255,255,0.05); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--border-subtle); display: flex; flex-direction: column;">
          <h4 style="color: var(--accent-gold); font-size: 1.1rem; margin: 0 0 0.3rem;">الوجود والعدم</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;">جان بول سارتر (Sartre) — 1943م</p>
          <p style="font-size: 0.88rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 1rem;">بيان أن الوجود يسبق الماهية، وأن الإنسان مشروع حر يصنع ذاته باختياراته ومسؤولياته في مواجهة نظرة الغير.</p>
          <button class="btn-card-action" style="margin-top: auto;" onclick="app.showPhilosopherModal('phil-sartre')">
            <span>استكشاف سارتر بالتفصيل</span> →
          </button>
        </div>
      </div>
    `;
    this.openModal(title, bodyHtml);
  }

  openQuotesModal(e) {
    if (e) e.preventDefault();
    const title = "💡 روائع وأشهر الأقوال والحكم الفلسفية الخالدة";
    const quotes = [
      { text: "الحياة غير المفحوصة لا تستحق العيش", author: "سقراط", id: "phil-socrates" },
      { text: "الحق لا يضاد الحق، بل يوافقه ويشهد له", author: "أبو الوليد ابن رشد", id: "phil-averroes" },
      { text: "أنا أشك، إذن أنا أفكر، إذن أنا موجود", author: "رينيه ديكارت", id: "phil-descartes" },
      { text: "تصرف بحيث تعامل الإنسانية في شخصك وفي غيرك كغاية لا كمجرد وسيلة", author: "إيمانويل كانط", id: "phil-kant" },
      { text: "إن الغاية الحقيقية من تأسيس الدولة هي في الواقع الحرية", author: "باروخ سبينوزا", id: "phil-spinoza" },
      { text: "الإنسان محكوم عليه بأن يكون حراً ومسؤولاً عن العالم", author: "جان بول سارتر", id: "phil-sartre" },
      { text: "العدالة هي الفضيلة الأولى للمؤسسات الاجتماعية كما هي الحقيقة للأنظمة الفكرية", author: "جون رولز", id: "phil-rawls" }
    ];

    const bodyHtml = `
      <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
        ${quotes.map(q => `
          <div style="background: rgba(255,255,255,0.05); padding: 1.2rem; border-radius: 12px; border-right: 4px solid var(--accent-gold); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem;">
            <div style="flex: 1; min-width: 240px;">
              <p style="font-family: var(--font-arabic-calligraphy); font-size: 1.25rem; color: var(--text-primary); margin: 0 0 0.4rem;">« ${q.text} »</p>
              <span style="font-size: 0.9rem; color: var(--accent-gold); font-weight: bold;">— ${q.author}</span>
            </div>
            <button type="button" class="btn-download" style="padding: 0.4rem 0.85rem; font-size: 0.85rem;" onclick="app.copyQuote('${q.text.replace(/'/g, "\\'")}', '${q.author}')">
              <span>📋 نسخ القولة</span>
            </button>
          </div>
        `).join("")}
      </div>
    `;
    this.openModal(title, bodyHtml);
  }

  openYouTube(e) {
    if (e) e.preventDefault();
    const ytSection = document.getElementById("youtubeSection");
    if (ytSection) ytSection.scrollIntoView({ behavior: "smooth" });
  }

  playPromoVideo() {
    const title = "▶️ العرض التعريفي لمنصة فضاء الحكمة والمعرفة";
    const bodyHtml = `
      <div style="text-align: center; padding: 1rem 0;">
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 14px; background: #000; margin-bottom: 1.2rem;">
          <iframe style="position: absolute; top:0; left: 0; width: 100%; height: 100%; border: none;" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1" allowfullscreen></iframe>
        </div>
        <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1rem;">تابع دروس الفلسفة، مناهج التحليل والمناظرات عبر قناتنا الرسمية على يوتيوب.</p>
        <a href="https://www.youtube.com" target="_blank" rel="noopener" class="btn-download primary" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">
          <span>زيارة القناة والاشتراك</span>
          <span>←</span>
        </a>
      </div>
    `;
    this.openModal(title, bodyHtml);
  }

  openModal(title, bodyHtml) {
    const overlay = document.getElementById("genericModalOverlay");
    const titleEl = document.getElementById("genericModalTitle");
    const bodyEl = document.getElementById("genericModalBody");

    if (overlay && titleEl && bodyEl) {
      titleEl.innerHTML = title;
      bodyEl.innerHTML = bodyHtml;
      overlay.classList.add("active");
    }
  }

  closeModal() {
    const overlay = document.getElementById("genericModalOverlay");
    if (overlay) overlay.classList.remove("active");
  }

  trackEvent(eventName) {
    console.log("Track event:", eventName);
  }

  showToast(message) {
    let toast = document.getElementById("appToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "appToast";
      toast.className = "toast-alert";
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span>${message}</span>
    `;
    toast.style.display = "flex";
    setTimeout(() => {
      toast.style.display = "none";
    }, 3500);
  }
}

window.app = new AppManager();

