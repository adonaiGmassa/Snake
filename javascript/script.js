// CARACTÉRISTIQUES TERRAIN
const VITESSE_JEU = 100;
const COULEUR_LIMITE = 'black';
const FOND = "white";
const COULEUR_SERPENT = 'lightgreen';
const PEAU_SERPENT = 'darkgreen';
const COULEUR_NOURRITURE = 'red';
const LIGNE_NOURRITURE = 'darkred';

// CARACTÉRISTIQUES DU SERPENT
let serpent;
// CARACTÉRISTIQUES DU JEU
let score;
let direction;
let nourritureX;
let nourritureY;
let dx;
let dy;

let finJ = false;

// Récupérer l'élément canvas
const canvasJeu = document.getElementById("gameCanvas");
// Retourner un contexte de dessin en deux dimensions
const ctx = canvasJeu.getContext("2d");
document.addEventListener("keydown", mouvement);
init();

function init() {
    serpent = [ // CARACTÉRISTIQUES SERPENT
        { x: 150, y: 150 },
        { x: 140, y: 150 },
        { x: 130, y: 150 },
        { x: 120, y: 150 },
        { x: 110, y: 150 }
    ];

    // CARACTÉRISTIQUES DU JEU
    score = 0;
    direction = false; // Quand false, on permet au serpent de bouger
    nourritureX = 0; // Coordonnée nourriture en X
    nourritureY = 0; // Coordonnée nourriture en Y
    dx = 10; // Vitesse horizontale
    dy = 0; // Vitesse verticale

    document.getElementById('score').innerHTML = 'Score: ' + score;

    placerNourriture();
    jeu(); // Démarre le jeu immédiatement après l'initialisation
}

function dessinerSerpent() { // Dessine le serpent
    serpent.forEach(dessinerPartieSerpent);
}

function dessinerPartieSerpent(partieSerpent) { // Ajoute des parties au serpent
    ctx.fillStyle = COULEUR_SERPENT; // Ajoute la couleur du serpent
    ctx.strokeStyle = PEAU_SERPENT; // Ajoute de la couleur aux bordures foncées du serpent
    ctx.fillRect(partieSerpent.x, partieSerpent.y, 10, 10);
    ctx.strokeRect(partieSerpent.x, partieSerpent.y, 10, 10); // Dessine les bordures foncées du serpent
}

function dessinerNourriture() { // Dessine la nourriture
    ctx.fillStyle = COULEUR_NOURRITURE;
    ctx.strokeStyle = LIGNE_NOURRITURE;
    ctx.fillRect(nourritureX, nourritureY, 10, 10);
    ctx.strokeRect(nourritureX, nourritureY, 10, 10);
}

function avancerSerpent() {
    // Crée une nouvelle tête au serpent
    const teteSerpent = { x: serpent[0].x + dx, y: serpent[0].y + dy };
    // Ajoute la tête au reste du corps
    serpent.unshift(teteSerpent);
    
    const mange = serpent[0].x === nourritureX && serpent[0].y === nourritureY;
    if (mange) { // Vérifie si le serpent a mangé  
        score += 10; // Ajoute +10 au score 
        document.getElementById('score').innerHTML = score; // Change le score au-dessus
        placerNourriture();
    } else {
        // Enlève la partie ajoutée à l'arrière
        serpent.pop();
    }
}

function mouvement(event) { // Permet au serpent de bouger correctement
    const GAUCHE = 37;
    const DROITE = 39;
    const HAUT = 38;
    const BAS = 40;
    
    if (direction) return;
    direction = true;

    const touchePressee = event.keyCode;

    const allersHaut = dy === -10;
    const allersBas = dy === 10;
    const allersDroite = dx === 10;
    const allersGauche = dx === -10;

    if (touchePressee === GAUCHE && !allersDroite) {
        dx = -10;
        dy = 0;
    }
    if (touchePressee === HAUT && !allersBas) {
        dx = 0;
        dy = -10;
    }
    if (touchePressee === DROITE && !allersGauche) {
        dx = 10;
        dy = 0;
    }
    if (touchePressee === BAS && !allersHaut) {
        dx = 0;
        dy = 10;
    }
}

function effacerCanvas() {
    ctx.fillStyle = FOND; // Choisit la couleur de fond
    ctx.strokeStyle = COULEUR_LIMITE; // Choisit la couleur des bordures 

    // Dessine un rectangle "rempli" pour couvrir tout le canvas
    ctx.fillRect(0, 0, canvasJeu.width, canvasJeu.height);
    // Dessine une "bordure" autour de tout le canvas
    ctx.strokeRect(0, 0, canvasJeu.width, canvasJeu.height);
}

function aleatoire(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function placerNourriture() { // Place la nourriture de façon aléatoire
    nourritureX = aleatoire(0, canvasJeu.width - 10); // Place la nourriture sur l'axe des X
    nourritureY = aleatoire(0, canvasJeu.height - 10); // Place la nourriture sur l'axe des Y
    serpent.forEach(function estNourritureSurSerpent(partie) { // Empêche la nourriture et le serpent d'être au même endroit
        const nourritureSurSerpent = partie.x === nourritureX && partie.y === nourritureY;
        if (nourritureSurSerpent) placerNourriture();
    });
}

function finDeJeu() {
    for (let i = 4; i < serpent.length; i++) {
        if (serpent[i].x === serpent[0].x && serpent[i].y === serpent[0].y) 
            {
                finJ = true
            }
    }

    const murG = serpent[0].x < 0;
    const murD = serpent[0].x > canvasJeu.width - 10;
    const murH = serpent[0].y < 0;
    const murB = serpent[0].y > canvasJeu.height - 10;

    return murB || murH || murD || murG;
}

function jeu() {
    finDeJeu
    if (finDeJeu(true)) {
        alert("Vous avez perdu !");
        const boutonRedemarrer = document.getElementById('Button');
        boutonRedemarrer.style.display = 'block';
        return;
    }

    setTimeout(function onTick() {
        direction = false;
        effacerCanvas();
        dessinerNourriture();
        avancerSerpent();
        dessinerSerpent();
        jeu();
    }, VITESSE_JEU);
}

function redemarrerJeu() {
    const boutonRedemarrer = document.getElementById('Button');
    if (!boutonRedemarrer) {
        boutonRedemarrer.style.display = 'none';
    }
    init();
}
