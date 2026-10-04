import {getStore} from '@netlify/blobs';
export async function save(store,key,value,etag){return store.setJSON('data/'+key,value,etag?{onlyIfMatch:etag}:{onlyIfNew:true});}
export default async function handler(req){
 const reply=(data,status=200,headers={})=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store',...headers}});
 const url=new URL(req.url),op=url.searchParams.get('op')||'state';
 if(req.method!=='GET'&&req.headers.get('origin')!==url.origin)return reply({error:'Origine refusée'},403);
 try{
 if(['session','login','logout'].includes(op))return reply({ok:true,access:'public'});
 const store=getStore({name:'sigma-factory-crm',consistency:'strong'});
 if(op==='state'&&req.method==='GET'){
  const {blobs}=await store.list({prefix:'data/'});const data={};
  await Promise.all(blobs.map(async b=>{const r=await store.getWithMetadata(b.key,{type:'json',consistency:'strong'});if(r)data[b.key.slice(5)]={value:r.data,etag:r.etag};}));return reply({data});
 }
 const key=url.searchParams.get('key')||'';
 if(op==='file'){
  if(!/^[a-f0-9]{64}$/.test(key))return reply({error:'Clé invalide'},400);
  if(req.method==='PUT'){const bytes=await req.arrayBuffer();if(bytes.byteLength>524288)return reply({error:'Bloc trop volumineux'},413);await store.set('files/'+key,bytes);return reply({ok:true});}
  const bytes=await store.get('files/'+key,{type:'arrayBuffer'});return bytes?new Response(bytes,{headers:{'Content-Type':'application/octet-stream','Cache-Control':'no-store'}}):reply({error:'Fichier absent'},404);
 }
 if(op==='state'&&req.method==='PUT'){
  if(!/^sigma\./.test(key)||/auth|draft/.test(key)||key.length>180)return reply({error:'Clé invalide'},400);
  const body=await req.text();if(Buffer.byteLength(body)>3000000)return reply({error:'Données trop volumineuses'},413);
  const {value,etag}=JSON.parse(body),result=await save(store,key,value,etag);
  if(!result.modified)return reply({error:'Conflit : une autre équipe a modifié ces données. Votre version locale est conservée.'},409);
  return reply({etag:result.etag});
 }
 return reply({error:'Action inconnue'},400);
 }catch{return reply({error:'Sauvegarde indisponible. Réessayez sans fermer cette page.'},500);}
}
