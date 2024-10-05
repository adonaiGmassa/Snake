const VITESSE_JEU = 100; // Vitesse du jeu en millisecondes
const COULEUR_BORDURE = 'black'; // Couleur des bordures
const COULEUR_FOND = "white"; // Couleur de l'arrière-plan
const COULEUR_SERPENT = 'lightgreen'; // Couleur du serpent
const COULEUR_PEAU_SERPENT = 'darkgreen'; // Couleur de la peau du serpent
const COULEUR_NOURRITURE = 'red'; // Couleur de la nourriture
const COULEUR_BORDURE_NOURRITURE = 'darkred'; // Couleur de la bordure de la nourriture
let serpent; // variable du serpent

// Caractéristiques du jeu
let score; // Variable du Score
let direction; // Direction du serpent
let coordonneNourritureX; // Coordonnée X de la nourriture
let coordonneNourritureY; // Coordonnée Y de la nourriture
let deplacementX; // Vitesse horizontale
let deplacementY; // Vitesse verticale
let jeuActif = true; // Variable pour vérifier si le jeu est actif


// Récupérer l'élément canvas
const canvasJeu = document.getElementById("gameCanvas"); // Récupère le canvas du jeu
// Retourne un contexte de dessin en deux dimensions
const ctx = canvasJeu.getContext("2d"); // Contexte 2D pour dessiner sur le canvas
document.addEventListener("keydown", Mouvement); // Écoute l'événement de pression de touche

dessinerSerpent()
Init();// Initialiser le jeu


function Init() {

  // Caractéristiques du serpent
  serpent = [ 
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 }
  ];

  // Caractéristiques du jeu
  score = 0; // Initialiser le score
  direction = false; // Indique si le serpent change de direction
  coordonneNourritureX = 0; // Coordonnée X de la nourriture
  coordonneNourritureY = 0; // Coordonnée Y de la nourriture
  deplacementX = 10; // Vitesse horizontale initiale
  deplacementY = 0; // Vitesse verticale initiale

  document.getElementById('score').innerHTML = 'Score: ' + score; // Afficher le score

  Nourriture(); // Placer la nourriture
  jeu(); // Démarrer le jeu

}

// Dessine chaque segment du serpent
function dessinerSegmentSerpent(segmentSerpent) {
  ctx.fillStyle = COULEUR_SERPENT; // Couleur du serpent
  ctx.strokeStyle = COULEUR_PEAU_SERPENT; // Couleur de la bordure du serpent
  ctx.fillRect(segmentSerpent.x, segmentSerpent.y, 10, 10); // Remplit le segment
  ctx.strokeRect(segmentSerpent.x, segmentSerpent.y, 10, 10); // Dessine la bordure
}

// Dessine le serpent
function dessinerSerpent() { 
  serpent.forEach(dessinerSegmentSerpent); // Dessine chaque segment du serpent
}

// Dessine la nourriture
function dessinerNourriture() { 
  ctx.fillStyle = COULEUR_NOURRITURE; // Couleur de la nourriture
  ctx.strokeStyle = COULEUR_BORDURE_NOURRITURE; // Couleur de la bordure de la nourriture
  ctx.fillRect(coordonneNourritureX, coordonneNourritureY, 10, 10); // Remplit la nourriture
  ctx.strokeRect(coordonneNourritureX, coordonneNourritureY, 10, 10); // Dessine la bordure
}

// Génère un nombre aléatoire
function randomN(min, max) { 
  return Math.round((Math.random() * (max - min) + min) / 10) * 10; // Retourne un nombre aléatoire arrondi
}

// Place la nourriture aléatoirement
function Nourriture() { 
  
  coordonneNourritureX = randomN(0, canvasJeu.width - 10); // Positionne la nourriture sur l'axe X
  coordonneNourritureY = randomN(0, canvasJeu.height - 10); // Positionne la nourriture sur l'axe Y

  serpent.forEach(function estNourritureSurSerpent(partie) { // Vérifie si la nourriture a été mange par le serpent
      const nourritureSurSerpent = partie.x == coordonneNourritureX && partie.y == coordonneNourritureY; // Vérifie la collision
      if (nourritureSurSerpent) Nourriture(); // Si le serpent a mange la nourriture , relance la fonction
  });

}

// Vérifie si le jeu est terminé
function GameOver() { 
  
  // Teste sur chaque segment du serpent
  for (let i = 4; i < serpent.length; i++) 
    {
      if (serpent[i].x === serpent[0].x && serpent[i].y === serpent[0].y) return true // Vérifie si le serpent se mord la queue
    }
    
  const MUR_GAUCHE = serpent[0].x < 0; // Vérifie si le serpent touche le mur gauche
  const MUR_DROIT = serpent[0].x > canvasJeu.width - 10; // Vérifie si le serpent touche le mur droit
  const MUR_HAUT = serpent[0].y < 0; // Vérifie si le serpent touche le mur haut
  const MUR_BAS = serpent[0].y > canvasJeu.height - 10; // Vérifie si le serpent touche le mur bas

  return MUR_HAUT || MUR_GAUCHE|| MUR_DROIT || MUR_BAS; // Retourne true si le serpent touche un mur
}

// Affiche l'écran de défaite
function afficherEcranDefaite() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // Fond noir transparent
  ctx.fillRect(0, 0, canvasJeu.width, canvasJeu.height); // Recouvre tout le canvas
  ctx.fillStyle = 'white'; // Couleur du texte
  ctx.font = '30px Arial'; // Police et taille du texte
  ctx.textAlign = 'center'; // Alignement du texte
  ctx.fillText('Vous avez perdu!', canvasJeu.width / 2, canvasJeu.height / 2 - 10); // Affiche le message
  ctx.font = '20px Arial'; // Taille du texte pour le score
  ctx.fillText('Score: ' + score, canvasJeu.width / 2, canvasJeu.height / 2 + 20); // Affiche le score
  jeuActif = false; // Met à jour l'état du jeu
}

// Fonction principale du jeu
function jeu() { 
  
  if (GameOver()) { // Si le jeu est terminé
      afficherEcranDefaite(); // Affiche l'écran de défaite
      return; // Quitte la fonction
  }

  setTimeout(
    function onTick() { 
      direction = false; // Réinitialise la direction
      dessinerNourriture(); // Dessine la nourriture
      avancerSerpent(); // Avance le serpent
      dessinerSerpent(); // Dessine le serpent
      jeu(); // Rappelle la fonction pour continuer le jeu
    },
    VITESSE_JEU); // Utilise la vitesse du jeu pour le délai
}