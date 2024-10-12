# bibliothèque utilisée
import pygame
import time
import random

# Couleurs
BLANC = (255, 255, 255)
NOIR = (0, 0, 0)
ROUGE = (213, 50, 80)
VERT = (0, 255, 0)
BLEU = (50, 153, 213)

# Dimensions de la fenêtre
LARGUR = 600
HAUTEUR = 400

# Initialiser Pygame
pygame.init()

# Créer la fenêtre
fenetre = pygame.display.set_mode((LARGUR, HAUTEUR))
pygame.display.set_caption("Snake")

# Contrôles de la vitesse
horloge = pygame.time.Clock()
VITESSE = 15

# Taille des segments du serpent
TAILLE_SEGMENT = 10

# Police pour le score
FONT_STYLE = pygame.font.SysFont("arial", 25)
FONT_SCORE = pygame.font.SysFont("bahnschrift", 35)


# Dessine le serpent
def DESSINER_SERPENT(TAILLE_SEGMENT, serpent):
    for x in serpent:
        pygame.draw.rect(fenetre, VERT, [x[0], x[1], TAILLE_SEGMENT, TAILLE_SEGMENT])

# Afficher le score     
def AFFICHER_SCORE(score):
    valeur = FONT_SCORE.render("Score : " + str(score), True, NOIR)
    fenetre.blit(valeur, [0, 0])

# Afficher un message
def MESSAGE(msg, couleur):
    mesg = FONT_STYLE.render(msg, True, couleur)
    fenetre.blit(mesg, [LARGUR / 6, HAUTEUR / 3])
