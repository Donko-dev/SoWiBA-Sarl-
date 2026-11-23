const K='sw_data',$=s=>document.querySelector(s),mk=(t,c)=>{const n=document.createElement(t);if(c)n.className=c;return n};
const sha=async s=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))].map(b=>b.toString(16).padStart(2,'0')).join('');
let S;try{const l=JSON.parse(localStorage[K]);if(l&&l.ver===SITE.ver)S=l}catch(x){}S=S||JSON.parse(JSON.stringify(SITE));
const IK=['logo','logoWide','p','m','e','e2','ii','src','img'],FT=['system-ui, sans-serif','Georgia, serif','Trebuchet MS, sans-serif','Verdana, sans-serif','Courier New, monospace'],TPL={reviews:{n:'',r:5,t:''},news:{d:'2026-01-01',t:{fr:'',en:''},x:{fr:'',en:''}}};
const TABS=[['Général',['name','tag','logo','logoWide','colors','font','size']],['Services',['services']],['Réalisations, photos & vidéos',['offers']],['Plans 3D',['plans']],['Actualités',['news']],['Avis',['reviews']],['Contacts',['c','kpi']],['À propos & bureaux',['about','offices','trust']],['Mentions légales',['legal','legalTxt','cgu','privacy']],['Sécurité',[]]];
const blank=x=>Array.isArray(x)?[]:x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k,blank(v)])):typeof x==='number'?0:'';
const lab=it=>{const x=it.t||it.n||it.d||Object.values(it)[0];return typeof x==='object'?x.fr:x};
const msg=m=>{const n=$('#msg');n.textContent=m;n.hidden=false;setTimeout(()=>n.hidden=true,2200)};
const save=()=>{try{localStorage[K]=JSON.stringify(S);msg('Enregistré sur cet appareil')}catch(x){msg('Stockage plein : utilisez Exporter data.js')}};
function fld(o,k){const v=o[k],w=mk('div','f'),lb=mk('label');lb.textContent=k;w.append(lb);
if(Array.isArray(v)&&(TPL[k]||typeof v[0]==='object')){const box=mk('div'),draw=()=>{box.innerHTML='';v.forEach((it,i)=>{const d=mk('details'),s=mk('summary');s.textContent=(i+1)+'. '+lab(it);d.append(s);Object.keys(it).forEach(x=>d.append(fld(it,x)));const b=mk('button','d');b.textContent='🗑 Supprimer';b.onclick=()=>{if(confirm('Supprimer cet élément ?')){v.splice(i,1);draw()}};d.append(b);box.append(d)});const a=mk('button','o');a.textContent='＋ Ajouter';a.onclick=()=>{v.push(JSON.parse(JSON.stringify(TPL[k]||blank(v[0]))));draw()};box.append(a)};draw();w.append(box)}
else if(Array.isArray(v)){const a=mk('textarea');a.rows=Math.max(3,v.length+1);a.value=v.join('\n');a.oninput=()=>o[k]=a.value.split('\n').filter(Boolean);w.append(a)}
else if(v&&typeof v==='object'){const g=mk('div','g');Object.keys(v).forEach(x=>g.append(fld(v,x)));w.append(g)}
else if(k==='font'){const s=mk('select');FT.forEach(f=>{const p=mk('option');p.textContent=f;s.append(p)});s.value=v;s.onchange=()=>o[k]=s.value;w.append(s)}
else{const big=typeof v==='string'&&v.length>70,i=mk(big?'textarea':'input');if(big)i.rows=4;else i.type=/^#[0-9a-f]{6}$/i.test(v)?'color':typeof v==='number'?'number':'text';i.value=v;i.oninput=()=>o[k]=typeof v==='number'?+i.value:i.value;w.append(i);
if(IK.includes(k)){const f=mk('input');f.type='file';f.accept='image/*,video/*';f.onchange=()=>{const r=new FileReader();r.onload=()=>{o[k]=r.result;i.value=r.result.slice(0,50)+'…';msg('Fichier intégré (préférez un nom de fichier envoyé sur GitHub)')};r.readAsDataURL(f.files[0])};w.append(f)}}
return w}
function tab(i){const ed=$('#ed');ed.innerHTML='';[...$('#tabs').children].forEach((b,j)=>b.classList.toggle('on',i===j));
if(i===TABS.length-1){const d=mk('div','f');d.innerHTML='<label>Nouveau mot de passe</label><input type="password" id="np"><button id="sp">Changer le mot de passe</button><p>Mot de passe par défaut : voir le fichier .env. Après un changement, exportez data.js et publiez-le pour que le nouveau mot de passe soit valable partout.</p>';ed.append(d);$('#sp').onclick=async()=>{if($('#np').value.length<6)return alert('6 caractères minimum');S.ph=await sha($('#np').value);localStorage.sw_ph=S.ph;save()};return}
TABS[i][1].forEach(k=>ed.append(fld(S,k)))}
function go(){$('#lg').hidden=true;$('#ad').hidden=false;TABS.forEach((t,i)=>{const b=mk('button');b.textContent=t[0];b.onclick=()=>tab(i);$('#tabs').append(b)});tab(0)}
$('#lf').onsubmit=async ev=>{ev.preventDefault();if(!crypto.subtle){$('#er').textContent='Ouvrez le site en HTTPS.';return}(await sha($('#pw').value))===(localStorage.sw_ph||SITE.ph)?(sessionStorage.sw_ok=1,go()):$('#er').textContent='Mot de passe incorrect.'};
$('#sv').onclick=save;
$('#ex').onclick=()=>{const a=mk('a');a.href=URL.createObjectURL(new Blob(['window.SITE='+JSON.stringify(S,null,1)+';'],{type:'text/javascript'}));a.download='data.js';a.click()};
$('#rs').onclick=()=>{if(confirm('Effacer les modifications locales ?')){localStorage.removeItem(K);location.reload()}};
if(sessionStorage.sw_ok)go();
