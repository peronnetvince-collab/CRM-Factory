const fs=require('fs'),assert=require('assert');
(async()=>{
 const records=new Map();let counter=0;
 global.__sigmaStore={list:async()=>({blobs:[...records.keys()].filter(k=>k.startsWith('data/')).map(key=>({key}))}),getWithMetadata:async k=>records.get(k)||null,setJSON:async(k,v,o)=>{const old=records.get(k);if(o.onlyIfNew&&old||o.onlyIfMatch&&old?.etag!==o.onlyIfMatch)return{modified:false};const etag=String(++counter);records.set(k,{data:v,etag});return{modified:true,etag};},set:async(k,v)=>records.set(k,v),get:async k=>records.get(k)||null};
 let source=fs.readFileSync(require('path').join(__dirname,'../netlify/functions/crm.mjs'),'utf8').replace("import {getStore} from '@netlify/blobs';","const getStore=()=>globalThis.__sigmaStore;");
 const {default:handler}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
 delete process.env.SIGMA_LOGIN;delete process.env.SIGMA_PASSWORD;delete process.env.SIGMA_SESSION_SECRET;
 const req=(op,method='GET',body,cookie='',key='')=>new Request('https://sigma.test/.netlify/functions/crm?op='+op+'&key='+key,{method,headers:{origin:'https://sigma.test',cookie},...(body===undefined?{}:{body:typeof body==='string'?body:JSON.stringify(body)})});
 assert.equal((await handler(req('session'))).status,200);const cookie='';
 const key='sigma.factory.contacts';const saved=await handler(req('state','PUT',{value:'{"agents":[]}',etag:null},cookie,key));assert.equal(saved.status,200);const {etag}=await saved.json();
 const state=await(await handler(req('state','GET',undefined,cookie))).json();assert.equal(state.data[key].value,'{"agents":[]}');
 assert.equal((await handler(req('state','PUT',{value:'other',etag:null},cookie,key))).status,409);
 assert.equal((await handler(req('state','PUT',{value:'updated',etag},cookie,key))).status,200);
 assert.equal((await handler(req('state','PUT',{value:'stale',etag},cookie,key))).status,409);assert.equal(records.get('data/'+key).data,'updated');
 const hash='a'.repeat(64);assert.equal((await handler(req('file','PUT','photo',cookie,hash))).status,200);assert.equal(await(await handler(req('file','GET',undefined,cookie,hash))).text(),'photo');
 assert.equal((await handler(new Request('https://sigma.test/.netlify/functions/crm?op=login',{method:'POST',headers:{origin:'https://evil.test'},body:'{}'}))).status,403);
 console.log('PASS accès public sans variables : lecture, sauvegarde partagée, conflits sans écrasement, fichiers, origine étrangère refusée.');
})();
