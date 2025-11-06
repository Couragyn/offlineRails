// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('New service worker found!');
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New content is available; please refresh.');
            }
          });
        });
      })
      .catch(function(error) {
        console.log('ServiceWorker registration failed: ', error);
      });
  });

  // Listen for claims by new service workers
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('New service worker is controlling this page');
  });
}

// Online/Offline detection
window.addEventListener('online', function() {
  console.log('App is online');
  document.body.classList.remove('offline');
  document.body.classList.add('online');
});

window.addEventListener('offline', function() {
  console.log('App is offline');
  document.body.classList.remove('online');
  document.body.classList.add('offline');
});