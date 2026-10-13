/* Comptes rendus notés : ce que l'étudiant doit remplir.
   (Les valeurs attendues et les réponses des QCM sont uniquement sur le serveur de correction.)
   fill  : colonnes du tableau à calculer et remplir à la main, ligne par ligne
   plot  : graphe tracé à partir des valeurs remplies par l'étudiant (sans droite de régression)
   calc  : résultats à calculer
   qcm   : questions d'interprétation */
window.TPCR = {
  pendule: {
    parts: {
      A: { min: 5, fill: [{ k: "T", h: "T = t/n (s)" }], plot: { x: (r, f) => r.A, y: (r, f) => f.T, xl: "θ₀ (°)", yl: "T (s)" } },
      B: { min: 3, fill: [{ k: "T", h: "T = t/n (s)" }] },
      C: { min: 5, fill: [{ k: "T", h: "T = t/n (s)" }, { k: "T2", h: "T² (s²)" }], plot: { x: (r, f) => r.L, y: (r, f) => f.T2, xl: "L (m)", yl: "T² (s²)" } }
    },
    calc: [
      { k: "varA", h: "Partie A : variation relative de T entre la plus petite et la plus grande amplitude", u: "%" },
      { k: "pente", h: "Partie C : pente a de la droite T² = f(L)", u: "s²/m" },
      { k: "g", h: "Valeur de g déduite de la pente (g = 4π²/a)", u: "m/s²" },
      { k: "ecart", h: "Écart relatif entre ta valeur de g et 9,78 m/s²", u: "%" }
    ],
    qcm: [
      { q: "Pour les petites oscillations, la période du pendule simple dépend :", o: ["de la longueur L seulement (et de g)", "de la masse et de la longueur", "de l'amplitude θ₀", "de la masse seulement"] },
      { q: "Le graphe T² = f(L) est :", o: ["une parabole", "une droite passant par l'origine, de pente 4π²/g", "une droite de pente g", "une hyperbole"] },
      { q: "Quand l'amplitude dépasse une vingtaine de degrés, la période :", o: ["diminue", "reste rigoureusement constante", "augmente légèrement", "s'annule"] },
      { q: "On chronomètre 10 oscillations plutôt qu'une seule pour :", o: ["que le pendule s'arrête", "diviser par 10 l'erreur due au temps de réaction", "mesurer la fréquence", "obtenir une période dix fois plus grande"] },
      { q: "Si l'on double la masse suspendue (L et θ₀ inchangés), la période :", o: ["double", "est multipliée par √2", "ne change pas", "est divisée par 2"] }
    ]
  },
  ressort: {
    parts: {
      A: { min: 5, fill: [{ k: "F", h: "F = mg (N)" }, { k: "dl", h: "Δℓ = ℓ − ℓ₀ (cm)" }], plot: { x: (r, f) => f.dl, y: (r, f) => f.F, xl: "Δℓ (cm)", yl: "F (N)" } },
      B: { min: 4, fill: [{ k: "T", h: "T₀ = t/n (s)" }, { k: "T2", h: "T₀² (s²)" }], plot: { x: (r, f) => r.m / 1000, y: (r, f) => f.T2, xl: "m (kg)", yl: "T₀² (s²)" } }
    },
    calc: [
      { k: "kstat", h: "Raideur k par la méthode statique (pente de F = f(Δℓ), Δℓ en m)", u: "N/m" },
      { k: "kdyn", h: "Raideur k par la méthode dynamique (k = 4π²/pente de T₀² = f(m))", u: "N/m" },
      { k: "mr", h: "Masse du ressort déduite de l'ordonnée à l'origine (m_r = 3b/a)", u: "g" },
      { k: "ecart", h: "Écart relatif entre k dynamique et k statique", u: "%" }
    ],
    qcm: [
      { q: "La période d'oscillation du système masse-ressort :", o: ["dépend de l'amplitude", "ne dépend pas de l'amplitude", "dépend de g", "est proportionnelle à m"] },
      { q: "L'expression de la période propre est :", o: ["T₀ = 2π√(k/m)", "T₀ = 2π√(m/k)", "T₀ = 2πmk", "T₀ = √(m/k)"] },
      { q: "Si l'on multiplie la masse par 4, la période est :", o: ["multipliée par 4", "multipliée par 2", "divisée par 2", "inchangée"] },
      { q: "L'ordonnée à l'origine non nulle du graphe T₀² = f(m) s'explique par :", o: ["la masse du ressort", "les frottements", "l'erreur de lecture de la règle", "la valeur de g"] },
      { q: "À l'équilibre, l'allongement du ressort vaut :", o: ["Δℓ = k/(mg)", "Δℓ = mgk", "Δℓ = mg/k", "Δℓ = m/k"] }
    ]
  },
  torsion: {
    parts: {
      A: { min: 4, fill: [{ k: "d2", h: "d² (m²)" }, { k: "T", h: "T = t/n (s)" }, { k: "T2", h: "T² (s²)" }], plot: { x: (r, f) => f.d2, y: (r, f) => f.T2, xl: "d² (m²)", yl: "T² (s²)" } },
      B: { min: 4, fill: [{ k: "T", h: "T = t/n (s)" }, { k: "T2", h: "T² (s²)" }], plot: { x: (r, f) => r.L / 100, y: (r, f) => f.T2, xl: "ℓ (m)", yl: "T² (s²)" } }
    },
    calc: [
      { k: "pente", h: "Partie A : pente a de la droite T² = f(d²)", u: "s²/m²" },
      { k: "C", h: "Constante de torsion C = 8π²m/a (m = 0,2 kg)", u: "×10⁻³ N·m/rad" },
      { k: "J0", h: "Moment d'inertie de la barre J₀ = b·C/(4π²)", u: "×10⁻³ kg·m²" },
      { k: "penteB", h: "Partie B : pente de la droite T² = f(ℓ)", u: "s²/m" }
    ],
    qcm: [
      { q: "Le couple de rappel exercé par le fil de torsion est :", o: ["Γ = −Cθ", "Γ = −Cθ²", "Γ = −C/θ", "Γ = −C sin θ"] },
      { q: "La période du pendule de torsion :", o: ["dépend de l'amplitude dès 20°", "ne dépend pas de l'amplitude, même grande", "dépend de g", "dépend de la masse du fil seulement"] },
      { q: "Quand on éloigne les masses de l'axe, la période :", o: ["diminue", "augmente", "reste constante", "devient nulle"] },
      { q: "Si l'on double la longueur du fil, la constante de torsion C :", o: ["double", "est divisée par 2", "est inchangée", "est multipliée par 4"] },
      { q: "Le graphe T² = f(d²) est une droite car :", o: ["le moment d'inertie J = J₀ + 2md² est une fonction affine de d²", "C dépend de d", "la période est proportionnelle à d", "g intervient"] }
    ]
  },
  ohm: {
    parts: {
      A: { min: 6, fill: [{ k: "R", h: "U/I (Ω)" }], plot: { x: (r, f) => r.I, y: (r, f) => r.U, xl: "I (mA)", yl: "U (V)" } },
      B: { min: 4, fill: [{ k: "Rm", h: "R_mes = U/I (Ω)" }, { k: "Rc", h: "R corrigée (Ω)" }] },
      C: { min: 4, fill: [{ k: "Rm", h: "R_mes = U/I (Ω)" }] }
    },
    calc: [
      { k: "RX", h: "Résistance R_X déduite de la pente de U = f(I)", u: "Ω" },
      { k: "nom", h: "Valeur nominale de X lue avec le code des couleurs", u: "Ω" },
      { k: "ecart", h: "Écart relatif entre R_X mesurée et la valeur nominale", u: "%" },
      { k: "serie", h: "Résistance équivalente série calculée R₁ + R₂ (avec tes valeurs mesurées de R₁ et R₂)", u: "Ω" },
      { k: "para", h: "Résistance équivalente parallèle calculée R₁R₂/(R₁+R₂)", u: "Ω" }
    ],
    qcm: [
      { q: "Pour mesurer une petite résistance (22 Ω), le montage le plus juste est :", o: ["le montage amont (longue dérivation)", "le montage aval (courte dérivation)", "les deux sont équivalents", "aucun des deux"] },
      { q: "En montage amont, la résistance mesurée U/I vaut :", o: ["R + r_A", "R − r_A", "R·R_V/(R + R_V)", "R exactement"] },
      { q: "L'ampèremètre se branche :", o: ["en dérivation", "en série", "aux bornes du générateur", "indifféremment"] },
      { q: "La caractéristique d'un conducteur ohmique est :", o: ["une droite passant par l'origine", "une parabole", "une courbe exponentielle", "une droite horizontale"] },
      { q: "Un résistor de 22 Ω (0,5 W) supporte au maximum une tension d'environ :", o: ["12 V", "1 V", "3,3 V", "22 V"] }
    ]
  },
  refraction: {
    parts: {
      A: { min: 6, fill: [{ k: "si", h: "sin i" }, { k: "sr", h: "sin r" }], plot: { x: (r, f) => f.sr, y: (r, f) => f.si, xl: "sin r", yl: "sin i" } },
      B: { min: 5, fill: [{ k: "si", h: "sin i" }, { k: "sr", h: "sin r" }], plot: { x: (r, f) => f.si, y: (r, f) => f.sr, xl: "sin i", yl: "sin r" } },
      C: { min: 3, fill: [{ k: "n", h: "n = 1/sin λ" }] }
    },
    calc: [
      { k: "nA", h: "Indice n déduit de la partie A (pente de sin i = f(sin r))", u: "" },
      { k: "nB", h: "Indice n déduit de la partie B (pente de sin r = f(sin i))", u: "" },
      { k: "lam", h: "Angle limite moyen λ", u: "°" },
      { k: "nC", h: "Indice n déduit de l'angle limite moyen", u: "" }
    ],
    qcm: [
      { q: "La loi de Snell-Descartes pour la réfraction s'écrit :", o: ["n₁ cos i₁ = n₂ cos i₂", "n₁ sin i₁ = n₂ sin i₂", "n₁ i₁ = n₂ i₂", "sin i₁ = sin i₂"] },
      { q: "Le rayon n'est pas dévié en traversant la face courbe du demi-cylindre car :", o: ["il arrive selon un rayon du cercle, donc selon la normale", "le plexiglas est transparent", "l'indice de l'air vaut 1", "la face courbe est polie"] },
      { q: "La réflexion totale est possible quand la lumière passe :", o: ["de l'air au plexiglas", "du plexiglas à l'air", "dans les deux sens", "jamais"] },
      { q: "L'angle limite λ vérifie :", o: ["sin λ = n", "sin λ = 1/n", "cos λ = 1/n", "λ = 90°"] },
      { q: "Quand l'angle d'incidence approche l'angle limite, le rayon réfracté :", o: ["devient plus lumineux", "faiblit et rase la surface", "se rapproche de la normale", "n'est pas modifié"] }
    ]
  },
  lentilles: {
    parts: {
      A: { min: 3, fill: [{ k: "f", h: "f′ = OA (cm)" }] },
      B: { min: 5, fill: [{ k: "x", h: "1/OA (δ)" }, { k: "y", h: "1/OA′ (δ)" }], plot: { x: (r, f) => f.x, y: (r, f) => f.y, xl: "1/OA (δ)", yl: "1/OA′ (δ)" } },
      C: { min: 2, fill: [{ k: "d", h: "d = x₂ − x₁ (cm)" }, { k: "f", h: "f′ = (D² − d²)/4D (cm)" }] }
    },
    calc: [
      { k: "fA", h: "f′ par autocollimation (moyenne)", u: "cm" },
      { k: "V", h: "Vergence V : ordonnée à l'origine de 1/OA′ = f(1/OA)", u: "δ" },
      { k: "fB", h: "f′ par les plans conjugués (f′ = 1/V)", u: "cm" },
      { k: "fC", h: "f′ par la méthode de Bessel (moyenne)", u: "cm" }
    ],
    qcm: [
      { q: "En autocollimation, l'image nette se forme dans le plan de l'objet lorsque :", o: ["l'objet est au foyer objet de la lentille", "l'objet est à 2f′", "le miroir est au foyer image", "la lentille touche l'objet"] },
      { q: "La relation de conjugaison d'une lentille mince s'écrit :", o: ["1/OA + 1/OA′ = 1/f′", "1/OA′ − 1/OA = 1/f′", "OA′ − OA = f′", "OA · OA′ = f′²"] },
      { q: "La méthode de Bessel n'est possible que si :", o: ["D < 4f′", "D > 4f′", "D = 2f′", "d > D"] },
      { q: "Le graphe 1/OA′ = f(1/OA) est une droite de pente :", o: ["f′", "−1", "1", "1/f′"] },
      { q: "L'avantage de la méthode de Bessel est :", o: ["elle ne nécessite pas de repérer précisément le centre optique", "elle ne nécessite pas d'écran", "elle donne l'image à l'infini", "elle fonctionne avec une lentille divergente"] }
    ]
  },
  microscope: {
    parts: {
      A: { min: 5, fill: [{ k: "g", h: "|γ₁| = A₁B₁/AB" }], plot: { x: (r, f) => r.v, y: (r, f) => f.g, xl: "O₁A₁ (cm)", yl: "|γ₁|" } },
      B: { min: 4, fill: [{ k: "P", h: "P = α′/AB (δ)" }, { k: "G", h: "G_c = P/4" }], plot: { x: (r, f) => r.g1, y: (r, f) => f.P, xl: "|γ₁|", yl: "P (δ)" } }
    },
    calc: [
      { k: "pente", h: "Partie A : pente de la droite |γ₁| = f(O₁A₁)", u: "cm⁻¹" },
      { k: "f1", h: "Distance focale de l'objectif f₁", u: "cm" },
      { k: "f2", h: "Distance focale de l'oculaire f₂ (pente de P = f(|γ₁|))", u: "cm" },
      { k: "G5", h: "Grossissement commercial pour |γ₁| = 5", u: "" }
    ],
    qcm: [
      { q: "L'objectif d'un microscope donne de l'objet une image :", o: ["virtuelle et réduite", "réelle et agrandie", "réelle et réduite", "à l'infini"] },
      { q: "Pour une observation sans fatigue (œil au repos), l'image intermédiaire A₁B₁ doit être :", o: ["au foyer image de l'objectif", "au foyer objet de l'oculaire", "sur l'oculaire", "à 25 cm de l'œil"] },
      { q: "La puissance du microscope (image à l'infini) vaut :", o: ["P = |γ₁|/f₂", "P = |γ₁|·f₂", "P = f₁/f₂", "P = 1/(f₁ + f₂)"] },
      { q: "Le grossissement commercial est défini par :", o: ["G_c = 4P", "G_c = P", "G_c = P/4", "G_c = 1/P"] },
      { q: "Pour augmenter le grossissement d'un microscope, on peut :", o: ["utiliser un objectif de plus grande focale", "utiliser un oculaire de plus courte focale", "éloigner l'œil", "réduire la lumière"] }
    ]
  }
};

