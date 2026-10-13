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
  { date: "2026-10-13", important: true,
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
  /* Exemple de ligne à copier :
  { date: "2026-10-22", heure: "08:00", type: "td", titre: "TD n°1 d'électricité : exercices 1 à 5", lieu: "Salle 3", detail: "Préparer les exercices avant la séance." },
  */
];
