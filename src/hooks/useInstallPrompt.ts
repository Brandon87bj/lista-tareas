import { useEffect, useReducer } from 'react';

// Evento que Chrome/Edge/Android lanzan cuando la app se puede instalar.
// TypeScript no lo trae definido, por eso se describe aquí.
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Cómo se le ofrece la instalación a la persona:
// - native: el navegador permite instalar con un toque (Chrome, Edge, Android)
// - ios:    Safari en iPhone/iPad no tiene botón nativo, hay que explicar los pasos
// - manual: otro navegador de celular (Firefox, Samsung Internet...), se explica el menú
// - none:   la app ya está instalada o el dispositivo no lo necesita
export type InstallMode = 'native' | 'ios' | 'manual' | 'none';

// El evento puede llegar antes de que React termine de dibujar la pantalla,
// por eso se guarda aquí afuera, apenas se carga este archivo.
let deferredPrompt: BeforeInstallPromptEvent | null = null;
let installed = false;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

window.addEventListener('beforeinstallprompt', (event) => {
  // Se evita la mini-barra automática del navegador para usar nuestro propio botón
  event.preventDefault();
  deferredPrompt = event as BeforeInstallPromptEvent;
  notify();
});

window.addEventListener('appinstalled', () => {
  installed = true;
  deferredPrompt = null;
  notify();
});

// ¿Ya se está usando como app instalada? (Android/escritorio y iOS lo reportan distinto)
const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

// iPadOS 13+ se presenta como Mac, por eso también se revisa si tiene pantalla táctil
const isIOS = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

const isMobile = () => /android|mobile/i.test(navigator.userAgent);

export function useInstallPrompt() {
  // Cada vez que cambia el estado del evento, se vuelve a dibujar el componente
  const [, refresh] = useReducer((n: number) => n + 1, 0);

  useEffect(() => {
    listeners.add(refresh);
    return () => {
      listeners.delete(refresh);
    };
  }, []);

  let mode: InstallMode = 'none';
  if (installed || isStandalone()) mode = 'none';
  else if (deferredPrompt) mode = 'native';
  else if (isIOS()) mode = 'ios';
  else if (isMobile()) mode = 'manual';

  // Muestra el cuadro de instalación del navegador (solo funciona en modo native)
  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    // El evento solo se puede usar una vez
    deferredPrompt = null;
    notify();
  };

  return { mode, install };
}
