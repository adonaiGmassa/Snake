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

# Dessiner le bouton "Recommencer"
def DESSINER_BOUTON_RECOMMENCER():
    bouton_rect = pygame.Rect(LARGUR / 3, HAUTEUR / 2 + 50, LARGUR / 3, 50)
    
    # Gestion de la couleur du bouton en fonction du survol
    souris_pos = pygame.mouse.get_pos()
    if bouton_rect.collidepoint(souris_pos):
        couleur_bouton = (100, 150, 255)  # Couleur plus claire au survol
    else:
        couleur_bouton = BLEU
    
    # Dessiner le bouton
    pygame.draw.rect(fenetre, couleur_bouton, bouton_rect)
    pygame.draw.rect(fenetre, NOIR, bouton_rect, 2)  # Bordure noire autour du bouton
    
    # Afficher le texte centré sur le bouton
    texte = FONT_STYLE.render("Recommencer", True, NOIR)
    texte_rect = texte.get_rect(center=bouton_rect.center)  # Centre le texte
    fenetre.blit(texte, texte_rect)

    return bouton_rect


def jeu():
    # Position initiale du serpent
    x1 = LARGUR / 2
    y1 = HAUTEUR / 2

    # Changements de position
    x1_change = 0
    y1_change = 0

    # Liste pour le corps du serpent
    serpent = []
    longueur_serpent = 1

    # Position de la nourriture
    nourriture_x = round(random.randrange(0, LARGUR - TAILLE_SEGMENT) / 10.0) * 10.0
    nourriture_y = round(random.randrange(0, HAUTEUR - TAILLE_SEGMENT) / 10.0) * 10.0

    # Score initial
    score = 0

    # Boucle principale du jeu
    jeu_en_cours = True

    while jeu_en_cours:

        for event in pygame.event.get():

            if event.type == pygame.QUIT:
                jeu_en_cours = False

            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    x1_change = -TAILLE_SEGMENT
                    y1_change = 0
                elif event.key == pygame.K_RIGHT:
                    x1_change = TAILLE_SEGMENT
                    y1_change = 0
                elif event.key == pygame.K_UP:
                    y1_change = -TAILLE_SEGMENT
                    x1_change = 0
                elif event.key == pygame.K_DOWN:
                    y1_change = TAILLE_SEGMENT
                    x1_change = 0

        # Vérification des limites
        if x1 >= LARGUR or x1 < 0 or y1 >= HAUTEUR or y1 < 0:
            jeu_en_cours = False

        # Mise à jour de la position du serpent
        x1 += x1_change
        y1 += y1_change

        fenetre.fill(BLANC)  # Remplir l'écran avec la couleur blanche
        pygame.draw.rect(fenetre, ROUGE, [nourriture_x, nourriture_y, TAILLE_SEGMENT, TAILLE_SEGMENT])  # Dessiner la nourriture
        serpent_tete = []
        serpent_tete.append(x1)
        serpent_tete.append(y1)
        serpent.append(serpent_tete)

        if len(serpent) > longueur_serpent:
            del serpent[0]

        # Vérification de collision avec le corps du serpent
        for segment in serpent[:-1]:
            if segment == serpent_tete:
                jeu_en_cours = False

        DESSINER_SERPENT(TAILLE_SEGMENT, serpent)  # Dessiner le serpent
        AFFICHER_SCORE(score)  # Afficher le score
        pygame.display.update()  # Mettre à jour l'affichage

        # Vérification de la collision avec la nourriture
        if x1 == nourriture_x and y1 == nourriture_y:
            nourriture_x = round(random.randrange(0, LARGUR - TAILLE_SEGMENT) / 10.0) * 10.0
            nourriture_y = round(random.randrange(0, HAUTEUR - TAILLE_SEGMENT) / 10.0) * 10.0
            longueur_serpent += 1  # Augmenter la longueur du serpent
            score += 1  # Augmenter le score

        horloge.tick(VITESSE)  # Contrôler la vitesse du jeu

    # Afficher le message de fin de jeu et le bouton
    fenetre.fill(BLANC)
    MESSAGE("Game Over ! Votre score: " + str(score), ROUGE)
    bouton_rect = DESSINER_BOUTON_RECOMMENCER()
    pygame.display.update()

    # Attendre que l'utilisateur clique sur "Recommencer"
    en_attente = True
    while en_attente:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                en_attente = False
            if event.type == pygame.MOUSEBUTTONDOWN:
                if bouton_rect.collidepoint(event.pos):
                    jeu()  # Redémarrer le jeu


# Démarrer le jeu
jeu()

