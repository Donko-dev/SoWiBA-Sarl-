const V='sowiba-v5',A=['./','index.html','style.css','app.js','data.js','manifest.json','logo.jpg','favicon.ico','icon-192.png'];
self.oninstall=e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A)));self.skipWaiting()};
self.onactivate=e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()};
self.onfetch=e=>{const r=e.request;if(r.method!=='GET'||/\.mp4|\.webm|api\.php|admin/.test(r.url)||r.headers.has('range'))return;
const put=x=>{if(x.ok&&x.type==='basic'){const c=x.clone();caches.open(V).then(k=>k.put(r,c))}return x};
e.respondWith(/data\.js|index\.html|\/$/.test(r.url)?fetch(r).then(put).catch(()=>caches.match(r)):caches.match(r).then(h=>{const n=fetch(r).then(put).catch(()=>h);return h||n}))};
