self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{
 let d={}; try{d=e.data?e.data.json():{}}catch(_){d={body:e.data?e.data.text():''}}
 e.waitUntil(self.registration.showNotification(d.title||'המספרה של שמואל',{
  body:d.body||'יש לך התראה חדשה',icon:d.icon||'/icon-192.png',
  badge:d.badge||'/icon-192.png',tag:d.tag||'shmuel-notification',
  renotify:true,data:{url:d.url||'/'}
 }));
});
self.addEventListener('notificationclick',e=>{
 e.notification.close(); const u=e.notification.data?.url||'/';
 e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(a=>{
  for(const c of a){if('focus' in c){c.navigate(u);return c.focus()}}
  return clients.openWindow?clients.openWindow(u):undefined;
 }));
});