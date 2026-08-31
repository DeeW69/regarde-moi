# Regarde-moi

Un petit site cadeau construit autour de **15 souvenirs**, à découvrir progressivement.

## Ajouter les photos

Dans le dossier `photos/`, ajouter les fichiers `01.jpg` à `15.jpg`. La correspondance exacte est indiquée dans `photos/README.md`.

## Déblocage quotidien

Dans `script.js`, modifier :

```js
const STORY_START=null;
```

par exemple en :

```js
const STORY_START='2026-10-31';
```

Le souvenir 1 sera alors accessible le 31 octobre, le 2 le lendemain, etc. Les souvenirs déjà débloqués restent accessibles depuis l'historique.

Avec `null`, les 15 souvenirs sont accessibles : c'est le mode pratique pour tester le site.

## Publication

Le site est volontairement en HTML/CSS/JS pur afin de pouvoir être publié directement avec GitHub Pages.
