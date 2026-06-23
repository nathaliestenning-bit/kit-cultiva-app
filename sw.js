/* ============================================================
   Service Worker · App Cultiva (PWA)
   Precache del app-shell completo en install → abre OFFLINE.
   - navegaciones: network-first con fallback a index.html (SPA).
   - resto: cache-first con relleno en segundo plano.
   Nota: las llamadas a Supabase (auth/rest) NO se cachean (otro origen);
   en offline la app abre pero el login real requiere conexión.
   La versión (CACHE) la inyecta SOLA la Action de deploy en cada push
   (commit + nº de run) → no hace falta tocarla a mano. El valor de abajo
   es solo para correr local.
   ============================================================ */
const CACHE = "cultiva-local";
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/styles.css",
  "assets/logo-cultiva-color.png",
  "vendor/react.production.min.js",
  "vendor/react-dom.production.min.js",
  "vendor/lucide.min.js",
  "vendor/supabase.js",
  "data-cosecha.js",
  "data-produccion.js",
  "data-packing.js",
  "data-calidad.js",
  "usuarios.js",
  "config.js",
  "cultiva-auth.js",
  "cultiva-data.js",
  "CultivaRegistroForm.js",
  "EscaladasInbox.js",
  "LoginScreen.js",
  "CosechaApp.js",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/icons/icon-maskable-512.png",
  "assets/icons/apple-touch-icon.png",
  "assets/icons/favicon-32.png",
  "assets/fonts/00aee169-db8e-4e0d-884c-6e9e7b641cb3.woff2",
  "assets/fonts/02b565ab-6995-4644-92d0-75700f7b6585.woff2",
  "assets/fonts/13c63756-772e-4ae7-ae80-992b27caa01e.woff2",
  "assets/fonts/209e3989-4495-4e2c-98d1-4af11ce98949.woff2",
  "assets/fonts/2b3b24c0-1803-48e7-8c30-1b60b9cb4fde.woff2",
  "assets/fonts/2d86b7cd-300a-433f-816e-f91683926c0d.woff2",
  "assets/fonts/35b684d9-bee2-487b-bfa4-5a82e6019588.woff2",
  "assets/fonts/48936456-7395-4d9a-ae2b-9d1fd3324753.woff2",
  "assets/fonts/597b6ebf-a346-493b-9bc4-c3003989b23f.woff2",
  "assets/fonts/7cc7e9a2-7ceb-4acb-8532-4256f81a3df2.woff2",
  "assets/fonts/80f92aa5-5c9a-4bad-832e-73a6f025b27d.woff2",
  "assets/fonts/83e05841-7905-42ab-a6f5-8e9945c2c261.woff2",
  "assets/fonts/8d4dc847-56fb-4a50-94c1-88b8d3005d81.woff2",
  "assets/fonts/93c02cca-5cee-44c5-ab8f-4b1e5a9f126e.woff2",
  "assets/fonts/9b19ec67-44dc-4ade-9e69-33f16bc514e7.woff2",
  "assets/fonts/9da6c0ce-650e-4638-8de4-16c437949a6d.woff2",
  "assets/fonts/b09e0b4d-8c6e-4ec2-bdff-846aa647e37a.woff2",
  "assets/fonts/c0b4da2b-a09d-49df-9f3d-3f47b07b8a6a.woff2",
  "assets/fonts/c447d206-7b4a-45c3-81c5-1a0a9648c350.woff2",
  "assets/fonts/c528093d-ae5e-4500-9e34-256cab2f3500.woff2",
  "assets/fonts/cd2302e2-a3f1-4fac-b161-c7417559bce8.woff2",
  "assets/fonts/d4fbb32c-2588-4cc9-aaf4-576abe4ed057.woff2",
  "assets/fonts/dab0ef8a-6348-4a7c-8dd5-24e36bbb7c32.woff2",
  "assets/fonts/e19f182a-19f0-4eda-b290-2b24eec77e22.woff2",
  "assets/fonts/ef25ced7-d49d-4ffa-b87c-ea454433e38f.woff2",
  "assets/fonts/f1e04bac-0bdf-4efa-9639-49cf3c7f540e.woff2",
  "assets/fonts/f97bac27-0a01-4596-92ae-c59aff316ad2.woff2"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS.map((u) => new Request(u, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Nunca interceptar otros orígenes (p.ej. Supabase).
  if (url.origin !== self.location.origin) return;

  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).catch(() => caches.match("index.html").then((r) => r || caches.match("./")))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res && res.status === 200 && res.type === "basic") {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
