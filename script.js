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