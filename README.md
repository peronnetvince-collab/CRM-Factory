# SIGMA Factory CRM — SIMPLE 1.2

CRM existant conservé, connexion serveur et sauvegarde partagée préparées pour Netlify.

## Installer : cinq étapes
1. Décompresser SIGMA_FACTORY_CRM_SIMPLE.zip avec « Extraire tout ».
2. Dans le dépôt GitHub CRM-Factory, déposer tous les fichiers ET dossiers extraits à la racine, puis Commit changes sur main. Le ZIP n'a aucun dossier parent supplémentaire. Ne pas déplacer netlify.toml dans public, ne pas renommer crm.mjs ni supprimer ses extensions. Conserver le dépôt existant permet de garder son lien avec Netlify.
3. Vérifier dans GitHub ces trois chemins : public/index.html ; netlify/functions/crm.mjs ; scripts/check-deploy.cjs. Le fichier package.json et netlify.toml doivent être au premier niveau.
4. Dans Netlify → Environment variables, créer les deux variables ci-dessous, disponibles pour les fonctions.
5. Dans Netlify → Deploys, attendre le nouveau déploiement Published. S'il ne démarre pas, Trigger deploy. La rubrique Functions doit afficher crm. Actualiser ensuite le site avec Ctrl + F5.

## Variables privées à saisir dans Netlify
| Nom | Valeur |
| --- | --- |
| SIGMA_LOGIN | FACTORY_Login |
| SIGMA_PASSWORD | Le mot de passe partagé choisi dans la conversation |

La clé de session est dérivée automatiquement côté serveur à partir des identifiants privés. Aucun secret supplémentaire à saisir. Changer le mot de passe déconnecte les sessions existantes.
Ne publier aucune de ces valeurs dans GitHub. Le ZIP ne peut pas configurer automatiquement le compte Netlify.

## Réglages Netlify
Base : racine du dépôt. Commande : npm run build. Dossier publié : public. Fonctions : netlify/functions. Node : 22. Tous ces réglages sont fournis dans netlify.toml. Les dépendances sont verrouillées dans package-lock.json.

## Ce que cette version vérifie
Présence de tous les fichiers nécessaires et syntaxe JavaScript au build. Erreurs de connexion explicites pour un service absent, une réponse vide, une panne réseau ou une configuration manquante. Une session serveur valide ouvre la vue d'ensemble.

## Données et travail partagé
Les écritures des leads, contacts, biens, photos, documents, relations, archivages, Drive Pilote et mémoire de connaissances utilisent le stockage commun Netlify Blobs du même site. Les fichiers sont envoyés par blocs de 512 Kio. Les brouillons restent locaux. L'indicateur confirme la sauvegarde uniquement après réponse serveur ; garder la page ouverte tant que des modifications sont en attente.
Les mises à jour des autres équipes sont vérifiées toutes les 5 secondes. Une actualisation est proposée pendant une saisie. Les écritures concurrentes sur une même clé sont refusées avec un message de conflit et un export des changements locaux ; la fusion automatique n'est pas implémentée. Deux dossiers différents peuvent déclencher ce conflit lorsque leur tableau partagé est le même. L'accès commun n'identifie pas individuellement chaque collaborateur.

## Datathèque et connaissance
Après dépôt, les tableaux métier reconnus alimentent les leads, biens ou contacts. Les textes explicatifs TXT/MD reconnus deviennent des articles sourcés dans la base de connaissance. Les fichiers ambigus et les formats sans lecteur sont marqués À vérifier. Le tri utilise des règles ; il ne comprend pas universellement les PDF, Word, images ou sites web. Les liens distants restent soumis aux autorisations de leur service d'origine.

## Avant de travailler avec les équipes
Tester depuis deux navigateurs : créer un lead, modifier un contact, déposer un document et une photo, rattacher une pièce, archiver puis restaurer. Attendre la confirmation de sauvegarde sur A et vérifier la lecture sur B. Tester également les conflits et une coupure réseau.
Cette version n'est pas déployée par la livraison du ZIP. Les tests locaux ne remplacent pas cette validation Netlify réelle. Les anciennes données locales ne sont pas migrées automatiquement vers un site partagé déjà rempli. Sauvegarder les exports avant migration. Pas de sauvegarde externe planifiée ni de restauration serveur par version dans cette livraison.

## Contrôles techniques
npm ci ; npm run build ; npm test ; npm run test:shared.
Les résultats et limites de validation sont dans CONTROLES_RESULTATS.txt et CONTROLES.md.
