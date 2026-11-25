# Légendes Éclosia

Un RPG de créatures en pixel art, jouable directement dans le navigateur (ordinateur ou téléphone).

## Jouer

Une fois GitHub Pages activé, le jeu est accessible ici :

**https://fazelishayan817-dot.github.io/legend-eclosia/**

## Contenu

- Deux continents et dix régions des Quatre Terres, chacun avec son biome (neige, volcan, plage, jungle, montagne, désert, marais…)
- Des villes qui grandissent au fil de l'histoire : maisons, centre commercial, usine, quartier d'affaires, chantiers
- Une carte du monde et un atlas illustré
- Une couche société et géopolitique : élections, réputation, laissez-passer, opinions des habitants
- Mode paysage adapté au téléphone, avec un bouton pour forcer la rotation

## Commandes

- Clavier : flèches pour se déplacer, Entrée ou A pour valider, Échap pour le menu
- Téléphone : croix directionnelle et boutons tactiles à l'écran

## Lancer en local

Aucun outil à installer. Il suffit d'un petit serveur web statique à la racine du dépôt :

```
python3 -m http.server 8000
```

Ouvrir ensuite http://localhost:8000 dans le navigateur.

## Sauvegardes

La progression est enregistrée dans le navigateur (localStorage). Elle est propre à chaque adresse : une partie commencée sur une autre version du jeu ne se retrouve pas automatiquement ici.

## Polices

- Pixelify Sans (licence SIL Open Font)
- Levi Brush (titre et « Appuie sur A »)
