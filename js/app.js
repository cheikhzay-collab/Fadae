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
    this.bindEvents();
    this.renderAll();

    // استماع لتغيير اللغة
    window.addEventListener("languageChanged", () => {
      this.updateLanguageBadges();
      this.renderAll();
    });
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

  setupTheme() {
    const savedTheme = localStorage.getItem("philo_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    this.updateThemeButton(savedTheme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("philo_theme", next);
    this.updateThemeButton(next);
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
      btn.innerHTML = icon;
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
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderLessons();
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
    const el = document.getElementById("sectionLessons");
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
            <button class="btn-download primary" onclick="app.downloadResource('الامتحان الوطني ${exam.year} - ${session}', 'PDF')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>${window.i18n.t("btn_download_pdf")} مع عناصر الإجابة</span>
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
        <div class="philosopher-card">
          <div class="philosopher-avatar">
            🏛️
          </div>
          <h3 class="philosopher-name">${name}</h3>
          <span class="philosopher-era">${era}</span>
          <p class="philosopher-quote">${quote}</p>
          <div class="philosopher-concept">
            <strong>${lang === "ar" ? "المفهوم المحوري:" : "Notion clé :"}</strong> ${concept}
          </div>
        </div>
      `;
    }).join("");
  }

  // عرض المنهجيات المعتمدة
  renderMethodology() {
    const container = document.getElementById("methodologyContainer");
    if (!container) return;
    const lang = window.i18n.getLang();

    const meth = PHILO_DATA.methodologies[0]; // منهجية السؤال الإشكالي
    const title = lang === "ar" ? meth.title_ar : meth.title_fr;

    container.innerHTML = `
      <div class="pedagogy-card" style="grid-column: 1 / -1;">
        <div class="pedagogy-card-header">
          <div>
            <h3 class="pedagogy-title">${title}</h3>
            <p style="color: var(--accent-gold); font-size: 0.9rem; margin-top: 0.3rem;">معايير المركز الوطني للتقويم والامتحانات (الشبكة الرسمية 20 ن)</p>
          </div>
          <span class="pedagogy-badge">20 / 20</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 1.2rem;">
          ${meth.rubrics.map(r => {
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
      <div style="margin-top: 2rem; display: flex; gap: 0.8rem; justify-content: flex-end;">
        <button class="btn-download primary" onclick="app.downloadResource('${title}', 'PDF')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          تحميل الدرس بصيغة PDF
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

      <div style="margin-top: 2rem; display: flex; gap: 0.8rem; justify-content: flex-end;">
        <button class="btn-download primary" onclick="app.downloadResource('${title}', 'PDF')">تحميل الجذاذة PDF</button>
        <button class="btn-download" onclick="app.downloadResource('${title}', 'Word')">تحميل الجذاذة Word قابلة للتعديل</button>
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

  downloadResource(title, format) {
    this.showToast(`جاري تجهيز وتحميل "${title}" بصيغة ${format}...`);
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
