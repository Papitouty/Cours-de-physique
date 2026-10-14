/* =====================================================================
   ANNONCES ET CALENDRIER — fichier à mettre à jour
   ---------------------------------------------------------------------
   ANNONCES : la plus récente marquée "important: true" s'affiche en
   bandeau sur la page d'accueil.
     date   : "AAAA-MM-JJ"
     titre  : texte court
     texte  : détail (facultatif)
     lien   : page du site (facultatif), ex. "entrainement.html"
     important : true pour l'afficher en bandeau
   CALENDRIER : séances et évaluations.
     date   : "AAAA-MM-JJ"     heure : "08:00" (facultatif)
     type   : "cours" | "td" | "controle" | "examen" | "autre"
     titre  : intitulé          lieu  : salle (facultatif)
     detail : consignes (facultatif)
   ===================================================================== */
window.ANNONCES = [
  { date: "2026-10-14", important: true,
    titre: "Nouveau : le fascicule de travaux pratiques",
    texte: "Les 8 TP réunis dans un PDF de 46 pages : rappels théoriques avec démonstrations, schémas de montage, protocoles, tableaux de mesures à remplir et questions d'exploitation. À lire avant chaque séance.",
    lien: "docs/Fascicule_TP_Physique_L1.pdf" },
  { date: "2026-10-14",
    titre: "Tous les diaporamas sont en ligne, aussi en PowerPoint",
    texte: "Nouveaux diaporamas pour les chapitres 1 et 2 d'électricité. Chaque chapitre de mécanique et d'électricité a maintenant son diaporama à consulter en ligne et à télécharger au format PowerPoint (bouton PPTX).",
    lien: "./#elec" },
  { date: "2026-10-14",
    titre: "Entraînement : 10 exercices avec schéma dans un repère orthonormé",
    texte: "Lecture de vecteurs, moment d'une force, tir d'un projectile, mouvement circulaire, plan incliné, équilibre de trois forces, travail sur deux chemins, forces de Coulomb, champ de deux charges et champ du dipôle : chaque schéma est redessiné avec les nouvelles valeurs. Les exercices illustrés sont marqués d'un petit carré orange.",
    lien: "entrainement.html" },
  { date: "2026-10-14",
    titre: "Nouveau : chapitre 3 d'électrostatique — Le dipôle",
    texte: "Support de cours complet (démonstrations pas à pas, figures, fiche de synthèse), diaporama de 33 diapositives (à consulter en ligne ou à télécharger au format PowerPoint), série de TD n°2 avec corrigé détaillé, quiz, exercices d'entraînement et une nouvelle simulation : le dipôle dans un champ uniforme.",
    lien: "./#elec" },
  { date: "2026-10-14",
    titre: "TP : connexion avec ton code personnel",
    texte: "Pour soumettre un compte rendu de TP, connecte-toi en haut de la page TP avec ton numéro de carte et le code personnel remis par ton enseignant. Chaque étudiant reçoit son propre matériel et ses propres questions : des mesures recopiées sont détectées automatiquement. Ne communique ton code à personne.",
    lien: "tp.html" },
  { date: "2026-10-13",
    titre: "Travaux pratiques : 8 TP simulés",
    texte: "Pendule simple, oscillateur harmonique, pendule de torsion, mesures de résistances, oscilloscope cathodique, réfraction, lentilles et microscope : protocole détaillé, mesures simulées et compte rendu à remplir en ligne.",
    lien: "tp.html" },
  { date: "2026-10-13",
    titre: "Exercices d'entraînement en ligne",
    texte: "Des exercices dont les données changent à chaque essai, corrigés pas à pas, pour chaque chapitre.",
    lien: "entrainement.html" },
  { date: "2026-10-13",
    titre: "Le site fonctionne sans connexion",
    texte: "Après une première visite avec internet, les cours, les TD, les quiz et les simulations restent disponibles hors connexion. Le site peut aussi être installé comme une application sur le téléphone." },
  { date: "2026-10-13",
    titre: "Quiz et simulations en ligne",
    texte: "Un quiz de 10 questions par chapitre et cinq simulations interactives (champ électrostatique, théorème de Gauss, anneau chargé, base de Frenet, énergie potentielle).",
    lien: "simulations.html" },
  { date: "2026-10-10",
    titre: "Électricité : série de TD n°1 disponible",
    texte: "Série de 11 exercices sur les chapitres 1 et 2 (charges, champ, potentiel, théorème de Gauss), avec corrigé détaillé." }
];

window.CALENDRIER = [
  /* Dates PROVISOIRES (exemple) : remplacer par le vrai planning, puis retirer "provisoire: true". */
  { date: "2026-10-15", heure: "08:00", type: "cours", provisoire: true, titre: "Électricité : fin du chapitre 2 (théorème de Gauss)", lieu: "Amphi A" },
  { date: "2026-10-20", heure: "10:00", type: "td", provisoire: true, titre: "TD d'électricité n°1 : exercices 1 à 5", lieu: "Salle TD 2", detail: "Préparer les exercices 1 à 3 avant la séance." },
  { date: "2026-10-22", heure: "10:00", type: "td", provisoire: true, titre: "TD de mécanique n°4 : exercices 1 à 4", lieu: "Salle TD 2", detail: "Revoir le théorème de l'énergie cinétique." },
  { date: "2026-10-27", heure: "10:00", type: "td", provisoire: true, titre: "TD d'électricité n°1 : exercices 6 à 8 (fil, anneau, disque)", lieu: "Salle TD 2" },
  { date: "2026-10-29", heure: "10:00", type: "td", provisoire: true, titre: "TD de mécanique n°4 : exercices 5 à 8", lieu: "Salle TD 2" },
  { date: "2026-11-03", heure: "10:00", type: "td", provisoire: true, titre: "TD d'électricité n°1 : exercices 9 à 11 (théorème de Gauss)", lieu: "Salle TD 2" },
  { date: "2026-11-10", heure: "08:00", type: "controle", provisoire: true, titre: "Contrôle continu n°1 : électricité, chapitres 1 et 2", lieu: "Amphi A", detail: "Durée 1 h 30. Calculatrice autorisée, documents interdits." },
  { date: "2026-11-17", heure: "08:00", type: "controle", provisoire: true, titre: "Contrôle continu n°2 : mécanique, chapitres 3 et 4", lieu: "Amphi A", detail: "Durée 1 h 30. Calculatrice autorisée, documents interdits." },
  { date: "2026-12-14", heure: "08:00", type: "examen", provisoire: true, titre: "Examen de fin de semestre : Physique I (mécanique)", lieu: "Amphi A", detail: "Durée 3 h. Tous les chapitres de mécanique." },
  { date: "2026-12-16", heure: "08:00", type: "examen", provisoire: true, titre: "Examen de fin de semestre : électricité", lieu: "Amphi A", detail: "Durée 2 h. Chapitres 1 et 2." }
];
