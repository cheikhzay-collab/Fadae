# 🏛️ دليل تفعيل قاعدة بيانات MySQL على استضافة Hostinger
### منصة فضاء الحكمة والمعرفة (Espace Sagesse et Savoir)

تم تجهيز قاعدة بيانات متكاملة وواجهات برمجية (PHP REST API) متوافقة 100% مع استضافة Hostinger. اتبع هذه الخطوات البسيطة لتفعيلها:

---

## 1. إنشاء قاعدة البيانات في Hostinger hPanel

1. سجّل الدخول إلى [Hostinger hPanel](https://hpanel.hostinger.com/).
2. من القائمة الجانبية أو الرئيسية، اختر **Databases** ➔ **Management** (قواعد البيانات).
3. ضمن قسم **Create a New MySQL Database and User**، املأ البيانات:
   - **MySQL Database name:** اختر اسماً (مثال: `fadae_db`).
   - **MySQL Username:** اختر اسماً للمستخدم (مثال: `fadae_admin`).
   - **Password:** أنشئ كلمة مرور قوية واحفظها.
4. اضغط على زر **Create**.

---

## 2. استيراد ملف قاعدة البيانات (`database.sql`) عبر phpMyAdmin

1. في نفس صفحة قواعد البيانات في Hostinger، ستجد قاعدة البيانات المنشأة في الأسفل.
2. اضغط على زر **Enter phpMyAdmin** بجانب قاعدتك.
3. داخل واجهة **phpMyAdmin**:
   - اضغط على تبويب **Import** (استيراد) في الشريط العلوي.
   - اضغط على **Choose File** (اختيار ملف) واختر ملف `database.sql` الموجود في مجلد المشروع.
   - انزل لأسفل واضغط على **Import** (أو Go).
4. ستظهر رسالة نجاح خضراء: تم إنشاء جميع الجداول (`admins`, `lessons`, `exams`, `pedagogy`, `philosophers`, `site_stats`) وإدراج كافة البيانات الفلسفية المغربية الأولية.

---

## 3. ربط بيانات الاتصال في ملف `api/config.php`

افتح الملف `api/config.php` وعدّل الأسطر التالية بالبيانات التي أنشأتها في الخطوة 1:

```php
$DB_HOST = 'localhost';               // يترك عادة localhost في Hostinger
$DB_NAME = 'u123456789_fadae_db';     // اسم القاعدة بالكامل كما يظهر في hPanel
$DB_USER = 'u123456789_fadae_admin';  // اسم المستخدم بالكامل كما يظهر في hPanel
$DB_PASS = 'your_strong_password';    // كلمة المرور التي حددتها
```

---

## 4. فحص واختبار الاتصال في المتصفح

للتحقق من أن كل شيء يعمل بكفاءة 100%:
افتح الرابط التالي في المتصفح:
```
https://your-domain.com/api/db_test.php
```
ستظهر لك شاشة خضراء تؤكد نجاح الاتصال وتستعرض عدد الجداول والدروس المخزنة.

---

## 🔐 بيانات الدخول الافتراضية للوحة الإدارة:
- **المعرف (Username):** `admin`
- **كلمة المرور (Password):** `admin2026`
- **رابط الدخول المباشر:** `https://your-domain.com/#admin` أو `https://your-domain.com/admin`
