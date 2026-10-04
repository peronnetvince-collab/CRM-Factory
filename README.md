# SIGMA Factory CRM — départ propre, sans connexion

## Installation dans votre dépôt GitHub vide
1. Extraire tout le ZIP sur le PC.
2. Sur GitHub CRM-Factory, branche main, cliquer Add file → Upload files.
3. Glisser TOUS les fichiers et dossiers à l’intérieur du dossier extrait. Ne pas glisser le dossier parent ou le ZIP.
4. Ne créer ni renommer aucun dossier. Valider Commit changes.
5. Attendre le nouveau déploiement Netlify Published. Le journal doit afficher sigma-factory-crm@1.4.0.

Les dossiers à la racine sont public, netlify, scripts et tests.
Les fichiers à la racine comprennent package.json, package-lock.json et netlify.toml.
La fonction est exactement à netlify/functions/crm.mjs.

## Accès
Le CRM ouvre directement la vue d’ensemble. Aucun login, mot de passe ou secret à configurer. Toute personne disposant du lien peut lire et modifier les données et documents.

## Netlify
Configuration fournie : base racine, commande npm run build, dossier publié public, fonctions netlify/functions, Node 22.
Le dépôt existant reste lié au site Netlify. Ne pas supprimer le site ni son stockage de documents pour mettre le code à jour.

## Sauvegarde partagée
Netlify Blobs reçoit les données et fichiers, avec confirmation visuelle de sauvegarde. Garder la page ouverte tant qu’une sauvegarde reste en attente.
Les autres postes recherchent les mises à jour toutes les 5 secondes. Une actualisation est proposée pendant une saisie. Les conflits sont refusés et demandent une réconciliation humaine, sans écrasement silencieux.
Le tri documentaire utilise des règles : les fichiers ou informations ambigus nécessitent une vérification humaine. Les URL ne donnent pas automatiquement accès au contenu des services privés.

## Contrôles
Version applicative conservée après tests UI et serveur. Rapports VERIFICATION.txt et VERIFICATION_SERVEUR.txt.
Contrôles locaux sous jsdom et avec stockage simulé ; le ZIP seul n’effectue pas un déploiement.
Après publication, créer un lead depuis un navigateur et vérifier la confirmation puis sa lecture depuis un second navigateur.
