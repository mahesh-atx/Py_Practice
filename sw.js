self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

let inputRequests = {};

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  if (url.pathname === '/api/get-input') {
    const requestId = url.searchParams.get('id');
    
    event.respondWith(new Promise((resolve) => {
      // Store the resolve function to be called later
      inputRequests[requestId] = resolve;
      
      // Notify the main thread that input is needed
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'REQUEST_INPUT',
            id: requestId
          });
        });
      });
    }));
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PROVIDE_INPUT') {
    const requestId = event.data.id;
    const inputValue = event.data.value;
    
    if (inputRequests[requestId]) {
      // Resolve the suspended fetch request
      inputRequests[requestId](new Response(inputValue, {
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
      }));
      delete inputRequests[requestId];
    }
  }
});
