const {spawnSync}=require('child_process'),path=require('path'),assert=require('assert');
const html=path.resolve(__dirname,'../public/index.html');
for(const test of ['interactions','navigation','fiches','relations']){
 const r=spawnSync(process.execPath,[path.join(__dirname,test+'.cjs'),html],{encoding:'utf8'});
 process.stdout.write(r.stdout||'');process.stderr.write(r.stderr||'');
 assert.equal(r.status,0,'Échec : '+test);
 if(test==='fiches'){assert(r.stdout.includes('IMMEDIATE CLOSE SAVED true'));assert(r.stdout.includes('PROPERTY CLOSE SAVED true'));assert(r.stdout.includes('ERRORS []'));}
 if(test==='relations'){
 for(const marker of ['AUTOSAVE Test sauvegarde','CONTACT LINKS true','SAV litige true false','SAV care false true','SAV pipeline false false','PROPERTY OPENS true','IMPORT IDEMPOTENT true','URL DEPOSIT true','CLOUD CROSS LINK true','LEAD DOC LINK true','NO EARLY CA true','CA COMPROMISE true','CA LOAN true','NO CA FOLLOWUP true','BOT AUTOMATIC true','BOT PUSH true','BOT NO DUPLICATES true','ARCHIVE PERSISTED true','ARCHIVE CONSULTABLE true','ARCHIVE RESTORED true','CONTACT FORM true','VISIT SAVED true','DATES HISTORY true','KNOWLEDGE MEMORY true','VISIT PROPERTY OPENS true','PROPERTY LEAD BACKLINK true','RELOAD LEAD true','RELOAD CONTACT true','AUTO KNOWLEDGE true','FINAL ERRORS []'])assert(r.stdout.includes(marker),'Contrôle absent ou échoué : '+marker);
 }
}
console.log('Toutes les suites exécutées ont réussi.');
