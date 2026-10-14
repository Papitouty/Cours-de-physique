/* =====================================================================
   VIDÉOS YOUTUBE — fichier à compléter
   ---------------------------------------------------------------------
   Une liste par chapitre. Pour chaque vidéo :
     titre : intitulé affiché
     url   : lien YouTube (https://www.youtube.com/watch?v=… ou https://youtu.be/…)
     duree : facultatif, ex. "12 min"
     note  : facultatif, ex. "Démonstration du théorème de Gauss"
   Les chapitres sans vidéo n'affichent rien.
   ===================================================================== */
window.VIDEOS = {
  meca1: [],   // Mécanique — Ch. 1 Calcul vectoriel
  meca2: [],   // Mécanique — Ch. 2 Cinématique
  meca3: [],   // Mécanique — Ch. 3 Dynamique
  meca4: [],   // Mécanique — Ch. 4 Travail et énergie
  elec1: [],   // Électricité — Ch. 1 Généralités sur l'électrostatique
  elec2: [     // Électricité — Ch. 2 Champ et potentiel
    { titre: "Sphère chargée en volume", url: "https://www.youtube.com/watch?v=hVLKwntLCM0",
      note: "Exercice : application du théorème de Gauss (TD n°1, exercice 10)" }
  ],
  elec3: []    // Électricité — Ch. 3 Le dipôle électrostatique
  /* Exemple de ligne :
  elec2: [ { titre: "Le théorème de Gauss expliqué", url: "https://www.youtube.com/watch?v=XXXXXXXXXXX", duree: "15 min" } ]
  */
};
