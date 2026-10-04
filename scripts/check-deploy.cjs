const fs=require('fs'),assert=require('assert'),{execFileSync}=require('child_process');
for(const f of ['public/index.html','public/shared-storage.js','netlify/functions/crm.mjs','netlify.toml'])assert(fs.existsSync(f),'Fichier nécessaire au déploiement absent : '+f);
for(const f of ['public/shared-storage.js','netlify/functions/crm.mjs'])execFileSync(process.execPath,['--check',f]);
assert(!fs.readFileSync('public/index.html','utf8').includes('CRM_F@ctory_2K26!'),'Un mot de passe ne doit pas être publié dans le HTML.');
console.log('Configuration CRM contrôlée. Netlify doit ensuite compiler et publier la fonction crm.');
