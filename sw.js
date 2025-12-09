const CACHE_NAME = 'fisioheav-cache-v1';
// Lista de TODOS los archivos necesarios (incluyendo librerías externas para modo offline)
const urlsToCache = [
  './', 
  'index.html',
  'manifest.json',
  'sw.js',
  // Librerías externas (CDN)
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdn.jsdelivr.net/npm/signature_pad@4.1.7/dist/signature_pad.umd.min.js',
  // Iconos del manifiesto (¡DEBEN EXISTIR!)
  'favicon-192.png',
  'favicon-512.png',
  // URL de la imagen del logo
  'https://scontent.ftgz1-1.fna.fbcdn.net/v/t39.30808-6/566228684_25020217447666386_1034558766853531360_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=B0GSWpfcMUMQ7kNvwGfHxtF&_nc_oc=Adl0oUrx4ZGWTb3CM9CV-6qITPCP-JxKcN43j_RMBYbHOmlBmShVfA62mszx50faTuE&_nc_zt=23&_nc_ht=scontent.ftgz1-1.fna&_nc_gid=gO3oNE9G78R6UWFn53Ly_A&oh=00_AfmGG1gj061o333dTAL1eoUo8RwdfgaOLICWcYXJiSFhyw&oe=693D630D'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache); 
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});