/**
 * Service Worker - فضاء الحكمة والمعرفة
 * يدعم العمل دون إنترنت (Offline Mode) وتخزين الأصول والبيانات المؤقتة (Caching)
 */

const CACHE_NAME = "fadae-alhikma-v3.3";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./css/styles.css?v=3.3",
  "./js/data.js?v=3.3",
  "./js/i18n.js?v=3.3",
  "./js/app.js?v=3.3",
  "./js/admin.js?v=3.3",
  "./manifest.json",
  "./assets/hero_library.jpg",
  "./assets/card_lessons.jpg",
  "./assets/card_philosophers.jpg",
  "./assets/card_books.jpg",
  "./assets/card_quotes.jpg",
  "./assets/card_channel.jpg",
  "./assets/device_mockups.png"
];

// تثبيت الـ Service Worker وحفظ الأصول الأساسية في الذاكرة التخزينية
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn("Some assets failed to cache during SW install:", err);
      });
    })
  );
});

// تفعيل وحذف كافة الذواكر القديمة فوراً
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// معالجة طلبات الشبكة: Network-First للأصول لضمان الحصول على آخر التحديثات مع دعم كامل لوضع عدم الاتصال
self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  // تخطي الطلبات غير المتعلقة بـ HTTP/HTTPS
  if (!event.request.url.startsWith("http")) return;

  // بالنسبة لطلبات الـ API (مثل /api/auth.php): استراتيجية Network First مع تخزين احتياطي
  if (requestUrl.pathname.includes("/api/")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // بالنسبة للأصول وواجهات المستخدم: استراتيجية Network First لتفادي مشكلات التخزين المؤقت القديم
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && event.request.method === "GET") {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return networkResponse;
      })
      .catch(() => {
        // عند غياب الاتصال: العودة للذاكرة التخزينية المخزنة
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.headers.get("accept") && event.request.headers.get("accept").includes("text/html")) {
            return caches.match("./index.html");
          }
        });
      })
  );
});
