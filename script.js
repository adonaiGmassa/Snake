// Définition des constantes de configuration du jeu
const VITESSE_JEU = 100; // Vitesse du jeu en millisecondes (temps entre chaque mise à jour)
const COULEUR_BORDURE = 'black'; // Couleur des bordures du canvas
const COULEUR_FOND = "white"; // Couleur de fond du canvas
const COULEUR_SERPENT = 'lightgreen'; // Couleur du serpent
const COULEUR_PEAU_SERPENT = 'darkgreen'; // Couleur de la peau du serpent
const COULEUR_NOURRITURE = 'red'; // Couleur de la nourriture
const COULEUR_BORDURE_NOURRITURE = 'darkred'; // Couleur de la bordure de la nourriture

// Variables globales du jeu
let serpent; // Tableau qui représente le serpent sous forme de segments (chaque segment a une position x, y)
let score; // Score du joueur
let direction; // Indicateur si la direction du serpent a été changée
let coordonneNourritureX; // Coordonnée X de la nourriture
let coordonneNourritureY; // Coordonnée Y de la nourriture
let deplacementX; // Vitesse du serpent sur l'axe X (horizontal)
let deplacementY; // Vitesse du serpent sur l'axe Y (vertical)
let jeuActif = true; // Indicateur pour vérifier si le jeu est en cours ou terminé

// Récupérer le canvas et son contexte pour dessiner
const canvasJeu = document.getElementById("gameCanvas"); // Le canvas du jeu
const ctx = canvasJeu.getContext("2d"); // Contexte 2D pour dessiner

// Définir les dimensions du canvas
canvasJeu.width = 500;
canvasJeu.height = 500;

// Ajout des événements pour gérer les entrées clavier et le bouton "Recommencer"
document.addEventListener("keydown", Mouvement); // Gestion des mouvements du serpent
document.getElementById('btn-recommencer').addEventListener('click', Init); // Bouton pour recommencer le jeu

// Initialiser le jeu
Init(); // Lancer l'initialisation au démarrage

// Fonction pour initialiser toutes les variables du jeu
function Init() {
    // Initialisation du serpent avec 5 segments à une position de départ
    serpent = [
        { x: 150, y: 150 },
        { x: 140, y: 150 },
        { x: 130, y: 150 },
        { x: 120, y: 150 },
        { x: 110, y: 150 }
    ];

    // Réinitialiser le score, la direction, et les vitesses
    score = 0;
    direction = false;
    coordonneNourritureX = 0;
    coordonneNourritureY = 0;
    deplacementX = 10;
    deplacementY = 0;
    jeuActif = true;

    // Mettre à jour l'affichage du score
    document.getElementById('score').innerHTML = 'Score: ' + score;
    
    // Masquer l'écran de défaite si présent
    document.getElementById('ecran-defaite').classList.add('cacher');
    
    // Dessiner le serpent et la nourriture au démarrage
    dessinerSerpent();
    Nourriture();
    
    // Démarrer le jeu
    jeu();
}

// Fonction pour dessiner chaque segment du serpent
function dessinerSegmentSerpent(segmentSerpent) {
    ctx.fillStyle = COULEUR_SERPENT; // Couleur du serpent
    ctx.strokeStyle = COULEUR_PEAU_SERPENT; // Bordure du serpent
    ctx.fillRect(segmentSerpent.x, segmentSerpent.y, 10, 10); // Remplir le segment du serpent
    ctx.strokeRect(segmentSerpent.x, segmentSerpent.y, 10, 10); // Dessiner la bordure autour du segment
}

// Fonction pour dessiner l'ensemble du serpent
function dessinerSerpent() {
    serpent.forEach(dessinerSegmentSerpent); // Dessiner chaque segment du serpent
}

// Fonction pour dessiner la nourriture sur le canvas
function dessinerNourriture() {
    ctx.fillStyle = COULEUR_NOURRITURE; // Couleur de la nourriture
    ctx.strokeStyle = COULEUR_BORDURE_NOURRITURE; // Couleur de la bordure de la nourriture
    ctx.fillRect(coordonneNourritureX, coordonneNourritureY, 10, 10); // Remplir la nourriture
    ctx.strokeRect(coordonneNourritureX, coordonneNourritureY, 10, 10); // Dessiner la bordure de la nourriture
}

// Fonction utilitaire pour générer un nombre aléatoire pour la position de la nourriture
function randomN(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10; // Retourne un nombre arrondi par tranche de 10
}

// Fonction pour générer une nouvelle position valide pour la nourriture
function Nourriture() {
    let nouvellePositionValide = false;

    // Chercher une position valide pour la nourriture
    while (!nouvellePositionValide) {
        coordonneNourritureX = randomN(0, canvasJeu.width - 10);
        coordonneNourritureY = randomN(0, canvasJeu.height - 10);

        // Vérifier que la nourriture ne se trouve pas sur un segment du serpent
        nouvellePositionValide = !serpent.some(partie => partie.x === coordonneNourritureX && partie.y === coordonneNourritureY);
    }
}

