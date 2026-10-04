const fs=require('fs'),path=require('path'),assert=require('assert'),{execFileSync}=require('child_process');
const root=path.resolve(__dirname,'..');
const at=f=>path.join(root,f);
// Compatibilité avec le dossier mal orthographié observé dans le dépôt GitHub.
if(!fs.existsSync(at('netlify/functions/crm.mjs'))&&fs.existsSync(at('netlify/founctions/crm.mjs'))){
 fs.mkdirSync(at('netlify/functions'),{recursive:true});
 fs.copyFileSync(at('netlify/founctions/crm.mjs'),at('netlify/functions/crm.mjs'));
 console.log('Chemin corrigé au build : netlify/founctions → netlify/functions.');
}
for(const f of ['public/index.html','public/shared-storage.js','netlify/functions/crm.mjs','netlify.toml'])assert(fs.existsSync(at(f)),'Fichier absent : '+f+' — conserver les dossiers du ZIP.');
for(const f of ['public/shared-storage.js','netlify/functions/crm.mjs'])execFileSync(process.execPath,['--check',at(f)]);
assert(!fs.readFileSync(at('public/index.html'),'utf8').includes('CRM_F@ctory_2K26!'),'Un mot de passe ne doit pas être publié dans le HTML.');
console.log('Configuration CRM contrôlée. Netlify doit ensuite compiler et publier la fonction crm.');
