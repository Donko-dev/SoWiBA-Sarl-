const V='sowiba-v3',A=['./','index.html','style.css','app.js','data.js','manifest.json','logo.jpg','favicon.ico','icon-192.png','admin.html','admin.js'];
self.oninstall=e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A)));self.skipWaiting()};
self.onactivate=e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()};
self.onfetch=e=>{const r=e.request;if(r.method!=='GET'||/\.mp4/.test(r.url)||r.headers.has('range'))return;e.respondWith(caches.match(r).then(h=>{const n=fetch(r).then(x=>{if(x.ok&&x.type==='basic'){const c=x.clone();caches.open(V).then(k=>k.put(r,c))}return x}).catch(()=>h);return h||n}))};
