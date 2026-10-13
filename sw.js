/* Service worker : consultation hors connexion de la plateforme de cours.
   - pages et ressources du site : réseau d'abord, copie locale si pas de connexion
   - documents PDF : copie locale d'abord (un document ouvert une fois reste disponible)
   - bibliothèques et polices externes : copie locale, rafraîchie en arrière-plan */
const VERSION = "v6";
const SHELL = "shell-" + VERSION;
const PDFS = "pdf-v1";          // nom stable : les documents enregistrés survivent aux mises à jour du site
const EXT = "ext-" + VERSION;

const SHELL_FILES = [
  "./", "index.html", "quiz.html", "simulations.html", "entrainement.html", "calendrier.html", "questions.html", "videos.html", "tp.html",
  "assets/site.css", "assets/quiz-data.js", "assets/exos.js", "assets/annonces.js", "assets/config.js", "assets/videos.js", "manifest.webmanifest",
  "vendor/pdfjs/pdf.js", "vendor/pdfjs/pdf.worker.js",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
  "img/Support_Chapitre_1_Calcul_vectoriel.jpg", "img/Support_Chapitre_2_Cinematique.jpg",
  "img/Support_Chapitre_3_Dynamique.jpg", "img/Support_Chapitre_4_Travail_energie.jpg",
  "img/Electricite_Chapitre_1_Electrostatique.jpg", "img/Electricite_Chapitre_2_Champ_potentiel.jpg"
];
/* supports de cours et TD (≈ 3,4 Mo) : enregistrés dès la première visite */
const DOC_FILES = [
  "docs/Electricite_Chapitre_1_Electrostatique.pdf",
  "docs/Electricite_Chapitre_2_Champ_potentiel.pdf",
  "docs/Support_Chapitre_1_Calcul_vectoriel.pdf",
  "docs/Support_Chapitre_2_Cinematique.pdf",
  "docs/Support_Chapitre_3_Dynamique.pdf",
  "docs/Support_Chapitre_4_Travail_energie.pdf",
  "docs/TD1_Calcul_vectoriel_corrige.pdf",
  "docs/TD1_Calcul_vectoriel_enonces.pdf",
  "docs/TD2_Cinematique_corrige.pdf",
  "docs/TD2_Cinematique_enonces.pdf",
  "docs/TD3_Dynamique_corrige.pdf",
  "docs/TD3_Dynamique_enonces.pdf",
  "docs/TD4_Travail_energie_corrige.pdf",
  "docs/TD4_Travail_energie_enonces.pdf",
  "docs/TD_Electricite_1_corrige.pdf",
  "docs/TD_Electricite_1_enonces.pdf"
];
const EXT_FILES = [
  "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js"
];

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const s = await caches.open(SHELL);
    await Promise.all(SHELL_FILES.map(u => s.add(new Request(u, { cache: "reload" })).catch(() => {})));
    const d = await caches.open(PDFS);
    await Promise.all(DOC_FILES.map(async u => {
      const key = new URL(u, self.registration.scope).pathname;
      if (await d.match(key)) return;
      try { const r = await fetch(u, { cache: "reload" }); if (r.ok) await d.put(key, r); } catch (e) {}
    }));
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

const withTimeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]);
const isPdf = url => url.pathname.endsWith(".pdf");
const isExt = url => /(^|\.)cdnjs\.cloudflare\.com$|fonts\.googleapis\.com$|fonts\.gstatic\.com$/.test(url.hostname);

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.origin === location.origin && isPdf(url)) {
    // copie locale immédiate, puis mise à jour en arrière-plan si internet est disponible
    e.respondWith((async () => {
      const c = await caches.open(PDFS);
      const hit = await c.match(url.pathname, { ignoreSearch: true, ignoreVary: true });
      const net = fetch(url.pathname, { cache: "no-cache" }).then(res => { if (res.ok) c.put(url.pathname, res.clone()); return res; }).catch(() => null);
      if (hit) { e.waitUntil(net); return hit; }
      return (await net) || Response.error();
    })());
    return;
  }

  if (isExt(url)) {
    e.respondWith((async () => {
      const c = await caches.open(EXT);
      const hit = await c.match(req, { ignoreVary: true }) || await caches.match(req.url, { ignoreVary: true });
      const net = fetch(req).then(res => { if (res.ok || res.type === "opaque") c.put(req, res.clone()); return res; }).catch(() => null);
      return hit || (await net) || Response.error();
    })());
    return;
  }

  if (url.origin === location.origin) {
    e.respondWith((async () => {
      const c = await caches.open(SHELL);
      // "no-cache" : on redemande toujours la dernière version au serveur (sinon le navigateur peut garder une copie de 10 min)
      const netP = fetch(req, { cache: "no-cache" }).then(res => { if (res.ok) c.put(req, res.clone()); return res; });
      try {
        return await withTimeout(netP, 5000);           // réseau lent ou absent : on passe à la copie locale
      } catch (err) {
        const hit = await c.match(req, { ignoreSearch: true });
        if (hit) return hit;
        try { return await netP; } catch (e2) {}         // pas de copie locale : on attend le réseau
        if (req.mode === "navigate") return (await c.match("index.html")) || Response.error();
        return Response.error();
      }
    })());
  }
});
