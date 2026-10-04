# Contrôles de cette livraison

Les tests UI s'exécutent sous jsdom : navigation, actions du Pipe, liens leads/contacts/biens/documents, SAV, archivage/restauration, tri automatique métier sans doublon, article explicatif ajouté automatiquement à la base de connaissance, visites, historiques, fermeture de fiches et persistance locale, calculs business au compromis et à l'offre de prêt, guides de connaissance.

Tests serveur avec stockage simulé : refus hors connexion, mauvais mot de passe, connexion, cookie HttpOnly, lecture partagée, écriture conditionnelle, refus des versions obsolètes sans écrasement, transfert d'un bloc fichier et refus d'une origine étrangère.

Les scripts du client partagé et de la fonction serveur ont passé la vérification de syntaxe Node. Voir tests/results-current.txt pour les résultats.

Ces contrôles ne constituent pas un test de déploiement Netlify, de performance, de sécurité exhaustif ou une validation visuelle en navigateur réel. Le protocole de validation entre deux postes figure dans README.md.