// Fonction qui gère la fin du jeu, vérifie si le serpent se mord la queue ou touche un mur
function GameOver() {
    for (let i = 4; i < serpent.length; i++) {
        if (serpent[i].x === serpent[0].x && serpent[i].y === serpent[0].y) return true; // Le serpent se mord la queue
    }

    // Vérification si le serpent touche un des murs
    const MUR_GAUCHE = serpent[0].x < 0;
    const MUR_DROIT = serpent[0].x > canvasJeu.width - 10;
    const MUR_HAUT = serpent[0].y < 0;
    const MUR_BAS = serpent[0].y > canvasJeu.height - 10;

    return MUR_HAUT || MUR_GAUCHE || MUR_DROIT || MUR_BAS; // Retourne true si le serpent touche un mur
}

// Fonction pour afficher l'écran de défaite
function afficherEcranDefaite() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // Fond noir transparent pour l'écran de défaite
    ctx.fillRect(0, 0, canvasJeu.width, canvasJeu.height); // Recouvre tout le canvas
    ctx.fillStyle = 'white'; // Couleur du texte
    ctx.font = '30px Arial'; // Police du texte
    ctx.textAlign = 'center'; // Centre le texte
    ctx.fillText('Vous avez perdu!', canvasJeu.width / 2, canvasJeu.height / 2 - 10); // Affiche le message de défaite
    ctx.font = '20px Arial'; // Taille du texte pour afficher le score
    ctx.fillText('Score: ' + score, canvasJeu.width / 2, canvasJeu.height / 2 + 20); // Affiche le score
    jeuActif = false; // Met à jour l'état du jeu
}

// Fonction principale qui gère le jeu en boucle
function jeu() {
    if (GameOver()) { // Si le jeu est terminé (serpent se mord la queue ou touche un mur)
        afficherEcranDefaite(); // Afficher l'écran de défaite
        return; // Arrêter la boucle de jeu
    }

    setTimeout(function onTick() {
        direction = false; // Réinitialise l'indicateur de direction
        effacerCanvas(); // Effacer le canvas pour redessiner le serpent et la nourriture
        dessinerNourriture(); // Dessiner la nourriture
        avancerSerpent(); // Faire avancer le serpent
        dessinerSerpent(); // Redessiner le serpent
        jeu(); // Appeler la fonction de jeu pour continuer la boucle
    }, VITESSE_JEU); // Le délai entre chaque mise à jour du jeu (en fonction de la vitesse)
}

// Fonction pour effacer le canvas avant de redessiner
function effacerCanvas() {
    ctx.fillStyle = COULEUR_FOND; // Couleur de fond
    ctx.strokeStyle = COULEUR_BORDURE; // Couleur des bordures
    ctx.fillRect(0, 0, canvasJeu.width, canvasJeu.height); // Effacer tout le canvas avec la couleur de fond
    ctx.strokeRect(0, 0, canvasJeu.width, canvasJeu.height); // Redessiner la bordure
}

// Fonction pour faire avancer le serpent
function avancerSerpent() {
    const teteSerpent = { x: serpent[0].x + deplacementX, y: serpent[0].y + deplacementY };
    serpent.unshift(teteSerpent); // Ajouter la tête du serpent au début du tableau

    // Vérifier si la tête du serpent mange la nourriture
    const aMange = serpent[0].x === coordonneNourritureX && serpent[0].y === coordonneNourritureY;

    if (aMange) {
        score += 10; // Augmenter le score
        document.getElementById('score').innerHTML = 'Score: ' + score; // Mettre à jour l'affichage du score
        Nourriture(); // Repositionner la nourriture
    } else {
        serpent.pop(); // Retirer le dernier segment du serpent si la nourriture n'est pas mangée
    }
}

// Fonction pour gérer les mouvements du serpent en fonction des touches pressées
function Mouvement(event) {
    if (direction || !jeuActif) return; // Ne pas changer la direction si déjà en train de changer ou si le jeu est arrêté
    direction = true; // Indiquer que la direction a été changée

    const TOUCHE_Pressee = event.key; // Récupérer la touche pressée

    if (TOUCHE_Pressee === "ArrowUp" && deplacementY !== 10) {
        deplacementX = 0;
        deplacementY = -10; // Déplacer le serpent vers le haut
    } else if (TOUCHE_Pressee === "ArrowLeft" && deplacementX !== 10) {
        deplacementX = -10;
        deplacementY = 0; // Déplacer le serpent vers la gauche
    } else if (TOUCHE_Pressee === "ArrowRight" && deplacementX !== -10) {
        deplacementX = 10;
        deplacementY = 0; // Déplacer le serpent vers la droite
    } else if (TOUCHE_Pressee === "ArrowDown" && deplacementY !== -10) {
        deplacementX = 0;
        deplacementY = 10; // Déplacer le serpent vers le bas
    }
}

// Fonction pour redémarrer le jeu après une défaite
function redemarrerJeu() {
    document.getElementById('ecran-defaite').classList.add('cacher'); // Masquer l'écran de défaite
    Init(); // Réinitialiser le jeu
}
