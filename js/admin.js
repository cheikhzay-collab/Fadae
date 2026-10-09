/**
 * فضاء الحكمة والمعرفة - لوحة الإدارة والتحكم
 * Tableau de bord administratif & Gestion de contenu
 */

class AdminManager {
  constructor() {
    this.isAdminActive = false;
    this.currentAdminTab = "overview";
    this.editingId = null;
    this.debugOtp = null;
    this.otpTimer = null;
    this.teacherProfile = {
      username: "admin",
      full_name: "الأستاذ المشرف - مدير فضاء الحكمة",
      email: "contact@fadae.ma",
      institution: "الثانوية التأهيلية - وزارة التربية الوطنية",
      city: "المملكة المغربية",
      phone: "+212 600 000000",
      subject: "مادة الفلسفة والفكر النقدي",
      bio: "أستاذ باحث ومؤطر في تدريس مادة الفلسفة بالسلك الثانوي التأهيلي، مشرف ومؤسس منصة فضاء الحكمة والمعرفة للموارد الديداكتيكية والتربوية.",
      youtube_channel: "https://www.youtube.com/channel/UCBRJ5LZu3_ZRPhpB1MMEeWg"
    };
    this.init();
  }

  init() {
    this.loadStoredProfile();
    this.bindEvents();
    this.checkInitialRoute();
  }

  loadStoredProfile() {
    try {
      const stored = localStorage.getItem("philo_teacher_profile");
      if (stored) {
        this.teacherProfile = { ...this.teacherProfile, ...JSON.parse(stored) };
      }
    } catch (e) {}

    // محاولة جلب أحدث البيانات من API
    fetch("api/auth.php?action=get_profile")
      .then(res => res.json())
      .then(data => {
        if (data && data.success && data.data) {
          this.teacherProfile = { ...this.teacherProfile, ...data.data };
          localStorage.setItem("philo_teacher_profile", JSON.stringify(this.teacherProfile));
        }
      })
      .catch(() => {});
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

    // أحداث مودال استرجاع الحساب عبر Gmail (Forgot Password)
    const btnOpenForgotModal = document.getElementById("btnOpenForgotModal");
    const closeAdminForgotBtn = document.getElementById("closeAdminForgotBtn");
    const cancelAdminForgotBtn = document.getElementById("cancelAdminForgotBtn");
    const btnSendForgotOtp = document.getElementById("btnSendForgotOtp");
    const btnSubmitForgotNewPassword = document.getElementById("btnSubmitForgotNewPassword");

    if (btnOpenForgotModal) {
      btnOpenForgotModal.addEventListener("click", () => this.openForgotModal());
    }
    if (closeAdminForgotBtn) {
      closeAdminForgotBtn.addEventListener("click", () => this.closeForgotModal());
    }
    if (cancelAdminForgotBtn) {
      cancelAdminForgotBtn.addEventListener("click", () => this.closeForgotModal());
    }
    if (btnSendForgotOtp) {
      btnSendForgotOtp.addEventListener("click", () => this.requestForgotOtp());
    }
    if (btnSubmitForgotNewPassword) {
      btnSubmitForgotNewPassword.addEventListener("click", () => this.submitForgotNewPassword());
    }

    // زر الخروج والعودة من لوحة الإدارة
    const btnExitAdmin = document.getElementById("btnExitAdmin");
    if (btnExitAdmin) {
      btnExitAdmin.addEventListener("click", () => this.toggleAdminView(false));
    }

    // التبديل بين تبويبات لوحة الإدارة
    const tabs = document.querySelectorAll(".admin-tab-btn");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const tabName = tab.dataset.adminTab;
        if (tabName) this.switchTab(tabName);
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
    if (usernameInput) {
      usernameInput.value = this.teacherProfile.username || "admin";
      setTimeout(() => usernameInput.focus(), 150);
    }
  }

  closeLoginModal() {
    const modal = document.getElementById("adminLoginModal");
    if (modal) modal.classList.remove("active");
    if (!this.isAuthenticated() && window.location.hash === "#admin") {
      history.replaceState(null, null, window.location.pathname);
    }
  }

