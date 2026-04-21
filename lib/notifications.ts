// নোটিফিকেশন ট্রিগার করার ফাংশন
export async function triggerNotification(data: {
  title: string;
  message: string;
  type: 'application' | 'message' | 'vacancy' | 'system';
  link?: string;
}) {
  try {
    const response = await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.error('Notification error:', error);
  }
}

// Push Notification সেটআপ (মোবাইলের জন্য)
export async function requestPushPermission() {
  if ('Notification' in window && 'serviceWorker' in navigator) {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // Service Worker রেজিস্টার করুন
      const registration = await navigator.serviceWorker.register('/sw.js');
      return registration;
    }
  }
  return null;
}

// মোবাইল Push Notification পাঠান
export async function sendPushNotification(title: string, body: string, link?: string) {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    const registration = await navigator.serviceWorker.ready;
    registration.showNotification(title, {
      body: body,
      icon: '/icon-192.png',
      badge: '/badge.png',
      vibrate: [200, 100, 200],
      data: { url: link },
      actions: [
        { action: 'open', title: 'খুলুন' },
        { action: 'dismiss', title: 'বাদ দিন' }
      ]
    });
  }
}