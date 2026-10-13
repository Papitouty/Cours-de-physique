window.QUIZ={
"meca1": {
"course": "Mécanique",
"title": "Chapitre 1 — Calcul vectoriel",
"qs": [
{
"q": "Quelle est la norme du vecteur $\\vec u=(1\\,;\\,2\\,;\\,2)$ ?",
"c": [
"$5$",
"$3$",
"$\\sqrt5$",
"$9$"
],
"a": 1,
"e": "$\\|\\vec u\\|=\\sqrt{1^2+2^2+2^2}=\\sqrt9=3$.",
"s": "Composantes et cosinus directeurs"
},
{
"q": "Les vecteurs $\\vec u=(1\\,;\\,2\\,;\\,-1)$ et $\\vec v=(3\\,;\\,0\\,;\\,3)$ sont :",
"c": [
"colinéaires",
"orthogonaux",
"de même norme",
"unitaires"
],
"a": 1,
"e": "$\\vec u\\cdot\\vec v=1\\times3+2\\times0+(-1)\\times3=0$ : le produit scalaire est nul, les vecteurs sont orthogonaux.",
"s": "Produit scalaire"
},
{
"q": "Dans une base orthonormée directe, $\\vec j\\wedge\\vec i$ vaut :",
"c": [
"$\\vec k$",
"$-\\vec k$",
"$\\vec 0$",
"$1$"
],
"a": 1,
"e": "$\\vec i\\wedge\\vec j=\\vec k$ et le produit vectoriel est antisymétrique : $\\vec j\\wedge\\vec i=-\\vec i\\wedge\\vec j=-\\vec k$.",
"s": "Produit vectoriel"
},
{
"q": "Pour $\\vec u=(2\\,;\\,-1\\,;\\,0)$ et $\\vec v=(1\\,;\\,1\\,;\\,1)$, le produit vectoriel $\\vec u\\wedge\\vec v$ vaut :",
"c": [
"$(-1\\,;\\,-2\\,;\\,3)$",
"$(1\\,;\\,2\\,;\\,-3)$",
"$(-1\\,;\\,2\\,;\\,3)$",
"$(0\\,;\\,-2\\,;\\,3)$"
],
"a": 0,
"e": "$\\vec u\\wedge\\vec v=(u_yv_z-u_zv_y\\,;\\,u_zv_x-u_xv_z\\,;\\,u_xv_y-u_yv_x)=(-1-0\\,;\\,0-2\\,;\\,2+1)=(-1\\,;\\,-2\\,;\\,3)$.",
"s": "Produit vectoriel"
},
{
"q": "La norme $\\|\\vec u\\wedge\\vec v\\|$ représente :",
"c": [
"le produit des normes",
"l'aire du parallélogramme construit sur $\\vec u$ et $\\vec v$",
"le volume d'un parallélépipède",
"la projection de $\\vec u$ sur $\\vec v$"
],
"a": 1,
"e": "$\\|\\vec u\\wedge\\vec v\\|=\\|\\vec u\\|\\,\\|\\vec v\\|\\,|\\sin\\theta|$ : c'est l'aire du parallélogramme de côtés $\\vec u$ et $\\vec v$.",
"s": "Produit vectoriel"
},
{
"q": "Que vaut $\\vec u\\wedge\\vec u$ ?",
"c": [
"$\\|\\vec u\\|^2$",
"$\\vec 0$",
"$\\vec u$",
"$1$"
],
"a": 1,
"e": "Deux vecteurs colinéaires ont un produit vectoriel nul ($\\sin 0=0$).",
"s": "Produit vectoriel"
},
{
"q": "Le produit mixte $(\\vec u,\\vec v,\\vec w)=(\\vec u\\wedge\\vec v)\\cdot\\vec w$ est nul lorsque :",
"c": [
"les trois vecteurs sont unitaires",
"les trois vecteurs sont coplanaires",
"les trois vecteurs sont orthogonaux deux à deux",
"jamais"
],
"a": 1,
"e": "Le produit mixte donne le volume (algébrique) du parallélépipède construit sur les trois vecteurs ; il est nul s'ils sont dans un même plan.",
"s": "Produit mixte"
},
{
"q": "Les cosinus directeurs d'un vecteur vérifient toujours :",
"c": [
"$\\cos\\alpha+\\cos\\beta+\\cos\\gamma=1$",
"$\\cos^2\\alpha+\\cos^2\\beta+\\cos^2\\gamma=1$",
"$\\cos\\alpha\\cos\\beta\\cos\\gamma=1$",
"$\\cos^2\\alpha+\\cos^2\\beta+\\cos^2\\gamma=3$"
],
"a": 1,
"e": "Ce sont les composantes du vecteur unitaire $\\vec u/\\|\\vec u\\|$, dont la norme vaut $1$.",
"s": "Composantes et cosinus directeurs"
},
{
"q": "Un vecteur $\\vec u(t)$ de norme constante est, à chaque instant :",
"c": [
"colinéaire à sa dérivée",
"orthogonal à sa dérivée",
"constant",
"nul"
],
"a": 1,
"e": "$\\vec u\\cdot\\vec u=\\text{cste}$ ; en dérivant : $2\\,\\vec u\\cdot\\dfrac{\\dd\\vec u}{\\dd t}=0$.",
"s": "Dérivée d'un vecteur"
},
{
"q": "Le moment en $O$ d'une force $\\vec F$ appliquée en $A$, $\\vec{\\mathcal M}_O=\\vec{OA}\\wedge\\vec F$, est nul lorsque :",
"c": [
"$\\vec F$ est perpendiculaire à $\\vec{OA}$",
"la droite d'action de $\\vec F$ passe par $O$",
"$\\|\\vec F\\|=1$",
"$O$ est l'origine du repère"
],
"a": 1,
"e": "Si la droite d'action passe par $O$, $\\vec{OA}$ et $\\vec F$ sont colinéaires et leur produit vectoriel est nul.",
"s": "Moment d'un vecteur"
}
]
},
"meca2": {
"course": "Mécanique",
"title": "Chapitre 2 — Cinématique du point",
"qs": [
{
"q": "Un point se déplace selon $x(t)=3t^2-2t$ (SI). Sa vitesse à $t=1$ s vaut :",
"c": [
"$1$ m/s",
"$4$ m/s",
"$6$ m/s",
"$-2$ m/s"
],
"a": 1,
"e": "$v=\\dfrac{\\dd x}{\\dd t}=6t-2$, donc $v(1)=4$ m/s.",
"s": "Mouvement rectiligne"
},
{
"q": "Le mouvement est décéléré (ralenti) lorsque :",
"c": [
"$a<0$",
"$\\vec a\\cdot\\vec v<0$",
"$v<0$",
"$\\vec a=\\vec 0$"
],
"a": 1,
"e": "Il faut comparer les sens de $\\vec a$ et $\\vec v$ : la norme de la vitesse diminue si $\\vec a\\cdot\\vec v<0$, quel que soit le signe de $a$ seul.",
"s": "Mouvement rectiligne"
},
{
"q": "Dans la base de Frenet, l'accélération normale vaut :",
"c": [
"$\\dfrac{\\dd v}{\\dd t}$",
"$\\dfrac{v^2}{R}$",
"$vR$",
"$\\dfrac{R}{v^2}$"
],
"a": 1,
"e": "$\\vec a=\\dfrac{\\dd v}{\\dd t}\\,\\vec u_T+\\dfrac{v^2}{R}\\,\\vec u_N$, où $R$ est le rayon de courbure.",
"s": "Coordonnées intrinsèques (base de Frenet)"
},
{
"q": "Dans un mouvement circulaire uniforme, l'accélération est :",
"c": [
"nulle",
"tangente à la trajectoire",
"dirigée vers le centre (centripète)",
"dirigée vers l'extérieur"
],
"a": 2,
"e": "$v$ est constant donc $a_T=0$ ; il reste $a_N=v^2/R$, dirigée vers le centre.",
"s": "Coordonnées intrinsèques (base de Frenet)"
},
{
"q": "En coordonnées polaires, la vitesse s'écrit :",
"c": [
"$\\dot r\\,\\vec u_r$",
"$\\dot r\\,\\vec u_r+r\\dot\\theta\\,\\vec u_\\theta$",
"$r\\dot\\theta\\,\\vec u_r+\\dot r\\,\\vec u_\\theta$",
"$\\dot r\\,\\vec u_r+\\dot\\theta\\,\\vec u_\\theta$"
],
"a": 1,
"e": "$\\vec{OM}=r\\,\\vec u_r$ et $\\dfrac{\\dd\\vec u_r}{\\dd t}=\\dot\\theta\\,\\vec u_\\theta$, d'où $\\vec v=\\dot r\\,\\vec u_r+r\\dot\\theta\\,\\vec u_\\theta$.",
"s": "Coordonnées polaires"
},
{
"q": "La composante radiale de l'accélération en coordonnées polaires est :",
"c": [
"$\\ddot r$",
"$\\ddot r-r\\dot\\theta^2$",
"$2\\dot r\\dot\\theta+r\\ddot\\theta$",
"$r\\ddot\\theta$"
],
"a": 1,
"e": "$\\vec a=(\\ddot r-r\\dot\\theta^2)\\,\\vec u_r+(2\\dot r\\dot\\theta+r\\ddot\\theta)\\,\\vec u_\\theta$.",
"s": "Coordonnées polaires"
},
{
"q": "En coordonnées cylindriques $(\\rho,\\varphi,z)$, le vecteur position s'écrit :",
"c": [
"$\\rho\\,\\vec u_\\rho+z\\,\\vec k$",
"$\\rho\\,\\vec u_\\rho+\\varphi\\,\\vec u_\\varphi+z\\,\\vec k$",
"$r\\,\\vec u_r$",
"$\\rho\\,\\vec u_\\varphi+z\\,\\vec k$"
],
"a": 0,
"e": "$\\vec{OM}=\\rho\\,\\vec u_\\rho+z\\,\\vec k$ : il n'y a pas de composante selon $\\vec u_\\varphi$.",
"s": "Coordonnées cylindriques"
},
{
"q": "Un point a pour coordonnées $x=2t$ et $y=t^2-1$. Sa trajectoire est :",
"c": [
"une droite",
"un cercle",
"la parabole $y=\\dfrac{x^2}{4}-1$",
"une hyperbole"
],
"a": 2,
"e": "On élimine le temps : $t=x/2$, donc $y=\\dfrac{x^2}{4}-1$.",
"s": "Coordonnées cartésiennes"
},
{
"q": "Un passager marche à $1$ m/s vers l'avant d'un train qui roule à $20$ m/s (translation). Sa vitesse par rapport au sol vaut :",
"c": [
"$19$ m/s",
"$20$ m/s",
"$21$ m/s",
"$\\sqrt{401}$ m/s"
],
"a": 2,
"e": "Composition des vitesses : $\\vec v_a=\\vec v_r+\\vec v_e$, avec deux vitesses de même sens : $1+20=21$ m/s.",
"s": "Mouvement relatif"
},
{
"q": "Le vecteur vitesse est toujours :",
"c": [
"dirigé vers le centre de courbure",
"tangent à la trajectoire",
"perpendiculaire à la trajectoire",
"parallèle à l'accélération"
],
"a": 1,
"e": "$\\vec v=v\\,\\vec u_T$ : la vitesse est portée par la tangente à la trajectoire.",
"s": "Mouvement curviligne"
}
]
},
"meca3": {
"course": "Mécanique",
"title": "Chapitre 3 — Dynamique du point matériel",
"qs": [
{
"q": "Selon le principe d'inertie, dans un référentiel galiléen, un point isolé est :",
"c": [
"toujours immobile",
"au repos ou en mouvement rectiligne uniforme",
"en mouvement circulaire uniforme",
"uniformément accéléré"
],
"a": 1,
"e": "Un point isolé (ou pseudo-isolé) a une vitesse constante : repos ou mouvement rectiligne uniforme.",
"s": "Première loi de Newton"
},
{
"q": "Le principe fondamental de la dynamique s'écrit :",
"c": [
"$\\vec p=\\sum\\vec F$",
"$\\dfrac{\\dd\\vec p}{\\dd t}=\\sum\\vec F$",
"$m\\vec v=\\sum\\vec F$",
"$\\sum\\vec F=\\vec 0$"
],
"a": 1,
"e": "La dérivée de la quantité de mouvement $\\vec p=m\\vec v$ est égale à la somme des forces ; à masse constante, $m\\vec a=\\sum\\vec F$.",
"s": "Deuxième loi de Newton"
},
{
"q": "Les forces d'action et de réaction (troisième loi) :",
"c": [
"s'annulent toujours",
"s'exercent sur deux corps différents",
"ont des intensités différentes",
"s'exercent sur le même corps"
],
"a": 1,
"e": "$\\vec F_{A/B}=-\\vec F_{B/A}$ ; comme elles s'appliquent à des corps différents, elles ne s'annulent pas dans le bilan d'un seul corps.",
"s": "Troisième loi de Newton"
},
{
"q": "Un solide glisse sans frottement sur un plan incliné d'angle $\\alpha$. Son accélération vaut :",
"c": [
"$g$",
"$g\\cos\\alpha$",
"$g\\sin\\alpha$",
"$g\\tan\\alpha$"
],
"a": 2,
"e": "La réaction est perpendiculaire au plan ; seule la composante du poids parallèle au plan, $mg\\sin\\alpha$, met le solide en mouvement.",
"s": "Quelques lois de forces"
},
{
"q": "Un bloc reste immobile sur un plan incliné (coefficient de frottement statique $\\mu_s$) tant que :",
"c": [
"$\\tan\\alpha\\le\\mu_s$",
"$\\sin\\alpha\\le\\mu_s$",
"$\\cos\\alpha\\le\\mu_s$",
"$\\alpha\\le\\mu_s$"
],
"a": 0,
"e": "À l'équilibre, $T=mg\\sin\\alpha$ et $N=mg\\cos\\alpha$ ; la condition $T\\le\\mu_sN$ donne $\\tan\\alpha\\le\\mu_s$.",
"s": "Forces de frottement"
},
{
"q": "À l'altitude $h$, le champ de pesanteur vaut $g(h)=g_0\\dfrac{R_T^2}{(R_T+h)^2}$. À $h=R_T$, il vaut :",
"c": [
"$g_0/2$",
"$g_0/4$",
"$2g_0$",
"$g_0$"
],
"a": 1,
"e": "$g(R_T)=g_0\\dfrac{R_T^2}{(2R_T)^2}=\\dfrac{g_0}{4}$.",
"s": "Quelques lois de forces"
},
{
"q": "Le moment cinétique en $O$ d'un point de masse $m$ est :",
"c": [
"$\\vec L_O=m\\vec v\\wedge\\vec{OM}$",
"$\\vec L_O=\\vec{OM}\\wedge m\\vec v$",
"$\\vec L_O=\\vec{OM}\\cdot m\\vec v$",
"$\\vec L_O=m\\,\\vec{OM}$"
],
"a": 1,
"e": "$\\vec L_O=\\vec{OM}\\wedge\\vec p$, et le théorème du moment cinétique s'écrit $\\dfrac{\\dd\\vec L_O}{\\dd t}=\\vec{\\mathcal M}_O(\\vec F)$.",
"s": "Le moment cinétique"
},
{
"q": "Sous l'action d'une force centrale de centre $O$, on peut affirmer que :",
"c": [
"la vitesse est constante",
"le moment cinétique en $O$ est conservé et le mouvement est plan",
"la trajectoire est un cercle",
"l'énergie cinétique est constante"
],
"a": 1,
"e": "Le moment d'une force centrale en $O$ est nul, donc $\\vec L_O$ est constant : le mouvement est plan et suit la loi des aires.",
"s": "Les forces centrales"
},
{
"q": "Une masse $m=0{,}5$ kg est attachée à un ressort de raideur $k=50$ N/m. La pulsation propre vaut :",
"c": [
"$100$ rad/s",
"$10$ rad/s",
"$25$ rad/s",
"$0{,}1$ rad/s"
],
"a": 1,
"e": "$m\\ddot x+kx=0$ donne $\\omega_0=\\sqrt{k/m}=\\sqrt{100}=10$ rad/s (période $T_0=2\\pi/\\omega_0\\approx0{,}63$ s).",
"s": "Les équations différentielles du mouvement"
},
{
"q": "Un corps tombe avec un frottement fluide $\\vec f=-k\\vec v$. Sa vitesse limite vaut :",
"c": [
"$\\dfrac{k}{mg}$",
"$\\dfrac{mg}{k}$",
"$\\sqrt{\\dfrac{mg}{k}}$",
"$mgk$"
],
"a": 1,
"e": "La vitesse limite est atteinte quand l'accélération s'annule : $mg=kv_\\ell$, d'où $v_\\ell=mg/k$.",
"s": "Forces de frottement"
}
]
},
"meca4": {
"course": "Mécanique",
"title": "Chapitre 4 — Travail et énergie",
"qs": [
{
"q": "Une force constante de $10$ N déplace son point d'application de $5$ m, l'angle entre la force et le déplacement valant $60^\\circ$. Le travail vaut :",
"c": [
"$50$ J",
"$25$ J",
"$43$ J",
"$0$ J"
],
"a": 1,
"e": "$W=F\\,AB\\cos\\alpha=10\\times5\\times0{,}5=25$ J.",
"s": "Travail d'une force"
},
{
"q": "Le travail du poids entre $A$ et $B$ vaut :",
"c": [
"$mg(z_B-z_A)$",
"$mg(z_A-z_B)$",
"$mg\\,AB$",
"il dépend du chemin suivi"
],
"a": 1,
"e": "$W_{A\\to B}(\\vec P)=mg(z_A-z_B)$ (axe $z$ vers le haut) : il est positif à la descente et ne dépend pas du chemin.",
"s": "Travail de quelques forces usuelles"
},
{
"q": "La réaction normale d'un support fixe sans frottement :",
"c": [
"a un travail toujours positif",
"a un travail nul",
"a un travail toujours négatif",
"a un travail égal à $-mgh$"
],
"a": 1,
"e": "Elle est perpendiculaire au déplacement à chaque instant : $\\vec N\\cdot\\vec{\\dd\\ell}=0$.",
"s": "Travail de quelques forces usuelles"
},
{
"q": "La puissance d'une force $\\vec F$ appliquée à un point de vitesse $\\vec v$ est :",
"c": [
"$\\vec F\\wedge\\vec v$",
"$\\vec F\\cdot\\vec v$",
"$F/v$",
"$\\tfrac12 Fv^2$"
],
"a": 1,
"e": "$\\mathcal P=\\dfrac{\\delta W}{\\dd t}=\\vec F\\cdot\\vec v$, en watts.",
"s": "Puissance d'une force"
},
{
"q": "Le théorème de l'énergie cinétique s'écrit :",
"c": [
"$\\Delta E_c=\\sum W(\\vec F)$",
"$\\Delta E_c=0$",
"$E_c=\\sum\\vec F$",
"$\\Delta E_c=-\\Delta E_p$ toujours"
],
"a": 0,
"e": "La variation d'énergie cinétique est égale à la somme des travaux de toutes les forces (conservatives ou non).",
"s": "Énergie cinétique"
},
{
"q": "Une force est conservative si :",
"c": [
"son travail est toujours nul",
"son travail ne dépend pas du chemin suivi",
"elle est constante",
"elle est perpendiculaire à la vitesse"
],
"a": 1,
"e": "Son travail ne dépend que des points de départ et d'arrivée ; elle dérive alors d'une énergie potentielle : $\\vec F=-\\overrightarrow{\\text{grad}}\\,E_p$.",
"s": "Forces conservatives et énergie potentielle"
},
{
"q": "Un ressort de raideur $k=200$ N/m est allongé de $10$ cm. Son énergie potentielle élastique vaut :",
"c": [
"$20$ J",
"$1$ J",
"$2$ J",
"$10$ J"
],
"a": 1,
"e": "$E_p=\\tfrac12kx^2=\\tfrac12\\times200\\times(0{,}1)^2=1$ J.",
"s": "Forces conservatives et énergie potentielle"
},
{
"q": "Un objet lâché sans vitesse tombe de $5$ m (frottements négligés, $g=9{,}8$ m/s²). Sa vitesse en bas vaut environ :",
"c": [
"$49$ m/s",
"$9{,}9$ m/s",
"$7$ m/s",
"$98$ m/s"
],
"a": 1,
"e": "Conservation de l'énergie mécanique : $mgh=\\tfrac12mv^2$, d'où $v=\\sqrt{2gh}=\\sqrt{98}\\approx9{,}9$ m/s.",
"s": "Énergie mécanique"
},
{
"q": "En présence de frottements, l'énergie mécanique :",
"c": [
"reste constante",
"diminue",
"augmente",
"s'annule"
],
"a": 1,
"e": "$\\Delta E_m=W(\\text{forces non conservatives})<0$ : les frottements dissipent de l'énergie.",
"s": "Énergie mécanique"
},
{
"q": "Une position d'équilibre stable correspond à :",
"c": [
"un maximum de $E_p$",
"un minimum de $E_p$",
"un point où $E_p=0$",
"un point d'inflexion de $E_p$"
],
"a": 1,
"e": "À l'équilibre $\\dfrac{\\dd E_p}{\\dd x}=0$ ; il est stable si $\\dfrac{\\dd^2E_p}{\\dd x^2}>0$ (minimum) : la force ramène le point vers l'équilibre.",
"s": "Équilibre et stabilité"
}
]
},
"elec1": {
"course": "Électricité",
"title": "Chapitre 1 — Charge et loi de Coulomb",
"qs": [
{
"q": "La charge d'un corps est toujours de la forme $q=\\pm ne$. Une charge de $1{,}0\\times10^{-19}$ C est-elle possible ?",
"c": [
"oui",
"non, car elle est plus petite que $e$",
"oui, si le corps est isolant",
"oui, si le corps est conducteur"
],
"a": 1,
"e": "La charge est quantifiée : $1{,}0\\times10^{-19}$ C n'est pas un multiple entier de $e=1{,}6\\times10^{-19}$ C.",
"s": "La charge électrique"
},
{
"q": "Combien d'électrons un corps de charge $-1\\ \\mu$C a-t-il gagnés ?",
"c": [
"$1{,}6\\times10^{13}$",
"$6{,}25\\times10^{12}$",
"$6{,}25\\times10^{18}$",
"$1{,}6\\times10^{-13}$"
],
"a": 1,
"e": "$n=|q|/e=10^{-6}/1{,}6\\times10^{-19}=6{,}25\\times10^{12}$ électrons.",
"s": "La charge électrique"
},
{
"q": "Deux sphères conductrices identiques portant $+6\\ \\mu$C et $-2\\ \\mu$C sont mises en contact puis séparées. Chacune porte alors :",
"c": [
"$+4\\ \\mu$C",
"$+2\\ \\mu$C",
"$+3\\ \\mu$C et $-1\\ \\mu$C",
"$0$"
],
"a": 1,
"e": "La charge totale $+4\\ \\mu$C se partage également : $q'=\\dfrac{q_1+q_2}{2}=+2\\ \\mu$C.",
"s": "Électrisation de la matière"
},
{
"q": "Lors de l'électrisation par influence :",
"c": [
"il y a contact entre les corps",
"les charges se redistribuent sans contact",
"le corps influencé perd toujours des électrons",
"la charge totale n'est pas conservée"
],
"a": 1,
"e": "Le corps chargé approché attire ou repousse les charges mobiles du conducteur, qui se répartissent sans échange de charge.",
"s": "Électrisation de la matière"
},
{
"q": "Dans un conducteur métallique :",
"c": [
"aucune charge ne peut se déplacer",
"des électrons libres peuvent se déplacer",
"les protons se déplacent",
"les charges restent là où on les dépose"
],
"a": 1,
"e": "Les électrons libres des métaux se déplacent dans tout le volume ; dans un isolant, les charges restent localisées.",
"s": "Électrisation de la matière"
},
{
"q": "Un fil de longueur $L$ porte une densité linéique uniforme $\\lambda$. Sa charge totale vaut :",
"c": [
"$\\lambda/L$",
"$\\lambda L$",
"$\\lambda L^2$",
"$\\lambda$"
],
"a": 1,
"e": "$Q=\\int\\lambda\\,\\dd\\ell=\\lambda L$ pour une répartition uniforme.",
"s": "Distributions de charges"
},
{
"q": "La force de Coulomb entre deux charges ponctuelles est :",
"c": [
"proportionnelle à $r$",
"proportionnelle à $1/r$",
"proportionnelle à $1/r^2$",
"indépendante de $r$"
],
"a": 2,
"e": "$F=K\\dfrac{|q_1q_2|}{r^2}$ avec $K=\\dfrac{1}{4\\pi\\varepsilon_0}=9\\times10^9$ SI.",
"s": "Force électrostatique : loi de Coulomb"
},
{
"q": "On divise par $3$ la distance entre deux charges. La force est :",
"c": [
"divisée par $3$",
"multipliée par $3$",
"multipliée par $9$",
"divisée par $9$"
],
"a": 2,
"e": "$F\\propto1/r^2$ : si $r$ est divisé par $3$, $r^2$ est divisé par $9$ et $F$ est multipliée par $9$.",
"s": "Force électrostatique : loi de Coulomb"
},
{
"q": "Deux charges de même signe :",
"c": [
"s'attirent",
"se repoussent",
"n'interagissent pas",
"s'attirent si elles sont proches"
],
"a": 1,
"e": "Charges de même signe : répulsion ; de signes contraires : attraction.",
"s": "Force électrostatique : loi de Coulomb"
},
{
"q": "La force exercée par plusieurs charges sur une charge $q$ s'obtient :",
"c": [
"en additionnant les intensités",
"en additionnant vectoriellement les forces dues à chaque charge",
"en prenant la plus grande force",
"en multipliant les forces"
],
"a": 1,
"e": "Principe de superposition : $\\vec F=\\sum\\vec F_i$ ; on additionne les composantes, pas les intensités.",
"s": "Principe de superposition"
}
]
},
"elec2": {
"course": "Électricité",
"title": "Chapitre 2 — Champ et potentiel",
"qs": [
{
"q": "Le champ électrostatique créé par une charge ponctuelle positive est :",
"c": [
"dirigé vers la charge",
"dirigé en s'éloignant de la charge",
"perpendiculaire à la droite charge–point",
"nul"
],
"a": 1,
"e": "$\\vec E=K\\dfrac{q}{r^2}\\,\\vec u$, avec $\\vec u$ dirigé de la charge vers le point : pour $q>0$, le champ « sort » de la charge.",
"s": "Le champ électrostatique"
},
{
"q": "Le potentiel créé à $9$ cm d'une charge $q=1$ nC vaut :",
"c": [
"$1$ V",
"$100$ V",
"$1000$ V",
"$11$ V"
],
"a": 1,
"e": "$V=K\\dfrac qr=\\dfrac{9\\times10^9\\times10^{-9}}{0{,}09}=100$ V.",
"s": "Le potentiel électrostatique"
},
{
"q": "La relation entre champ et potentiel est :",
"c": [
"$\\vec E=\\overrightarrow{\\text{grad}}\\,V$",
"$\\vec E=-\\overrightarrow{\\text{grad}}\\,V$",
"$V=-\\overrightarrow{\\text{grad}}\\,\\vec E$",
"$\\vec E=V\\,\\vec u$"
],
"a": 1,
"e": "$\\vec E=-\\overrightarrow{\\text{grad}}\\,V$ : le champ est dirigé vers les potentiels décroissants.",
"s": "Le potentiel électrostatique"
},
{
"q": "Les surfaces équipotentielles sont :",
"c": [
"parallèles aux lignes de champ",
"perpendiculaires aux lignes de champ",
"confondues avec les lignes de champ",
"sans lien avec les lignes de champ"
],
"a": 1,
"e": "Sur une équipotentielle $\\dd V=-\\vec E\\cdot\\vec{\\dd\\ell}=0$ : tout déplacement sur elle est perpendiculaire à $\\vec E$.",
"s": "Propriétés du champ et du potentiel"
},
{
"q": "Le travail de la force électrique sur une charge $q$ allant de $A$ à $B$ vaut :",
"c": [
"$q(V_B-V_A)$",
"$q(V_A-V_B)$",
"$qE\\,AB$ dans tous les cas",
"$0$"
],
"a": 1,
"e": "$W_{A\\to B}=q(V_A-V_B)$ : il ne dépend que des potentiels de départ et d'arrivée.",
"s": "Le potentiel électrostatique"
},
{
"q": "Au milieu de deux charges égales $+q$, on a :",
"c": [
"$\\vec E=\\vec0$ et $V=0$",
"$\\vec E=\\vec0$ et $V\\neq0$",
"$\\vec E\\neq\\vec0$ et $V=0$",
"$\\vec E\\neq\\vec0$ et $V\\neq0$"
],
"a": 1,
"e": "Les deux champs sont opposés et s'annulent, mais les potentiels (scalaires positifs) s'ajoutent : $V=2Kq/d\\neq0$.",
"s": "Champ et potentiel créés par plusieurs charges ponctuelles"
},
{
"q": "L'angle solide sous lequel on voit tout l'espace depuis un point vaut :",
"c": [
"$2\\pi$ sr",
"$4\\pi$ sr",
"$\\pi$ sr",
"$360$ sr"
],
"a": 1,
"e": "C'est l'aire de la sphère unité : $4\\pi\\times1^2=4\\pi$ sr.",
"s": "Angle solide"
},
{
"q": "Le théorème de Gauss s'écrit :",
"c": [
"$\\oint\\vec E\\cdot\\vec{\\dd S}=Q_{\\text{int}}\\,\\varepsilon_0$",
"$\\oint\\vec E\\cdot\\vec{\\dd S}=\\dfrac{Q_{\\text{int}}}{\\varepsilon_0}$",
"$\\oint\\vec E\\cdot\\vec{\\dd S}=\\dfrac{Q_{\\text{tot}}}{\\varepsilon_0}$",
"$\\oint\\vec E\\cdot\\vec{\\dd S}=0$"
],
"a": 1,
"e": "Le flux sortant d'une surface fermée est égal à la charge intérieure divisée par $\\varepsilon_0$ ; les charges extérieures ne contribuent pas au flux.",
"s": "Flux du champ et théorème de Gauss"
},
{
"q": "Pour une boule uniformément chargée, à l'intérieur ($r<R$), le champ :",
"c": [
"est nul",
"est proportionnel à $r$",
"est proportionnel à $1/r^2$",
"est constant"
],
"a": 1,
"e": "La charge intérieure vaut $Q\\,r^3/R^3$ et le théorème de Gauss donne $E=\\dfrac{\\rho\\,r}{3\\varepsilon_0}$ (voir le TD, exercice 10).",
"s": "Flux du champ et théorème de Gauss"
},
{
"q": "La forme locale du théorème de Gauss est :",
"c": [
"$\\text{div}\\,\\vec E=\\rho\\,\\varepsilon_0$",
"$\\text{div}\\,\\vec E=\\dfrac{\\rho}{\\varepsilon_0}$",
"$\\Delta V=\\dfrac{\\rho}{\\varepsilon_0}$",
"$\\overrightarrow{\\text{grad}}\\,V=\\rho$"
],
"a": 1,
"e": "$\\text{div}\\,\\vec E=\\dfrac{\\rho}{\\varepsilon_0}$ ; avec $\\vec E=-\\overrightarrow{\\text{grad}}\\,V$, on obtient l'équation de Poisson $\\Delta V+\\dfrac{\\rho}{\\varepsilon_0}=0$.",
"s": "Forme locale : équations de Poisson et de Laplace"
}
]
}
};
