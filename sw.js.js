// sw.js - The Background Notification Listener

self.addEventListener('push', function(event) {
  let data = { title: '🚨 GIRLY POP SOS 🚨', body: 'Emergency triggered by the squad! 🎀' };
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: 'https://fav.farm/%F0%9F%92%85', // Cute nail polish emoji icon
    badge: 'https://fav.farm/%E2%9C%A8', // Sparkle badge
    vibrate: [200, 100, 200, 100, 200], // SOS vibration pattern
    data: {
      dateOfArrival: Date.now()
    },
    actions: [
      { action: 'open', title: '💖 View Dashboard' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Open the app when clicking the notification
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});