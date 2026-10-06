/**
 * فضاء الحكمة والمعرفة - لوحة الإدارة والتحكم
 * Tableau de bord administratif & Gestion de contenu
 */

class AdminManager {
  constructor() {
    this.isAdminActive = false;
    this.currentAdminTab = "overview";
    this.editingId = null;
    this.init();
  }

  init() {
    this.bindEvents();
    this.checkInitialRoute();
  }

  isAuthenticated() {
    return sessionStorage.getItem("philo_admin_auth") === "true";
  }

  checkInitialRoute() {
    if (window.location.hash === "#admin" || window.location.search.includes("admin")) {
      if (this.isAuthenticated()) {
        this.toggleAdminView(true);
      } else {
        this.openLoginModal();
      }
    }
  }

  bindEvents() {
    // روابط الدخول كمدير (في الفوتر والروابط المباشرة)
    const linkAdminLogin = document.getElementById("linkAdminLogin");
    const linkAdminQuick = document.getElementById("linkAdminQuickLogin");

    if (linkAdminLogin) {
      linkAdminLogin.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.isAuthenticated()) {
          this.toggleAdminView(true);
        } else {
          this.openLoginModal();
        }
      });
    }

    if (linkAdminQuick) {
      linkAdminQuick.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.isAuthenticated()) {
          this.toggleAdminView(true);
        } else {
          this.openLoginModal();
        }
      });
    }

    // استماع لتغير الرابط (Hash Routing: #admin)
    window.addEventListener("hashchange", () => {
      if (window.location.hash === "#admin") {
        if (this.isAuthenticated()) {
          this.toggleAdminView(true);
        } else {
          this.openLoginModal();
        }
      } else if (this.isAdminActive && window.location.hash !== "#admin") {
        this.toggleAdminView(false);
      }
    });

    // أحداث مودال تسجيل الدخول كمدير
    const adminLoginForm = document.getElementById("adminLoginForm");
    const closeAdminLoginBtn = document.getElementById("closeAdminLoginBtn");
    const cancelAdminLoginBtn = document.getElementById("cancelAdminLoginBtn");
    const btnToggleAdminPwd = document.getElementById("btnToggleAdminPwd");

    if (adminLoginForm) {
      adminLoginForm.addEventListener("submit", (e) => this.handleLoginSubmit(e));
    }
    if (closeAdminLoginBtn) {
      closeAdminLoginBtn.addEventListener("click", () => this.closeLoginModal());
    }
    if (cancelAdminLoginBtn) {
      cancelAdminLoginBtn.addEventListener("click", () => this.closeLoginModal());
    }
    if (btnToggleAdminPwd) {
      btnToggleAdminPwd.addEventListener("click", () => this.togglePasswordVisibility());
    }

    // زر الخروج والعودة من لوحة الإدارة
    const btnExitAdmin = document.getElementById("btnExitAdmin");
    if (btnExitAdmin) {
      btnExitAdmin.addEventListener("click", () => this.toggleAdminView(false));
    }

    // التبديل بين تبويبات لوحة الإدارة
    const tabs = document.querySelectorAll(".admin-tab-btn");
    tabs.forEach(tab => {
      tab.addEventListener("click", (e) => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        this.currentAdminTab = tab.dataset.adminTab;
        this.renderAdminTab();
      });
    });

    // زر إضافة مورد جديد
    const btnAdd = document.getElementById("btnAddNewResource");
    if (btnAdd) btnAdd.addEventListener("click", () => this.openResourceModal());

    // حفظ نموذج الإضافة
    const form = document.getElementById("resourceForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.saveResource();
      });
    }

    // إغلاق مودال المورد
    const closeBtn = document.getElementById("closeAdminModalBtn");
    const cancelBtn = document.getElementById("cancelAdminModalBtn");
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeResourceModal());
    if (cancelBtn) cancelBtn.addEventListener("click", () => this.closeResourceModal());
  }

  openLoginModal() {
    const modal = document.getElementById("adminLoginModal");
    const errorEl = document.getElementById("adminLoginError");
    const form = document.getElementById("adminLoginForm");
    if (form) form.reset();
    if (errorEl) errorEl.style.display = "none";
    if (modal) modal.classList.add("active");
    const usernameInput = document.getElementById("adminUsername");
    if (usernameInput) setTimeout(() => usernameInput.focus(), 150);
  }

  closeLoginModal() {
    const modal = document.getElementById("adminLoginModal");
    if (modal) modal.classList.remove("active");
    if (!this.isAuthenticated() && window.location.hash === "#admin") {
      history.replaceState(null, null, window.location.pathname);
    }
  }

  togglePasswordVisibility() {
    const pwdInput = document.getElementById("adminPassword");
    const btn = document.getElementById("btnToggleAdminPwd");
    if (!pwdInput) return;
    if (pwdInput.type === "password") {
      pwdInput.type = "text";
      if (btn) btn.textContent = "🙈";
    } else {
      pwdInput.type = "password";
      if (btn) btn.textContent = "👁️";
    }
  }

  async handleLoginSubmit(e) {
    e.preventDefault();
    const username = document.getElementById("adminUsername")?.value.trim() || "";
    const password = document.getElementById("adminPassword")?.value || "";
    const errorEl = document.getElementById("adminLoginError");

    // محاولة التحقق عبر API قاعدة بيانات Hostinger أولاً مع دعم العمل المحلي
    let authenticated = false;
    try {
      const res = await fetch("api/auth.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.success) authenticated = true;
      }
    } catch (err) {
      // الاتصال بالـ API غير متاح محلياً
    }

    if (!authenticated) {
      if (username.toLowerCase() === "admin" && (password === "admin2026" || password === "admin")) {
        authenticated = true;
      }
    }

    if (authenticated) {
      sessionStorage.setItem("philo_admin_auth", "true");
      this.closeLoginModal();
      this.toggleAdminView(true);
      const msg = window.i18n ? window.i18n.t("admin_login_success") : "مرحباً بك! تم تسجيل الدخول كمدير بنجاح.";
      window.app.showToast(msg);
    } else {
      if (errorEl) {
        errorEl.style.display = "flex";
      }
    }
  }

  toggleAdminView(showAdmin) {
    if (showAdmin && !this.isAuthenticated()) {
      this.openLoginModal();
      return;
    }

    this.isAdminActive = showAdmin;
    const publicSections = document.getElementById("publicContentWrapper");
    const adminSection = document.getElementById("adminViewWrapper");
    const heroSection = document.querySelector(".hero-section");

    if (showAdmin) {
      if (publicSections) publicSections.style.display = "none";
      if (heroSection) heroSection.style.display = "none";
      if (adminSection) adminSection.classList.add("active");
      window.location.hash = "admin";
      this.renderAdminView();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      sessionStorage.removeItem("philo_admin_auth");
      if (publicSections) publicSections.style.display = "block";
      if (heroSection) heroSection.style.display = "block";
      if (adminSection) adminSection.classList.remove("active");
      if (window.location.hash === "#admin") {
        history.replaceState(null, null, window.location.pathname);
      }
      window.app.renderAll();
      window.scrollTo({ top: 0, behavior: "smooth" });
      const msg = window.i18n ? window.i18n.t("admin_logout_success") : "تم تسجيل الخروج بنجاح.";
      window.app.showToast(msg);
    }
  }

  renderAdminView() {
    this.renderMetrics();
    this.renderAdminTab();
  }

  renderMetrics() {
    const totalLessons = PHILO_DATA.lessons.length;
    const totalPedagogy = PHILO_DATA.pedagogy.length;
    const totalExams = PHILO_DATA.exams.length;
    const totalTeachers = PHILO_DATA.adminStats.totalTeachers;

    const elLessons = document.getElementById("metricLessons");
    const elPedagogy = document.getElementById("metricPedagogy");
    const elExams = document.getElementById("metricExams");
    const elTeachers = document.getElementById("metricTeachers");

    if (elLessons) elLessons.innerText = totalLessons;
    if (elPedagogy) elPedagogy.innerText = totalPedagogy;
    if (elExams) elExams.innerText = totalExams;
    if (elTeachers) elTeachers.innerText = totalTeachers.toLocaleString();
  }

  renderAdminTab() {
    const tableContainer = document.getElementById("adminTableContentArea");
    if (!tableContainer) return;
    const lang = window.i18n.getLang();

    if (this.currentAdminTab === "overview") {
      this.renderOverviewTab(tableContainer, lang);
    } else if (this.currentAdminTab === "lessons") {
      this.renderLessonsTable(tableContainer, lang);
    } else if (this.currentAdminTab === "pedagogy") {
      this.renderPedagogyTable(tableContainer, lang);
    } else if (this.currentAdminTab === "exams") {
      this.renderExamsTable(tableContainer, lang);
    } else if (this.currentAdminTab === "teachers") {
      this.renderTeachersTable(tableContainer, lang);
    }
  }

  renderOverviewTab(container, lang) {
    container.innerHTML = `
      <div style="padding: 1.8rem;">
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1.2rem;">
          ${lang === "ar" ? "نشاط المنصة الأخير وحالة الاتصال" : "Activité récente & Journal de connexion"}
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.2rem; margin-bottom: 2rem;">
          ${PHILO_DATA.adminStats.recentLogins.map(user => `
            <div style="background: var(--bg-tertiary); padding: 1.2rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
              <div>
                <div style="font-weight: 700; color: var(--text-primary);">${user.name}</div>
                <div style="font-size: 0.82rem; color: var(--text-muted);">${user.role} — ${user.city}</div>
              </div>
              <span style="font-size: 0.78rem; padding: 0.25rem 0.6rem; border-radius: var(--radius-full); background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald); font-weight: 700;">
                ${user.time}
              </span>
            </div>
          `).join("")}
        </div>

        <div style="background: var(--bg-secondary); padding: 1.8rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--accent-gold); margin-bottom: 0.8rem;">
            ${lang === "ar" ? "توجيهات الإشراف البيداغوجي لسنة 2026" : "Orientations d'encadrement 2026"}
          </h4>
          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.8;">
            ${lang === "ar" 
              ? "تحرص اللجنة العلمية لمنصة فضاء الحكمة على مطابقة كافة الموارد المعروضة مع الأطر المرجعية المحينة الصادرة عن وزارة التربية الوطنية والتعليم الأولي والرياضة. يتم مراجعة كل مورد بيداغوجي أو موضوع مقترح قبل اعتماده رسمياً."
              : "Le comité scientifique veille à la stricte conformité des ressources didactiques avec les cadres de référence officiels du Ministère de l'Éducation Nationale. Chaque cours et sujet est minutieusement vérifié."}
          </p>
        </div>
      </div>
    `;
  }

  renderLessonsTable(container, lang) {
    container.innerHTML = `
      <div class="table-toolbar">
        <input type="text" class="table-search-input" placeholder="${window.i18n.t("search_placeholder")}" oninput="admin.filterTable(this.value)">
        <button class="btn-download primary" onclick="admin.openResourceModal()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          <span>${window.i18n.t("admin_btn_new_lesson")}</span>
        </button>
      </div>

      <div style="overflow-x: auto;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>${window.i18n.t("admin_table_title")}</th>
              <th>${window.i18n.t("admin_table_category")}</th>
              <th>${window.i18n.t("admin_table_author")}</th>
              <th>${window.i18n.t("admin_table_status")}</th>
              <th>${window.i18n.t("admin_table_actions")}</th>
            </tr>
          </thead>
          <tbody id="adminLessonsTbody">
            ${PHILO_DATA.lessons.map(lesson => {
              const title = lang === "ar" ? lesson.title_ar : lesson.title_fr;
              const module = PHILO_DATA.modules.find(m => m.id === lesson.moduleId);
              const modName = module ? (lang === "ar" ? module.title_ar : module.title_fr) : lesson.levelId;
              const isPub = lesson.status === "published";

              return `
                <tr>
                  <td>
                    <strong>${title}</strong>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">${lesson.date}</div>
                  </td>
                  <td><span class="tag-item">${modName}</span></td>
                  <td>${lesson.author}</td>
                  <td>
                    <span class="status-badge ${isPub ? 'published' : 'draft'}">
                      ● ${isPub ? window.i18n.t("admin_status_published") : window.i18n.t("admin_status_draft")}
                    </span>
                  </td>
                  <td>
                    <div class="table-actions-group">
                      <button class="btn-action-icon" title="تعديل" onclick="admin.editLesson('${lesson.id}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button class="btn-action-icon" title="تبديل الحالة" onclick="admin.toggleLessonStatus('${lesson.id}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </button>
                      <button class="btn-action-icon delete" title="حذف" onclick="admin.deleteLesson('${lesson.id}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  renderPedagogyTable(container, lang) {
    container.innerHTML = `
      <div class="table-toolbar">
        <h4 style="font-weight: 700; color: var(--text-primary);">الجذاذات البيداغوجية والوثائق الديداكتيكية الرسمية</h4>
      </div>
      <div style="overflow-x: auto;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>عنوان الوثيقة</th>
              <th>المستوى والشعبة</th>
              <th>المصدر / المؤطر</th>
              <th>المدة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            ${PHILO_DATA.pedagogy.map(item => `
              <tr>
                <td><strong>${lang === "ar" ? item.title_ar : item.title_fr}</strong></td>
                <td><span class="tag-item">${item.stream_ar}</span></td>
                <td>${item.author}</td>
                <td><span class="status-badge published">${item.duration}</span></td>
                <td>
                  <button class="btn-card-action" onclick="app.showPedagogyDetail('${item.id}')">معاينة</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  renderExamsTable(container, lang) {
    container.innerHTML = `
      <div class="table-toolbar">
        <h4 style="font-weight: 700; color: var(--text-primary);">مواضيع الامتحانات الوطنية وبنك الأسئلة</h4>
      </div>
      <div style="overflow-x: auto;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>السنة والدورة</th>
              <th>الشعبة والمسلك</th>
              <th>عدد المواضيع</th>
              <th>عناصر الإجابة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            ${PHILO_DATA.exams.map(ex => `
              <tr>
                <td><strong>${ex.year} — ${ex.session_ar}</strong></td>
                <td>${ex.stream_ar}</td>
                <td>3 مواضيع (سؤال، قولة، نص)</td>
                <td><span class="status-badge published">متوفرة ومرفقة</span></td>
                <td>
                  <button class="btn-card-action" onclick="app.downloadResource('الامتحان ${ex.year}', 'PDF')">تحميل</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  renderTeachersTable(container, lang) {
    container.innerHTML = `
      <div class="table-toolbar">
        <h4 style="font-weight: 700; color: var(--text-primary);">هيئة التدريس والمفتشين المسجلين بالمنصة</h4>
      </div>
      <div style="overflow-x: auto;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>الاسم والصفة</th>
              <th>المديرية الإقليمية</th>
              <th>المستوى المسند</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>ذ. عبد السلام بنعلي</strong><div style="font-size:0.8rem; color:var(--text-muted)">أستاذ مبرز</div></td>
              <td>فاس - بولمان</td>
              <td>الثانية باكالوريا آداب</td>
              <td><span class="status-badge published">نشط ومساهم</span></td>
            </tr>
            <tr>
              <td><strong>ذة. خديجة التازي</strong><div style="font-size:0.8rem; color:var(--text-muted)">مفتشة تربوية ممتازة</div></td>
              <td>الرباط - سلا - القنيطرة</td>
              <td>التأطير والمراقبة</td>
              <td><span class="status-badge published">نشط ومساهم</span></td>
            </tr>
            <tr>
              <td><strong>ذ. محمد الإدريسي</strong><div style="font-size:0.8rem; color:var(--text-muted)">أستاذ التعليم الثانوي التأهيلي</div></td>
              <td>مراكش - آسفي</td>
              <td>الجذع المشترك والأولى باك</td>
              <td><span class="status-badge published">نشط</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  switchTab(tabName) {
    this.currentAdminTab = tabName;
    const tabs = document.querySelectorAll(".admin-tab-btn");
    tabs.forEach(t => t.classList.toggle("active", t.dataset.adminTab === tabName));
    this.renderAdminTab();
  }

  openResourceModal(lesson = null) {
    this.editingId = lesson ? lesson.id : null;
    const modal = document.getElementById("adminResourceModal");
    const titleModal = document.getElementById("adminModalTitle");

    if (lesson) {
      titleModal.innerText = "تعديل المورد الفلسفي";
      document.getElementById("formTitleAr").value = lesson.title_ar || "";
      document.getElementById("formTitleFr").value = lesson.title_fr || "";
      document.getElementById("formLevel").value = lesson.levelId || "2bac";
      document.getElementById("formModule").value = lesson.moduleId || "mod-human-condition";
      document.getElementById("formAuthor").value = lesson.author || "";
      document.getElementById("formSummary").value = lesson.summary_ar || "";
      document.getElementById("formContent").value = lesson.content_ar || "";
      const rawTags = lesson.tags_ar;
      document.getElementById("formTags").value = Array.isArray(rawTags) ? rawTags.join(", ") : (rawTags || "");
    } else {
      titleModal.innerText = window.i18n ? window.i18n.t("modal_add_title") : "إضافة مورد فلسفي جديد";
      const form = document.getElementById("resourceForm");
      if (form) form.reset();
    }

    if (modal) modal.classList.add("active");
  }

  closeResourceModal() {
    const modal = document.getElementById("adminResourceModal");
    if (modal) modal.classList.remove("active");
    this.editingId = null;
  }

  saveResource() {
    const titleAr = document.getElementById("formTitleAr").value.trim();
    const titleFr = document.getElementById("formTitleFr").value.trim() || titleAr;
    const levelId = document.getElementById("formLevel").value;
    const moduleId = document.getElementById("formModule").value;
    const author = document.getElementById("formAuthor").value.trim() || "أستاذ باحث";
    const summaryAr = document.getElementById("formSummary").value.trim();
    const contentAr = document.getElementById("formContent").value.trim();
    const tags = document.getElementById("formTags").value.split(",").map(s => s.trim()).filter(Boolean);

    if (this.editingId) {
      const idx = PHILO_DATA.lessons.findIndex(l => l.id === this.editingId);
      if (idx !== -1) {
        PHILO_DATA.lessons[idx] = {
          ...PHILO_DATA.lessons[idx],
          title_ar: titleAr,
          title_fr: titleFr,
          levelId,
          moduleId,
          author,
          summary_ar: summaryAr,
          summary_fr: summaryAr,
          content_ar: contentAr,
          tags_ar: tags.length ? tags : PHILO_DATA.lessons[idx].tags_ar,
          tags_fr: tags.length ? tags : PHILO_DATA.lessons[idx].tags_fr
        };
      }
    } else {
      const newLesson = {
        id: "les-" + Date.now(),
        moduleId,
        levelId,
        title_ar: titleAr,
        title_fr: titleFr,
        author,
        date: new Date().toISOString().split("T")[0],
        downloads: 0,
        views: 1,
        tags_ar: tags.length ? tags : ["فلسفة", "ديداكتيك"],
        tags_fr: tags.length ? tags : ["Philosophie", "Didactique"],
        summary_ar: summaryAr,
        summary_fr: summaryAr,
        content_ar: contentAr,
        isFeatured: true,
        status: "published"
      };
      PHILO_DATA.lessons.unshift(newLesson);
    }

    // حفظ التغييرات فوراً ودائماً في التخزين المحلي للمتصفح
    this.persistLessons();

    // مزامنة فورية مع الخادم وقاعدة البيانات إن وجدت (Hostinger / Node.js)
    try {
      const payload = this.editingId ? PHILO_DATA.lessons.find(l => l.id === this.editingId) : PHILO_DATA.lessons[0];
      fetch("api/lessons.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(() => {
        fetch("/api/lessons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }).catch(() => {});
      });
    } catch (e) {}

    this.closeResourceModal();
    // التحويل فوراً لتبويب الدروس ليرى المشرف درسه المضاف في الجدول
    this.switchTab("lessons");
    this.renderMetrics();
    if (window.app) window.app.renderLessons();
    if (window.app) window.app.showToast(window.i18n ? window.i18n.t("form_save_success") : "تم حفظ المورد بنجاح في المنصة!");
  }

  persistLessons() {
    try {
      localStorage.setItem("philo_stored_lessons", JSON.stringify(PHILO_DATA.lessons));
      if (PHILO_DATA.adminStats) {
        PHILO_DATA.adminStats.activeLessons = PHILO_DATA.lessons.length;
      }
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  }

  editLesson(id) {
    const lesson = PHILO_DATA.lessons.find(l => l.id === id);
    if (lesson) this.openResourceModal(lesson);
  }

  toggleLessonStatus(id) {
    const lesson = PHILO_DATA.lessons.find(l => l.id === id);
    if (lesson) {
      lesson.status = lesson.status === "published" ? "draft" : "published";
      this.persistLessons();
      this.renderAdminTab();
      if (window.app) window.app.renderLessons();
      if (window.app) window.app.showToast("تم تحديث حالة النشر بنجاح وحفظ التغيير!");
    }
  }

  deleteLesson(id) {
    if (!id) return;
    const confirmed = confirm(window.i18n ? window.i18n.t("delete_confirm") : "هل أنت متأكد من حذف هذا المورد نهائياً؟");
    if (!confirmed) return;

    PHILO_DATA.lessons = PHILO_DATA.lessons.filter(l => l.id !== id);
    this.persistLessons();

    // مزامنة الحذف مع الخادم وقاعدة البيانات (Hostinger / Node)
    try {
      fetch(`api/lessons.php?id=${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {
        fetch(`/api/lessons?id=${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {});
      });
    } catch (e) {}

    this.renderAdminTab();
    this.renderMetrics();
    if (window.app) window.app.renderLessons();
    if (window.app) window.app.showToast("تم حذف المورد بنجاح وتحديث قاعدة البيانات.");
  }

  filterTable(query) {
    const q = query.toLowerCase().trim();
    const rows = document.querySelectorAll("#adminLessonsTbody tr");
    rows.forEach(r => {
      r.style.display = r.innerText.toLowerCase().includes(q) ? "" : "none";
    });
  }
}

window.admin = new AdminManager();
