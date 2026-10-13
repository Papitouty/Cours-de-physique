/* Service worker : consultation hors connexion de la plateforme de cours.
   - pages et ressources du site : réseau d'abord, copie locale si pas de connexion
   - documents PDF : copie locale d'abord (un document ouvert une fois reste disponible)
   - bibliothèques et polices externes : copie locale, rafraîchie en arrière-plan */
const VERSION = "v1";
const SHELL = "shell-" + VERSION;
const PDFS = "pdf-v1";          // nom stable : les documents enregistrés survivent aux mises à jour du site
const EXT = "ext-" + VERSION;

const SHELL_FILES = [
  "./", "index.html", "quiz.html", "simulations.html",
  "assets/site.css", "assets/quiz-data.js", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
  "img/Support_Chapitre_1_Calcul_vectoriel.jpg", "img/Support_Chapitre_2_Cinematique.jpg",
  "img/Support_Chapitre_3_Dynamique.jpg", "img/Support_Chapitre_4_Travail_energie.jpg",
  "img/Electricite_Chapitre_1_Electrostatique.jpg", "img/Electricite_Chapitre_2_Champ_potentiel.jpg"
];
const EXT_FILES = [
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js"
];

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const s = await caches.open(SHELL);
    await Promise.all(SHELL_FILES.map(u => s.add(new Request(u, { cache: "reload" })).catch(() => {})));
    const x = await caches.open(EXT);
    await Promise.all(EXT_FILES.map(u => x.add(new Request(u, { mode: "cors" })).catch(() => {})));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keep = [SHELL, PDFS, EXT];
    for (const k of await caches.keys()) if (!keep.includes(k)) await caches.delete(k);
    await self.clients.claim();
  })());
});

const isPdf = url => url.pathname.endsWith(".pdf");
const isExt = url => /(^|\.)cdnjs\.cloudflare\.com$|fonts\.googleapis\.com$|fonts\.gstatic\.com$/.test(url.hostname);

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.origin === location.origin && isPdf(url)) {
    e.respondWith((async () => {
      const c = await caches.open(PDFS);
      const hit = await c.match(url.pathname, { ignoreSearch: true });
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok) c.put(url.pathname, res.clone());
      return res;
    })());
    return;
  }

  if (isExt(url)) {
    e.respondWith((async () => {
      const c = await caches.open(EXT);
      const hit = await c.match(req);
      const net = fetch(req).then(res => { if (res.ok || res.type === "opaque") c.put(req, res.clone()); return res; }).catch(() => null);
      return hit || (await net) || Response.error();
    })());
    return;
  }

  if (url.origin === location.origin) {
    e.respondWith((async () => {
      const c = await caches.open(SHELL);
      try {
        const res = await fetch(req);
        if (res.ok) c.put(req, res.clone());
        return res;
      } catch (err) {
        const hit = await c.match(req, { ignoreSearch: true });
        if (hit) return hit;
        if (req.mode === "navigate") return (await c.match("index.html")) || Response.error();
        return Response.error();
      }
    })());
  }
});