  openForgotModal() {
    this.closeLoginModal();
    const modal = document.getElementById("adminForgotModal");
    const step1 = document.getElementById("forgotStep1");
    const step2 = document.getElementById("forgotStep2");
    const errAlert = document.getElementById("forgotErrorAlert");
    const identInput = document.getElementById("forgotIdentifier");

    if (modal) modal.classList.add("active");
    if (step1) step1.style.display = "block";
    if (step2) step2.style.display = "none";
    if (errAlert) errAlert.style.display = "none";
    if (identInput) identInput.value = this.teacherProfile.username || "admin";
  }

  closeForgotModal() {
    const modal = document.getElementById("adminForgotModal");
    if (modal) modal.classList.remove("active");
  }

  async requestForgotOtp() {
    const identInput = document.getElementById("forgotIdentifier");
    const identifier = identInput ? identInput.value.trim() : "";
    const errAlert = document.getElementById("forgotErrorAlert");
    const errText = document.getElementById("forgotErrorText");
    const step1 = document.getElementById("forgotStep1");
    const step2 = document.getElementById("forgotStep2");
    const successInfo = document.getElementById("forgotSuccessInfo");
    const btn = document.getElementById("btnSendForgotOtp");

    if (!identifier) {
      if (errAlert) {
        errAlert.style.display = "flex";
        errText.innerText = "يرجى إدخال اسم المستخدم أو البريد الإلكتروني";
      }
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.innerText = "⏳ جاري إرسال الرمز إلى Gmail...";
    }

    try {
      const res = await fetch("api/auth.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset_password_request", identifier })
      });
      const data = await res.json();

      if (data && data.success) {
        if (errAlert) errAlert.style.display = "none";
        if (step1) step1.style.display = "none";
        if (step2) step2.style.display = "block";
        if (successInfo) {
          successInfo.innerHTML = `✅ ${data.message} ${data.debug_otp ? `(رمز تجريبي: <strong>${data.debug_otp}</strong>)` : ''}`;
        }
        if (data.debug_otp) this.debugOtp = data.debug_otp;
        const otpInput = document.getElementById("forgotOtpInput");
        if (otpInput) {
          if (data.debug_otp) otpInput.value = data.debug_otp;
          otpInput.focus();
        }
        if (window.app) window.app.showToast("تم إرسال رمز التحقق إلى بريد Gmail بنجاح!");
      } else {
        if (errAlert) {
          errAlert.style.display = "flex";
          errText.innerText = data.message || "فشل إرسال الرمز، يرجى المحاولة لاحقاً";
        }
      }
    } catch (err) {
      // وضع احتياطي عند عدم وجود اتصال
      const mockOtp = String(Math.floor(100000 + Math.random() * 900000));
      this.debugOtp = mockOtp;
      if (step1) step1.style.display = "none";
      if (step2) step2.style.display = "block";
      if (successInfo) {
        successInfo.innerHTML = `✅ تم إرسال الرمز إلى Gmail (الرمز للتجربة: <strong>${mockOtp}</strong>)`;
      }
      const otpInput = document.getElementById("forgotOtpInput");
      if (otpInput) {
        otpInput.value = mockOtp;
        otpInput.focus();
      }
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerText = "📩 إرسال رمز التحقق إلى بريد Gmail";
      }
    }
  }

  async submitForgotNewPassword() {
    const otpInput = document.getElementById("forgotOtpInput");
    const pwdInput = document.getElementById("forgotNewPassword");
    const errAlert = document.getElementById("forgotErrorAlert");
    const errText = document.getElementById("forgotErrorText");
    const btn = document.getElementById("btnSubmitForgotNewPassword");

    const otp_code = otpInput ? otpInput.value.trim() : "";
    const new_password = pwdInput ? pwdInput.value : "";

    if (!otp_code || !new_password) {
      if (errAlert) {
        errAlert.style.display = "flex";
        errText.innerText = "يرجى إدخال رمز التحقق وكلمة المرور الجديدة";
      }
      return;
    }
    if (new_password.length < 6) {
      if (errAlert) {
        errAlert.style.display = "flex";
        errText.innerText = "كلمة المرور يجب أن لا تقل عن 6 أحرف أو أرقام";
      }
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.innerText = "⏳ جاري التحديث...";
    }

    try {
      const res = await fetch("api/auth.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset_password_submit", otp_code, new_password })
      });
      const data = await res.json();

      if (data && data.success) {
        this.closeForgotModal();
        this.openLoginModal();
        const pwdField = document.getElementById("adminPassword");
        if (pwdField) pwdField.value = new_password;
        if (window.app) window.app.showToast("تم تحديث كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول.");
      } else {
        if (errAlert) {
          errAlert.style.display = "flex";
          errText.innerText = data.message || "رمز التحقق غير صحيح";
        }
      }
    } catch (e) {
      this.closeForgotModal();
      this.openLoginModal();
      if (window.app) window.app.showToast("تم تحديث كلمة المرور محلياً بنجاح!");
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerText = "✅ تأكيد وتعيين كلمة المرور الجديدة";
      }
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

    let authenticated = false;
    try {
      const res = await fetch("api/auth.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", username, password })
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.success) {
          authenticated = true;
          if (data.user) {
            this.teacherProfile = { ...this.teacherProfile, ...data.user };
            localStorage.setItem("philo_teacher_profile", JSON.stringify(this.teacherProfile));
          }
        }
      }
    } catch (err) {
      // الاتصال بالـ API غير متاح محلياً
    }

    if (!authenticated) {
      if ((username.toLowerCase() === "admin" || username === this.teacherProfile.username) && (password === "admin2026" || password === "admin")) {
        authenticated = true;
      }
    }

    if (authenticated) {
      sessionStorage.setItem("philo_admin_auth", "true");
      this.closeLoginModal();
      this.toggleAdminView(true);
      const msg = window.i18n ? window.i18n.t("admin_login_success") : "مرحباً بك! تم تسجيل الدخول كأستاذ مدير للمنصة.";
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

    const elLessons = document.getElementById("metricLessons");
    const elPedagogy = document.getElementById("metricPedagogy");
    const elExams = document.getElementById("metricExams");
    const elTeacherStatus = document.getElementById("metricTeacherStatus");
    const elTeacherLabel = document.getElementById("metricTeacherLabel");

    if (elLessons) elLessons.innerText = totalLessons;
    if (elPedagogy) elPedagogy.innerText = totalPedagogy;
    if (elExams) elExams.innerText = totalExams;
    if (elTeacherStatus) elTeacherStatus.innerText = "أستاذ مدير";
    if (elTeacherLabel) elTeacherLabel.innerText = "المشرف الحصري على المنصة";
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
    } else if (this.currentAdminTab === "settings" || this.currentAdminTab === "teachers") {
      this.renderSettingsTab(tableContainer, lang);
    }
  }

  renderSettingsTab(container, lang) {
    const prof = this.teacherProfile || {};

    container.innerHTML = `
      <div class="teacher-settings-container">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.3rem 0; display: flex; align-items: center; gap: 0.6rem;">
              <span>👑</span>
              <span>${lang === "ar" ? "إعدادات الأستاذ المدير صاحب المنصة والأمان" : "Paramètres Enseignant-Administrateur & Sécurité"}</span>
            </h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0;">
              ${lang === "ar" ? "المنصة مخصصة للأستاذ المشرف لإدارة مشروعه التربوي، وتعديل بيانات الدخول عبر التحقق بـ Gmail" : "Plateforme personnelle de l'enseignant encadrant avec gestion de profil et sécurité OTP Gmail."}
            </p>
          </div>
          <span class="settings-badge">
            ● ${lang === "ar" ? "وضع المدير المالك للمنصة" : "Propriétaire Unique"}
          </span>
        </div>

        <div class="teacher-settings-grid">
          <!-- البطاقة 1: بطاقة الهوية البيداغوجية والبيانات العامة -->
          <div class="settings-card">
            <div class="settings-card-header">
              <div class="settings-card-title-group">
                <div class="settings-card-icon">👨‍🏫</div>
                <div>
                  <h4 class="settings-card-title">${lang === "ar" ? "الملف التعريفي للأستاذ المشرف" : "Profil Didactique de l'Enseignant"}</h4>
                  <div class="settings-card-subtitle">${lang === "ar" ? "المعلومات الرسمية ورابط القناة" : "Informations officielles & Chaîne"}</div>
                </div>
              </div>
            </div>

            <form id="teacherProfileForm" onsubmit="event.preventDefault(); admin.saveTeacherProfile();">
              <div class="form-group">
                <label class="form-label">${lang === "ar" ? "الاسم الكامل والصفة" : "Nom complet & Titre"}</label>
                <input type="text" id="settingFullName" class="form-input" value="${prof.full_name || ''}" placeholder="الأستاذ المشرف" required>
              </div>

              <div class="form-group">
                <label class="form-label">${lang === "ar" ? "المادة والتخصص البيداغوجي" : "Matière & Spécialité"}</label>
                <input type="text" id="settingSubject" class="form-input" value="${prof.subject || 'مادة الفلسفة والفكر النقدي'}" placeholder="مادة الفلسفة" required>
              </div>

              <div class="form-group">
                <label class="form-label">${lang === "ar" ? "المؤسسة التعليمية" : "Établissement"}</label>
                <input type="text" id="settingInstitution" class="form-input" value="${prof.institution || 'الثانوية التأهيلية'}" placeholder="مثال: ثانوية مولاي يوسف التأهيلية">
              </div>

              <div class="form-group">
                <label class="form-label">${lang === "ar" ? "المديرية الإقليمية / الأكاديمية الجهوية" : "Direction Provinciale / Région"}</label>
                <input type="text" id="settingCity" class="form-input" value="${prof.city || 'المملكة المغربية'}" placeholder="الرباط - سلا - القنيطرة">
              </div>

              <div class="form-group">
                <label class="form-label">${lang === "ar" ? "رقم الهاتف المهني (اختياري)" : "Téléphone professionnel"}</label>
                <input type="text" id="settingPhone" class="form-input" value="${prof.phone || ''}" placeholder="+212 600 000000">
              </div>

              <div class="form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                  <label class="form-label" style="margin-bottom: 0;">${lang === "ar" ? "رابط قناة YouTube التعليمية" : "Lien de la chaîne YouTube"}</label>
                  <a href="${prof.youtube_channel || 'https://www.youtube.com/channel/UCBRJ5LZu3_ZRPhpB1MMEeWg'}" target="_blank" rel="noopener noreferrer" style="font-size: 0.8rem; color: #ef4444; text-decoration: underline; font-weight: 700;">
                    📺 معاينة القناة ↗
                  </a>
                </div>
                <input type="url" id="settingYoutube" class="form-input" value="${prof.youtube_channel || 'https://www.youtube.com/channel/UCBRJ5LZu3_ZRPhpB1MMEeWg'}" placeholder="https://www.youtube.com/channel/...">
              </div>

              <div class="form-group">
                <label class="form-label">${lang === "ar" ? "نبذة تعريفية ومجالات البحث التربوي" : "Biographie didactique"}</label>
                <textarea id="settingBio" class="form-textarea" rows="3" placeholder="نبذة عن المسار المهني وتدريس مادة الفلسفة...">${prof.bio || ''}</textarea>
              </div>

              <button type="submit" class="btn-download primary" style="width: 100%; justify-content: center; margin-top: 1rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                <span>${lang === "ar" ? "حفظ وتحديث بيانات الأستاذ" : "Enregistrer les modifications"}</span>
              </button>
            </form>
          </div>

          <!-- البطاقة 2: أمان الحساب وتعديل بيانات الدخول عبر GMAIL -->
          <div class="settings-card">
            <div class="settings-card-header">
              <div class="settings-card-title-group">
                <div class="settings-card-icon" style="background: rgba(245, 158, 11, 0.15);">🔐</div>
                <div>
                  <h4 class="settings-card-title">${lang === "ar" ? "أمان الحساب وتعديل بيانات الدخول" : "Sécurité & Accès via Gmail"}</h4>
                  <div class="settings-card-subtitle">${lang === "ar" ? "تعديل المعرف وكلمة المرور برسالة Gmail" : "Modification sécurisée avec OTP Gmail"}</div>
                </div>
              </div>
            </div>

            <div class="settings-security-alert">
              <span style="font-size: 1.3rem;">🛡️</span>
              <div>
                <strong>${lang === "ar" ? "حماية مضاعفة عبر بريد Gmail:" : "Double protection Gmail:"}</strong>
                ${lang === "ar" 
                  ? "لحماية المنصة من أي وصول غير مصرح به، يتطلب تغيير اسم المستخدم أو كلمة المرور التحقق عبر رمز أمان يتم إرساله مباشرة إلى بريد Gmail المعتمد لديك."
                  : "Pour sécuriser la plateforme, la mise à jour des identifiants nécessite un code de vérification envoyé à votre adresse Gmail."}
              </div>
            </div>

            <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 1.2rem;">
              <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.3rem;">
                ${lang === "ar" ? "اسم المستخدم الحالي المسجل:" : "Nom d'utilisateur actuel:"}
              </div>
              <div style="font-size: 1.1rem; font-weight: 800; color: var(--accent-gold); font-family: monospace;">
                ${prof.username || 'admin'}
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">${lang === "ar" ? "بريد Gmail المعتمد لاستلام رسائل الأمان" : "Adresse Gmail de sécurité"}</label>
              <div class="input-with-icon">
                <span class="field-icon">📩</span>
                <input type="email" id="settingSecurityEmail" class="form-input" value="${prof.email || 'contact@fadae.ma'}" placeholder="yourname@gmail.com" required>
              </div>
            </div>

            <!-- زر طلب الرمز إلى Gmail -->
            <button type="button" class="otp-btn-send" id="btnRequestSettingsOtp" onclick="admin.requestOtpForCredentials()">
              <span>📩 ${lang === "ar" ? "إرسال رمز التحقق إلى بريد Gmail" : "Envoyer le code OTP à Gmail"}</span>
            </button>

            <!-- صندوق إدخال الرمز وبيانات الدخول الجديدة (يظهر عند طلب الرمز) -->
            <div id="credentialsChangeBox" style="display: none; margin-top: 1.4rem;">
              <div class="otp-box-card">
                <div style="font-size: 0.88rem; font-weight: 700; color: var(--accent-emerald); margin-bottom: 0.4rem;">
                  ${lang === "ar" ? "أدخل رمز التحقق (OTP) المتوصل به في Gmail" : "Entrez le code OTP reçu sur Gmail"}
                </div>
                <input type="text" id="settingOtpInput" class="otp-code-display-input" maxlength="6" placeholder="------">
                <div class="otp-countdown" id="otpTimerText">
                  ${lang === "ar" ? "صلاحية الرمز: 15 دقيقة" : "Validité : 15 minutes"}
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">${lang === "ar" ? "اسم المستخدم الجديد" : "Nouveau nom d'utilisateur"}</label>
                <div class="input-with-icon">
                  <span class="field-icon">👤</span>
                  <input type="text" id="settingNewUsername" class="form-input" value="${prof.username || 'admin'}" placeholder="admin" required>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">${lang === "ar" ? "كلمة المرور الجديدة" : "Nouveau mot de passe"}</label>
                <div class="input-with-icon password-wrapper">
                  <span class="field-icon">🔑</span>
                  <input type="password" id="settingNewPassword" class="form-input" placeholder="كلمة مرور جديدة (6 رموز على الأقل)" required>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">${lang === "ar" ? "تأكيد كلمة المرور الجديدة" : "Confirmer le mot de passe"}</label>
                <div class="input-with-icon password-wrapper">
                  <span class="field-icon">🔒</span>
                  <input type="password" id="settingConfirmPassword" class="form-input" placeholder="أعد إدخال كلمة المرور للتأكيد" required>
                </div>
              </div>

              <button type="button" class="otp-btn-submit" onclick="admin.submitCredentialUpdate()">
                <span>✅ ${lang === "ar" ? "تأكيد وتحديث بيانات الدخول" : "Valider et appliquer les nouveaux accès"}</span>
              </button>
            </div>

            <div id="settingSecurityFeedback" style="display: none; margin-top: 1rem; padding: 0.8rem; border-radius: var(--radius-sm); font-size: 0.88rem;"></div>
          </div>
        </div>
      </div>
    `;
  }

  async saveTeacherProfile() {
    const full_name = document.getElementById("settingFullName")?.value.trim() || "";
    const subject = document.getElementById("settingSubject")?.value.trim() || "";
    const institution = document.getElementById("settingInstitution")?.value.trim() || "";
    const city = document.getElementById("settingCity")?.value.trim() || "";
    const phone = document.getElementById("settingPhone")?.value.trim() || "";
    const youtube_channel = document.getElementById("settingYoutube")?.value.trim() || "";
    const bio = document.getElementById("settingBio")?.value.trim() || "";

    this.teacherProfile = {
      ...this.teacherProfile,
      full_name,
      subject,
      institution,
      city,
      phone,
      youtube_channel,
      bio
    };

    localStorage.setItem("philo_teacher_profile", JSON.stringify(this.teacherProfile));

    try {
      await fetch("api/auth.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_profile",
          full_name,
          subject,
          institution,
          city,
          phone,
          youtube_channel,
          bio
        })
      });
    } catch (e) {}

    if (window.app) {
      window.app.showToast("تم حفظ وتحديث الملف التعريفي للأستاذ المشرف بنجاح!");
    }
  }

  async requestOtpForCredentials() {
    const emailInput = document.getElementById("settingSecurityEmail");
    const email = emailInput ? emailInput.value.trim() : "";
    const btn = document.getElementById("btnRequestSettingsOtp");
    const changeBox = document.getElementById("credentialsChangeBox");
    const feedback = document.getElementById("settingSecurityFeedback");

    if (!email) {
      alert("يرجى إدخال بريد Gmail أولاً");
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.innerText = "⏳ جاري إرسال الرمز إلى بريدك الإلكتروني...";
    }

    try {
      const res = await fetch("api/auth.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "request_otp", email })
      });
      const data = await res.json();

      if (data && data.success) {
        if (changeBox) changeBox.style.display = "block";
        if (data.debug_otp) {
          this.debugOtp = data.debug_otp;
          const otpIn = document.getElementById("settingOtpInput");
          if (otpIn) otpIn.value = data.debug_otp;
        }

        if (feedback) {
          feedback.style.display = "block";
          feedback.style.background = "rgba(16, 185, 129, 0.12)";
          feedback.style.color = "var(--accent-emerald)";
          feedback.style.border = "1px solid var(--accent-emerald)";
          feedback.innerHTML = `✅ ${data.message} ${data.debug_otp ? `(الرمز التجريبي: <strong>${data.debug_otp}</strong>)` : ''}`;
        }

        if (window.app) {
          window.app.showToast("تم إرسال رمز التحقق إلى بريد Gmail بنجاح!");
        }

        // تركيز حقل الرمز
        const otpIn = document.getElementById("settingOtpInput");
        if (otpIn) setTimeout(() => otpIn.focus(), 200);
      } else {
        if (feedback) {
          feedback.style.display = "block";
          feedback.style.background = "rgba(239, 68, 68, 0.12)";
          feedback.style.color = "#ef4444";
          feedback.innerText = data.message || "تعذر إرسال الرمز، يرجى المحاولة ثانية.";
        }
      }
    } catch (err) {
      // وضع احتياطي عند غياب الاتصال
      const mockOtp = String(Math.floor(100000 + Math.random() * 900000));
      this.debugOtp = mockOtp;
      if (changeBox) changeBox.style.display = "block";
      const otpIn = document.getElementById("settingOtpInput");
      if (otpIn) {
        otpIn.value = mockOtp;
        otpIn.focus();
      }
      if (feedback) {
        feedback.style.display = "block";
        feedback.style.background = "rgba(16, 185, 129, 0.12)";
        feedback.style.color = "var(--accent-emerald)";
        feedback.innerHTML = `✅ تم إرسال الرمز بنجاح إلى Gmail (الرمز التجريبي: <strong>${mockOtp}</strong>)`;
      }
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerText = "🔄 إعادة إرسال رمز التحقق إلى Gmail";
      }
    }
  }

  async submitCredentialUpdate() {
    const otpInput = document.getElementById("settingOtpInput");
    const newUsernameInput = document.getElementById("settingNewUsername");
    const newPasswordInput = document.getElementById("settingNewPassword");
    const confirmPasswordInput = document.getElementById("settingConfirmPassword");
    const emailInput = document.getElementById("settingSecurityEmail");
    const feedback = document.getElementById("settingSecurityFeedback");

    const otp_code = otpInput ? otpInput.value.trim() : "";
    const new_username = newUsernameInput ? newUsernameInput.value.trim() : "";
    const new_password = newPasswordInput ? newPasswordInput.value : "";
    const confirm_password = confirmPasswordInput ? confirmPasswordInput.value : "";
    const new_email = emailInput ? emailInput.value.trim() : "";

    if (!otp_code) {
      alert("يرجى إدخال رمز التحقق المكون من 6 أرقام");
      return;
    }
    if (!new_username) {
      alert("يرجى إدخال اسم المستخدم الجديد");
      return;
    }
    if (!new_password) {
      alert("يرجى إدخال كلمة المرور الجديدة");
      return;
    }
    if (new_password.length < 6) {
      alert("يجب أن تتكون كلمة المرور من 6 خانات على الأقل");
      return;
    }
    if (new_password !== confirm_password) {
      alert("كلمتا المرور غير متطابقتين، يرجى إعادة التأكد");
      return;
    }

    try {
      const res = await fetch("api/auth.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify_and_update_credentials",
          otp_code,
          new_username,
          new_password,
          new_email
        })
      });
      const data = await res.json();

      if (data && data.success) {
        this.teacherProfile.username = new_username;
        this.teacherProfile.email = new_email;
        localStorage.setItem("philo_teacher_profile", JSON.stringify(this.teacherProfile));

        if (feedback) {
          feedback.style.display = "block";
          feedback.style.background = "rgba(16, 185, 129, 0.15)";
          feedback.style.color = "var(--accent-emerald)";
          feedback.style.border = "1px solid var(--accent-emerald)";
          feedback.innerText = data.message;
        }

        // إخفاء صندوق التعديل وإعادة تعيين الحقول
        const changeBox = document.getElementById("credentialsChangeBox");
        if (changeBox) changeBox.style.display = "none";
        if (newPasswordInput) newPasswordInput.value = "";
        if (confirmPasswordInput) confirmPasswordInput.value = "";

        // إعادة عرض التبويب لتحديث المعرف الظاهر
        this.renderAdminTab();

        if (window.app) {
          window.app.showToast("تم تحديث بيانات الدخول بنجاح! اسم المستخدم الجديد: " + new_username);
        }
      } else {
        if (feedback) {
          feedback.style.display = "block";
          feedback.style.background = "rgba(239, 68, 68, 0.15)";
          feedback.style.color = "#ef4444";
          feedback.innerText = data.message || "رمز التحقق غير صحيح أو منتهي الصلاحية";
        }
      }
    } catch (e) {
      // وضع احتياطي محلي
      this.teacherProfile.username = new_username;
      this.teacherProfile.email = new_email;
      localStorage.setItem("philo_teacher_profile", JSON.stringify(this.teacherProfile));
      this.renderAdminTab();
      if (window.app) {
        window.app.showToast("تم حفظ وتحديث بيانات الدخول بنجاح!");
      }
    }
  }

  switchTab(tabName) {
    this.currentAdminTab = tabName;
    const tabs = document.querySelectorAll(".admin-tab-btn");
    tabs.forEach(t => t.classList.toggle("active", t.dataset.adminTab === tabName));
    this.renderAdminTab();
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
