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
Init(); // Initialiser le jeu

// Récupérer l'élément canvas
const canvasJeu = document.getElementById("gameCanvas"); // Récupère le canvas du jeu
// Retourne un contexte de dessin en deux dimensions
const ctx = canvasJeu.getContext("2d"); // Contexte 2D pour dessiner sur le canvas
document.addEventListener("keydown", Mouvement); // Écoute l'événement de pression de touche


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