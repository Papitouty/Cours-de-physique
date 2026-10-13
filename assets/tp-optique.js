/* TP d'optique : n°6 réfraction (lois de Descartes), n°7 lentilles minces, n°8 microscope */
(function () {
  "use strict";
  const { register, $, css, fr, gauss, store, fit, txt } = window.TPCORE;
  const D2R = Math.PI / 180, R2D = 180 / Math.PI;
  const round05 = x => Math.round(x * 2) / 2;
  const seg = (id, items, cur) => `<div class="seg" role="group">${items.map(([v, l]) => `<button type="button" data-${id}="${v}" aria-pressed="${v === cur}">${l}</button>`).join("")}</div>`;
  const setSeg = (id, v) => document.querySelectorAll(`[data-${id}]`).forEach(b => b.setAttribute("aria-pressed", b.getAttribute("data-" + id) === v));

  /* ========================= TP 6 : RÉFRACTION ========================= */
  register({
    id: "refraction", num: 6, disc: "Optique", court: "Réfraction",
    titre: "Étude de la réfraction : vérification des lois de Descartes",
    objectifs: "vérifier les lois de Snell-Descartes pour la réflexion et la réfraction, déterminer l'indice de réfraction n d'un demi-cylindre de plexiglas par deux méthodes, et mettre en évidence la réflexion totale et l'angle limite.",
    materiel: ["Source laser (ou lanterne à fente)", "Disque gradué (goniomètre)", "Demi-cylindre en plexiglas", "Écran"],
    theorie: `<p>Un rayon lumineux arrive sur la surface de séparation de deux milieux d'indices n₁ et n₂ avec un angle d'incidence i₁ (mesuré par rapport à la <b>normale</b>).</p>
      <h4>Lois de Snell-Descartes</h4><ol><li>Les rayons incident, réfléchi et réfracté sont dans le plan d'incidence.</li><li>Réflexion : l'angle de réflexion est égal à l'angle d'incidence.</li><li>Réfraction :</li></ol>
      <div class="formula">n₁ sin i₁ = n₂ sin i₂</div>
      <h4>Pourquoi un demi-cylindre ?</h4><p>Le rayon est toujours dirigé vers le centre du disque. Il traverse la face courbe selon un rayon du cercle, donc <b>sans être dévié</b> : seule la face plane réfracte la lumière.</p>
      <h4>Passage air → plexiglas (n₁ = 1, n₂ = n)</h4><div class="formula">sin i = n · sin r    ⟹    le graphe sin i = f(sin r) est une droite de pente n</div>
      <h4>Passage plexiglas → air et angle limite</h4><p>Le rayon s'écarte de la normale. Quand l'angle d'incidence atteint l'angle limite λ, le rayon réfracté rase la surface (r = 90°) ; au-delà, il n'y a plus de réfraction : c'est la <b>réflexion totale</b>.</p>
      <div class="formula">n · sin i = sin r      sin λ = 1/n    ⟹    n = 1 / sin λ</div>`,
    protocole: `<h4>Partie A — Passage de l'air dans le plexiglas</h4><ol>
        <li>Place le demi-cylindre sur le disque, face plane sur le diamètre 90°–90°, centre de la face plane au centre du disque.</li>
        <li>Dirige le rayon laser vers le centre du disque, du côté de la face plane (mode « air → plexiglas »).</li>
        <li>Pour i = 0°, 10°, 20°… jusqu'à 80°, lis l'angle de réfraction r sur le disque et enregistre (Partie A). Vérifie aussi que l'angle de réflexion est égal à i.</li>
        <li>Exploite le graphe sin i = f(sin r) : la pente donne n.</li></ol>
      <h4>Partie B — Passage du plexiglas dans l'air</h4><ol>
        <li>Fais entrer le rayon par la face courbe (mode « plexiglas → air »), toujours vers le centre.</li>
        <li>Pour i = 0°, 5°, 10°… lis l'angle r du rayon émergent dans l'air et enregistre (Partie B). Observe que le rayon réfracté faiblit et que le rayon réfléchi devient plus lumineux.</li>
        <li>Exploite le graphe sin r = f(sin i).</li></ol>
      <h4>Partie C — Angle limite</h4><ol>
        <li>Augmente lentement i jusqu'à la disparition du rayon réfracté : note cet angle λ (bouton « Noter l'angle limite »).</li>
        <li>Recommence 3 fois en approchant par valeurs croissantes, puis calcule n = 1/sin λ.</li></ol>`,
    precautions: `<ul><li>Ne regarde jamais directement le faisceau laser et évite les réflexions vers les yeux.</li>
      <li>Le rayon doit toujours passer exactement par le centre du disque, sinon la face courbe dévie aussi le faisceau.</li>
      <li>La lecture des angles se fait à ±0,5° près. Au voisinage de 90°, sin varie peu : les petits angles et les angles moyens sont les plus fiables.</li>
      <li>Δn/n ≈ cotan(i)·Δi + cotan(r)·Δr (angles en radians).</li></ul>`,
    preparation: ["Énonce les lois de Snell-Descartes pour la réflexion et la réfraction.", "Pourquoi le rayon n'est-il pas dévié en traversant la face courbe du demi-cylindre ?", "Pour n = 1,49, calcule r pour i = 30° (air → plexiglas) et l'angle limite λ.", "Dans quel sens de propagation la réflexion totale est-elle possible ? Pourquoi ?"],
    hint: "Le disque est gradué en degrés à partir de la normale (trait horizontal). Le laser vise toujours le centre.",
    controls: `<h3>Sens de propagation</h3>${seg("rfm", [["A", "Air → plexiglas"], ["B", "Plexiglas → air"]], "A")}
      <h3>Laser</h3><div class="ctl"><label for="rfI">Angle d'incidence i <b id="rfIv"></b></label><input id="rfI" type="range" min="0" max="89" step="0.5" value="30"></div>
      <h3>Lecture sur le disque</h3><dl class="lcd"><dt>Incidence i</dt><dd id="rfLi"></dd><dt>Réflexion i′</dt><dd id="rfLip"></dd><dt>Réfraction r</dt><dd id="rfLr"></dd></dl>
      <button type="button" class="btn primary sm" id="rfRec">Enregistrer la mesure</button>
      <button type="button" class="btn sm" id="rfLim">Noter l'angle limite (Partie C)</button>
      <button type="button" class="btn sm" id="rfNew">Changer de demi-cylindre</button>`,
    parts: [
      { key: "A", titre: "Air → plexiglas", cols: ["n°", "i (°)", "r (°)", "sin i", "sin r", "sin i / sin r"],
        cells: (r, k) => [k + 1, fr(r.i, 1), fr(r.r, 1), fr(Math.sin(r.i * D2R), 3), fr(Math.sin(r.r * D2R), 3), r.i > 0 ? fr(Math.sin(r.i * D2R) / Math.sin(r.r * D2R), 3) : "—"],
        point: r => [Math.sin(r.r * D2R), Math.sin(r.i * D2R)], axes: { xl: "sin r", yl: "sin i", xmin: 0, ymin: 0 },
        fit: R => R ? `sin i = ${fr(R.a, 3)} · sin r ${R.b < 0 ? "−" : "+"} ${fr(Math.abs(R.b), 3)}  (r = ${fr(R.r, 5)})   ⟹   n = pente = ${fr(R.a, 3)}` : "Au moins 2 mesures sont nécessaires." },
      { key: "B", titre: "Plexiglas → air", cols: ["n°", "i (°)", "r (°)", "sin i", "sin r"],
        cells: (r, k) => [k + 1, fr(r.i, 1), fr(r.r, 1), fr(Math.sin(r.i * D2R), 3), fr(Math.sin(r.r * D2R), 3)],
        point: r => [Math.sin(r.i * D2R), Math.sin(r.r * D2R)], axes: { xl: "sin i", yl: "sin r", xmin: 0, ymin: 0 },
        fit: R => R ? `sin r = ${fr(R.a, 3)} · sin i ${R.b < 0 ? "−" : "+"} ${fr(Math.abs(R.b), 3)}  (r = ${fr(R.r, 5)})   ⟹   n = pente = ${fr(R.a, 3)}` : "Au moins 2 mesures sont nécessaires." },
      { key: "C", titre: "Angle limite", cols: ["n°", "λ (°)", "sin λ", "n = 1/sin λ"],
        cells: (r, k) => [k + 1, fr(r.l, 1), fr(Math.sin(r.l * D2R), 4), fr(1 / Math.sin(r.l * D2R), 3)],
        fit: (R, rows) => rows.length ? `Moyenne : λ = ${fr(rows.reduce((s, r) => s + r.l, 0) / rows.length, 1)}° ⟹ n = ${fr(rows.reduce((s, r) => s + 1 / Math.sin(r.l * D2R), 0) / rows.length, 3)}` : "Note l'angle limite au moins 3 fois." }
    ],
    questions: ["Les angles d'incidence et de réflexion sont-ils égaux ? Énonce la loi de la réflexion.", "Partie A : le graphe sin i = f(sin r) est-il une droite passant par l'origine ? Donne n.", "Partie B : que devient le rayon réfracté quand i augmente ? Comment varie la luminosité des rayons réfléchi et réfracté ?", "Partie C : donne λ et la valeur de n correspondante. Compare les trois valeurs de n obtenues.", "Cite une application de la réflexion totale (fibre optique, prisme…)."],
    init(T) {
      let P = store.get("refr_par", null); const newBlock = () => { P = { n: 1.46 + Math.random() * 0.07 }; store.set("refr_par", P); }; if (!P) newBlock();
      let mode = "A", i = 30;
      const read = () => {
        const n = P.n, si = Math.sin(i * D2R); let r = null;
        if (mode === "A") r = Math.asin(si / n) * R2D; else if (n * si < 1) r = Math.asin(n * si) * R2D;
        return { r, lim: Math.asin(1 / n) * R2D };
      };
      let lec = { i: 0, ip: 0, r: null };
      const update = () => { const s = read(); lec = { i: i, ip: round05(i + gauss() * 0.25), r: s.r == null ? null : round05(s.r + gauss() * 0.3) };
        $("#rfIv").textContent = fr(i, 1) + "°"; $("#rfLi").textContent = fr(i, 1) + "°"; $("#rfLip").textContent = fr(lec.ip, 1) + "°"; $("#rfLr").textContent = lec.r == null ? "pas de rayon réfracté" : fr(lec.r, 1) + "°"; };
      document.querySelectorAll("[data-rfm]").forEach(b => b.onclick = () => { mode = b.dataset.rfm; setSeg("rfm", mode); update(); T.draw(); });
      $("#rfI").addEventListener("input", e => { i = +e.target.value; update(); T.draw(); });
      $("#rfRec").onclick = () => { if (lec.r == null) { T.msg("Réflexion totale : il n'y a pas de rayon réfracté à mesurer.", "bad"); return; } T.add(mode, { i: lec.i, r: lec.r }); T.msg(`Mesure enregistrée (partie ${mode}).`, "ok"); };
      $("#rfLim").onclick = () => { const { lim } = read(); if (mode !== "B") { T.msg("L'angle limite s'observe dans le sens plexiglas → air.", "bad"); return; } if (i < lim) { T.msg("Le rayon réfracté est encore visible : augmente doucement l'angle.", "bad"); return; } if (i > lim + 1.5) { T.msg("Tu as dépassé l'angle limite de trop : reviens en arrière et approche-le lentement.", "bad"); return; } T.add("C", { l: round05(i + gauss() * 0.2) }); T.msg("Angle limite noté.", "ok"); };
      $("#rfNew").onclick = () => { newBlock(); ["A", "B", "C"].forEach(k => T.rows[k] = []); T.renderAll(); update(); T.draw(); T.msg("Nouveau demi-cylindre : refais les mesures."); };
      T.draw = () => {
        const { c, w, h } = fit($("#refraction-cv"), innerWidth < 600 ? 0.95 : 0.62); c.fillStyle = css("--plot-bg"); c.fillRect(0, 0, w, h);
        const fg = css("--fg"), mu = css("--muted"), cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.42;
        // disque gradué : 0° sur la normale (horizontale)
        c.fillStyle = css("--tint"); c.beginPath(); c.arc(cx, cy, R, 0, 7); c.fill(); c.strokeStyle = mu; c.lineWidth = 1; c.stroke();
        for (let a = 0; a < 360; a += 1) { const ra = a * D2R, l = a % 10 === 0 ? 12 : a % 5 === 0 ? 7 : 3; c.beginPath(); c.moveTo(cx + Math.cos(ra) * R, cy + Math.sin(ra) * R); c.lineTo(cx + Math.cos(ra) * (R - l), cy + Math.sin(ra) * (R - l)); c.stroke();
          if (a % 10 === 0 && R > 120) { const lab = a <= 90 ? a : a <= 180 ? 180 - a : a <= 270 ? a - 180 : 360 - a; txt(c, String(lab), cx + Math.cos(ra) * (R - 22), cy + Math.sin(ra) * (R - 22), mu, "center", "middle", "10px 'Fira Mono'"); } }
        c.setLineDash([5, 4]); c.strokeStyle = mu; c.beginPath(); c.moveTo(cx - R, cy); c.lineTo(cx + R, cy); c.stroke(); c.setLineDash([]); txt(c, "normale", cx - R + 4, cy - 6, mu);
        // demi-cylindre : face plane verticale au centre, partie courbe à droite
        c.fillStyle = "rgba(120,170,220,.35)"; c.strokeStyle = "#5f8fc0"; c.lineWidth = 1.5; c.beginPath(); c.moveTo(cx, cy - R * 0.62); c.arc(cx, cy, R * 0.62, -Math.PI / 2, Math.PI / 2); c.closePath(); c.fill(); c.stroke();
        txt(c, "plexiglas", cx + R * 0.32, cy + R * 0.42, "#3f6f9f", "center");
        const s = read(), ray = (a, len, alpha, col) => { c.strokeStyle = col; c.globalAlpha = alpha; c.lineWidth = 2.6; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + Math.cos(a) * len, cy + Math.sin(a) * len); c.stroke(); c.globalAlpha = 1; };
        const red = "#e53935", L = R * 0.98, ir = i * D2R;
        // Fresnel (moyenne des polarisations) pour la luminosité
        const n1 = mode === "A" ? 1 : P.n, n2 = mode === "A" ? P.n : 1; let Rf = 1;
        if (s.r != null) { const ti = ir, tt = s.r * D2R, rs = ((n1 * Math.cos(ti) - n2 * Math.cos(tt)) / (n1 * Math.cos(ti) + n2 * Math.cos(tt))) ** 2, rp = ((n1 * Math.cos(tt) - n2 * Math.cos(ti)) / (n1 * Math.cos(tt) + n2 * Math.cos(ti))) ** 2; Rf = (rs + rp) / 2; }
        if (mode === "A") { // incident depuis la gauche (air), en haut à gauche
          const ai = Math.PI + ir; c.strokeStyle = red; c.lineWidth = 3; c.beginPath(); c.moveTo(cx + Math.cos(ai) * L, cy + Math.sin(ai) * L); c.lineTo(cx, cy); c.stroke();
          ray(Math.PI - ir, L, 0.25 + 0.75 * Math.min(1, Rf * 6), red);                 // réfléchi (en bas à gauche)
          ray(s.r * D2R, L, 0.95 - Rf, red);                                          // réfracté (dans le bloc, en bas à droite)
          c.fillStyle = "#555"; c.save(); c.translate(cx + Math.cos(ai) * (L + 4), cy + Math.sin(ai) * (L + 4)); c.rotate(ai); c.fillRect(-4, -6, 22, 12); c.restore();
        } else { // incident depuis la face courbe (droite, en haut), émergent à gauche
          const ai = -ir; c.strokeStyle = red; c.lineWidth = 3; c.beginPath(); c.moveTo(cx + Math.cos(ai) * L, cy + Math.sin(ai) * L); c.lineTo(cx, cy); c.stroke();
          ray(ir, L, s.r == null ? 1 : 0.25 + 0.75 * Math.min(1, Rf * 3), red);         // réfléchi dans le bloc
          if (s.r != null) ray(Math.PI - s.r * D2R, L, Math.max(0.12, 0.95 - Rf), red);  // réfracté dans l'air (en bas à gauche)
          c.fillStyle = "#555"; c.save(); c.translate(cx + Math.cos(ai) * (L + 4), cy + Math.sin(ai) * (L + 4)); c.rotate(ai); c.fillRect(-4, -6, 22, 12); c.restore();
          if (s.r == null) txt(c, "réflexion totale", cx - R * 0.5, cy + R * 0.5, css("--ko"), "center", "alphabetic", "700 13px 'Fira Sans'");
        }
        c.fillStyle = fg; c.beginPath(); c.arc(cx, cy, 3, 0, 7); c.fill();
        txt(c, mode === "A" ? "air → plexiglas" : "plexiglas → air", 12, 18, fg, "left", "alphabetic", "600 13px 'Fira Sans'");
      };
      update();
    }
  });

  /* ---------- outils communs aux lentilles ---------- */
  // position de l'image (en cm, abscisse sur le banc) d'un objet en xo par une lentille en xl de focale f (lumière vers la droite)
  const imageOf = (xo, xl, f) => { const OA = xo - xl, inv = 1 / f + 1 / OA; return Math.abs(inv) < 1e-9 ? Infinity : xl + 1 / inv; };
  function bench(c, w, by, X, mu) {
    c.fillStyle = css("--line"); c.fillRect(X(0), by + 34, X(150) - X(0), 10);
    for (let x = 0; x <= 150; x += 5) { c.strokeStyle = mu; c.lineWidth = 1; c.beginPath(); c.moveTo(X(x), by + 34); c.lineTo(X(x), by + (x % 10 ? 40 : 46)); c.stroke(); if (x % 20 === 0) txt(c, String(x), X(x), by + 60, mu, "center"); }
    txt(c, "cm", X(150), by + 74, mu, "right");
    c.setLineDash([4, 4]); c.strokeStyle = mu; c.beginPath(); c.moveTo(X(0), by); c.lineTo(X(150), by); c.stroke(); c.setLineDash([]);
  }
  function lens(c, x, by, col, label, conv = true) {
    c.strokeStyle = col; c.lineWidth = 3; c.beginPath(); c.moveTo(x, by - 40); c.lineTo(x, by + 28); c.stroke(); c.fillStyle = col;
    [[-40, 1], [28, -1]].forEach(([dy, sg]) => { c.beginPath(); if (conv) { c.moveTo(x, by + dy - sg * 2); c.lineTo(x - 7, by + dy + sg * 8); c.lineTo(x + 7, by + dy + sg * 8); } c.closePath(); c.fill(); });
    txt(c, label, x, by - 48, col, "center");
  }
  function objectF(c, x, by) { c.fillStyle = css("--saff"); c.fillRect(x - 6, by - 28, 12, 28); txt(c, "F", x, by - 34, css("--saff"), "center", "alphabetic", "700 14px 'Fira Sans'"); txt(c, "objet", x, by + 24, css("--muted"), "center"); }
  // vignette « ce que l'on voit » : F net ou flou, éventuellement renversé
  function viewF(c, x, y, w, h, title, sharpness, scale, inverted, note) {
    c.fillStyle = "#f4f1e8"; c.fillRect(x, y, w, h); c.strokeStyle = css("--muted"); c.lineWidth = 1; c.strokeRect(x, y, w, h); txt(c, title, x + w / 2, y - 6, css("--muted"), "center");
    c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip();
    if (sharpness != null) { const size = Math.max(8, Math.min(h * 1.5, scale * h * 0.35)), bl = Math.min(28, sharpness * 60), n = bl < 0.6 ? 1 : 22;
      c.fillStyle = "#d98e04"; c.globalAlpha = n === 1 ? 1 : 0.1;
      for (let k = 0; k < n; k++) { const a = k / n * 6.283, r = n === 1 ? 0 : bl * (0.35 + 0.65 * ((k * 7) % n) / n); c.save(); c.translate(x + w / 2 + Math.cos(a) * r, y + h / 2 + Math.sin(a) * r); if (inverted) c.rotate(Math.PI); c.font = `700 ${size}px 'Fira Sans',Arial`; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("F", 0, 0); c.restore(); }
      c.globalAlpha = 1; } else { c.fillStyle = "rgba(217,142,4,.15)"; c.beginPath(); c.arc(x + w / 2, y + h / 2, h * 0.42, 0, 7); c.fill(); }
    if (note) txt(c, note, x + w / 2, y + h - 6, "#7a6a4a", "center");
    c.restore();
  }

  /* ========================= TP 7 : LENTILLES ========================= */
  register({
    id: "lentilles", num: 7, disc: "Optique", court: "Lentilles et focométrie",
    titre: "Lois des lentilles : détermination de la distance focale",
    objectifs: "déterminer la distance focale f′ d'une lentille mince convergente par trois méthodes — autocollimation, plans conjugués (relation de conjugaison) et méthode de Bessel — puis comparer leur précision.",
    materiel: ["Banc d'optique gradué", "Objet lumineux (lettre F éclairée)", "Lentille mince convergente (f′ inconnue)", "Miroir plan", "Écran", "Supports"],
    theorie: `<p>Pour une lentille mince de centre O, de foyers F et F′, un objet A a une image A′ telle que (distances algébriques, sens de la lumière positif) :</p>
      <div class="formula">1/OA′ − 1/OA = 1/f′        grandissement  γ = A′B′/AB = OA′/OA</div>
      <h4>1. Autocollimation</h4><p>On place un miroir plan juste derrière la lentille. Si l'objet est dans le plan focal objet, les rayons sortent de la lentille parallèles, se réfléchissent sur le miroir et reviennent former une image <b>nette dans le plan de l'objet</b>, renversée. On lit alors directement <b>f′ = distance objet–lentille</b>.</p>
      <h4>2. Plans conjugués</h4><p>On mesure OA et OA′ pour plusieurs positions. Le graphe 1/OA′ = f(1/OA) est une droite de pente 1 et d'ordonnée à l'origine 1/f′ (la vergence V en dioptries δ si les distances sont en mètres).</p>
      <h4>3. Méthode de Bessel</h4><p>L'objet et l'écran sont fixes, à la distance D l'un de l'autre. Si D > 4f′, il existe <b>deux positions</b> de la lentille donnant une image nette, séparées de d. On montre que :</p>
      <div class="formula">f′ = (D² − d²) / (4 D)</div>
      <p>Cette méthode n'exige pas de repérer précisément le centre de la lentille : seule la différence d de deux positions intervient.</p>`,
    protocole: `<h4>Partie A — Autocollimation</h4><ol>
        <li>Objet à la graduation 5 cm. Place la lentille puis le miroir plan accolé derrière elle (méthode « Autocollimation »).</li>
        <li>Déplace l'ensemble lentille + miroir jusqu'à ce que l'image renvoyée dans le plan de l'objet soit parfaitement nette.</li>
        <li>Enregistre : f′ = distance objet–lentille. Recommence 3 fois en partant alternativement de trop près et de trop loin.</li></ol>
      <h4>Partie B — Plans conjugués</h4><ol>
        <li>Retire le miroir et place l'écran (méthode « Plans conjugués »). Lentille à 25 cm de l'objet.</li>
        <li>Déplace l'écran jusqu'à l'image la plus nette ; enregistre OA et OA′.</li>
        <li>Recommence pour au moins 6 positions de la lentille. Exploite le graphe 1/OA′ = f(1/OA).</li></ol>
      <h4>Partie C — Méthode de Bessel</h4><ol>
        <li>Fixe l'écran à une distance D de l'objet (D > 4f′, par exemple D = 80 cm) (méthode « Bessel »).</li>
        <li>Cherche la première position nette de la lentille (près de l'objet, image agrandie) : « Noter position 1 ».</li>
        <li>Cherche la seconde position nette (près de l'écran, image réduite) : « Noter position 2 ».</li>
        <li>Recommence pour D = 70, 90, 100 et 110 cm.</li></ol>`,
    precautions: `<ul><li>La netteté est appréciée à l'œil : fais la mise au point en venant alternativement des deux côtés et prends la moyenne.</li>
      <li>L'objet, la lentille et l'écran doivent être centrés sur l'axe optique (même hauteur).</li>
      <li>En plans conjugués, l'incertitude vient surtout de la position du centre optique ; la méthode de Bessel l'élimine.</li>
      <li>Pour Bessel : Δf′/f′ ≈ (2DΔD + 2dΔd)/(D² − d²) + ΔD/D.</li></ul>`,
    preparation: ["Construis l'image d'un objet situé à 2f′ devant une lentille convergente. Où est l'image ?", "Explique pourquoi, en autocollimation, l'image se forme dans le plan de l'objet quand celui-ci est au foyer.", "Démontre la formule de Bessel f′ = (D² − d²)/(4D) à partir de la relation de conjugaison.", "Pourquoi faut-il D > 4f′ pour la méthode de Bessel ?"],
    hint: "Les curseurs déplacent les éléments sur le banc. La vignette montre ce que l'on voit sur l'écran (ou dans le plan de l'objet).",
    controls: `<h3>Méthode</h3>${seg("lnm", [["A", "Autocollimation"], ["B", "Plans conjugués"], ["C", "Bessel"]], "A")}
      <div class="ctl"><label for="lnL">Position de la lentille <b id="lnLv"></b></label><input id="lnL" type="range" min="8" max="120" step="0.1" value="20"></div>
      <div class="ctl"><label for="lnLf">Réglage fin de la lentille <b>± 1 cm</b></label><input id="lnLf" type="range" min="-1" max="1" step="0.02" value="0"></div>
      <div class="ctl" id="lnEw"><label for="lnE">Position de l'écran <b id="lnEv"></b></label><input id="lnE" type="range" min="20" max="150" step="0.1" value="60"></div>
      <div class="ctl" id="lnDw"><label for="lnD">Distance objet–écran D <b id="lnDv"></b></label><input id="lnD" type="range" min="40" max="140" step="1" value="80"></div>
      <dl class="lcd"><dt>Objet</dt><dd>5,0 cm</dd><dt>Lentille</dt><dd id="lnLr"></dd><dt id="lnEl">Écran</dt><dd id="lnEr"></dd></dl>
      <div class="row" id="lnRecW"><button type="button" class="btn primary sm" id="lnRec">Enregistrer la mesure</button></div>
      <div class="row" id="lnBesW"><button type="button" class="btn primary sm" id="lnP1">Noter position 1</button><button type="button" class="btn primary sm" id="lnP2">Noter position 2</button></div>
      <button type="button" class="btn sm" id="lnNew">Changer de lentille</button>`,
    parts: [
      { key: "A", titre: "Autocollimation", cols: ["n°", "Objet (cm)", "Lentille (cm)", "f′ = OA (cm)"],
        cells: (r, k) => [k + 1, "5,0", fr(r.xl, 1), fr(r.xl - 5, 1)],
        fit: (R, rows) => rows.length ? `Moyenne des ${rows.length} mesures : f′ = ${fr(rows.reduce((s, r) => s + r.xl - 5, 0) / rows.length, 1)} cm` : "Fais au moins 3 mises au point." },
      { key: "B", titre: "Plans conjugués", cols: ["n°", "OA (cm)", "OA′ (cm)", "1/OA (δ)", "1/OA′ (δ)"],
        cells: (r, k) => [k + 1, fr(r.OA, 1), fr(r.OAp, 1), fr(100 / r.OA, 2), fr(100 / r.OAp, 2)],
        point: r => [100 / r.OA, 100 / r.OAp], axes: { xl: "1/OA (δ)", yl: "1/OA′ (δ)", ymin: 0 },
        fit: R => R ? `1/OA′ = ${fr(R.a, 3)} · (1/OA) + ${fr(R.b, 2)}  (r = ${fr(R.r, 4)})   ⟹   V = ${fr(R.b, 2)} δ  et  f′ = 1/V = ${fr(100 / R.b, 1)} cm   (pente attendue : 1)` : "Au moins 2 mesures sont nécessaires." },
      { key: "C", titre: "Méthode de Bessel", cols: ["n°", "D (cm)", "x₁ (cm)", "x₂ (cm)", "d (cm)", "f′ (cm)"],
        cells: (r, k) => { const d = Math.abs(r.x2 - r.x1); return [k + 1, fr(r.D, 0), fr(r.x1, 1), fr(r.x2, 1), fr(d, 1), fr((r.D * r.D - d * d) / (4 * r.D), 2)]; },
        point: r => [r.D, (r.D * r.D - (r.x2 - r.x1) ** 2) / (4 * r.D)], axes: { xl: "D (cm)", yl: "f′ (cm)", noFit: true, ymin: 0 },
        fit: (R, rows) => rows.length ? `Moyenne sur ${rows.length} valeurs de D : f′ = ${fr(rows.reduce((s, r) => s + (r.D * r.D - (r.x2 - r.x1) ** 2) / (4 * r.D), 0) / rows.length, 2)} cm` : "Note les deux positions nettes pour plusieurs distances D." }
    ],
    questions: ["Autocollimation : pourquoi l'image est-elle renversée et de même taille que l'objet ?", "Plans conjugués : la pente de la droite est-elle proche de 1 ? Donne V et f′.", "Bessel : pourquoi n'y a-t-il plus d'image nette quand D < 4f′ ? Donne f′.", "Compare les trois valeurs de f′. Quelle méthode est la plus rapide ? la plus précise ?", "Pour une des mesures de la partie B, calcule le grandissement γ = OA′/OA."],
    init(T) {
      let P = store.get("lent_par", null); const newL = () => { P = { f: [10, 12.5, 15, 20][Math.floor(Math.random() * 4)] * (1 + (Math.random() * 2 - 1) * 0.04) }; store.set("lent_par", P); }; if (!P) newL();
      const XO = 5, AP = 4, mirrorGap = 2; let mode = "A", xl = 20, xe = 60, D = 80, pend = null;
      const sharpThr = 0.03;
      // flou relatif (≈ diamètre de la tache / taille) et grandissement
      const state = () => {
        if (mode === "A") { const s = xl - XO, f = P.f, vinv = 1 / f - 1 / s, v = Math.abs(vinv) < 1e-9 ? Infinity : 1 / vinv;
          const p = isFinite(v) ? 2 * mirrorGap - v : -Infinity, pinv = isFinite(p) ? 1 / p : 0, qinv = 1 / f - pinv;
          if (qinv <= 0) return { blur: null }; const q = 1 / qinv, xi = xl - q; return { blur: AP * Math.abs(xi - XO) / q, g: 1, xi }; }
        const xs = mode === "C" ? XO + D : xe, xi = imageOf(XO, xl, P.f);
        if (!isFinite(xi) || xi <= xl) return { blur: null }; const v = xi - xl; return { blur: AP * Math.abs(xs - xi) / v, g: -v / (xl - XO), xi, xs };
      };
      const ui = () => {
        const fine = +$("#lnLf").value; xl = +$("#lnL").value + fine; xe = Math.max(+$("#lnE").value, xl + 1); D = +$("#lnD").value;
        $("#lnLv").textContent = fr(+$("#lnL").value, 1) + " cm"; $("#lnEv").textContent = fr(xe, 1) + " cm"; $("#lnDv").textContent = D + " cm";
        $("#lnLr").textContent = fr(xl, 1) + " cm"; $("#lnEl").textContent = mode === "A" ? "Miroir" : "Écran"; $("#lnEr").textContent = mode === "A" ? fr(xl + mirrorGap, 1) + " cm" : fr(mode === "C" ? XO + D : xe, 1) + " cm";
        $("#lnEw").hidden = mode !== "B"; $("#lnDw").hidden = mode !== "C"; $("#lnRecW").hidden = mode === "C"; $("#lnBesW").hidden = mode !== "C";
        T.draw();
      };
      document.querySelectorAll("[data-lnm]").forEach(b => b.onclick = () => { mode = b.dataset.lnm; setSeg("lnm", mode); pend = null; if (mode === "B") { $("#lnL").value = 30; $("#lnLf").value = 0; } ui(); T.msg(""); });
      ["#lnL", "#lnLf", "#lnE", "#lnD"].forEach(s => $(s).addEventListener("input", () => { if (s === "#lnD") pend = null; ui(); }));
      const sharp = () => { const s = state(); return s.blur != null && s.blur < sharpThr; };
      $("#lnRec").onclick = () => {
        if (!sharp()) { T.msg("L'image n'est pas nette : ajuste la mise au point avant d'enregistrer.", "bad"); return; }
        if (mode === "A") T.add("A", { xl: Math.round((xl + gauss() * 0.05) * 10) / 10 });
        else { const OA = -(xl - XO), OAp = xe - xl; T.add("B", { OA: Math.round(OA * 10) / 10, OAp: Math.round(OAp * 10) / 10 }); }
        T.msg("Mesure enregistrée.", "ok");
      };
      $("#lnP1").onclick = () => { if (!sharp()) { T.msg("L'image n'est pas nette : cherche la position donnant une image nette.", "bad"); return; } pend = { D, x1: Math.round(xl * 10) / 10 }; T.msg(`Position 1 notée : ${fr(pend.x1, 1)} cm. Cherche maintenant la seconde position nette.`, "ok"); };
      $("#lnP2").onclick = () => { if (!pend) { T.msg("Note d'abord la position 1.", "bad"); return; } if (!sharp()) { T.msg("L'image n'est pas nette.", "bad"); return; } const x2 = Math.round(xl * 10) / 10; if (Math.abs(x2 - pend.x1) < 1) { T.msg("C'est la même position : cherche l'autre position nette, plus loin de l'objet.", "bad"); return; } T.add("C", { D: pend.D, x1: Math.min(pend.x1, x2), x2: Math.max(pend.x1, x2) }); pend = null; T.msg("Couple de positions enregistré.", "ok"); };
      $("#lnNew").onclick = () => { newL(); ["A", "B", "C"].forEach(k => T.rows[k] = []); T.renderAll(); ui(); T.msg("Nouvelle lentille : refais les mesures."); };
      T.draw = () => {
        const s = state(), { c, w, h } = fit($("#lentilles-cv"), innerWidth < 600 ? 1.0 : 0.6); c.fillStyle = css("--plot-bg"); c.fillRect(0, 0, w, h);
        const fg = css("--fg"), mu = css("--muted"), by = h * 0.36, X = x => 16 + x / 150 * (w - 32);
        bench(c, w, by, X, mu); objectF(c, X(XO), by); lens(c, X(xl), by, css("--accent"), "lentille");
        if (mode === "A") { const mx = X(xl + mirrorGap); c.fillStyle = "#9aa6b5"; c.fillRect(mx, by - 40, 5, 68); for (let k = -40; k < 28; k += 6) { c.strokeStyle = mu; c.beginPath(); c.moveTo(mx + 5, by + k); c.lineTo(mx + 10, by + k - 5); c.stroke(); } txt(c, "miroir", mx + 4, by + 40, mu, "center"); }
        else { const sx = X(mode === "C" ? XO + D : xe); c.fillStyle = fg; c.fillRect(sx - 3, by - 46, 6, 74); txt(c, "écran", sx, by - 52, fg, "center");
          if (mode === "C") { c.strokeStyle = mu; c.beginPath(); c.moveTo(X(XO), by + 82); c.lineTo(sx, by + 82); c.stroke(); txt(c, "D = " + D + " cm", (X(XO) + sx) / 2, by + 96, mu, "center"); if (pend) { c.fillStyle = css("--saff"); c.beginPath(); c.arc(X(pend.x1), by + 30, 4, 0, 7); c.fill(); txt(c, "pos. 1", X(pend.x1), by + 22, css("--saff"), "center"); } } }
        // rayons (objet de hauteur 2 cm, échelle 12 px/cm)
        if (mode !== "A" && s.blur != null) { const k = 12, yA = by - 2 * k, ix = X(s.xi), iy = by - s.g * 2 * k, end = Math.min(X(150), Math.max(X(s.xs), ix) + 10);
          c.strokeStyle = css("--saff"); c.globalAlpha = .5; c.lineWidth = 1.2; c.beginPath(); c.moveTo(X(XO), yA); c.lineTo(X(xl), yA); c.lineTo(end, yA + (iy - yA) * (end - X(xl)) / ((ix - X(xl)) || 1)); c.stroke();
          c.beginPath(); c.moveTo(X(XO), yA); c.lineTo(end, yA + (by - yA) * (end - X(XO)) / ((X(xl) - X(XO)) || 1)); c.stroke(); c.globalAlpha = 1; }
        // vignette
        const vw = Math.min(170, w * 0.36), vh = h * 0.3, vx = w - vw - 12, vy = h - vh - 12;
        if (mode === "A") viewF(c, vx, vy, vw, vh, "plan de l'objet (à côté de F)", s.blur, 1, true, s.blur != null && s.blur < sharpThr ? "image nette, renversée" : "image floue");
        else viewF(c, vx, vy, vw, vh, "ce que l'on voit sur l'écran", s.blur, Math.abs(s.g || 0), true, s.blur == null ? "pas d'image" : s.blur < sharpThr ? "image nette (renversée)" : "image floue");
      };
      ui();
    }
  });

  /* ========================= TP 8 : MICROSCOPE ========================= */
  register({
    id: "microscope", num: 8, disc: "Optique", court: "Microscope",
    titre: "Le microscope optique (maquette sur banc)",
    objectifs: "comprendre le fonctionnement du microscope à deux lentilles, déterminer la focale de l'objectif par l'étude de l'image intermédiaire, régler l'oculaire pour une observation à l'infini et mesurer la puissance et le grossissement commercial de l'instrument.",
    materiel: ["Banc d'optique", "Objet : micromètre (règle graduée, AB = 2 mm)", "Objectif : lentille convergente de courte focale f₁", "Oculaire : lentille convergente f₂", "Écran dépoli gradué", "Viseur à réticule (mesure d'angle)"],
    theorie: `<p>Un microscope comporte un <b>objectif</b> L₁ (courte focale f₁) qui donne d'un petit objet AB une image intermédiaire A₁B₁ réelle et agrandie, et un <b>oculaire</b> L₂ (focale f₂) qui joue le rôle de loupe pour observer A₁B₁.</p>
      <h4>Objectif</h4><div class="formula">γ₁ = A₁B₁/AB = O₁A₁/O₁A = 1 − O₁A₁/f₁    ⟹    |γ₁| = O₁A₁/f₁ − 1</div>
      <p>Le graphe |γ₁| = f(O₁A₁) est une droite de pente 1/f₁ ; elle coupe l'axe des abscisses en O₁A₁ = f₁.</p>
      <h4>Oculaire et observation à l'infini</h4><p>Pour que l'œil observe sans fatigue (au repos), l'image finale doit être à l'infini : A₁B₁ doit être dans le <b>plan focal objet de l'oculaire</b> (O₂A₁ = f₂). L'image finale est alors vue sous l'angle :</p>
      <div class="formula">α′ = A₁B₁ / f₂ = |γ₁| · AB / f₂</div>
      <h4>Puissance et grossissement commercial</h4><div class="formula">P = α′/AB = |γ₁| / f₂   (en dioptries δ, f₂ en m)        G_c = P / 4   (distance de vision d = 0,25 m)</div>
      <p>Le graphe P = f(|γ₁|) est une droite passant par l'origine, de pente 1/f₂.</p>`,
    protocole: `<h4>Partie A — Image intermédiaire et focale de l'objectif</h4><ol>
        <li>L'objectif est fixé à la graduation 30 cm. Place l'objet (micromètre) à quelques centimètres devant lui (mode « Objectif seul »).</li>
        <li>Déplace l'écran dépoli jusqu'à obtenir une image nette de la graduation. Mesure sa taille A₁B₁ sur l'écran gradué ; l'objet mesure AB = 2 mm.</li>
        <li>Enregistre O₁A₁ et |γ₁| = A₁B₁/AB (Partie A). Recommence pour 6 positions de l'objet.</li>
        <li>Exploite le graphe |γ₁| = f(O₁A₁) : pente 1/f₁.</li></ol>
      <h4>Partie B — Microscope complet, observation à l'infini</h4><ol>
        <li>Place l'objet de façon à obtenir un grandissement |γ₁| voisin de 3 (mode « Microscope complet »). L'écran est retiré : A₁B₁ est une image aérienne.</li>
        <li>Déplace l'oculaire jusqu'à voir dans l'oculaire une image nette <b>sans accommoder</b> (image à l'infini) : la vignette l'indique.</li>
        <li>Mesure au viseur l'angle α′ sous lequel est vue l'image (bouton « Enregistrer »), puis calcule P = α′/AB et G_c = P/4.</li>
        <li>Recommence pour 5 positions de l'objet (|γ₁| de 2 à 8), en réglant chaque fois l'oculaire. Exploite le graphe P = f(|γ₁|).</li></ol>`,
    precautions: `<ul><li>L'objet doit être placé un peu au-delà du foyer objet de l'objectif : trop près, il n'y a plus d'image réelle.</li>
      <li>Le réglage « à l'infini » est délicat : l'œil accommode facilement sur une image proche. Le critère est une image nette avec l'œil au repos.</li>
      <li>La mesure de A₁B₁ sur l'écran se fait à ±0,2 mm près ; préfère les grands grandissements pour la précision relative.</li></ul>`,
    preparation: ["Fais le schéma de principe du microscope avec la construction de A₁B₁ et de l'image finale.", "Démontre la relation |γ₁| = O₁A₁/f₁ − 1.", "Pourquoi place-t-on A₁B₁ au foyer objet de l'oculaire ?", "Pour f₁ = 5 cm, O₁A₁ = 20 cm et f₂ = 10 cm, calcule γ₁, P et G_c."],
    hint: "Mode « Objectif seul » : cherche l'image sur l'écran. Mode « Microscope complet » : règle l'oculaire pour voir une image nette à l'infini.",
    controls: `<h3>Mode</h3>${seg("mcm", [["A", "Objectif seul"], ["B", "Microscope complet"]], "A")}
      <div class="ctl"><label for="mcO">Position de l'objet <b id="mcOv"></b></label><input id="mcO" type="range" min="15" max="25" step="0.05" value="22"></div>
      <div class="ctl" id="mcEw"><label for="mcE">Position de l'écran <b id="mcEv"></b></label><input id="mcE" type="range" min="36" max="110" step="0.1" value="50"></div>
      <div class="ctl" id="mcKw"><label for="mcK">Position de l'oculaire <b id="mcKv"></b></label><input id="mcK" type="range" min="40" max="140" step="0.1" value="70"></div>
      <dl class="lcd"><dt>Objectif L₁</dt><dd>30,0 cm</dd><dt>A₁B₁ lue sur l'écran</dt><dd id="mcAB"></dd><dt>Image finale</dt><dd id="mcFin"></dd></dl>
      <button type="button" class="btn primary sm" id="mcRec">Enregistrer la mesure</button>
      <button type="button" class="btn sm" id="mcNew">Changer de lentilles</button>`,
    parts: [
      { key: "A", titre: "Image intermédiaire — focale de l'objectif", cols: ["n°", "O₁A (cm)", "O₁A₁ (cm)", "A₁B₁ (mm)", "|γ₁|"],
        cells: (r, k) => [k + 1, fr(-r.s, 2), fr(r.v, 1), fr(r.ab1, 1), fr(r.ab1 / 2, 2)],
        point: r => [r.v, r.ab1 / 2], axes: { xl: "O₁A₁ (cm)", yl: "|γ₁|", xmin: 0, ymin: 0 },
        fit: R => R ? `|γ₁| = ${fr(R.a, 4)} · O₁A₁ ${R.b < 0 ? "−" : "+"} ${fr(Math.abs(R.b), 3)}  (r = ${fr(R.r, 4)})   ⟹   f₁ = 1/pente = ${fr(1 / R.a, 2)} cm   (ordonnée à l'origine attendue : −1)` : "Au moins 2 mesures sont nécessaires." },
      { key: "B", titre: "Microscope complet — puissance et grossissement", cols: ["n°", "|γ₁|", "α′ (mrad)", "P = α′/AB (δ)", "G_c = P/4"],
        cells: (r, k) => [k + 1, fr(r.g1, 2), fr(r.a * 1000, 1), fr(r.a / 0.002, 1), fr(r.a / 0.002 / 4, 1)],
        point: r => [r.g1, r.a / 0.002], axes: { xl: "|γ₁|", yl: "P (δ)", xmin: 0, ymin: 0 },
        fit: R => R ? `P = ${fr(R.a, 2)} · |γ₁| ${R.b < 0 ? "−" : "+"} ${fr(Math.abs(R.b), 2)}  (r = ${fr(R.r, 4)})   ⟹   f₂ = 1/pente = ${fr(100 / R.a, 1)} cm` : "Au moins 2 mesures sont nécessaires." }
    ],
    questions: ["Partie A : donne f₁. Pourquoi l'objectif doit-il avoir une courte focale ?", "Où se forme l'image intermédiaire A₁B₁ par rapport à l'oculaire quand l'image finale est à l'infini ?", "Partie B : donne f₂ et compare P mesurée à |γ₁|/f₂.", "Calcule le grossissement commercial pour |γ₁| = 5. Comment augmenter le grossissement d'un microscope ?", "Pourquoi observe-t-on de préférence avec l'image finale à l'infini ?"],
    init(T) {
      let P = store.get("micro_par", null); const newL = () => { P = { f1: 4.5 + Math.random() * 1.5, f2: 8 + Math.random() * 4 }; store.set("micro_par", P); }; if (!P) newL();
      const X1 = 30, AB = 2; let mode = "A", xo = 22, xe = 50, xk = 70;
      const st = () => { const s = X1 - xo, inv = 1 / P.f1 - 1 / s; if (inv <= 0) return { real: false }; const v = 1 / inv, g1 = v / s; return { real: true, s, v, g1, x1: X1 + v }; };
      const ui = () => {
        xo = +$("#mcO").value; xe = +$("#mcE").value; xk = +$("#mcK").value; const s = st();
        $("#mcOv").textContent = fr(xo, 2) + " cm"; $("#mcEv").textContent = fr(xe, 1) + " cm"; $("#mcKv").textContent = fr(xk, 1) + " cm";
        $("#mcEw").hidden = mode !== "A"; $("#mcKw").hidden = mode !== "B";
        if (mode === "A") { const sh = s.real && Math.abs(xe - s.x1) / s.v < 0.012; $("#mcAB").textContent = s.real ? (sh ? fr(Math.round(AB * s.g1 * 5 + gauss()) / 5, 1) + " mm" : "image floue") : "pas d'image réelle"; $("#mcFin").textContent = "—"; }
        else { $("#mcAB").textContent = "—"; const e = s.real ? (xk - s.x1) - P.f2 : null; $("#mcFin").textContent = !s.real ? "pas d'image" : Math.abs(e) < 0.15 ? "à l'infini" : (e < 0 && e > -2) ? "proche (l'œil accommode)" : "floue"; }
        T.draw();
      };
      document.querySelectorAll("[data-mcm]").forEach(b => b.onclick = () => { mode = b.dataset.mcm; setSeg("mcm", mode); ui(); T.msg(""); });
      ["#mcO", "#mcE", "#mcK"].forEach(s => $(s).addEventListener("input", ui));
      $("#mcRec").onclick = () => {
        const s = st(); if (!s.real) { T.msg("Pas d'image réelle : éloigne l'objet de l'objectif.", "bad"); return; }
        if (mode === "A") { if (Math.abs(xe - s.x1) / s.v >= 0.012) { T.msg("L'image n'est pas nette sur l'écran.", "bad"); return; }
          T.add("A", { s: s.s, v: Math.round((xe - X1) * 10) / 10, ab1: Math.round((AB * s.g1 * (1 + gauss() * 0.015)) * 10) / 10 }); T.msg("Mesure enregistrée (partie A).", "ok"); }
        else { const e = (xk - s.x1) - P.f2; if (Math.abs(e) >= 0.15) { T.msg("L'image finale n'est pas à l'infini : règle l'oculaire.", "bad"); return; }
          const a = AB / 1000 * s.g1 / (P.f2 / 100) * (1 + gauss() * 0.02); T.add("B", { g1: Math.round(s.g1 * (1 + gauss() * 0.015) * 100) / 100, a }); T.msg("Mesure enregistrée (partie B).", "ok"); }
      };
      $("#mcNew").onclick = () => { newL(); ["A", "B"].forEach(k => T.rows[k] = []); T.renderAll(); ui(); T.msg("Nouvelles lentilles : refais les mesures."); };
      T.draw = () => {
        const s = st(), { c, w, h } = fit($("#microscope-cv"), innerWidth < 600 ? 1.0 : 0.6); c.fillStyle = css("--plot-bg"); c.fillRect(0, 0, w, h);
        const fg = css("--fg"), mu = css("--muted"), by = h * 0.36, X = x => 16 + x / 150 * (w - 32);
        bench(c, w, by, X, mu);
        c.fillStyle = css("--saff"); c.fillRect(X(xo) - 3, by - 16, 6, 16); txt(c, "objet", X(xo), by + 24, mu, "center");
        lens(c, X(X1), by, css("--accent"), "objectif L₁");
        if (s.real) { const k = 3, yA = by - AB / 10 * 8 * k; c.strokeStyle = css("--saff"); c.globalAlpha = .45; c.lineWidth = 1.2;
          const ix = X(s.x1), iy = by + s.g1 * (by - yA); c.beginPath(); c.moveTo(X(xo), yA); c.lineTo(X(X1), yA); c.lineTo(ix, iy); c.stroke(); c.beginPath(); c.moveTo(X(xo), yA); c.lineTo(ix, iy); c.stroke(); c.globalAlpha = 1;
          if (mode === "B" || Math.abs(xe - s.x1) / s.v < 0.012) { c.strokeStyle = css("--saff"); c.setLineDash([3, 3]); c.beginPath(); c.moveTo(ix, by); c.lineTo(ix, iy); c.stroke(); c.setLineDash([]); txt(c, "A₁B₁", ix + 4, iy + 12, css("--saff")); } }
        if (mode === "A") { const sx = X(xe); c.fillStyle = "#cfd6de"; c.fillRect(sx - 3, by - 46, 6, 90); c.strokeStyle = fg; c.strokeRect(sx - 3, by - 46, 6, 90); txt(c, "écran dépoli", sx, by - 52, fg, "center"); }
        else { lens(c, X(xk), by, css("--rouge"), "oculaire L₂"); const ex = X(xk) + 26; c.fillStyle = fg; c.beginPath(); c.ellipse(ex, by, 9, 6, 0, 0, 7); c.fill(); txt(c, "œil", ex, by + 20, mu, "center"); }
        // vignette
        const vw = Math.min(170, w * 0.36), vh = h * 0.3, vx = w - vw - 12, vy = h - vh - 12;
        if (mode === "A") { const bl = s.real ? 4 * Math.abs(xe - s.x1) / s.v : null; viewF(c, vx, vy, vw, vh, "écran dépoli", bl, s.real ? Math.min(3, s.g1 * 0.35) : 0, true, !s.real ? "pas d'image réelle" : bl < 0.05 ? "image nette, |γ₁| = A₁B₁/AB" : "image floue"); }
        else { const e = s.real ? (xk - s.x1) - P.f2 : 99, bl = Math.abs(e) < 0.15 ? 0 : (e < 0 && e > -2) ? 0.15 : Math.min(1, Math.abs(e) * 0.5); viewF(c, vx, vy, vw, vh, "vue dans l'oculaire", s.real ? bl : null, s.real ? Math.min(3, s.g1 * 0.4) : 0, true, !s.real ? "pas d'image" : Math.abs(e) < 0.15 ? "nette, à l'infini (œil au repos)" : (e < 0 && e > -2) ? "nette si l'œil accommode" : "floue"); }
      };
      ui();
    }
  });
})();
