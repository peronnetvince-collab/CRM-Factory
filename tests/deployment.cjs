const fs=require('fs'),path=require('path'),os=require('os'),assert=require('assert'),{execFileSync}=require('child_process');
const root=path.resolve(__dirname,'..');
for(const folder of ['functions','founctions']){
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'sigma-deploy-'));
 fs.mkdirSync(path.join(temp,'public'),{recursive:true});fs.mkdirSync(path.join(temp,'netlify',folder),{recursive:true});fs.mkdirSync(path.join(temp,'scripts'));
 for(const f of ['public/index.html','public/shared-storage.js','netlify.toml','scripts/check-deploy.cjs'])fs.copyFileSync(path.join(root,f),path.join(temp,f));
 fs.copyFileSync(path.join(root,'netlify/functions/crm.mjs'),path.join(temp,'netlify',folder,'crm.mjs'));
 execFileSync(process.execPath,[path.join(temp,'scripts/check-deploy.cjs')],{cwd:os.tmpdir()});
 assert.equal(fs.readFileSync(path.join(temp,'netlify/functions/crm.mjs'),'utf8'),fs.readFileSync(path.join(root,'netlify/functions/crm.mjs'),'utf8'));
 fs.rmSync(temp,{recursive:true,force:true});
}
console.log('PASS : build depuis un autre dossier et correction du chemin founctions, fonction conservée à l’identique.');
