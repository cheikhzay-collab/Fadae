/**
 * Service Worker - فضاء الحكمة والمعرفة
 * يدعم العمل دون إنترنت (Offline Mode) وتخزين الأصول والبيانات المؤقتة (Caching)
 */

const CACHE_NAME = "fadae-alhikma-v3.0";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/data.js",
  "./js/i18n.js",
  "./js/app.js",
  "./js/admin.js",
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
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn("Some assets failed to cache during SW install:", err);
      });
    }).then(() => self.skipWaiting())
  );
});

// تفعيل وحذف الذاكرة القديمة
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

// معالجة طلبات الشبكة مع دعم وضع عدم الاتصال (Offline Support)
self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  // تخطي الطلبات غير المتعلقة بـ HTTP/HTTPS
  if (!event.request.url.startsWith("http")) return;

  // بالنسبة لطلبات الـ API (مثل /api/lessons.php): استراتيجية Network First مع تخزين احتياطي
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
          // استرجاع البيانات المحفوظة مسبقاً في حال عدم وجود إنترنت
          return caches.match(event.request);
        })
    );
    return;
  }

  // بالنسبة للأصول الثابتة: استراتيجية Cache First مع التحديث في الخلفية (Stale-While-Revalidate)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // تحديث النسخة المخزنة في الخلفية إن أمكن
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && event.request.method === "GET") {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // إذا كان الطلب على صفحة HTML والإنترنت مقطوع، إرجاع صفحة البداية
          if (event.request.headers.get("accept") && event.request.headers.get("accept").includes("text/html")) {
            return caches.match("./index.html");
          }
        });
    })
  );
});
