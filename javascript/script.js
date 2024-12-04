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
    // Vérifie si la tête du serpent entre en collision avec une partie de son corps
    for (let i = 4; i < serpent.length; i++) { // Commence à partir de la 5ème partie du serpent
        if (serpent[i].x === serpent[0].x && serpent[i].y === serpent[0].y) { // Compare chaque partie avec la tête
            finJ = true; // Si une collision est détectée, on marque la fin du jeu
        }
    }

    // Vérifie si la tête du serpent touche les bords du terrain (mur)
    const murG = serpent[0].x < 0; // Vérifie si la tête est à gauche du terrain
    const murD = serpent[0].x > canvasJeu.width - 10; // Vérifie si la tête est à droite du terrain
    const murH = serpent[0].y < 0; // Vérifie si la tête est en haut du terrain
    const murB = serpent[0].y > canvasJeu.height - 10; // Vérifie si la tête est en bas du terrain

    // Si l'une des conditions est vraie, la partie est finie
    if( murB || murH || murD || murG)
        {
            finJ = true;
        }
}

function jeu() {
    // Vérifie si le jeu est terminé en appelant la fonction finDeJeu()
    finDeJeu();

    // Si la variable finJ est égale à true, cela signifie que le jeu est terminé
    if (finJ == true) {
        alert("Vous avez perdu !"); // Affiche une alerte indiquant que le joueur a perdu
        const boutonRedemarrer = document.getElementById('Button'); // Récupère le bouton de redémarrage
        boutonRedemarrer.style.display = 'block'; // Affiche le bouton de redémarrage pour permettre au joueur de recommencer
        return; // Interrompt l'exécution de la fonction et donc arrête le jeu
    }

    // Si le jeu n'est pas terminé, on planifie l'exécution de la fonction suivante pour mettre à jour l'état du jeu
    setTimeout(function onTick() {
        direction = false; // Réinitialise la direction pour permettre au serpent de changer de direction sur le prochain mouvement
        effacerCanvas(); // Efface le canvas pour redessiner les éléments (fond, serpent, nourriture)
        dessinerNourriture(); // Redessine la nourriture à sa nouvelle position
        avancerSerpent(); // Déplace le serpent selon la direction actuelle
        dessinerSerpent(); // Redessine le serpent après son déplacement
        jeu(); // Appelle récursivement la fonction jeu() pour continuer le jeu
    }, VITESSE_JEU); // Attends un délai (VITESSE_JEU) avant de relancer l'animation du jeu
}


function redemarrerJeu() {
    const boutonRedemarrer = document.getElementById('Button');
    if (!boutonRedemarrer) {
        boutonRedemarrer.style.display = 'none';
    }
    init();
}
