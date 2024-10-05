//caracteristique terrin 
const GAME_SPEED = 100;
const COULEUR_LIMITE= 'black';
const BACKGROUND = "white";
const COULEUR_SNAKE = 'lightgreen';
const SNAKE_PEAU = 'darkgreen';
const COULEUR_NOURRITURE = 'red';
const LIGNE_NOURRITURE = 'darkred';
// caracteristique du snake
let snake ;
// caracteristique  jeu 
let score; // bah le score t'es con ou quoi
let Direction;
let foodX; 
let foodY;
let dx;
let dy;
// Get the canvas element
const gameCanvas = document.getElementById("gameCanvas");
// Return a two dimensional drawing context
const ctx = gameCanvas.getContext("2d");
document.addEventListener("keydown", Mouvement);
Init();


function Init(){
  snake = [// caracteristique snake
  {x: 150, y: 150},
  {x: 140, y: 150},
  {x: 130, y: 150},
  {x: 120, y: 150},
  {x: 110, y: 150}
];
// caracteristique  jeu 
score = 0; // bah le score t'es con ou quoi
Direction = false;// When set to true the snake is changing direction
foodX=0; // coordone nourriture en X
foodY=0;// coordone nourriture en Y
dx = 10;// Horizontal velocity
dy = 0;// Vertical velocity

document.getElementById('score').innerHTML = 'Score: ' + score;

Nourriture();
jeu();
}

function drawSnake() {// Dessin le snake
  snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {// ajoute des partie au snake
  ctx.fillStyle = COULEUR_SNAKE;// ajoute la couleur du snake
  ctx.strokeStyle = SNAKE_PEAU;// ajoute de la couleurs aux bordures fonces au snake
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);// Dessine les bordures fonces du snake
}

function drawFood() { //Dessin la nourriture
  ctx.fillStyle = COULEUR_NOURRITURE;
  ctx.strokeStyle = LIGNE_NOURRITURE;
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
}

function advanceSnake() {
  // Crée une nouvelle tete au snake
  const TETESNAKE = {x: snake[0].x + dx, y: snake[0].y + dy};
  // ajoute la TeTe au reste du corps
  snake.unshift(TETESNAKE);
  
  const MANGE = snake[0].x === foodX && snake[0].y === foodY;
  if (MANGE) { // Verifie si le snake a mangé  
    score += 10;// ajoute +10 au score 
    document.getElementById('score').innerHTML = score;// change le score au dessuss
    Nourriture();
  } 
  else {
    // Eleve la partie ajoute a l'arriere
    snake.pop();
  }
}

function Mouvement(event) {// Permet au snake de bouge correctement
  const GAUCHE = 37;
  const DROITE = 39;
  const HAUT = 38;
  const BAS = 40;
  
  if (Direction) return;
  Direction = true;

  const keyPressed = event.keyCode;

  const ALLEHAUT = dy === -10;
  const ALLEBAS = dy === 10;
  const ALLEDROITE = dx === 10;
  const ALLEGAUCHE = dx === -10;

  if (keyPressed === GAUCHE && !ALLEDROITE) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === HAUT && !ALLEBAS) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === DROITE && !ALLEGAUCHE) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === BAS && !ALLEHAUT) {
    dx = 0;
    dy = 10;
  }
}

function clearCanvas() {
  
  ctx.fillStyle = BACKGROUND;// Choissie la couleu du fond
  ctx.strokestyle = COULEUR_LIMITE;// Choissie la couleu des bordures 

  // Draw a "filled" rectangle to cover the entire canvas
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  // Draw a "border" around the entire canvas
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function randomN(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function Nourriture() {//place la nourriture de facon aleatoire
  
  foodX = randomN(0, gameCanvas.width - 10);//Place la nourriture sur l'axe ds X
  foodY = randomN(0, gameCanvas.height - 10);// Place la nourriture sur l'axe ds Y
  snake.forEach(function isFoodOnSnake(part) {// empeche la nourriture te le snake d'etre au meme endroit
    const foodIsoNsnake = part.x == foodX && part.y == foodY;
    if (foodIsoNsnake) Nourriture();
  });
}

function GameOver() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }

  const murG = snake[0].x < 0;
  const murD = snake[0].x > gameCanvas.width - 10;
  const murH = snake[0].y < 0;
  const murB = snake[0].y > gameCanvas.height - 10;

  return murB ||murH || murD || murG
}

function jeu() {
  if (GameOver()) {
    alert("vous avez perdu");
    const restartButton = document.getElementById('Button');
    return;
  }

  setTimeout(function onTick() {
    Direction = false;
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();
    jeu();
  }, GAME_SPEED);
}

function restartGame() 
{
  const restartButton = document.getElementById('Button');
  if (restartButton) {
    restartButton.style.display = 'none';
  }
  InitJeu();
}

