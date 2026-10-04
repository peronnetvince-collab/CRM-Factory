# SIGMA Factory CRM — version partagée Netlify

## Installer via GitHub / Netlify
1. Décompresser le ZIP à la racine du dépôt GitHub, en conservant public/, netlify/, package.json et netlify.toml.
2. Relier le dépôt à Netlify. Répertoire publié : public. Les fonctions sont dans netlify/functions. Netlify installe la dépendance @netlify/blobs.
3. Dans Netlify > Environment variables, créer les variables suivantes, disponibles aux Functions :
   - SIGMA_LOGIN : SIGMA_Factory
   - SIGMA_PASSWORD : le mot de passe partagé demandé par le propriétaire (le saisir dans Netlify, jamais dans GitHub).
   - SIGMA_SESSION_SECRET : une chaîne aléatoire d'au moins 32 caractères, distincte du mot de passe. Exemple de génération : node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
4. Redéployer. Se connecter depuis deux navigateurs et effectuer les contrôles ci-dessous. Ouvrir le HTML directement ne fournit pas la synchronisation ; Netlify Functions doit fonctionner.

## Ce qui est partagé
Les écritures des leads, du Pipe, des relations, des contacts, des biens, des photos, des documents, de l'archivage, du Drive Pilote et de la mémoire de connaissances passent par un stockage Netlify Blobs commun au site. Les fichiers sont transmis en blocs de 512 Kio, les métadonnées par clé. Les dates et historiques existants sont conservés. Les brouillons et l'état de connexion restent propres au navigateur.

Un indicateur annonce les modifications en attente, la synchronisation, la sauvegarde confirmée ou une erreur. Une copie locale conserve les modifications en cas d'indisponibilité réseau. Ne pas fermer tant que la sauvegarde partagée n'est pas confirmée. Les nouvelles tentatives ont lieu toutes les cinq secondes ; en cas de panne prolongée, garder la page ouverte.

## Fonctionnement multi-équipe et limites explicites
- Vérification des mises à jour toutes les 5 secondes. Actualisation automatique hors saisie ; bouton Actualiser si une saisie a eu lieu. Ce n'est pas une synchronisation instantanée par WebSocket.
- Écritures conditionnelles : une version ancienne ne peut pas écraser une version distante. En cas de conflit, les écritures sont bloquées et un bouton permet d'exporter les modifications non synchronisées. Après export, recharger puis ressaisir les changements à conserver. La fusion concurrente automatique n'est pas implémentée.
- Les tableaux monolithiques signifient que deux équipes modifiant deux leads peuvent aussi déclencher un conflit. Pour un usage intensif, une base par dossier avec fusion par champ sera nécessaire.
- L'accès partagé ne permet pas d'identifier individuellement chaque collaborateur. Les sessions durent 8 heures et utilisent un cookie HttpOnly.
- Les données des versions locales antérieures ne sont pas automatiquement migrées vers un site déjà rempli. Sauvegarder/exporter avant migration et vérifier le résultat.
- Métadonnées limitées à 3 Mo par écriture. Les documents distants restent des liens ; leurs droits d'accès dépendent de leur service d'origine. Le bot réalise une classification et des imports structurés existants, pas une compréhension universelle des PDF/Word.
- Pas de sauvegarde externe planifiée ni de restauration par version serveur dans cette livraison : organiser les exports et sauvegardes avant un usage de production.

## Présentation Datathèque
Colonnes sans retour à la ligne ; pseudo, source et taille alignés ; type, catégorie, date et état lisibles ; actions sur une seule ligne. Défilement horizontal conservé pour accéder à tous les rattachements et boutons, y compris sur tablette et téléphone.

## Vérification après déploiement obligatoire
A crée un lead puis attend « toutes les modifications sont sauvegardées ». B doit le voir après actualisation. Répéter pour un contact, un bien, une photo, un fichier, un rattachement et un archivage ; ouvrir le document depuis B. Modifier simultanément une même clé : la seconde sauvegarde doit afficher un conflit sans écraser la première. Couper le réseau : l'indicateur doit afficher une erreur et aucune fausse confirmation de sauvegarde.

Les tests inclus s'exécutent avec npm install puis npm test et npm run test:shared. Les services Netlify réels et l'affichage dans un navigateur réel n'ont pas été validés dans cet environnement. Cette archive n'est pas déjà déployée.

## Tri automatique après dépôt
Chaque nouveau dépôt lance le traitement après son enregistrement. Les tableaux CSV/TSV/JSON/Excel reconnus alimentent les leads, biens ou contacts selon leur destination. Les textes explicatifs TXT/MD reconnus (guide, procédure, fonctionnement, écosystème…) deviennent des articles sourcés dans la base de connaissance, consultables par thème et recherche. Les imports restent idempotents. Les URL, PDF/Word/images sans lecteur et contenus ambigus sont marqués « À vérifier » ; leur contenu n'est pas inventé ni automatiquement importé. Cette version utilise des règles, pas un modèle IA universel. Le bouton Tri Bot & Push CRM permet de relancer un traitement après clarification.
