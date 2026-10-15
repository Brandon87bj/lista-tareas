import { useState } from 'react';
import { useInstallPrompt } from '../hooks/useInstallPrompt';

// Banner con el botón para instalar la app en el celular.
// Desaparece solo cuando la app ya está instalada.
export default function InstallButton() {
  const { mode, install } = useInstallPrompt();
  const [showHelp, setShowHelp] = useState(false);
  const [hidden, setHidden] = useState(false);

  if (mode === 'none' || hidden) return null;

  // Con el evento nativo se instala directo; si no, se muestran los pasos
  const handleClick = () => (mode === 'native' ? install() : setShowHelp((v) => !v));

  return (
    <section className="card install" aria-label="Instalar aplicación">
      <div className="install-top">
        <p>Instala la app en tu celular para usarla como cualquier otra, incluso sin internet.</p>
        <button
          type="button"
          className="install-close"
          onClick={() => setHidden(true)}
          aria-label="Cerrar aviso de instalación"
        >
          ✕
        </button>
      </div>

      <button type="button" className="primary" onClick={handleClick}>
        Instalar app
      </button>

      {showHelp && (
        <ol className="install-help">
          {mode === 'ios' ? (
            <>
              <li>Abre esta página en Safari.</li>
              <li>Toca el botón Compartir (el cuadro con una flecha hacia arriba).</li>
              <li>Elige «Agregar a pantalla de inicio» y confirma.</li>
            </>
          ) : (
            <>
              <li>Abre el menú del navegador (los tres puntos o las tres rayas).</li>
              <li>Elige «Instalar app» o «Agregar a pantalla de inicio».</li>
              <li>Confirma y aparecerá el ícono en tu pantalla.</li>
            </>
          )}
        </ol>
      )}
    </section>
  );
}
