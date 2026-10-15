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
        <li>Place le résistor X sur un support et <b>réalise toi-même le câblage</b> du montage aval (générateur, interrupteur, ampèremètre en série, voltmètre aux bornes de X). Lis la valeur nominale de X grâce au code des couleurs.</li>
        <li>Le générateur étant à 0 V, ferme l'interrupteur. Augmente la tension par pas d'environ 1 V jusqu'à 10 V.</li>
        <li>Pour chaque réglage, relève U et I et enregistre (Partie A). Fais au moins 8 mesures.</li>
        <li>Exploite le graphe U = f(I) : la pente est la résistance R<sub>X</sub>.</li></ol>
      <h4>Partie B — Choix du montage</h4><ol>
        <li>Avec le résistor de 22 Ω, règle U ≈ 2 V (attention à la puissance). Câble le montage amont, mesure U et I, puis déplace le fil du voltmètre pour passer en montage aval. Enregistre les deux (Partie B).</li>
        <li>Recommence avec le résistor de 47 kΩ, sous U ≈ 10 V, dans les deux montages.</li>
        <li>Pour chaque mesure, compare R<sub>mes</sub> = U/I à la valeur corrigée et conclus : quel montage pour quelle résistance ?</li></ol>
      <h4>Partie C — Associations de résistances</h4><ol>
        <li>En montage aval sous U ≈ 6 V, mesure successivement R₁, R₂, puis R₁ et R₂ câblés en série, puis en parallèle (R₁ sur le support 1, R₂ sur le support 2) (Partie C).</li>
        <li>Compare les valeurs mesurées aux valeurs calculées avec les lois d'association.</li></ol>`,
    precautions: `<ul><li>Branche toujours l'ampèremètre en <b>série</b> et le voltmètre en <b>dérivation</b> ; un ampèremètre branché en dérivation crée un court-circuit.</li>
      <li>Commence par le calibre le plus grand puis descends ; ici les appareils changent de calibre automatiquement.</li>
      <li>Surveille la puissance : P = U²/R ≤ 0,5 W, soit U ≤ 3,3 V pour 22 Ω. Le simulateur signale la surchauffe.</li>
      <li>Incertitude : ΔR/R = ΔU/U + ΔI/I. Préfère les mesures en milieu ou haut de calibre.</li></ul>`,
    preparation: ["Fais les schémas des montages amont et aval avec le sens du courant et les flèches tension.", "Démontre les expressions R_mes = R + r_A (amont) et 1/R_mes = 1/R + 1/R_V (aval).", "Avec r_A = 2 Ω et R_V = 1 MΩ, calcule l'erreur relative de chaque montage pour R = 22 Ω et pour R = 47 kΩ.", "Calcule la tension maximale admissible pour un résistor de 22 Ω de puissance 0,5 W."],
    hint: "Réalise toi-même le câblage : touche une borne, puis une autre, pour les relier par un fil. Touche un fil pour le retirer. Touche l'interrupteur pour l'ouvrir ou le fermer.",
    controls: `<h3>Résistors sur les supports</h3>
      <div class="ctl"><label for="ohS1">Support 1</label><select id="ohS1"></select></div>
      <div class="ctl"><label for="ohS2">Support 2</label><select id="ohS2"></select></div>
      <h3>Générateur</h3>
      <div class="ctl"><label for="ohU">Tension de consigne <b id="ohUv"></b></label><input id="ohU" type="range" min="0" max="12" step="0.1" value="2"></div>
      <div class="row"><button type="button" class="btn sm" id="ohK">Fermer l'interrupteur</button><button type="button" class="btn sm" id="ohClr">Retirer tous les fils</button></div>
      <h3>Multimètres</h3><dl class="lcd"><dt>Voltmètre</dt><dd id="ohV">—</dd><dt>Ampèremètre</dt><dd id="ohI">—</dd><dt>Montage reconnu</dt><dd id="ohM">—</dd></dl>
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
      const RG = 0.5, RK = 1e-4, IMAX = 1.0;            // résistance interne du générateur, de l'interrupteur fermé ; courant de court-circuit (fusible)
      const NOMS = { X: "Résistor X (inconnu)", F: "Résistor 22 Ω", G: "Résistor 47 kΩ", R1: "R₁", R2: "R₂" };
      const label = k => ({ X: "X", F: "22 Ω", G: "47 kΩ", R1: "R₁", R2: "R₂", S: "R₁ + R₂ (série)", P: "R₁ // R₂" }[k]);

      /* ---------- bornes de la paillasse (coordonnées dans le dessin 640 × 400) ---------- */
      const TERM = {
        "G+": { x: 80, y: 128, t: "+", rouge: true, nom: "borne + du générateur" }, "G-": { x: 80, y: 272, t: "−", nom: "borne − du générateur" },
        "K1": { x: 168, y: 62, t: "", nom: "borne gauche de l'interrupteur" }, "K2": { x: 248, y: 62, t: "", nom: "borne droite de l'interrupteur" },
        "A+": { x: 300, y: 104, t: "mA", rouge: true, nom: "borne mA de l'ampèremètre" }, "A-": { x: 380, y: 104, t: "COM", nom: "borne COM de l'ampèremètre" },
        "V+": { x: 300, y: 332, t: "V", rouge: true, nom: "borne V du voltmètre" }, "V-": { x: 380, y: 332, t: "COM", nom: "borne COM du voltmètre" },
        "S1a": { x: 480, y: 108, t: "", nom: "borne haute du support 1" }, "S1b": { x: 480, y: 252, t: "", nom: "borne basse du support 1" },
        "S2a": { x: 576, y: 108, t: "", nom: "borne haute du support 2" }, "S2b": { x: 576, y: 252, t: "", nom: "borne basse du support 2" }
      };
      let W = store.get("ohm_fils", []);                // fils : paires de bornes
      let SL = store.get("ohm_supports", { S1: "X", S2: "" });
      W = (Array.isArray(W) ? W : []).filter(f => TERM[f[0]] && TERM[f[1]]);
      let U = 2, K = false, pick = null, meas = { V: 0, I: 0, ok: false };
      const save = () => { store.set("ohm_fils", W); store.set("ohm_supports", SL); };

      /* ---------- calcul du circuit réellement câblé (méthode des nœuds) ---------- */
      function solve() {
        const ids = Object.keys(TERM), par = {}; ids.forEach(t => par[t] = t);
        const f = t => par[t] === t ? t : (par[t] = f(par[t]));
        W.forEach(([a, b]) => { par[f(a)] = f(b); });
        const nodes = [...new Set(ids.map(f))], gnd = f("G-"), idx = {}; let n = 0;
        nodes.forEach(r => { if (r !== gnd) idx[r] = n++; });
        const N = t => { const r = f(t); return r === gnd ? -1 : idx[r]; };
        const G = Array.from({ length: n }, () => new Array(n + 1).fill(0));
        const add = (a, b, g) => { const i = N(a), j = N(b); if (i === j) return; if (i >= 0) G[i][i] += g; if (j >= 0) G[j][j] += g; if (i >= 0 && j >= 0) { G[i][j] -= g; G[j][i] -= g; } };
        const els = [];
        add("G+", "G-", 1 / RG); const iG = N("G+"); if (iG >= 0) G[iG][n] += U / RG;
        if (K) add("K1", "K2", 1 / RK);
        add("A+", "A-", 1 / RA); add("V+", "V-", 1 / RV);
        ["S1", "S2"].forEach(s => { if (SL[s]) { add(s + "a", s + "b", 1 / P[SL[s]].R); els.push(s); } });
        for (let i = 0; i < n; i++) G[i][i] += 1e-12;
        // élimination de Gauss
        for (let c = 0; c < n; c++) {
          let m = c; for (let r = c + 1; r < n; r++) if (Math.abs(G[r][c]) > Math.abs(G[m][c])) m = r;
          [G[c], G[m]] = [G[m], G[c]];
          for (let r = 0; r < n; r++) if (r !== c && G[r][c]) { const k = G[r][c] / G[c][c]; for (let q = c; q <= n; q++) G[r][q] -= k * G[c][q]; }
        }
        const v = t => { const i = N(t); return i < 0 ? 0 : G[i][n] / G[i][i]; };
        const res = { v, Ig: (U - (v("G+") - v("G-"))) / RG, IA: (v("A+") - v("A-")) / RA, VV: v("V+") - v("V-"), R: {} };
        els.forEach(s => { const d = v(s + "a") - v(s + "b"); res.R[s] = { k: SL[s], U: d, I: d / P[SL[s]].R, P: d * d / P[SL[s]].R }; });
        return res;
      }

      /* ---------- reconnaissance du dipôle étudié et du montage ---------- */
      function analyse(r) {
        const act = Object.keys(r.R).filter(s => Math.abs(r.R[s].I) > 1e-7);
        if (!act.length) return { err: "Aucun courant ne traverse les résistors : vérifie que le circuit est fermé." };
        let k, Rd;
        if (act.length === 1) { k = r.R[act[0]].k; Rd = P[k].R; }
        else {
          const a = r.R.S1, b = r.R.S2, ks = [a.k, b.k].sort().join();
          if (ks !== "R1,R2") return { err: "Les deux supports sont utilisés : pour la partie C, mets R₁ sur un support et R₂ sur l'autre." };
          if (Math.abs(a.I - b.I) <= 1e-4 * Math.abs(a.I)) { k = "S"; Rd = P.R1.R + P.R2.R; }
          else if (Math.abs(a.U - b.U) <= 1e-4 * Math.abs(a.U)) { k = "P"; Rd = 1 / (1 / P.R1.R + 1 / P.R2.R); }
          else return { err: "Association de R₁ et R₂ non reconnue : relie-les soit en série, soit en parallèle." };
        }
        if (Math.abs(r.IA) < 1e-7) return { k, err: "L'ampèremètre n'indique aucun courant : il doit être branché en série avec le dipôle." };
        if (Math.abs(r.VV) < 1e-6) return { k, err: "Le voltmètre indique 0 V : il doit être branché en dérivation, aux bornes du dipôle." };
        const Rm = Math.abs(r.VV / r.IA), am = Rd + RA, av = Rd * RV / (Rd + RV);
        if (Math.abs(Rm - av) <= 5e-4 * av) return { k, mont: "aval" };
        if (Math.abs(Rm - am) <= 5e-4 * am) return { k, mont: "amont" };
        return { k, err: "Montage non reconnu : l'ampèremètre doit être en série avec le dipôle, et le voltmètre aux bornes du dipôle (aval) ou de l'ensemble ampèremètre + dipôle (amont)." };
      }

      let state = null;
      const measure = () => {
        $("#ohUv").textContent = fr(U, 1) + " V";
        $("#ohK").textContent = K ? "Ouvrir l'interrupteur" : "Fermer l'interrupteur";
        let r = solve();
        if (K && Math.abs(r.Ig) > IMAX) {   // court-circuit : le fusible coupe, l'interrupteur est rouvert
          K = false; r = solve();
          T.msg("Court-circuit ! Le courant est devenu très grand et l'interrupteur a été rouvert. Un ampèremètre branché en dérivation (ou un fil qui relie directement les bornes du générateur) provoque un court-circuit : revois ton câblage.", "bad");
          $("#ohK").textContent = "Fermer l'interrupteur";
        }
        const V = r.VV * (1 + gauss() * 0.0015) + gauss() * 0.002, I = r.IA * 1000 * (1 + gauss() * 0.002) + gauss() * Math.min(0.002, Math.abs(r.IA) * 1000 * 0.002);
        meas = { V: Math.abs(V) < 0.005 ? 0 : V, I: Math.abs(I) < 0.0005 ? 0 : I };
        state = K ? analyse(r) : { err: "L'interrupteur est ouvert." };
        const chaud = Object.values(r.R).find(x => x.P > 0.5);
        state.chaud = !!chaud;
        $("#ohV").textContent = fr(meas.V, 2) + " V"; $("#ohI").textContent = fmtI(meas.I) + " mA";
        $("#ohM").textContent = state.mont ? `${state.mont === "aval" ? "aval" : "amont"} — ${label(state.k)}` : "—";
        if (chaud) T.msg("Attention : la puissance dépasse 0,5 W, un résistor chauffe ! Diminue la tension.", "bad");
        else if (/chauffe/.test($("#ohm-msg").textContent)) T.msg("");
        T.draw();
      };

      /* ---------- dessin de la paillasse (SVG) ---------- */
      const cv = $("#ohm-cv"), box = document.createElement("div");
      box.className = "ohm-board"; box.setAttribute("aria-label", "Paillasse : câblage du circuit"); cv.replaceWith(box);
      if (!document.getElementById("ohm-style")) {
        const st = document.createElement("style"); st.id = "ohm-style";
        st.textContent = `.ohm-board svg{width:100%;height:auto;display:block;background:var(--plot-bg);border-radius:10px;touch-action:manipulation;user-select:none}