/* Colonnes des mesures brutes (relevées sur la paillasse) et arrondis appliqués à l'enregistrement.
   r : arrondi par champ (nombre de décimales, ou "s4" = 4 chiffres significatifs) */
(function () {
  const fr = (x, d) => (x == null || !isFinite(x)) ? "—" : (+x).toFixed(d).replace(".", ",");
  const s4 = x => (x == null || !isFinite(x)) ? "—" : String(+(+x).toPrecision(4)).replace(".", ",");
  const RAW = {
    pendule: {
      A: { cols: ["n°", "L (cm)", "θ₀ (°)", "n", "t (s)"], cells: (r, i) => [i + 1, fr(r.L * 100, 1), r.A, r.n, fr(r.t, 2)], r: { L: 3, t: 2 }, titre: "Isochronisme des petites oscillations" },
      B: { cols: ["n°", "m (g)", "L (cm)", "θ₀ (°)", "n", "t (s)"], cells: (r, i) => [i + 1, r.m, fr(r.L * 100, 1), r.A, r.n, fr(r.t, 2)], r: { L: 3, t: 2 }, titre: "Influence de la masse" },
      C: { cols: ["n°", "L (m)", "θ₀ (°)", "n", "t (s)"], cells: (r, i) => [i + 1, fr(r.L, 3), r.A, r.n, fr(r.t, 2)], r: { L: 3, t: 2 }, titre: "Influence de la longueur — mesure de g" }
    },
    ressort: {
      A: { cols: ["n°", "m (g)", "ℓ₀ (cm)", "ℓ (cm)"], cells: (r, i) => [i + 1, r.m, fr(r.l0, 1), fr(r.l, 1)], r: { l: 1, l0: 1 }, titre: "Méthode statique (loi de Hooke)" },
      B: { cols: ["n°", "m (g)", "X₀ (cm)", "n", "t (s)"], cells: (r, i) => [i + 1, r.m, fr(r.X, 1), r.n, fr(r.t, 2)], r: { t: 2, X: 1 }, titre: "Méthode dynamique (période)" }
    },
    torsion: {
      A: { cols: ["n°", "ℓ (cm)", "d (cm)", "n", "t (s)"], cells: (r, i) => [i + 1, r.L, fr(r.d, 1), r.n, fr(r.t, 2)], r: { t: 2, d: 1 }, titre: "Détermination de C et J₀ (ℓ fixée)" },
      B: { cols: ["n°", "ℓ (cm)", "d (cm)", "n", "t (s)"], cells: (r, i) => [i + 1, r.L, fr(r.d, 1), r.n, fr(r.t, 2)], r: { t: 2, d: 1 }, titre: "Influence de la longueur du fil (d fixée)" }
    },
    ohm: {
      A: { cols: ["n°", "U (V)", "I (mA)"], cells: (r, i) => [i + 1, fr(r.U, 2), s4(r.I)], r: { U: 2, I: "s4" }, titre: "Caractéristique U = f(I) du résistor X" },
      B: { cols: ["n°", "Résistor", "Montage", "U (V)", "I (mA)"], cells: (r, i) => [i + 1, r.nom, r.mont, fr(r.U, 2), s4(r.I)], r: { U: 2, I: "s4" }, titre: "Montage amont ou aval ?" },
      C: { cols: ["n°", "Dipôle", "U (V)", "I (mA)"], cells: (r, i) => [i + 1, r.nom, fr(r.U, 2), s4(r.I)], r: { U: 2, I: "s4" }, titre: "Associations de résistances" }
    },
    refraction: {
      A: { cols: ["n°", "i (°)", "r (°)"], cells: (r, i) => [i + 1, fr(r.i, 1), fr(r.r, 1)], r: { i: 1, r: 1 }, titre: "Air → plexiglas" },
      B: { cols: ["n°", "i (°)", "r (°)"], cells: (r, i) => [i + 1, fr(r.i, 1), fr(r.r, 1)], r: { i: 1, r: 1 }, titre: "Plexiglas → air" },
      C: { cols: ["n°", "λ (°)"], cells: (r, i) => [i + 1, fr(r.l, 1)], r: { l: 1 }, titre: "Angle limite" }
    },
    lentilles: {
      A: { cols: ["n°", "Objet (cm)", "Lentille (cm)"], cells: (r, i) => [i + 1, "5,0", fr(r.xl, 1)], r: { xl: 1 }, titre: "Autocollimation" },
      B: { cols: ["n°", "OA (cm)", "OA′ (cm)"], cells: (r, i) => [i + 1, fr(r.OA, 1), fr(r.OAp, 1)], r: { OA: 1, OAp: 1 }, titre: "Plans conjugués" },
      C: { cols: ["n°", "D (cm)", "x₁ (cm)", "x₂ (cm)"], cells: (r, i) => [i + 1, fr(r.D, 0), fr(r.x1, 1), fr(r.x2, 1)], r: { x1: 1, x2: 1 }, titre: "Méthode de Bessel" }
    },
    microscope: {
      A: { cols: ["n°", "O₁A (cm)", "O₁A₁ (cm)", "A₁B₁ (mm)"], cells: (r, i) => [i + 1, fr(-r.s, 2), fr(r.v, 1), fr(r.ab1, 1)], r: { s: 2, v: 1, ab1: 1 }, titre: "Image intermédiaire — focale de l'objectif" },
      B: { cols: ["n°", "|γ₁|", "α′ (mrad)"], cells: (r, i) => [i + 1, fr(r.g1, 2), fr(r.a * 1000, 1)], r: { g1: 2, a: 4 }, titre: "Microscope complet — puissance et grossissement" }
    }
  };
  Object.keys(RAW).forEach(k => Object.keys(RAW[k]).forEach(p => Object.assign(window.TPCR[k].parts[p], RAW[k][p])));
  window.TPCR_PARAMS = { ressort: "ressort_par", torsion: "torsion_par", ohm: "ohm_par", refraction: "refr_par", lentilles: "lent_par", microscope: "micro_par" };
})();
