/* TP d'électricité : n°4 mesures de résistances, vérification de la loi d'Ohm */
(function () {
  "use strict";
  const { register, $, css, fr, gauss, store, fit, txt } = window.TPCORE;
  const RA = 2.0, RV = 1.0e6;   // résistance interne de l'ampèremètre (Ω) et du voltmètre (Ω)
  const COL = { noir: "#111", marron: "#7a4a1f", rouge: "#c62828", orange: "#ef7d00", jaune: "#f2c200", vert: "#2e7d32", bleu: "#1565c0", violet: "#6a1b9a", gris: "#8a8a8a", blanc: "#f5f5f5", or: "#c9a227" };
  const NOM = ["noir", "marron", "rouge", "orange", "jaune", "vert", "bleu", "violet", "gris", "blanc"];
  const bands = v => { const e = Math.floor(Math.log10(v)) - 1, d = Math.round(v / 10 ** e); return [NOM[Math.floor(d / 10)], NOM[d % 10], NOM[e], "or"]; };
  const fmtR = v => v >= 1000 ? fr(v / 1000, v >= 10000 ? 1 : 2) + " kΩ" : fr(v, v >= 100 ? 0 : 1) + " Ω";
  const fmtI = i => { const a = Math.abs(i); return a >= 100 ? fr(i, 1) : a >= 10 ? fr(i, 2) : fr(i, 3); };

  register({
    id: "ohm", num: 4, disc: "Électricité", court: "Mesures de résistances",
    titre: "Mesures de résistances : vérification de la loi d'Ohm",
    objectifs: "tracer la caractéristique U = f(I) d'un conducteur ohmique et vérifier la loi d'Ohm ; mesurer une résistance par la méthode voltampèremétrique en choisissant le montage adapté (amont ou aval) ; vérifier les lois d'association des résistances.",
    materiel: ["Générateur de tension continue réglable 0–12 V", "Ampèremètre (r<sub>A</sub> = 2 Ω)", "Voltmètre (R<sub>V</sub> = 1 MΩ)", "Résistors : X (inconnu), 22 Ω, 47 kΩ, R₁, R₂", "Fils de connexion", "Interrupteur"].map(s => s.replace(/<[^>]+>/g, "")),
    theorie: `<h4>Loi d'Ohm</h4><p>Pour un conducteur ohmique, la tension U à ses bornes est proportionnelle à l'intensité I qui le traverse (convention récepteur) :</p>
      <div class="formula">U = R · I      (U en V, I en A, R en Ω)</div>
      <p>La caractéristique U = f(I) est une droite passant par l'origine, de pente R. La puissance dissipée P = U·I = U²/R ne doit pas dépasser la puissance nominale (ici 0,5 W).</p>
      <h4>Code des couleurs</h4><p>1<sup>er</sup> anneau : 1<sup>er</sup> chiffre ; 2<sup>e</sup> anneau : 2<sup>e</sup> chiffre ; 3<sup>e</sup> anneau : puissance de 10 ; 4<sup>e</sup> anneau : tolérance (or : ±5 %).<br>0 noir • 1 marron • 2 rouge • 3 orange • 4 jaune • 5 vert • 6 bleu • 7 violet • 8 gris • 9 blanc.</p>
      <h4>Méthode voltampèremétrique : montage amont ou aval ?</h4><p>Les appareils de mesure ne sont pas parfaits : l'ampèremètre a une petite résistance r<sub>A</sub>, le voltmètre une grande résistance R<sub>V</sub>.</p>
      <ul><li><b>Montage amont</b> (longue dérivation : le voltmètre est en amont de l'ampèremètre) : le voltmètre mesure U<sub>R</sub> + U<sub>A</sub>. On trouve R<sub>mes</sub> = U/I = R + r<sub>A</sub> : erreur faible si <b>R ≫ r<sub>A</sub></b> (grandes résistances).</li>
        <li><b>Montage aval</b> (courte dérivation : le voltmètre est directement aux bornes de R) : l'ampèremètre mesure aussi le courant du voltmètre. On trouve 1/R<sub>mes</sub> = 1/R + 1/R<sub>V</sub> : erreur faible si <b>R ≪ R<sub>V</sub></b> (petites résistances).</li></ul>
      <div class="formula">Amont :  R = U/I − r_A          Aval :  1/R = I/U − 1/R_V</div>
      <h4>Associations</h4><div class="formula">Série : R_éq = R₁ + R₂          Parallèle : 1/R_éq = 1/R₁ + 1/R₂</div>`,
    protocole: `<h4>Partie A — Caractéristique du résistor X</h4><ol>
        <li>Réalise le montage aval avec le résistor X. Lis sa valeur nominale grâce au code des couleurs.</li>
        <li>Le générateur étant à 0 V, ferme l'interrupteur. Augmente la tension par pas d'environ 1 V jusqu'à 10 V.</li>
        <li>Pour chaque réglage, relève U et I et enregistre (Partie A). Fais au moins 8 mesures.</li>
        <li>Exploite le graphe U = f(I) : la pente est la résistance R<sub>X</sub>.</li></ol>
      <h4>Partie B — Choix du montage</h4><ol>
        <li>Avec le résistor de 22 Ω, règle U ≈ 2 V (attention à la puissance). Mesure U et I en montage amont, puis en montage aval. Enregistre les deux (Partie B).</li>
        <li>Recommence avec le résistor de 47 kΩ, sous U ≈ 10 V, dans les deux montages.</li>
        <li>Pour chaque mesure, compare R<sub>mes</sub> = U/I à la valeur corrigée et conclus : quel montage pour quelle résistance ?</li></ol>
      <h4>Partie C — Associations de résistances</h4><ol>
        <li>En montage aval sous U ≈ 6 V, mesure successivement R₁, R₂, puis R₁ et R₂ en série, puis en parallèle (Partie C).</li>
        <li>Compare les valeurs mesurées aux valeurs calculées avec les lois d'association.</li></ol>`,
    precautions: `<ul><li>Branche toujours l'ampèremètre en <b>série</b> et le voltmètre en <b>dérivation</b> ; un ampèremètre branché en dérivation crée un court-circuit.</li>
      <li>Commence par le calibre le plus grand puis descends ; ici les appareils changent de calibre automatiquement.</li>
      <li>Surveille la puissance : P = U²/R ≤ 0,5 W, soit U ≤ 3,3 V pour 22 Ω. Le simulateur signale la surchauffe.</li>
      <li>Incertitude : ΔR/R = ΔU/U + ΔI/I. Préfère les mesures en milieu ou haut de calibre.</li></ul>`,
    preparation: ["Fais les schémas des montages amont et aval avec le sens du courant et les flèches tension.", "Démontre les expressions R_mes = R + r_A (amont) et 1/R_mes = 1/R + 1/R_V (aval).", "Avec r_A = 2 Ω et R_V = 1 MΩ, calcule l'erreur relative de chaque montage pour R = 22 Ω et pour R = 47 kΩ.", "Calcule la tension maximale admissible pour un résistor de 22 Ω de puissance 0,5 W."],
    hint: "Le schéma se met à jour selon le montage choisi. Les afficheurs indiquent les valeurs lues sur les multimètres.",
    controls: `<h3>Dipôle étudié</h3>
      <div class="ctl"><select id="ohSel" aria-label="Dipôle étudié">
        <option value="X">Résistor X (inconnu) — Partie A</option><option value="F">Résistor 22 Ω — Partie B</option><option value="G">Résistor 47 kΩ — Partie B</option>
        <option value="R1">R₁ seul — Partie C</option><option value="R2">R₂ seul — Partie C</option><option value="S">R₁ et R₂ en série — Partie C</option><option value="P">R₁ et R₂ en parallèle — Partie C</option></select></div>
      <h3>Montage</h3>
      <div class="seg" role="group" aria-label="Montage"><button type="button" id="ohAm" aria-pressed="false">Amont (longue dérivation)</button><button type="button" id="ohAv" aria-pressed="true">Aval (courte dérivation)</button></div>
      <h3>Générateur</h3>
      <div class="ctl"><label for="ohU">Tension de consigne <b id="ohUv"></b></label><input id="ohU" type="range" min="0" max="12" step="0.1" value="2"></div>
      <h3>Multimètres</h3><dl class="lcd"><dt>Voltmètre</dt><dd id="ohV">—</dd><dt>Ampèremètre</dt><dd id="ohI">—</dd><dt>Puissance dissipée</dt><dd id="ohP">—</dd></dl>
      <button type="button" class="btn primary sm" id="ohRec">Enregistrer la mesure</button>
      <button type="button" class="btn sm" id="ohNew">Nouveaux résistors</button>`,
    parts: [
      { key: "A", titre: "Caractéristique U = f(I) du résistor X", cols: ["n°", "U (V)", "I (mA)", "U/I (Ω)"],
        cells: (r, i) => [i + 1, fr(r.U, 2), fmtI(r.I), r.I > 0 ? fr(r.U / r.I * 1000, 1) : "—"],
        point: r => [r.I, r.U], axes: { xl: "I (mA)", yl: "U (V)", xmin: 0, ymin: 0 },
        fit: R => R ? `U = ${fr(R.a * 1000, 1)} · I ${R.b < 0 ? "−" : "+"} ${fr(Math.abs(R.b), 3)}   (I en A ; r = ${fr(R.r, 5)})   ⟹   R_X = pente = ${fr(R.a * 1000, 1)} Ω` : "Au moins 2 mesures sont nécessaires." },
      { key: "B", titre: "Montage amont ou aval ?", cols: ["n°", "Résistor", "Montage", "U (V)", "I (mA)", "R_mes = U/I", "R corrigée"],
        cells: (r, i) => { const Rm = r.U / (r.I / 1000), Rc = r.mont === "amont" ? Rm - RA : 1 / (1 / Rm - 1 / RV); return [i + 1, r.nom, r.mont, fr(r.U, 2), fmtI(r.I), fmtR(Rm), fmtR(Rc)]; },
        fit: (R, rows) => rows.length ? "Compare, pour chaque résistor, R_mes à la valeur corrigée : l'écart mesure l'erreur systématique due au montage." : "Mesure chaque résistor dans les deux montages." },
      { key: "C", titre: "Associations de résistances", cols: ["n°", "Dipôle", "U (V)", "I (mA)", "R_mes (Ω)"],
        cells: (r, i) => [i + 1, r.nom, fr(r.U, 2), fmtI(r.I), fr(r.U / r.I * 1000, 1)],
        fit: (R, rows) => { const g = k => { const l = rows.filter(r => r.k === k); return l.length ? l.reduce((s, r) => s + r.U / r.I * 1000, 0) / l.length : null; }; const r1 = g("R1"), r2 = g("R2"), s = g("S"), p = g("P"); let o = []; if (r1 != null && r2 != null) { if (s != null) o.push(`Série : mesuré ${fr(s, 1)} Ω, calculé R₁ + R₂ = ${fr(r1 + r2, 1)} Ω`); if (p != null) o.push(`Parallèle : mesuré ${fr(p, 1)} Ω, calculé R₁R₂/(R₁+R₂) = ${fr(r1 * r2 / (r1 + r2), 1)} Ω`); } return o.length ? o.join(" ; ") : "Mesure R₁, R₂, puis leurs associations série et parallèle."; } }
    ],
    questions: ["Partie A : la caractéristique est-elle une droite passant par l'origine ? Énonce la loi d'Ohm.", "Donne R_X déduite de la pente et compare-la à la valeur du code des couleurs (écart relatif, tolérance).", "Partie B : pour le résistor de 22 Ω, quel montage donne la valeur la plus juste ? Et pour 47 kΩ ? Justifie avec r_A et R_V.", "Énonce la règle de choix du montage (comparer R à √(r_A·R_V)).", "Partie C : les lois d'association série et parallèle sont-elles vérifiées ?"],
    init(T) {
      let P = store.get("ohm_par", null);
      const newSet = () => { const E = [100, 150, 220, 330, 470, 680, 1000]; const nx = E[Math.floor(Math.random() * E.length)]; const tol = () => 1 + (Math.random() * 2 - 1) * 0.045;
        P = { X: { nom: nx, R: nx * tol() }, F: { nom: 22, R: 22 * tol() }, G: { nom: 47000, R: 47000 * tol() }, R1: { nom: 220, R: 220 * tol() }, R2: { nom: 330, R: 330 * tol() } }; store.set("ohm_par", P); };
      if (!P) newSet();
      let sel = "X", mont = "aval", U = 2, meas = { V: 0, I: 0, P: 0 };
      const Rof = k => k === "S" ? P.R1.R + P.R2.R : k === "P" ? 1 / (1 / P.R1.R + 1 / P.R2.R) : P[k].R;
      const label = k => ({ X: "X", F: "22 Ω", G: "47 kΩ", R1: "R₁", R2: "R₂", S: "R₁ + R₂ (série)", P: "R₁ // R₂" }[k]);
      const measure = () => {
        const R = Rof(sel); let Um, Im, PR;
        if (mont === "aval") { const Rp = R * RV / (R + RV), It = U / (RA + Rp); Um = It * Rp; Im = It; PR = (Um * Um) / R; }
        else { const It = U / (RA + R); Um = U; Im = It; PR = It * It * R; }
        meas = { V: Math.max(0, Um * (1 + gauss() * 0.0015) + gauss() * 0.002), I: Math.max(0, Im * 1000 * (1 + gauss() * 0.002) + gauss() * Math.min(0.002, Im * 1000 * 0.002)), P: PR };
        $("#ohV").textContent = fr(meas.V, 2) + " V"; $("#ohI").textContent = fmtI(meas.I) + " mA"; $("#ohP").textContent = fr(PR * 1000, PR < 0.01 ? 2 : 0) + " mW";
        $("#ohUv").textContent = fr(U, 1) + " V";
        if (PR > 0.5) T.msg("Attention : la puissance dépasse 0,5 W, le résistor chauffe ! Diminue la tension.", "bad"); else if (/chauffe/.test($("#ohm-msg").textContent)) T.msg("");
      };
      const setMont = m => { mont = m; $("#ohAm").setAttribute("aria-pressed", m === "amont"); $("#ohAv").setAttribute("aria-pressed", m === "aval"); measure(); T.draw(); };
      $("#ohAm").onclick = () => setMont("amont"); $("#ohAv").onclick = () => setMont("aval");
      $("#ohSel").onchange = e => { sel = e.target.value; measure(); T.draw(); };
      $("#ohU").addEventListener("input", e => { U = +e.target.value; measure(); T.draw(); });
      $("#ohRec").onclick = () => {
        if (meas.I <= 0) { T.msg("Augmente la tension : aucun courant ne circule.", "bad"); return; }
        if (meas.P > 0.5) { T.msg("Mesure refusée : le résistor surchauffe. Diminue la tension.", "bad"); return; }
        const part = sel === "X" ? "A" : (sel === "F" || sel === "G") ? "B" : "C";
        if (part === "A" && mont !== "aval") T.msg("Conseil : pour la partie A, utilise le montage aval.", "");
        T.add(part, { U: meas.V, I: meas.I, mont, nom: label(sel), k: sel }); if (part !== "A" || mont === "aval") T.msg(`Mesure enregistrée dans la partie ${part}.`, "ok");
      };
      $("#ohNew").onclick = () => { if (T.locked()) { T.msg("Compte rendu déjà soumis : le matériel ne peut plus être changé.", "bad"); return; } newSet(); T.clearRows(); measure(); T.draw(); T.msg("Nouveaux résistors : refais les mesures."); };
      T.draw = () => {
        const { c, w, h } = fit($("#ohm-cv"), innerWidth < 600 ? 0.9 : 0.55); c.fillStyle = css("--plot-bg"); c.fillRect(0, 0, w, h);
        const fg = css("--fg"), mu = css("--muted"), L = w * 0.1, Rr = w * 0.62, Tp = h * 0.28, B = h * 0.84;
        c.strokeStyle = fg; c.lineWidth = 2;
        const meter = (x, y, s, val) => { c.fillStyle = css("--plot-bg"); c.strokeStyle = fg; c.lineWidth = 2; c.beginPath(); c.arc(x, y, 20, 0, 7); c.fill(); c.stroke(); txt(c, s, x, y + 1, fg, "center", "middle", "700 15px 'Fira Sans',Arial"); c.fillStyle = "#1d2a1f"; c.fillRect(x - 46, y - 52, 92, 24); txt(c, val, x, y - 40, "#9cf29c", "center", "middle", "12px 'Fira Mono',monospace"); };
        const dot = (x, y) => { c.fillStyle = fg; c.beginPath(); c.arc(x, y, 3.5, 0, 7); c.fill(); };
        // boucle principale
        c.beginPath(); c.moveTo(L, Tp); c.lineTo(Rr, Tp); c.lineTo(Rr, B); c.lineTo(L, B); c.closePath(); c.stroke();
        // générateur
        const gy = (Tp + B) / 2; c.fillStyle = css("--plot-bg"); c.fillRect(L - 26, gy - 26, 52, 52); c.strokeRect(L - 26, gy - 26, 52, 52); txt(c, "G", L, gy - 6, fg, "center", "middle", "700 15px 'Fira Sans'"); txt(c, fr(U, 1) + " V", L, gy + 12, mu, "center", "middle", "11px 'Fira Mono'"); txt(c, "+", L + 8, Tp - 6, css("--rouge"), "left", "alphabetic", "700 14px 'Fira Sans'");
        // ampèremètre
        const ax = L + (Rr - L) * 0.42; meter(ax, Tp, "A", fmtI(meas.I) + " mA");
        // dipôle(s)
        const ry = (Tp + B) / 2, drawRes = (x, y, k, hgt = 74) => { const rw = 22; const bd = bands(P[k].nom); c.fillStyle = "#e8d3a9"; c.fillRect(x - rw / 2, y - hgt / 2, rw, hgt); c.strokeStyle = fg; c.lineWidth = 1.5; c.strokeRect(x - rw / 2, y - hgt / 2, rw, hgt); bd.forEach((b, i) => { c.fillStyle = COL[b]; c.fillRect(x - rw / 2, y - hgt / 2 + 8 + i * (hgt - 20) / 3.4 + (i === 3 ? 6 : 0), rw, 7); }); };
        c.fillStyle = css("--plot-bg");
        if (sel === "S") { c.fillRect(Rr - 14, ry - 70, 28, 140); drawRes(Rr, ry - 34, "R1", 56); drawRes(Rr, ry + 34, "R2", 56); }
        else if (sel === "P") { c.fillRect(Rr - 14, ry - 44, 28, 88); c.strokeStyle = fg; c.lineWidth = 2; c.beginPath(); c.moveTo(Rr, ry - 44); c.lineTo(Rr - 24, ry - 44); c.lineTo(Rr - 24, ry + 44); c.lineTo(Rr, ry + 44); c.moveTo(Rr, ry - 44); c.lineTo(Rr + 24, ry - 44); c.lineTo(Rr + 24, ry + 44); c.lineTo(Rr, ry + 44); c.stroke(); c.fillStyle = css("--plot-bg"); c.fillRect(Rr - 1, ry - 44, 2, 88); drawRes(Rr - 24, ry, "R1", 56); drawRes(Rr + 24, ry, "R2", 56); }
        else { c.fillRect(Rr - 14, ry - 40, 28, 80); drawRes(Rr, ry, sel); }
        txt(c, sel === "X" ? "X = ?" : label(sel), Rr + (sel === "P" ? 46 : 20), ry + 4, fg, "left", "middle", "600 13px 'Fira Sans'");
        // voltmètre
        const vx = Rr + w * 0.2;
        c.strokeStyle = fg; c.lineWidth = 2; c.beginPath();
        if (mont === "aval") { c.moveTo(Rr, Tp + 16); c.lineTo(vx, Tp + 16); c.lineTo(vx, B - 16); c.lineTo(Rr, B - 16); c.stroke(); dot(Rr, Tp + 16); dot(Rr, B - 16); }
        else { const xa = ax - 40; c.moveTo(xa, Tp); c.lineTo(xa, Tp - 30); c.lineTo(vx, Tp - 30); c.lineTo(vx, B - 16); c.lineTo(Rr, B - 16); c.stroke(); dot(xa, Tp); dot(Rr, B - 16); }
        meter(vx, ry + 20, "V", fr(meas.V, 2) + " V");
        txt(c, mont === "aval" ? "montage aval (courte dérivation)" : "montage amont (longue dérivation)", w * 0.5, h - 8, mu, "center");
        if (meas.P > 0.5) { c.fillStyle = "rgba(230,80,40,.25)"; c.beginPath(); c.arc(Rr, ry, 50, 0, 7); c.fill(); txt(c, "surchauffe !", Rr, ry - 56, css("--ko"), "center", "alphabetic", "700 13px 'Fira Sans'"); }
      };
      measure();
    }
  });
})();
