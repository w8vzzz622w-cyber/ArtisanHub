self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{
  let d={};
  try{d=e.data.json()}catch(_){d={title:'ArtisanHub NG',body:e.data?e.data.text():''}}
  e.waitUntil(self.registration.showNotification(d.title||'ArtisanHub NG',{
    body:d.body||'',icon:'/icon-192.png',badge:'/icon-192.png',data:{url:d.url||'/'}}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const u=new URL((e.notification.data&&e.notification.data.url)||'/',self.location.origin).href;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    for(const c of cs){if('focus' in c){return c.navigate(u).then(x=>(x||c).focus()).catch(()=>c.focus())}}
    return self.clients.openWindow(u);
  }));
});
