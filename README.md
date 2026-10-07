# SIGMA Factory CRM — administrateur 1.5
Accueil limité à l’en-tête et au bloc principal de la capture, sans sections supplémentaires ni défilement. Le contenu s’ajuste à la hauteur disponible.
Accès CRM réservé à une session authentifiée côté serveur. Les URL de données et documents refusent l’accès hors connexion. Les boutons de l’accueil demandent une connexion.

## Déploiement
Extraire le ZIP, remplacer les fichiers à la racine GitHub en conservant les dossiers, Commit changes.
Dans Netlify, variables disponibles pour les fonctions : SIGMA_LOGIN = CRM_Factory ; SIGMA_PASSWORD = le nouveau mot de passe demandé dans la conversation. Ne pas inscrire le mot de passe dans GitHub ou dans le HTML.
Aucune variable de secret supplémentaire nécessaire. Déployer puis tester avec le nouvel identifiant et mot de passe. Version attendue dans le journal : 1.5.0.

## Données
Stockage partagé Netlify Blobs conservé ; conflits détectés sans écrasement. Actualisation des autres postes toutes les 5 secondes. Garder la page ouverte tant que la sauvegarde est en attente.
Accès admin commun, sans comptes individuels. Cookie HttpOnly, session huit heures. Changement du mot de passe invalide les sessions.
Tests locaux UI et serveur simulé ; valider ensuite le déploiement et le travail à deux navigateurs. Pas de déploiement effectué par cette livraison.
