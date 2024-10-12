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

# Créer la fenêtre
fenetre = pygame.display.set_mode((LARGUR, HAUTEUR))
pygame.display.set_caption("Snake")

# Contrôles de la vitesse
horloge = pygame.time.Clock()
VITESSE = 15

# Taille des segments du serpent
TAILLE_SEGMENT = 10

# Police pour le score
font_style = pygame.font.SysFont("arial", 25)
score_font = pygame.font.SysFont("arila black", 35)

# Dessine le serpent
def DESSINER_SERPENT(TAILLE_SEGMENT, serpent):
    for x in serpent:
        pygame.draw.rect(fenetre, VERT, [x[0], x[1], TAILLE_SEGMENT, TAILLE_SEGMENT])

# Afficher le score     
def AFFICHER_SCORE(score):
    valeur = score_font.render("Score: " + str(score), True, NOIR)
    fenetre.blit(valeur, [0, 0])

def MESSAGE(msg, couleur):
    mesg = font_style.render(msg, True, couleur)
    fenetre.blit(mesg, [LARGUR / 6, HAUTEUR / 3])