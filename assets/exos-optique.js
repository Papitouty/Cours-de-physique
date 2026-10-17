/* Exercices d'entraînement d'optique géométrique (valeurs aléatoires, corrections détaillées).
   Même format que exos.js : titre, enonce, reponses [{nom, unite, val, tol|abs}], correction [étapes], figureCor facultative. */
(function () {
  const T = window.EXO_OUTILS, EX = window.EXOS;
  if (!T || !EX) return;
  const { R, rnd, pick, N } = T;
  const deg = r => r * 180 / Math.PI, rad = d => d * Math.PI / 180;
  const asinD = x => deg(Math.asin(x)), sinD = d => Math.sin(rad(d)), tanD = d => Math.tan(rad(d)), cosD = d => Math.cos(rad(d));
  const s = x => (x < 0 ? "(" + N(x) + ")" : N(x));

  /* ---------- schéma de construction (lentille mince ou miroir) dans les conditions de Gauss ---------- */
  function svgLentille(fp, OA, AB, OAp, ApBp) {
    const xs = [OA, OAp, -Math.abs(fp), Math.abs(fp), 0].filter(isFinite), xmin = Math.min(...xs) * 1.15 - 2, xmax = Math.max(...xs) * 1.15 + 2;
    const ys = [AB, ApBp, 0].filter(isFinite), ymax = Math.max(Math.abs(Math.max(...ys)), Math.abs(Math.min(...ys))) * 1.35 + 0.5;
    const W = 460, H = 230, X = x => 20 + (x - xmin) / (xmax - xmin) * (W - 40), Y = y => H / 2 - y / ymax * (H / 2 - 18);
    const L = (x1, y1, x2, y2, c, d, w) => `<line x1="${X(x1).toFixed(1)}" y1="${Y(y1).toFixed(1)}" x2="${X(x2).toFixed(1)}" y2="${Y(y2).toFixed(1)}" style="stroke:${c};stroke-width:${w || 1.6}${d ? ";stroke-dasharray:5 4" : ""}"/>`;
    const A = (x, y, c, lab, dash) => `<line x1="${X(x).toFixed(1)}" y1="${Y(0).toFixed(1)}" x2="${X(x).toFixed(1)}" y2="${Y(y).toFixed(1)}" style="stroke:${c};stroke-width:3${dash ? ";stroke-dasharray:5 4" : ""}" marker-end="url(#mk${c === "var(--accent)" ? "a" : "r"})"/><text x="${X(x) + 5}" y="${Y(y) + (y > 0 ? -4 : 14)}" style="fill:${c};font:600 12px 'Fira Sans',Arial">${lab}</text>`;
    const pt = (x, lab) => `<circle cx="${X(x)}" cy="${Y(0)}" r="3" style="fill:var(--fg)"/><text x="${X(x)}" y="${Y(0) + 16}" text-anchor="middle" style="fill:var(--fg);font:12px 'Fira Sans',Arial">${lab}</text>`;
    const conv = fp > 0, B = [OA, AB], Bp = [OAp, ApBp], yl = ymax * 0.92;
    let h = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Construction de l'image" style="width:100%;max-width:${W}px;height:auto"><defs><marker id="mka" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0L10,5L0,10z" style="fill:var(--accent)"/></marker><marker id="mkr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0L10,5L0,10z" style="fill:var(--rouge)"/></marker></defs>`;
    h += L(xmin, 0, xmax, 0, "var(--muted)", true, 1) + L(0, -yl, 0, yl, "var(--fg)", false, 2.4);
    h += `<text x="${X(0) + 6}" y="${Y(yl) + 10}" style="fill:var(--fg);font:12px 'Fira Sans',Arial">${conv ? "L (convergente)" : "L (divergente)"}</text>`;
    // rayon parallèle à l'axe puis passant par F' (ou semblant en venir)
    const k1 = -AB / fp;    // pente après la lentille : passe par (0, AB) et (f', 0)
    const xe = Math.max(OAp, Math.abs(fp)) * 1.1 + 1;
    h += L(OA, AB, 0, AB, "var(--saff)") + L(0, AB, xe, AB + k1 * xe, "var(--saff)");
    if (OAp < 0 || !conv) h += L(0, AB, Math.min(OAp, fp), AB + k1 * Math.min(OAp, fp), "var(--saff)", true, 1.2);
    // rayon passant par O (non dévié)
    const k2 = AB / OA;
    h += L(OA, AB, xe, k2 * xe, "var(--ok)");
    if (OAp < 0) h += L(OA, AB, OAp, k2 * OAp, "var(--ok)", true, 1.2);
    h += pt(fp, "F′") + pt(-fp, "F") + pt(0, "O");
    h += A(OA, AB, "var(--accent)", "B") + `<text x="${X(OA) - 4}" y="${Y(0) + 16}" text-anchor="end" style="fill:var(--accent);font:12px 'Fira Sans',Arial">A</text>`;
    if (isFinite(OAp)) h += A(OAp, ApBp, "var(--rouge)", "B′", OAp < 0) + `<text x="${X(OAp) - 4}" y="${Y(0) + (ApBp > 0 ? 16 : -6)}" text-anchor="end" style="fill:var(--rouge);font:12px 'Fira Sans',Arial">A′</text>`;
    return h + `</svg>`;
  }

  /* ===================== OPTIQUE 1 : LOIS FONDAMENTALES ===================== */
  EX.opt1 = [
    function () {
      const n = rnd(1.30, 1.70, 0.01), l0 = rnd(400, 750, 5), c = 3e8, v = c / n, l = l0 / n, f = c / (l0 * 1e-9);
      return { titre: "Indice, vitesse et longueur d'onde",
        enonce: R`Une radiation de longueur d'onde $\lambda_0=${l0}$ nm dans le vide pénètre dans un milieu transparent d'indice $n=${N(n)}$ ($c=3{,}00\times10^8$ m/s). Calculer sa fréquence $\nu$, sa vitesse $v$ et sa longueur d'onde $\lambda$ dans ce milieu.`,
        reponses: [{ nom: R`\nu`, unite: "Hz", val: f }, { nom: "v", unite: "m/s", val: v }, { nom: R`\lambda`, unite: "nm", val: l }],
        correction: [
          R`Fréquence (imposée par la source, identique dans tous les milieux) : $\nu=\dfrac c{\lambda_0}=\dfrac{3{,}00\times10^8}{${l0}\times10^{-9}}\approx${N(f)}$ Hz.`,
          R`Vitesse : $v=\dfrac cn=\dfrac{3{,}00\times10^8}{${N(n)}}\approx${N(v)}$ m/s.`,
          R`Longueur d'onde : $\lambda=\dfrac{v}{\nu}=\dfrac{\lambda_0}{n}=\dfrac{${l0}}{${N(n)}}\approx${N(l)}$ nm : elle diminue dans le milieu, la fréquence ne change pas.`] };
    },
    function () {
      const n1 = rnd(1.45, 1.65, 0.01), n2 = pick([1.00, 1.33]), lam = asinD(n2 / n1), i1 = rnd(10, Math.floor(lam) - 3), i2 = asinD(n1 * sinD(i1) / n2);
      const milieu = n2 === 1 ? "l'air" : "l'eau";
      return { titre: "Réfraction et angle critique",
        enonce: R`Un rayon lumineux se propage dans un verre d'indice $n_1=${N(n1)}$ et arrive sur la surface de séparation avec ${milieu} ($n_2=${N(n2)}$) sous l'incidence $i_1=${i1}^\circ$. Calculer l'angle de réfraction $i_2$, puis l'angle critique $\lambda$ au-delà duquel il y a réflexion totale.`,
        reponses: [{ nom: "i_2", unite: "°", val: i2, abs: 0.3 }, { nom: R`\lambda`, unite: "°", val: lam, abs: 0.3 }],
        correction: [
          R`Loi de Snell-Descartes : $n_1\sin i_1=n_2\sin i_2$, d'où $\sin i_2=\dfrac{${N(n1)}\times\sin${i1}^\circ}{${N(n2)}}\approx${N(n1 * sinD(i1) / n2)}$ et $i_2\approx${N(i2)}^\circ$.`,
          R`Le rayon s'écarte de la normale ($i_2>i_1$) car il passe dans un milieu moins réfringent.`,
          R`Angle critique : $i_2=90^\circ$ pour $\sin\lambda=\dfrac{n_2}{n_1}=\dfrac{${N(n2)}}{${N(n1)}}\approx${N(n2 / n1)}$, soit $\lambda\approx${N(lam)}^\circ$. Pour $i_1>\lambda$, toute la lumière est réfléchie.`] };
    },
    function () {
      const nc = rnd(1.46, 1.52, 0.005), ng = +(nc - rnd(0.005, 0.03, 0.005)).toFixed(3), lam = asinD(ng / nc), ON = Math.sqrt(nc * nc - ng * ng), th = asinD(Math.min(1, ON));
      return { titre: "Fibre optique à saut d'indice",
        enonce: R`Une fibre optique a un cœur d'indice $n_c=${N(nc, 4)}$ et une gaine d'indice $n_g=${N(ng, 4)}$ ; elle est utilisée dans l'air. Calculer l'angle critique $\lambda$ à l'interface cœur-gaine, l'ouverture numérique $ON=\sqrt{n_c^2-n_g^2}$ et l'angle d'acceptance maximal $\theta_{0}$ à l'entrée de la fibre.`,
        reponses: [{ nom: R`\lambda`, unite: "°", val: lam, abs: 0.2 }, { nom: "ON", unite: "", val: ON, tol: 0.03 }, { nom: R`\theta_0`, unite: "°", val: th, abs: 0.3 }],
        correction: [
          R`Réflexion totale à l'interface cœur-gaine si l'incidence dépasse $\lambda$ : $\sin\lambda=\dfrac{n_g}{n_c}=\dfrac{${N(ng, 4)}}{${N(nc, 4)}}$, d'où $\lambda\approx${N(lam)}^\circ$.`,
          R`À l'entrée, $\sin\theta_0=n_c\sin\theta_1$ avec $\theta_1=90^\circ-\lambda$, donc $\sin\theta_0=n_c\cos\lambda=\sqrt{n_c^2-n_g^2}=ON\approx${N(ON)}$.`,
          R`Angle d'acceptance : $\theta_0=\arcsin(ON)\approx${N(th)}^\circ$. Tout rayon entrant sous un angle plus petit est guidé.`] };
    }
  ];

  /* ===================== OPTIQUE 2 : FORMATION DES IMAGES, SYSTÈMES PLANS ===================== */
  EX.opt2 = [
    function () {
      const d = rnd(0.5, 4, 0.1), dl = rnd(0.1, 1.0, 0.05), H = rnd(1.50, 1.95, 0.01);
      return { titre: "Miroir plan",
        enonce: R`Une personne de taille $H=${N(H)}$ m se tient debout à $d=${N(d)}$ m d'un miroir plan vertical. (1) Quelle est la distance entre la personne et son image ? (2) On recule le miroir de $\delta=${N(dl)}$ m : de combien l'image se déplace-t-elle ? (3) Quelle hauteur minimale doit avoir le miroir pour qu'elle s'y voie en entier ?`,
        reponses: [{ nom: "D", unite: "m", val: 2 * d }, { nom: R`\Delta x`, unite: "m", val: 2 * dl }, { nom: "h_{\\min}", unite: "m", val: H / 2 }],
        correction: [
          R`L'image est le symétrique de l'objet par rapport au miroir : $\overline{HA'}=-\overline{HA}$. Elle est à $${N(d)}$ m derrière le miroir, donc à $D=2d=${N(2 * d)}$ m de la personne.`,
          R`Si le miroir recule de $\delta$, la personne est à $d+\delta$ du miroir et l'image à $d+\delta$ derrière : la distance personne-image devient $2(d+\delta)$. L'image recule de $2\delta=${N(2 * dl)}$ m.`,
          R`Les rayons utiles se réfléchissent à mi-hauteur entre l'œil et chaque extrémité du corps : $h_{\min}=\dfrac H2=${N(H / 2)}$ m, quelle que soit la distance.`] };
    },
    function () {
      const n = pick([1.33, 1.36, 1.47, 1.50]), h = rnd(0.30, 3.00, 0.05), liq = { 1.33: "d'eau", 1.36: "d'alcool", 1.47: "de glycérine", 1.50: "d'huile" }[n], hp = h / n;
      return { titre: "Profondeur apparente",
        enonce: R`Un objet repose au fond d'un bac rempli ${liq} ($n=${N(n)}$) sur une hauteur $h=${N(h)}$ m. On l'observe de l'air, presque à la verticale. Calculer la profondeur apparente $h'$ et la distance $\Delta h$ dont l'objet semble remonté.`,
        reponses: [{ nom: "h'", unite: "m", val: hp }, { nom: R`\Delta h`, unite: "m", val: h - hp }],
        correction: [
          R`Dioptre plan dans les conditions de Gauss (axe orienté du liquide vers l'air) : $\dfrac{\overline{HA'}}{n_2}=\dfrac{\overline{HA}}{n_1}$ avec $n_1=${N(n)}$, $n_2=1$.`,
          R`$\overline{HA'}=\dfrac{\overline{HA}}{n}=\dfrac{-${N(h)}}{${N(n)}}$, soit $h'=${N(hp)}$ m : l'image est virtuelle, plus proche de la surface.`,
          R`L'objet semble remonté de $\Delta h=h-h'=${N(h)}-${N(hp)}=${N(h - hp)}$ m.`] };
    },
    function () {
      const fp = pick([-50, -40, -25, -20, 10, 12.5, 20, 25, 40, 50]), AB = rnd(1, 5, 0.5), g = pick([-3, -2, -0.5, 0.5, 2, 3]), V = 100 / fp;
      return { titre: "Vergence et grandissement",
        enonce: R`(1) Calculer la vergence d'une lentille de distance focale image $f'=${N(fp)}$ cm. Est-elle convergente ? (2) Un objet $AB=${N(AB)}$ cm donne une image de hauteur $\overline{A'B'}=${N(g * AB)}$ cm. Calculer le grandissement $\gamma$.`,
        reponses: [{ nom: "V", unite: "δ", val: V, abs: 0.01 }, { nom: R`\gamma`, unite: "", val: g, abs: 0.01 }],
        correction: [
          R`$V=\dfrac1{f'}$ avec $f'$ en mètres : $V=\dfrac1{${N(fp / 100)}}=${N(V)}$ δ : lentille ${V > 0 ? "convergente" : "divergente"}.`,
          R`$\gamma=\dfrac{\overline{A'B'}}{\overline{AB}}=\dfrac{${N(g * AB)}}{${N(AB)}}=${N(g)}$ : image ${g > 0 ? "droite" : "renversée"}, ${Math.abs(g) > 1 ? "agrandie" : "réduite"}.`] };
    }
  ];

  /* ===================== OPTIQUE 3 : PRISME ET LAME ===================== */
  EX.opt3 = [
    function () {
      let A, n, i, r, rp, ip;
      do { A = pick([30, 45, 50, 60]); n = rnd(1.45, 1.70, 0.01); i = rnd(25, 70); r = asinD(sinD(i) / n); rp = A - r; } while (!(rp > 0 && n * sinD(rp) < 0.98));
      ip = asinD(n * sinD(rp));
      const D = i + ip - A;
      return { titre: "Marche d'un rayon dans un prisme",
        enonce: R`Un prisme d'angle $A=${A}^\circ$ et d'indice $n=${N(n)}$ reçoit un rayon sous l'incidence $i=${i}^\circ$. Calculer $r$, $r'$, l'angle d'émergence $i'$ et la déviation $D$.`,
        reponses: [{ nom: "r", unite: "°", val: r, abs: 0.2 }, { nom: "r'", unite: "°", val: rp, abs: 0.2 }, { nom: "i'", unite: "°", val: ip, abs: 0.3 }, { nom: "D", unite: "°", val: D, abs: 0.3 }],
        correction: [
          R`Entrée : $\sin r=\dfrac{\sin i}{n}=\dfrac{\sin${i}^\circ}{${N(n)}}$, d'où $r\approx${N(r)}^\circ$.`,
          R`$r'=A-r\approx${N(rp)}^\circ$ (angle critique $\lambda=\arcsin(1/n)\approx${N(asinD(1 / n))}^\circ$ : le rayon émerge car $r'<\lambda$).`,
          R`Sortie : $\sin i'=n\sin r'\approx${N(n * sinD(rp))}$, d'où $i'\approx${N(ip)}^\circ$.`,
          R`Déviation : $D=i+i'-A\approx${i}+${N(ip)}-${A}\approx${N(D)}^\circ$.`] };
    },
    function () {
      const A = pick([45, 50, 60]), n = rnd(1.45, 1.75, 0.01), im = asinD(n * sinD(A / 2)), Dm = 2 * im - A;
      return { titre: "Minimum de déviation et indice",
        enonce: R`Un prisme d'angle $A=${A}^\circ$ est taillé dans un verre d'indice $n=${N(n)}$. Calculer l'incidence $i_m$ correspondant au minimum de déviation et la déviation minimale $D_m$. Vérifier qu'on retrouve $n$ à partir de $D_m$.`,
        reponses: [{ nom: "i_m", unite: "°", val: im, abs: 0.3 }, { nom: "D_m", unite: "°", val: Dm, abs: 0.3 }],
        correction: [
          R`Au minimum de déviation la marche est symétrique : $r=r'=\dfrac A2=${N(A / 2)}^\circ$.`,
          R`$\sin i_m=n\sin\dfrac A2=${N(n)}\times\sin${N(A / 2)}^\circ\approx${N(n * sinD(A / 2))}$, d'où $i_m\approx${N(im)}^\circ$.`,
          R`$D_m=2i_m-A\approx${N(Dm)}^\circ$.`,
          R`Vérification : $n=\dfrac{\sin\frac{A+D_m}2}{\sin\frac A2}=\dfrac{\sin${N((A + Dm) / 2)}^\circ}{\sin${N(A / 2)}^\circ}\approx${N(sinD((A + Dm) / 2) / sinD(A / 2))}$.`] };
    },
    function () {
      const e = rnd(2, 20, 0.5), n = rnd(1.45, 1.70, 0.01), i = rnd(20, 70, 5), r = asinD(sinD(i) / n), d = e * sinD(i - r) / cosD(r), AA = e * (1 - 1 / n);
      return { titre: "Lame à faces parallèles",
        enonce: R`Une lame de verre d'épaisseur $e=${N(e)}$ mm et d'indice $n=${N(n)}$ est placée dans l'air. (1) Un rayon l'atteint sous l'incidence $i=${i}^\circ$ : calculer le déplacement latéral $d$ du rayon émergent. (2) Dans les conditions de Gauss, de combien l'image d'un point vu à travers la lame est-elle rapprochée ?`,
        reponses: [{ nom: "d", unite: "mm", val: d }, { nom: R`\overline{AA'}`, unite: "mm", val: AA }],
        correction: [
          R`Réfraction à l'entrée : $\sin r=\dfrac{\sin${i}^\circ}{${N(n)}}$, d'où $r\approx${N(r)}^\circ$. Le rayon émergent est parallèle au rayon incident.`,
          R`Déplacement latéral : $d=e\,\dfrac{\sin(i-r)}{\cos r}=${N(e)}\times\dfrac{\sin${N(i - r)}^\circ}{\cos${N(r)}^\circ}\approx${N(d)}$ mm.`,
          R`Image d'un point (deux dioptres plans successifs) : $\overline{AA'}=e\left(1-\dfrac1n\right)=${N(e)}\times\left(1-\dfrac1{${N(n)}}\right)\approx${N(AA)}$ mm, dans le sens de la lumière.`] };
    }
  ];

  /* ===================== OPTIQUE 4 : MIROIRS ET DIOPTRES SPHÉRIQUES ===================== */
  EX.opt4 = [
    function () {
      const Rr = pick([20, 30, 40, 50, 60, 80]), SC = -Rr, SF = SC / 2;
      let SA; do { SA = -rnd(5, 120, 5); } while (Math.abs(SA - SF) < 3);
      const SAp = 1 / (2 / SC - 1 / SA), g = -SAp / SA;
      return { titre: "Miroir sphérique concave",
        enonce: R`Un miroir concave a un rayon de courbure $|R|=${Rr}$ cm. Un objet $AB$ est placé à $${-SA}$ cm du sommet ($\overline{SA}=${SA}$ cm). Calculer $\overline{SF}$, la position $\overline{SA'}$ de l'image et le grandissement $\gamma$.`,
        reponses: [{ nom: R`\overline{SF}`, unite: "cm", val: SF, abs: 0.05 }, { nom: R`\overline{SA'}`, unite: "cm", val: SAp, abs: 0.1 }, { nom: R`\gamma`, unite: "", val: g, abs: 0.02 }],
        correction: [
          R`Miroir concave : $\overline{SC}=${SC}$ cm et $\overline{SF}=\dfrac{\overline{SC}}2=${N(SF)}$ cm.`,
          R`Relation de conjugaison : $\dfrac1{\overline{SA'}}=\dfrac2{\overline{SC}}-\dfrac1{\overline{SA}}=\dfrac2{${SC}}-\dfrac1{${SA}}\approx${N(1 / SAp)}$ cm$^{-1}$, d'où $\overline{SA'}\approx${N(SAp)}$ cm.`,
          R`$\gamma=-\dfrac{\overline{SA'}}{\overline{SA}}\approx${N(g)}$ : image ${SAp < 0 ? "réelle (devant le miroir)" : "virtuelle (derrière le miroir)"}, ${g > 0 ? "droite" : "renversée"}, ${Math.abs(g) > 1 ? "agrandie" : "réduite"}.`] };
    },
    function () {
      const Rm = pick([1.5, 2, 2.5, 3, 4]), d = rnd(5, 30, 1), h = rnd(1.2, 1.8, 0.1), SF = Rm / 2, SAp = 1 / (1 / SF + 1 / d), g = SAp / d;
      return { titre: "Rétroviseur convexe",
        enonce: R`Un rétroviseur est un miroir convexe de rayon $|R|=${N(Rm)}$ m. Une voiture de hauteur $${N(h)}$ m est à $${d}$ m derrière lui. Calculer la position $\overline{SA'}$ de l'image, le grandissement $\gamma$ et la hauteur de l'image.`,
        reponses: [{ nom: R`\overline{SA'}`, unite: "m", val: SAp }, { nom: R`\gamma`, unite: "", val: g, tol: 0.03 }, { nom: "A'B'", unite: "m", val: g * h, tol: 0.03 }],
        correction: [
          R`Miroir convexe : $\overline{SC}=+${N(Rm)}$ m, $\overline{SF}=+${N(SF)}$ m ; l'objet est réel : $\overline{SA}=-${d}$ m.`,
          R`$\dfrac1{\overline{SA'}}=\dfrac1{\overline{SF}}-\dfrac1{\overline{SA}}=\dfrac1{${N(SF)}}+\dfrac1{${d}}\approx${N(1 / SAp)}$ m$^{-1}$, d'où $\overline{SA'}\approx${N(SAp)}$ m (image virtuelle, derrière le miroir).`,
          R`$\gamma=-\dfrac{\overline{SA'}}{\overline{SA}}=\dfrac{${N(SAp)}}{${d}}\approx${N(g)}$ : image droite et réduite, de hauteur $\approx${N(g * h)}$ m. D'où le large champ de vision du rétroviseur.`] };
    },
    function () {
      const n2 = pick([1.33, 1.5, 1.6]), SC = pick([4, 5, 6, 8, 10]), V = (n2 - 1) / (SC / 100), fp = n2 * SC / (n2 - 1);
      let SA; do { SA = -rnd(10, 80, 5); } while (Math.abs(1 / SA + V / 100) < 0.004);
      const SAp = n2 / (V / 100 + 1 / SA), g = SAp / (n2 * SA);
      return { titre: "Dioptre sphérique",
        enonce: R`Un dioptre sphérique de rayon $\overline{SC}=+${SC}$ cm sépare l'air ($n_1=1$) d'un milieu d'indice $n_2=${N(n2)}$ ; la lumière vient de l'air. Calculer la vergence $V$, la distance focale image $f'=\overline{SF'}$, puis la position $\overline{SA'}$ de l'image d'un objet situé en $\overline{SA}=${SA}$ cm et le grandissement $\gamma$.`,
        reponses: [{ nom: "V", unite: "δ", val: V }, { nom: "f'", unite: "cm", val: fp }, { nom: R`\overline{SA'}`, unite: "cm", val: SAp }, { nom: R`\gamma`, unite: "", val: g, abs: 0.02 }],
        correction: [
          R`$V=\dfrac{n_2-n_1}{\overline{SC}}=\dfrac{${N(n2 - 1)}}{${N(SC / 100)}}\approx${N(V)}$ δ ; $f'=\dfrac{n_2}{V}=\dfrac{n_2\,\overline{SC}}{n_2-n_1}\approx${N(fp)}$ cm.`,
          R`$\dfrac{n_2}{\overline{SA'}}=V+\dfrac{n_1}{\overline{SA}}=${N(V / 100)}+\dfrac1{${SA}}\approx${N(V / 100 + 1 / SA)}$ cm$^{-1}$, d'où $\overline{SA'}\approx${N(SAp)}$ cm.`,
          R`$\gamma=\dfrac{n_1\,\overline{SA'}}{n_2\,\overline{SA}}\approx${N(g)}$ : image ${SAp > 0 ? "réelle (dans le milieu 2)" : "virtuelle"}, ${g > 0 ? "droite" : "renversée"}.`] };
    }
  ];

  /* ===================== OPTIQUE 5 : LENTILLES MINCES ===================== */
  EX.opt5 = [
    function () {
      const fp = pick([10, 15, 20, 25, -15, -20, -25]), AB = rnd(1, 3, 0.5);
      let OA; do { OA = -rnd(5, 80, 5); } while (Math.abs(OA + fp) < 4 || Math.abs(OA) < 4);
      const OAp = 1 / (1 / fp + 1 / OA), g = OAp / OA;
      return { titre: "Image donnée par une lentille mince",
        enonce: R`Une lentille ${fp > 0 ? "convergente" : "divergente"} a une distance focale $f'=${fp}$ cm. Un objet $AB$ de $${N(AB)}$ cm, perpendiculaire à l'axe, est placé en $\overline{OA}=${OA}$ cm. Calculer la position $\overline{OA'}$ de l'image, le grandissement $\gamma$ et la taille algébrique $\overline{A'B'}$. Faire la construction.`,
        reponses: [{ nom: R`\overline{OA'}`, unite: "cm", val: OAp, abs: 0.1 }, { nom: R`\gamma`, unite: "", val: g, abs: 0.02 }, { nom: R`\overline{A'B'}`, unite: "cm", val: g * AB, abs: 0.05 }],
        correction: [
          R`Relation de Descartes : $\dfrac1{\overline{OA'}}=\dfrac1{f'}+\dfrac1{\overline{OA}}=\dfrac1{${fp}}+\dfrac1{${OA}}\approx${N(1 / OAp)}$ cm$^{-1}$, d'où $\overline{OA'}\approx${N(OAp)}$ cm.`,
          R`$\gamma=\dfrac{\overline{OA'}}{\overline{OA}}\approx${N(g)}$ et $\overline{A'B'}=\gamma\,\overline{AB}\approx${N(g * AB)}$ cm.`,
          R`Image ${OAp > 0 ? "réelle (après la lentille)" : "virtuelle (avant la lentille)"}, ${g > 0 ? "droite" : "renversée"}, ${Math.abs(g) > 1 ? "agrandie" : "réduite"}.`,
          R`Construction : le rayon parallèle à l'axe ressort en passant par $F'$ (ou en semblant en venir), le rayon passant par $O$ n'est pas dévié ; ils se coupent en $B'$.`],
        figureCor: { svg: svgLentille(fp, OA, AB, OAp, g * AB), legende: "Construction de l'image (orange : rayon parallèle à l'axe ; vert : rayon passant par O ; pointillés : prolongements)." } };
    },
    function () {
      const n = rnd(1.45, 1.70, 0.01), type = pick(["biconvexe", "plan-convexe", "biconcave", "ménisque"]);
      let R1, R2;
      if (type === "biconvexe") { R1 = rnd(10, 40, 5); R2 = -rnd(10, 40, 5); }
      else if (type === "plan-convexe") { R1 = rnd(10, 40, 5); R2 = Infinity; }
      else if (type === "biconcave") { R1 = -rnd(10, 40, 5); R2 = rnd(10, 40, 5); }
      else { R1 = rnd(10, 20, 5); R2 = rnd(25, 50, 5); }
      const V = (n - 1) * (100 / R1 - (isFinite(R2) ? 100 / R2 : 0)), fp = 100 / V;
      return { titre: "Formule des opticiens",
        enonce: R`Une lentille mince ${type} est taillée dans un verre d'indice $n=${N(n)}$ ; ses rayons de courbure algébriques valent $R_1=${R1}$ cm et $R_2=${isFinite(R2) ? R2 + " cm" : "\\infty"}$ (face plane). Calculer sa vergence $V$ et sa distance focale image $f'$.`,
        reponses: [{ nom: "V", unite: "δ", val: V }, { nom: "f'", unite: "cm", val: fp }],
        correction: [
          R`Formule des opticiens : $V=(n-1)\left(\dfrac1{R_1}-\dfrac1{R_2}\right)$ avec les rayons en mètres.`,
          R`$V=${N(n - 1)}\times\left(\dfrac1{${N(R1 / 100)}}-${isFinite(R2) ? R`\dfrac1{${s(R2 / 100)}}` : "0"}\right)\approx${N(V)}$ δ : lentille ${V > 0 ? "convergente" : "divergente"}.`,
          R`$f'=\dfrac1V\approx${N(fp)}$ cm.`] };
    },
    function () {
      let f1, f2, e, OA, O1A1, O2A1;
      do { f1 = pick([5, 8, 10, 12]); f2 = pick([10, 15, 20, 25]); e = rnd(f1 + f2 + 5, f1 + f2 + 30, 5); OA = -rnd(Math.ceil(1.2 * f1), 4 * f1, 1); O1A1 = 1 / (1 / f1 + 1 / OA); O2A1 = O1A1 - e; }
      while (Math.abs(OA + f1) < 1 || Math.abs(O2A1 + f2) < 2 || Math.abs(O2A1) < 1);
      const g1 = O1A1 / OA, O2Ap = 1 / (1 / f2 + 1 / O2A1), g2 = O2Ap / O2A1;
      return { titre: "Association de deux lentilles",
        enonce: R`Deux lentilles convergentes $L_1$ ($f'_1=${f1}$ cm) et $L_2$ ($f'_2=${f2}$ cm) sont distantes de $e=${e}$ cm. Un objet est placé à $\overline{O_1A}=${OA}$ cm. Calculer la position $\overline{O_1A_1}$ de l'image intermédiaire, la position $\overline{O_2A'}$ de l'image finale et le grandissement total $\gamma$.`,
        reponses: [{ nom: R`\overline{O_1A_1}`, unite: "cm", val: O1A1, abs: 0.1 }, { nom: R`\overline{O_2A'}`, unite: "cm", val: O2Ap, abs: 0.1 }, { nom: R`\gamma`, unite: "", val: g1 * g2, abs: 0.02 }],
        correction: [
          R`Lentille $L_1$ : $\dfrac1{\overline{O_1A_1}}=\dfrac1{${f1}}+\dfrac1{${OA}}$, d'où $\overline{O_1A_1}\approx${N(O1A1)}$ cm et $\gamma_1\approx${N(g1)}$.`,
          R`Changement d'origine : $\overline{O_2A_1}=\overline{O_2O_1}+\overline{O_1A_1}=-${e}+${s(O1A1)}\approx${N(O2A1)}$ cm (objet ${O2A1 < 0 ? "réel" : "virtuel"} pour $L_2$).`,
          R`Lentille $L_2$ : $\dfrac1{\overline{O_2A'}}=\dfrac1{${f2}}+\dfrac1{${N(O2A1)}}$, d'où $\overline{O_2A'}\approx${N(O2Ap)}$ cm et $\gamma_2\approx${N(g2)}$.`,
          R`Grandissement total : $\gamma=\gamma_1\gamma_2\approx${N(g1 * g2)}$.`] };
    }
  ];

  Object.assign(window.EXO_TITRES, {
    opt1: "Chapitre 1 — Lois fondamentales", opt2: "Chapitre 2 — Formation des images", opt3: "Chapitre 3 — Prisme et lame",
    opt4: "Chapitre 4 — Miroirs et dioptres sphériques", opt5: "Chapitre 5 — Lentilles minces"
  });
})();
