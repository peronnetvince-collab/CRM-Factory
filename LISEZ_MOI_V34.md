# EBYTDA V34 — maintien de cinq positions simulées

Autopilot vise en permanence cinq positions ouvertes : au scan initial, puis à chaque vérification de 15 secondes, les places libres sont remplies dans l’ordre du classement. Les règles de clôture existantes restent actives. Le maintien de cinq positions accepte des signaux moins forts que le mode sélectif V33.

Limites nécessaires : données LIVE récentes, actif suffisamment ancien, indicateurs disponibles, pas de doublon, délai de réentrée respecté et capital disponible. Le portefeuille peut rester temporairement sous cinq si ces conditions techniques ne sont pas remplies. Aucun prix ni capital n’est inventé pour remplir le compteur.

Exécution en simulation PAPER uniquement, navigateur ouvert et Autopilot actif. Ce ZIP ne déclenche pas d’ordre réel et n’est pas encore déployé.

Déploiement : remplacer le contenu du dépôt avec ce dossier complet. Les clés de sauvegarde existantes sont conservées.
