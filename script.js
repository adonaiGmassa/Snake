const VITESSE_JEU = 100; // Vitesse du jeu en millisecondes
const COULEUR_BORDURE = 'black'; // Couleur des bordures
const COULEUR_FOND = "white"; // Couleur de l'arrière-plan
const COULEUR_SERPENT = 'lightgreen'; // Couleur du serpent
const COULEUR_PEAU_SERPENT = 'darkgreen'; // Couleur de la peau du serpent
const COULEUR_NOURRITURE = 'red'; // Couleur de la nourriture
const COULEUR_BORDURE_NOURRITURE = 'darkred'; // Couleur de la bordure de la nourriture

let serpent; // Variable du serpent
let score; // Variable du Score
let direction; // Direction du serpent
let coordonneNourritureX; // Coordonnée X de la nourriture
let coordonneNourritureY; // Coordonnée Y de la nourriture
let deplacementX; // Vitesse horizontale
let deplacementY; // Vitesse verticale
let jeuActif = true; // Variable pour vérifier si le jeu est actif

const canvasJeu = document.getElementById("gameCanvas"); // Récupère le canvas du jeu
const ctx = canvasJeu.getContext("2d"); // Contexte 2D pour dessiner sur le canvas
document.addEventListener("keydown", Mouvement); // Écoute l'événement de pression de touche

Init(); // Initialiser le jeu

function Init() {
    serpent = [
        { x: 150, y: 150 },
        { x: 140, y: 150 },
        { x: 130, y: 150 },
        { x: 120, y: 150 },
        { x: 110, y: 150 }
    ];

    score = 0; // Initialiser le score
    direction = false; // Indique si le serpent change de direction
    coordonneNourritureX = 0; // Coordonnée X de la nourriture
    coordonneNourritureY = 0; // Coordonnée Y de la nourriture
    deplacementX = 10; // Vitesse horizontale initiale
    deplacementY = 0; // Vitesse verticale initiale

    document.getElementById('score').innerHTML = 'Score: ' + score; // Afficher le score

    dessinerSerpent(); // Dessiner le serpent au démarrage
    Nourriture(); // Placer la nourriture
    jeu(); // Démarrer le jeu
}

function dessinerSegmentSerpent(segmentSerpent) {
    ctx.fillStyle = COULEUR_SERPENT; // Couleur du serpent
    ctx.strokeStyle = COULEUR_PEAU_SERPENT; // Couleur de la bordure du serpent
    ctx.fillRect(segmentSerpent.x, segmentSerpent.y, 10, 10); // Remplit le segment
    ctx.strokeRect(segmentSerpent.x, segmentSerpent.y, 10, 10); // Dessine la bordure
}

function dessinerSerpent() {
    serpent.forEach(dessinerSegmentSerpent); // Dessine chaque segment du serpent
}

function dessinerNourriture() {
    ctx.fillStyle = COULEUR_NOURRITURE; // Couleur de la nourriture
    ctx.strokeStyle = COULEUR_BORDURE_NOURRITURE; // Couleur de la bordure de la nourriture
    ctx.fillRect(coordonneNourritureX, coordonneNourritureY, 10, 10); // Remplit la nourriture
    ctx.strokeRect(coordonneNourritureX, coordonneNourritureY, 10, 10); // Dessine la bordure
}

function randomN(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10; // Retourne un nombre aléatoire arrondi
}

function Nourriture() {
    let nouvellePositionValide = false;

    while (!nouvellePositionValide) {
        coordonneNourritureX = randomN(0, canvasJeu.width - 10); // Positionne la nourriture sur l'axe X
        coordonneNourritureY = randomN(0, canvasJeu.height - 10); // Positionne la nourriture sur l'axe Y

        nouvellePositionValide = !serpent.some(partie => partie.x === coordonneNourritureX && partie.y === coordonneNourritureY);
    }
}

function GameOver() {
    for (let i = 4; i < serpent.length; i++) {
        if (serpent[i].x === serpent[0].x && serpent[i].y === serpent[0].y) return true; // Vérifie si le serpent se mord la queue
    }

    const MUR_GAUCHE = serpent[0].x < 0; // Vérifie si le serpent touche le mur gauche
    const MUR_DROIT = serpent[0].x > canvasJeu.width - 10; // Vérifie si le serpent touche le mur droit
    const MUR_HAUT = serpent[0].y < 0; // Vérifie si le serpent touche le mur haut
    const MUR_BAS = serpent[0].y > canvasJeu.height - 10; // Vérifie si le serpent touche le mur bas

    return MUR_HAUT || MUR_GAUCHE || MUR_DROIT || MUR_BAS; // Retourne true si le serpent touche un mur
}

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

function jeu() {
    if (GameOver()) { // Vérifie si le jeu est terminé
        afficherEcranDefaite(); // Affiche l'écran de défaite
        return; // Quitte la fonction
    }

    setTimeout(function onTick() {
        direction = false; // Réinitialise la direction
        effacerCanvas(); // Efface le canvas
        dessinerNourriture(); // Dessine la nourriture
        avancerSerpent(); // Avance le serpent
        dessinerSerpent(); // Dessine le serpent
        jeu(); // Rappelle la fonction pour continuer le jeu
    }, VITESSE_JEU); // Utilise la vitesse du jeu pour le délai
}

function effacerCanvas() {
    ctx.fillStyle = COULEUR_FOND; // Définit la couleur de fond
    ctx.strokeStyle = COULEUR_BORDURE; // Définit la couleur des bordures

    ctx.fillRect(0, 0, canvasJeu.width, canvasJeu.height); // Dessine un rectangle rempli pour couvrir le canvas
    ctx.strokeRect(0, 0, canvasJeu.width, canvasJeu.height); // Dessine un rectangle de bordure autour du canvas
}

function avancerSerpent() {
    const teteSerpent = { x: serpent[0].x + deplacementX, y: serpent[0].y + deplacementY }; 
    serpent.unshift(teteSerpent); // Ajoute la tête au début du tableau

    const aMange = serpent[0].x === coordonneNourritureX && serpent[0].y === coordonneNourritureY;

    if (aMange) {
        score += 10; // Augmente le score de 10
        document.getElementById('score').innerHTML = score; // Met à jour l'affichage du score
        Nourriture(); // Place une nouvelle nourriture
    } else {
        serpent.pop(); // Retire le dernier segment du serpent si aucune nourriture n'est mangée
    }
}

function Mouvement(event) {
    const GAUCHE = 37; // Variable pour la flèche gauche
    const DROITE = 39; // Variable pour la flèche droite
    const HAUT = 38; // Variable pour la flèche haut
    const BAS = 40; // Variable pour la flèche bas

    if (direction || !jeuActif) return; // Si le serpent est déjà en train de changer de direction ou si le jeu est arrêté
    direction = true; // Indique que la direction a été changée

    const TOUCHE_Pressee = event.keyCode; // Récupère le code de la touche pressée

    if (TOUCHE_Pressee === HAUT && deplacementY !== 10) {
        deplacementX = 0; 
        deplacementY = -10; // Change la direction vers le haut
    } else if (TOUCHE_Pressee === GAUCHE && deplacementX !== 10) {
        deplacementX = -10; 
        deplacementY = 0; // Change la direction vers la gauche
    } else if (TOUCHE_Pressee === DROITE && deplacementX !== -10) {
        deplacementX = 10; 
        deplacementY = 0; // Change la direction vers la droite
    } else if (TOUCHE_Pressee === BAS && deplacementY !== -10) {
        deplacementX = 0; 
        deplacementY = 10; // Change la direction vers le bas
    }
}
