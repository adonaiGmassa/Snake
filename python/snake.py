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