.ohm-board .term{cursor:pointer}.ohm-board .term:focus{outline:none}.ohm-board .term:focus .ring,.ohm-board .term.sel .ring{stroke:var(--saff);stroke-width:4}
.ohm-board .wire{cursor:pointer}.ohm-board .wire:hover .w{stroke-width:6}.ohm-board .k{cursor:pointer}`;
        document.head.appendChild(st);
      }
      const COLS = ["#c62828", "#1565c0", "#2e7d32", "#ef7d00", "#6a1b9a", "#00838f", "#5d4037", "#ad1457"];
      const resSVG = (x, y1, y2, k) => {
        if (!k) return `<rect x="${x - 15}" y="${y1 + 20}" width="30" height="${y2 - y1 - 40}" rx="5" fill="none" stroke="var(--line)" stroke-dasharray="5 4"/><text x="${x}" y="${(y1 + y2) / 2 + 4}" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="Fira Sans,Arial">vide</text>`;
        const bd = bands(P[k].nom), h = y2 - y1 - 44, ym = y1 + 22;
        return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="var(--fg)" stroke-width="2"/><rect x="${x - 12}" y="${ym}" width="24" height="${h}" rx="6" fill="#e8d3a9" stroke="var(--fg)" stroke-width="1.5"/>`
          + bd.map((b, i) => `<rect x="${x - 12}" y="${ym + 10 + i * (h - 28) / 3 + (i === 3 ? 8 : 0)}" width="24" height="7" fill="${COL[b]}"/>`).join("")
          + `<text x="${x + 18}" y="${(y1 + y2) / 2 + 4}" font-size="13" font-weight="600" fill="var(--fg)" font-family="Fira Sans,Arial">${k === "X" ? "X" : label(k)}</text>`;
      };
      const meterSVG = (cx, cy, l, val, t1, t2) => `<line x1="${TERM[t1].x}" y1="${TERM[t1].y}" x2="${cx - 26}" y2="${cy}" stroke="var(--fg)" stroke-width="2"/><line x1="${TERM[t2].x}" y1="${TERM[t2].y}" x2="${cx + 26}" y2="${cy}" stroke="var(--fg)" stroke-width="2"/>`
        + `<circle cx="${cx}" cy="${cy}" r="26" fill="var(--plot-bg)" stroke="var(--fg)" stroke-width="2"/><text x="${cx}" y="${cy + 7}" text-anchor="middle" font-size="20" font-weight="700" fill="var(--fg)" font-family="Fira Sans,Arial">${l}</text>`
        + `<rect x="${cx - 52}" y="${cy - 62}" width="104" height="26" rx="4" fill="#1d2a1f"/><text x="${cx}" y="${cy - 44}" text-anchor="middle" font-size="14" fill="#9cf29c" font-family="Fira Mono,monospace">${val}</text>`;
      T.draw = () => {
        const kOpen = !K;
        let h = `<svg viewBox="0 0 640 400" role="img" aria-label="Paillasse de câblage">`;
        // fils
        W.forEach(([a, b], i) => {
          const A = TERM[a], B = TERM[b], mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2 + Math.min(60, Math.hypot(B.x - A.x, B.y - A.y) * 0.18);
          const d = `M${A.x},${A.y} Q${mx},${my} ${B.x},${B.y}`;
          h += `<g class="wire" data-w="${i}" role="button" tabindex="0" aria-label="Fil entre ${A.nom} et ${B.nom} (toucher pour retirer)"><path d="${d}" stroke="transparent" stroke-width="16" fill="none"/><path class="w" d="${d}" stroke="${COLS[i % COLS.length]}" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
        });
        // générateur
        h += `<line x1="80" y1="128" x2="80" y2="158" stroke="var(--fg)" stroke-width="2"/><line x1="80" y1="242" x2="80" y2="272" stroke="var(--fg)" stroke-width="2"/>`
          + `<rect x="30" y="158" width="100" height="84" rx="8" fill="var(--tint)" stroke="var(--fg)" stroke-width="2"/><text x="80" y="190" text-anchor="middle" font-size="15" font-weight="700" fill="var(--fg)" font-family="Fira Sans,Arial">Générateur</text><text x="80" y="214" text-anchor="middle" font-size="14" fill="var(--fg)" font-family="Fira Mono,monospace">${fr(U, 1)} V</text><text x="80" y="232" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="Fira Sans,Arial">continu</text>`;
        // interrupteur
        h += `<g class="k" id="ohKsvg" role="button" tabindex="0" aria-label="Interrupteur ${kOpen ? "ouvert" : "fermé"}"><rect x="160" y="30" width="96" height="56" fill="transparent"/><circle cx="182" cy="62" r="4" fill="var(--fg)"/><circle cx="234" cy="62" r="4" fill="var(--fg)"/>`
          + `<line x1="168" y1="62" x2="182" y2="62" stroke="var(--fg)" stroke-width="2"/><line x1="234" y1="62" x2="248" y2="62" stroke="var(--fg)" stroke-width="2"/>`
          + (kOpen ? `<line x1="182" y1="62" x2="228" y2="38" stroke="var(--fg)" stroke-width="3"/>` : `<line x1="182" y1="62" x2="234" y2="62" stroke="var(--ok)" stroke-width="3"/>`)
          + `<text x="208" y="24" text-anchor="middle" font-size="12" fill="var(--muted)" font-family="Fira Sans,Arial">K ${kOpen ? "ouvert" : "fermé"}</text></g>`;
        // appareils
        h += meterSVG(340, 104, "A", fmtI(meas.I) + " mA", "A+", "A-") + meterSVG(340, 332, "V", fr(meas.V, 2) + " V", "V+", "V-");
        // supports
        h += resSVG(480, 108, 252, SL.S1) + resSVG(576, 108, 252, SL.S2)
          + `<text x="480" y="284" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="Fira Sans,Arial">support 1</text><text x="576" y="284" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="Fira Sans,Arial">support 2</text>`;
        if (state && state.chaud) h += `<circle cx="528" cy="180" r="70" fill="rgba(230,80,40,.18)"/><text x="528" y="100" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ko)" font-family="Fira Sans,Arial">surchauffe !</text>`;
        // bornes
        Object.entries(TERM).forEach(([id, t]) => {
          h += `<g class="term${pick === id ? " sel" : ""}" data-t="${id}" role="button" tabindex="0" aria-label="${t.nom}"><circle cx="${t.x}" cy="${t.y}" r="24" fill="transparent"/><circle class="ring" cx="${t.x}" cy="${t.y}" r="9" fill="${t.rouge ? "#c62828" : "#222"}" stroke="var(--plot-bg)" stroke-width="2"/>`
            + (t.t ? `<text x="${id[0] === "G" ? t.x - 20 : t.x}" y="${id[0] === "G" ? t.y + 5 : t.y + (id[0] === "V" ? 26 : -15)}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--fg)" font-family="Fira Sans,Arial">${t.t}</text>` : "") + `</g>`;
        });
        h += `<text x="320" y="392" text-anchor="middle" font-size="12" fill="var(--muted)" font-family="Fira Sans,Arial">${pick ? "Touche une autre borne pour poser le fil (ou la même borne pour annuler)." : W.length ? W.length + " fil" + (W.length > 1 ? "s" : "") + " posé" + (W.length > 1 ? "s" : "") + "." : "Aucun fil : commence le câblage par la borne + du générateur."}</text></svg>`;
        box.innerHTML = h;
      };

      /* ---------- interactions ---------- */
      const toucherBorne = id => {
        if (!pick) { pick = id; T.draw(); return; }
        if (pick === id) { pick = null; T.draw(); return; }
        const a = pick, b = id; pick = null;
        if (W.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) { T.msg("Ces deux bornes sont déjà reliées.", ""); T.draw(); return; }
        W.push([a, b]); save(); T.msg(""); measure();
      };
      const action = e => {
        const t = e.target.closest("[data-t]"), w = e.target.closest("[data-w]"), k = e.target.closest("#ohKsvg");
        if (t) toucherBorne(t.dataset.t);
        else if (w) { W.splice(+w.dataset.w, 1); save(); T.msg(""); measure(); }
        else if (k) { K = !K; T.msg(""); measure(); }
      };
      box.addEventListener("click", action);
      box.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); action(e); } });
      const opts = cur => `<option value="">— vide —</option>` + Object.keys(NOMS).map(k => `<option value="${k}"${cur === k ? " selected" : ""}>${NOMS[k]}</option>`).join("");
      const fillSel = () => { $("#ohS1").innerHTML = opts(SL.S1); $("#ohS2").innerHTML = opts(SL.S2); };
      ["S1", "S2"].forEach(s => $("#oh" + s).onchange = e => {
        const v = e.target.value, other = s === "S1" ? "S2" : "S1";
        if (v && SL[other] === v) { T.msg("Ce résistor est déjà sur l'autre support.", "bad"); fillSel(); return; }
        SL[s] = v; save(); T.msg(""); measure();
      });
      $("#ohU").addEventListener("input", e => { U = +e.target.value; measure(); });
      $("#ohK").onclick = () => { K = !K; T.msg(""); measure(); };
      $("#ohClr").onclick = () => { if (W.length && !confirm("Retirer tous les fils de la paillasse ?")) return; W = []; K = false; save(); measure(); };
      $("#ohRec").onclick = () => {
        if (!K) { T.msg("Ferme d'abord l'interrupteur.", "bad"); return; }
        if (state.err) { T.msg(state.err, "bad"); return; }
        if (meas.V < 0 || meas.I < 0) { T.msg("Un appareil affiche une valeur négative : ses bornes sont inversées. Le courant doit entrer par la borne mA de l'ampèremètre, et la borne V du voltmètre doit être du côté de la borne + du générateur.", "bad"); return; }
        if (!(meas.I > 0)) { T.msg("Augmente la tension : aucun courant ne circule.", "bad"); return; }
        if (state.chaud) { T.msg("Mesure refusée : un résistor surchauffe. Diminue la tension.", "bad"); return; }
        const sel = state.k, part = sel === "X" ? "A" : (sel === "F" || sel === "G") ? "B" : "C";
        if (part === "A" && state.mont !== "aval") T.msg("Conseil : pour la partie A, utilise le montage aval.", "");
        T.add(part, { U: meas.V, I: meas.I, mont: state.mont, nom: label(sel), k: sel });
        if (part !== "A" || state.mont === "aval") T.msg(`Mesure enregistrée dans la partie ${part} (montage ${state.mont}, ${label(sel)}).`, "ok");
      };
      $("#ohNew").onclick = () => { if (T.locked()) { T.msg("Compte rendu déjà soumis : le matériel ne peut plus être changé.", "bad"); return; } newSet(); T.clearRows(); measure(); T.msg("Nouveaux résistors : refais les mesures."); };
      fillSel(); measure();
    }
  });
})();
