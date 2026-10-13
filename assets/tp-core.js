/* Socle commun des travaux pratiques virtuels :
   fiche (protocole), paillasse simulée, parties de mesures (tableau + graphe + régression),
   chronomètre, compte rendu remplissable et exportable. */
(function () {
  "use strict";
  const $ = s => document.querySelector(s);
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fr = (x, d = 2) => (x == null || !isFinite(x)) ? "—" : x.toFixed(d).replace(".", ",").replace(/^-0(,0+)?$/, "0$1");
  const gauss = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  const store = {
    get(k, d) { try { const v = localStorage.getItem("tp2_" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("tp2_" + k, JSON.stringify(v)); } catch (e) {} }
  };
  function fit(cv, ratio) {
    const w = cv.clientWidth || 600, h = Math.round(w * ratio), d = Math.min(devicePixelRatio || 1, 2);
    if (cv.width !== Math.round(w * d) || cv.height !== Math.round(h * d)) { cv.width = Math.round(w * d); cv.height = Math.round(h * d); cv.style.height = h + "px"; }
    const c = cv.getContext("2d"); c.setTransform(d, 0, 0, d, 0, 0); return { c, w, h };
  }
  function txt(c, s, x, y, col, al = "left", bl = "alphabetic", font = "12px 'Fira Sans',Arial,sans-serif") { c.font = font; c.fillStyle = col; c.textAlign = al; c.textBaseline = bl; c.fillText(s, x, y); }
  function linreg(P) {
    const n = P.length; if (n < 2) return null; let sx = 0, sy = 0, sxx = 0, sxy = 0, syy = 0;
    P.forEach(([x, y]) => { sx += x; sy += y; sxx += x * x; sxy += x * y; syy += y * y; });
    const d = n * sxx - sx * sx; if (Math.abs(d) < 1e-18) return null;
    const a = (n * sxy - sx * sy) / d, b = (sy - a * sx) / n, den = Math.sqrt(d * (n * syy - sy * sy));
    return { a, b, r: den ? (n * sxy - sx * sy) / den : 1, n };
  }
  /* nuage de points + droite de régression (ou non) */
  function scatter(cv, P, o) {
    const { c, w, h } = fit(cv, 0.66); c.fillStyle = css("--plot-bg"); c.fillRect(0, 0, w, h);
    const m = { l: 54, r: 14, t: 18, b: 40 }, W = w - m.l - m.r, H = h - m.t - m.b;
    if (!P.length) { txt(c, "Le graphe se trace dès la première mesure.", w / 2, h / 2, css("--muted"), "center", "middle", "13px 'Fira Sans',Arial"); return null; }
    const xs = P.map(p => p[0]), ys = P.map(p => p[1]);
    let x0 = o.xmin != null ? Math.min(o.xmin, ...xs) : Math.min(...xs), x1 = Math.max(...xs), y0 = o.ymin != null ? Math.min(o.ymin, ...ys) : Math.min(...ys), y1 = Math.max(...ys);
    const px = (x1 - x0) || Math.abs(x1) || 1, py = (y1 - y0) || Math.abs(y1) || 1;
    x1 += px * 0.08; y1 += py * 0.12; if (o.xmin == null) x0 -= px * 0.08; if (o.ymin == null) y0 -= py * 0.1;
    const X = x => m.l + (x - x0) / (x1 - x0) * W, Y = y => m.t + H - (y - y0) / (y1 - y0) * H;
    const ticks = (a, b) => { const s = Math.pow(10, Math.floor(Math.log10((b - a) / 4))); const st = [1, 2, 5, 10].map(k => k * s).find(k => (b - a) / k <= 6); const out = []; for (let t = Math.ceil(a / st) * st; t <= b + 1e-12; t += st) out.push(+t.toPrecision(8)); return out; };
    c.strokeStyle = css("--grid"); c.lineWidth = 1;
    ticks(x0, x1).forEach(t => { c.beginPath(); c.moveTo(X(t), m.t); c.lineTo(X(t), m.t + H); c.stroke(); txt(c, String(t).replace(".", ","), X(t), m.t + H + 14, css("--muted"), "center"); });
    ticks(y0, y1).forEach(t => { c.beginPath(); c.moveTo(m.l, Y(t)); c.lineTo(m.l + W, Y(t)); c.stroke(); txt(c, String(t).replace(".", ","), m.l - 6, Y(t), css("--muted"), "right", "middle"); });
    c.strokeStyle = css("--muted"); c.lineWidth = 1.2; c.beginPath(); c.moveTo(m.l, m.t); c.lineTo(m.l, m.t + H); c.lineTo(m.l + W, m.t + H); c.stroke();
    txt(c, o.xl, m.l + W, m.t + H + 32, css("--muted"), "right"); txt(c, o.yl, m.l + 4, m.t + 10, css("--muted"));
    c.save(); c.beginPath(); c.rect(m.l, m.t, W, H); c.clip();
    if (o.curve) { c.strokeStyle = css("--muted"); c.setLineDash([5, 4]); c.lineWidth = 1.4; c.beginPath(); for (let i = 0; i <= 200; i++) { const x = x0 + (x1 - x0) * i / 200, y = o.curve(x); i ? c.lineTo(X(x), Y(y)) : c.moveTo(X(x), Y(y)); } c.stroke(); c.setLineDash([]); }
    const R = o.noFit ? null : linreg(P);
    if (R) { c.strokeStyle = css("--saff"); c.lineWidth = 2; c.beginPath(); c.moveTo(X(x0), Y(R.a * x0 + R.b)); c.lineTo(X(x1), Y(R.a * x1 + R.b)); c.stroke(); }
    c.restore();
    c.fillStyle = css("--accent"); P.forEach(([x, y]) => { c.beginPath(); c.arc(X(x), Y(y), 4.5, 0, 7); c.fill(); });
    return R;
  }

  /* chronomètre (manuel ou capteur automatique) */
  function chrono(id) {
    const html = `<h3>Chronomètre</h3>
      <div class="seg" role="group" aria-label="Mode de chronométrage"><button type="button" id="${id}-mMan" aria-pressed="true">Manuel</button><button type="button" id="${id}-mAut" aria-pressed="false">Capteur automatique</button></div>
      <div class="ctl"><label for="${id}-nb">Nombre d'oscillations à chronométrer</label><input id="${id}-nb" type="number" min="1" max="50" value="10"></div>
      <dl class="lcd"><dt>Temps</dt><dd id="${id}-t">0,00 s</dd><dt>Oscillations comptées</dt><dd id="${id}-n">0</dd></dl>
      <div class="row"><button type="button" class="btn sm" id="${id}-go">Démarrer</button><button type="button" class="btn sm" id="${id}-rz">Remise à zéro</button></div>`;
    const S = { t: 0, n: 0, on: false, auto: false, armed: false, target: 10, done: false };
    function bind() {
      const show = () => { $("#" + id + "-t").textContent = fr(S.t, 2) + " s"; $("#" + id + "-n").textContent = S.n; $("#" + id + "-go").textContent = S.on ? "Arrêter" : (S.auto ? "Armer le capteur" : "Démarrer"); };
      S.show = show;
      $("#" + id + "-mMan").onclick = () => { S.auto = false; $("#" + id + "-mMan").setAttribute("aria-pressed", "true"); $("#" + id + "-mAut").setAttribute("aria-pressed", "false"); show(); };
      $("#" + id + "-mAut").onclick = () => { S.auto = true; $("#" + id + "-mAut").setAttribute("aria-pressed", "true"); $("#" + id + "-mMan").setAttribute("aria-pressed", "false"); show(); };
      $("#" + id + "-go").onclick = () => {
        S.target = Math.max(1, Math.round(+$("#" + id + "-nb").value || 10));
        if (S.on || S.armed) { S.on = false; S.armed = false; }
        else if (S.auto) { S.t = 0; S.n = 0; S.done = false; S.armed = true; }
        else { S.t = 0; S.n = 0; S.done = false; S.on = true; }
        show();
      };
      $("#" + id + "-rz").onclick = () => { S.on = false; S.armed = false; S.t = 0; S.n = 0; S.done = false; show(); };
      show();
    }
    // appelé à chaque image ; extreme=true quand l'oscillateur passe par une position extrême (début de période)
    S.step = (dt, extreme) => {
      if (S.armed && extreme) { S.armed = false; S.on = true; S.t = 0; S.n = 0; }
      else if (S.on) {
        S.t += dt;
        if (extreme) { S.n++; if (S.auto && S.n >= S.target) { S.on = false; S.done = true; S.t += gauss() * 0.004; } }
      }
      if (S.show) S.show();
    };
    S.reading = () => ({ t: S.t, n: S.auto ? S.n : Math.max(1, Math.round(+$("#" + id + "-nb").value || 10)) });
    return { html, S, bind };
  }

  const TPS = [];
  function register(T) { TPS.push(T); }

  function mount(T) {
    const host = document.createElement("section"); host.className = "tp"; host.id = T.id; host.hidden = true;
    const L = "ABCDEFG";
    host.innerHTML = `
    <article class="card fiche">
      <div class="eyebrow">${esc(T.disc)} • TP n°${T.num}</div>
      <h2>${esc(T.titre)}</h2>
      <p class="obj"><b>Objectifs.</b> ${T.objectifs}</p>
      <ul class="mat" aria-label="Matériel">${T.materiel.map(m => `<li>${esc(m)}</li>`).join("")}</ul>
      <details open><summary>Rappels théoriques</summary><div class="sec">${T.theorie}</div></details>
      <details open><summary>Protocole détaillé</summary><div class="sec">${T.protocole}</div></details>
      <details><summary>Précautions et incertitudes</summary><div class="sec">${T.precautions}</div></details>
      <details><summary>Préparation (à faire avant la séance)</summary><div class="sec"><ol>${T.preparation.map(q => `<li>${q}</li>`).join("")}</ol></div></details>
    </article>
    <div class="lab">
      <div class="bench"><canvas id="${T.id}-cv" aria-label="Montage simulé"></canvas><p class="hint">${T.hint}</p></div>
      <div class="panel">${T.controls}<p class="msg" id="${T.id}-msg" role="status"></p></div>
    </div>
    ${T.parts.map((p, i) => `<section class="part" id="${T.id}-p-${p.key}">
      <h3>Partie ${L[i]} — ${esc(p.titre)}</h3>
      <div class="data${p.point ? "" : " solo"}">
        <div class="tblwrap"><table><thead><tr>${p.cols.map(c => `<th>${c}</th>`).join("")}<th class="noprint"></th></tr></thead><tbody id="${T.id}-tb-${p.key}"></tbody></table></div>
        ${p.point ? `<div class="graph"><canvas id="${T.id}-gr-${p.key}" aria-label="Graphe ${esc(p.titre)}"></canvas><div class="fit" id="${T.id}-fit-${p.key}">—</div></div>` : `<div class="fit" id="${T.id}-fit-${p.key}">—</div>`}
      </div></section>`).join("")}
    <section class="card report" aria-labelledby="${T.id}-crh">
      <h3 id="${T.id}-crh">Compte rendu — TP n°${T.num}</h3>
      <div class="id">
        <label>Nom et prénom<input id="${T.id}-nom" autocomplete="name"></label>
        <label>Binôme<input id="${T.id}-bin"></label>
        <label>Groupe<input id="${T.id}-grp"></label>
        <label>Date<input id="${T.id}-date" type="date"></label>
      </div>
      <div class="res"><div class="eyebrow">Résultats des mesures (remplis automatiquement)</div>${T.parts.map((p, i) => `<div class="fit" id="${T.id}-sum-${p.key}"></div>`).join("")}</div>
      <div class="eyebrow">Questions</div>
      ${T.questions.map((q, i) => `<div class="q"><label for="${T.id}-q${i}"><b>${i + 1}.</b> ${q}</label><textarea id="${T.id}-q${i}"></textarea></div>`).join("")}
      <div class="q"><label for="${T.id}-concl"><b>Conclusion.</b> Résume les résultats obtenus, leur précision et ce que tu retiens du TP.</label><textarea id="${T.id}-concl"></textarea></div>
      <div class="row noprint">
        <button type="button" class="btn primary" id="${T.id}-dl">Télécharger le compte rendu</button>
        <button type="button" class="btn" id="${T.id}-pr">Imprimer / PDF</button>
        <button type="button" class="btn" id="${T.id}-cp">Copier le texte</button>
        <button type="button" class="btn" id="${T.id}-clr">Effacer toutes les mesures</button>
        <span class="saved" id="${T.id}-saved">Les réponses sont enregistrées automatiquement sur cet appareil.</span>
      </div>
    </section>`;
    $("#tpHost").appendChild(host);

    T.rows = {}; T.parts.forEach(p => T.rows[p.key] = store.get(T.id + "_" + p.key, []));
    T.fits = {};
    T.msg = (s, kind) => { const e = $("#" + T.id + "-msg"); e.textContent = s || ""; e.className = "msg" + (kind ? " " + kind : ""); };
    T.renderPart = key => {
      const p = T.parts.find(q => q.key === key), rows = T.rows[key], tb = $("#" + T.id + "-tb-" + key);
      tb.innerHTML = rows.length ? rows.map((r, i) => `<tr>${p.cells(r, i).map(v => `<td>${v}</td>`).join("")}<td class="x noprint"><button type="button" data-del="${key}:${i}" aria-label="Supprimer la mesure ${i + 1}">×</button></td></tr>`).join("")
        : `<tr class="empty"><td colspan="${p.cols.length + 1}">Aucune mesure pour l'instant.</td></tr>`;
      let R = null;
      if (p.point) { const P = rows.map(p.point).filter(Boolean); R = scatter($("#" + T.id + "-gr-" + key), P, p.axes || {}); }
      T.fits[key] = R;
      const s = p.fit(R, rows);
      $("#" + T.id + "-fit-" + key).innerHTML = s; $("#" + T.id + "-sum-" + key).innerHTML = `<b>Partie ${L[T.parts.indexOf(p)]}.</b> ` + s;
      store.set(T.id + "_" + key, rows);
    };
    T.renderAll = () => T.parts.forEach(p => T.renderPart(p.key));
    T.add = (key, row) => { T.rows[key].push(row); T.renderPart(key); };
    host.addEventListener("click", e => { const b = e.target.closest("[data-del]"); if (!b) return; const [k, i] = b.dataset.del.split(":"); T.rows[k].splice(+i, 1); T.renderPart(k); });
    $("#" + T.id + "-clr").onclick = () => { T.parts.forEach(p => T.rows[p.key] = []); T.renderAll(); T.msg("Toutes les mesures ont été effacées."); };

    // compte rendu : sauvegarde locale
    const fields = ["nom", "bin", "grp", "date", "concl"].concat(T.questions.map((_, i) => "q" + i));
    const saved = store.get(T.id + "_cr", {});
    fields.forEach(f => { const e = $("#" + T.id + "-" + f); if (saved[f] != null) e.value = saved[f]; e.addEventListener("input", () => { const o = {}; fields.forEach(g => o[g] = $("#" + T.id + "-" + g).value); store.set(T.id + "_cr", o); }); });
    if (!$("#" + T.id + "-date").value) $("#" + T.id + "-date").value = new Date().toISOString().slice(0, 10);

    const val = f => $("#" + T.id + "-" + f).value;
    const plain = h => String(h).replace(/<sup>(.*?)<\/sup>/g, "^$1").replace(/<sub>(.*?)<\/sub>/g, "_$1").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    const textReport = () => {
      const out = [`COMPTE RENDU — TP n°${T.num} : ${T.titre}`, "Université Souleymane Niang de Matam — Physique L1", `Nom : ${val("nom")}`, `Binôme : ${val("bin")}`, `Groupe : ${val("grp")}`, `Date : ${val("date")}`, ""];
      T.parts.forEach((p, i) => { out.push(`PARTIE ${L[i]} — ${p.titre}`, p.cols.map(plain).join(" | ")); T.rows[p.key].forEach((r, j) => out.push(p.cells(r, j).map(plain).join(" | "))); out.push("Exploitation : " + plain(p.fit(T.fits[p.key], T.rows[p.key])), ""); });
      out.push("QUESTIONS"); T.questions.forEach((q, i) => out.push(`${i + 1}. ${plain(q)}`, "   " + (val("q" + i) || "(sans réponse)"), ""));
      out.push("CONCLUSION", val("concl") || "(sans réponse)"); return out.join("\n");
    };
    const htmlReport = () => {
      const tables = T.parts.map((p, i) => {
        const cv = p.point ? $("#" + T.id + "-gr-" + p.key) : null, img = cv && T.rows[p.key].length ? `<img src="${cv.toDataURL("image/png")}" alt="Graphe" style="max-width:100%;border:1px solid #ccc">` : "";
        return `<h2>Partie ${L[i]} — ${esc(p.titre)}</h2><table><tr>${p.cols.map(c => `<th>${c}</th>`).join("")}</tr>${T.rows[p.key].map((r, j) => `<tr>${p.cells(r, j).map(v => `<td>${v}</td>`).join("")}</tr>`).join("") || `<tr><td colspan="${p.cols.length}">Aucune mesure</td></tr>`}</table>${img}<p class="fit">${p.fit(T.fits[p.key], T.rows[p.key])}</p>`;
      }).join("");
      const qs = T.questions.map((q, i) => `<p><b>${i + 1}. ${q}</b><br>${esc(val("q" + i) || "(sans réponse)").replace(/\n/g, "<br>")}</p>`).join("");
      return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Compte rendu TP ${T.num} — ${esc(val("nom"))}</title><style>body{font-family:Georgia,serif;max-width:800px;margin:24px auto;padding:0 16px;color:#111}h1{font-family:Arial,sans-serif;font-size:20px;border-bottom:3px solid #D98E04;padding-bottom:6px}h2{font-family:Arial,sans-serif;font-size:16px;color:#1F7A8C;margin-top:22px}table{border-collapse:collapse;margin:8px 0;font-family:monospace;font-size:13px}th,td{border:1px solid #999;padding:4px 8px;text-align:right}th{background:#EEF4F6}.fit{background:#EEF4F6;padding:8px;font-family:monospace;font-size:13px}.id td{text-align:left;border:0;padding:2px 12px 2px 0}</style></head><body>
        <div style="font-family:Arial;font-size:12px;color:#B87503;font-weight:bold">UNIVERSITÉ SOULEYMANE NIANG DE MATAM • PHYSIQUE L1</div>
        <h1>Compte rendu — TP n°${T.num} : ${esc(T.titre)}</h1>
        <table class="id"><tr><td><b>Nom</b></td><td>${esc(val("nom"))}</td><td><b>Binôme</b></td><td>${esc(val("bin"))}</td></tr><tr><td><b>Groupe</b></td><td>${esc(val("grp"))}</td><td><b>Date</b></td><td>${esc(val("date"))}</td></tr></table>
        ${tables}<h2>Questions</h2>${qs}<h2>Conclusion</h2><p>${esc(val("concl") || "(sans réponse)").replace(/\n/g, "<br>")}</p></body></html>`;
    };
    $("#" + T.id + "-dl").onclick = () => {
      const b = new Blob([htmlReport()], { type: "text/html;charset=utf-8" }), a = document.createElement("a");
      a.href = URL.createObjectURL(b); a.download = `CR_TP${T.num}_${(val("nom") || "etudiant").trim().replace(/\s+/g, "_")}.html`; document.body.appendChild(a); a.click(); a.remove();
      $("#" + T.id + "-saved").textContent = "Fichier téléchargé : ouvre-le puis imprime-le ou envoie-le à ton enseignant.";
    };
    $("#" + T.id + "-pr").onclick = () => window.print();
    $("#" + T.id + "-cp").onclick = async () => { try { await navigator.clipboard.writeText(textReport()); $("#" + T.id + "-saved").textContent = "Texte du compte rendu copié."; } catch (e) { $("#" + T.id + "-saved").textContent = "Copie impossible : utilise « Télécharger »."; } };

    T.init(T);
    T.renderAll();
  }

  let cur = null;
  function go(id) {
    cur = id;
    document.querySelectorAll("#tabs [data-t]").forEach(b => b.setAttribute("aria-pressed", b.dataset.t === id));
    TPS.forEach(t => { document.getElementById(t.id).hidden = t.id !== id; });
    history.replaceState(null, "", "#" + id);
    const T = TPS.find(t => t.id === id); T.draw && T.draw(); T.renderAll();
  }
  function start() {
    TPS.sort((a, b) => a.num - b.num);
    const groups = {}; TPS.forEach(t => (groups[t.disc] = groups[t.disc] || []).push(t));
    $("#tabs").innerHTML = Object.entries(groups).map(([g, l]) => `<div class="grp"><div class="grp-t">${esc(g)}</div><div class="pill-row">${l.map(t => `<button type="button" class="pill" data-t="${t.id}" aria-pressed="false">TP ${t.num} · ${esc(t.court)}</button>`).join("")}</div></div>`).join("");
    TPS.forEach(mount);
    $("#tabs").addEventListener("click", e => { const b = e.target.closest("[data-t]"); if (b) go(b.dataset.t); });
    addEventListener("hashchange", () => { const h = location.hash.slice(1); if (TPS.some(t => t.id === h) && h !== cur) go(h); });
    let rz; addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => { const T = TPS.find(t => t.id === cur); T.draw && T.draw(); T.renderAll(); }, 120); });
    const h = location.hash.slice(1); go(TPS.some(t => t.id === h) ? h : TPS[0].id);
    // boucle d'animation unique : seul le TP affiché avance
    let last = null;
    const loop = ts => { const dt = last == null ? 0 : Math.min(0.05, (ts - last) / 1000); last = ts; const T = TPS.find(t => t.id === cur); if (T && T.tick && dt > 0) T.tick(dt); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  }
  window.TPCORE = { register, start, $, css, esc, fr, gauss, store, fit, txt, linreg, chrono, isCur: id => cur === id };
})();
