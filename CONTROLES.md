# Contrôles de cette livraison

Les tests UI s'exécutent sous jsdom : navigation, actions du Pipe, liens leads/contacts/biens/documents, SAV, archivage/restauration, tri automatique métier sans doublon, article explicatif ajouté automatiquement à la base de connaissance, visites, historiques, fermeture de fiches et persistance locale, calculs business au compromis et à l'offre de prêt, guides de connaissance.

Tests serveur avec stockage simulé : refus hors connexion, mauvais mot de passe, connexion, cookie HttpOnly, lecture partagée, écriture conditionnelle, refus des versions obsolètes sans écrasement, transfert d'un bloc fichier et refus d'une origine étrangère.

Les scripts du client partagé et de la fonction serveur ont passé la vérification de syntaxe Node. Voir CONTROLES_RESULTATS.txt pour les résultats.

Ces contrôles ne constituent pas un test de déploiement Netlify, de performance, de sécurité exhaustif ou une validation visuelle en navigateur réel. Le protocole de validation entre deux postes figure dans README.md.

Correctif connexion : tests réussis pour erreur 404 vide, 404 HTML, réponse 200 vide, configuration absente et mauvais mot de passe. Vérification de syntaxe et contrôle de présence des fichiers requis réussis. Pas de modification effectuée sur le site Netlify existant.

Version clean du 04/10/2026 : dépendances verrouillées et ouverture de la vue d’ensemble après chargement de la session serveur. Test de démarrage avec session valide inclus.

Version SIMPLE 1.2 : aucune variable SIGMA_SESSION_SECRET nécessaire ; tests de connexion sans cette variable et invalidation des sessions au changement de mot de passe.
