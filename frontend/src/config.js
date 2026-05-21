import { ip } from "./ip.js"; // Asegúrate de que este archivo exista y exporte lo necesario

export const API_URL = (() => {
  const ua = navigator.userAgent || '';
  const hostname = window.location.hostname;

  // Emulador Android Studio
  if (ua.includes('Android Emulator')) {
    return 'http://10.0.2.2:4000';
  }

  // Navegador en tu PC
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://127.0.0.1:4000';
  }

  // Móvil real en la misma red (cambia por tu IP local)
  return `http://${ip}:4000`;
})();