// src/config.js
export const API_URL = (() => {
  const ua = navigator.userAgent || '';
  // Emulador Android Studio
  if (ua.includes('Android Emulator')) return 'http://10.0.2.2:4000';
  // Web
  if (window.location.hostname === 'localhost') return 'http://127.0.0.1:4000';
  
  return 'http://10.0.2.2:4000';
})();