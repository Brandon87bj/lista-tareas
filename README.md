# Tareas académicas (PWA)

Lista de tareas hecha con React + TypeScript + Vite. Se puede instalar en el celular y funciona sin conexión.

## Cómo ejecutarla

```bash
npm install
npm run dev        # modo desarrollo
npm run build      # genera la carpeta dist con la PWA lista
npm run preview    # prueba la versión final (con service worker)
```

## Publicar en GitHub Pages

El proyecto ya incluye `.github/workflows/deploy.yml`, que compila y publica la app solo.

1. Crea un repositorio en GitHub (público, o privado si tu cuenta lo permite con Pages) y sube **el contenido de esta carpeta** como raíz del repo:
   ```bash
   git init
   git add .
   git commit -m "Primera versión"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/NOMBRE-DEL-REPO.git
   git push -u origin main
   ```
2. En GitHub entra a **Settings → Pages** y en *Source* elige **GitHub Actions** (solo se hace una vez).
3. Ve a la pestaña **Actions** y espera a que termine «Publicar en GitHub Pages» (1–2 minutos).
4. Tu app queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`. Ábrela desde Chrome (Android) o Safari (iPhone) y usa el botón **Instalar app**.

Cada `git push` a `main` vuelve a publicar la app automáticamente.

## Botón «Instalar app»

Arriba de la pantalla aparece un aviso con el botón **Instalar app** (código en `src/components/InstallButton.tsx` y `src/hooks/useInstallPrompt.ts`):

- **Android / Chrome / Edge:** un toque abre el cuadro de instalación del navegador.
- **iPhone / iPad (Safari):** Apple no permite un botón automático, así que el botón muestra los pasos: Compartir → «Agregar a pantalla de inicio».
- **Otros navegadores de celular:** muestra cómo instalarla desde el menú del navegador.
- Si la app ya está instalada, el aviso no aparece. Se puede cerrar con la ✕.

El botón solo aparece cuando la página se abre desde HTTPS (o `localhost`), porque es un requisito de los navegadores para instalar apps.
