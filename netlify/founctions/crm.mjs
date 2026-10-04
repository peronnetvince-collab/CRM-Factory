import {getStore} from '@netlify/blobs';
import {createHmac,timingSafeEqual} from 'node:crypto';
export function equal(a,b){const x=Buffer.from(String(a)),y=Buffer.from(String(b));return x.length===y.length&&timingSafeEqual(x,y);}
export function token(secret,expires){const p=String(expires);return p+'.'+createHmac('sha256',secret).update(p).digest('hex');}
export function authorized(cookie,secret){const v=(cookie||'').match(/(?:^|;\s*)sigma_session=([^;]+)/)?.[1]||'';const [expiry]=v.split('.');return Number(expiry)>Date.now()&&equal(v,token(secret,expiry));}
export async function save(store,key,value,etag){return store.setJSON('data/'+key,value,etag?{onlyIfMatch:etag}:{onlyIfNew:true});}
export default async function handler(req){
 const env=process.env,secret=env.SIGMA_SESSION_SECRET;
 const reply=(data,status=200,headers={})=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store',...headers}});
 if(!secret||secret.length<32||!env.SIGMA_PASSWORD||!env.SIGMA_LOGIN)return reply({error:'Configuration Netlify manquante : consultez README.md.'},503);
 const url=new URL(req.url),op=url.searchParams.get('op')||'state';
 if(req.method!=='GET'&&req.headers.get('origin')!==url.origin)return reply({error:'Origine refusée'},403);
 const cookie=(v)=>`sigma_session=${v}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${v?28800:0}${url.protocol==='https:'?'; Secure':''}`;
 try{
 if(op==='login'&&req.method==='POST'){
  const {login,password}=await req.json();
  if(!equal(login,env.SIGMA_LOGIN)||!equal(password,env.SIGMA_PASSWORD))return reply({error:'Identifiant ou mot de passe incorrect.'},401);
  return reply({ok:true},200,{'Set-Cookie':cookie(token(secret,Date.now()+28800000))});
 }
 if(op==='logout')return reply({ok:true},200,{'Set-Cookie':cookie('')});
 if(!authorized(req.headers.get('cookie'),secret))return reply({error:'Connexion requise'},401);
 if(op==='session')return reply({ok:true});
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
