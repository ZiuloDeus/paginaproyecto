let currentLang = localStorage.getItem('lang') || 'es';
let isDarkMode = localStorage.getItem('darkMode') === "true";

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  localStorage.setItem('darkMode', isDarkMode);
  applyDarkMode();
}

function changeLanguage() {
  currentLang = currentLang === "es" ? "en" : "es";
  localStorage.setItem('lang', currentLang);
  updateTableHeaders();
}

function applyDarkMode() {
  if (isDarkMode) {
    document.body.style.backgroundColor = '#121212';
    document.body.style.backgroundImage = 'none';
    document.body.style.color = '#ffffff';
  } else {
    document.body.style.backgroundColor = '#e5e5f7';
    document.body.style.backgroundImage =
      'linear-gradient(#444cf7 1px, transparent 1px), linear-gradient(to right, #444cf7 1px, #e5e5f7 1px)';
    document.body.style.color = '#333';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Aplicar modo oscuro e idioma
  applyDarkMode();
  updateTableHeaders();

  // Logout
  const logout = document.getElementById('logout');
  if (logout) {
    logout.addEventListener('click', () => {
      sessionStorage.clear();
      window.location.href = "../../inicio/index.html";
    });
  }

  // --- Buscar datos de usuario y mostrar nombre ---
  const ci = localStorage.getItem('ci');
  if (ci) {
    fetch(`../../back/obtener_datos.php?ci=${encodeURIComponent(ci)}`)
      .then(response => response.json())
      .then(data => {
        if (data.Nombre && data.Apellido) {
          const adminNameElement = document.querySelector('header div[name="derecha"] p');
          if (adminNameElement) {
            adminNameElement.textContent = `${data.Nombre} ${data.Apellido}`;
          }
        } else {
          console.error(data.error || 'Error al obtener datos del usuario.');
        }
      })
      .catch(err => console.error('Error conectando al servidor:', err));
  } else {
    console.error('Cédula no encontrada en localStorage.');
  }

  // --- Modal de opciones (modo oscuro / idioma) ---
  window.showBox = function() {
    if (document.getElementById('overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.onclick = closeBox;

    const box = document.createElement('div');
    box.id = 'customBox';

    const darkModeButton = document.createElement('button');
    darkModeButton.style.backgroundColor = '#005f73';
    darkModeButton.textContent = (currentLang === "es") ? "Modo oscuro" : "Dark mode";
    darkModeButton.onclick = toggleDarkMode;

    const langButton = document.createElement('button');
    langButton.style.backgroundColor = '#1d3557';
    langButton.textContent = (currentLang === "es") ? "English" : "Español";
    langButton.onclick = () => {
      changeLanguage();
      updateModalLabels(darkModeButton, langButton, closeButton);
    };

    const closeButton = document.createElement('button');
    closeButton.style.backgroundColor = '#e63946';
    closeButton.textContent = (currentLang === "es") ? "Cerrar" : "Close";
    closeButton.onclick = closeBox;

    function closeBox() {
      overlay.remove();
      box.remove();
    }

    function updateModalLabels(dmBtn, lBtn, cBtn) {
      dmBtn.textContent = (currentLang === "es") ? "Modo oscuro" : "Dark mode";
      lBtn.textContent = (currentLang === "es") ? "English" : "Español";
      cBtn.textContent = (currentLang === "es") ? "Cerrar" : "Close";
    }

    box.appendChild(darkModeButton);
    box.appendChild(langButton);
    box.appendChild(closeButton);

    document.body.appendChild(overlay);
    document.body.appendChild(box);
  };

  // Cargar recursos en tabla (desde listar_recursos.php)
  cargarRecursos();
});

// --- Traducciones dinámicas ---
function updateTableHeaders() {
  fetch(currentLang + ".json")
    .then(response => response.json())
    .then(data => {
      const navItems = document.querySelectorAll("aside nav ul li p");
      navItems.forEach((item, index) => {
        if (data.sidebar && data.sidebar[index]) {
          item.innerText = data.sidebar[index];
        }
      });

      const mainItems = document.querySelectorAll(".botones > div > a > p");
      mainItems.forEach((item, index) => {
        if (data.main && data.main[index]) {
          item.innerText = data.main[index];
        }
      });

      const titleEl = document.querySelector('.botones div[style*="grid-area: e;"] h1');
      if (titleEl && data.title) titleEl.innerText = data.title;

      const logout = document.querySelector('#logout');
      if (logout && data.logout) logout.textContent = data.logout;

      // Tabla de horarios
      const ids = [
        ['th-lunes', data.Lunes],
        ['th-martes', data.Martes],
        ['th-miercoles', data['Miércoles']],
        ['th-jueves', data.Jueves],
        ['th-viernes', data.Viernes]
      ];
      ids.forEach(([id, texto]) => {
        const el = document.getElementById(id);
        if (el && texto) el.textContent = texto;
      });
    })
    .catch(err => console.error("Error loading JSON:", err));
}

// --- Cargar lista de recursos ---
function cargarRecursos() {
  fetch("../../back/recursos/listar_recursos.php")
    .then(res => {
      if (!res.ok) throw new Error("Archivo no encontrado o error en el servidor");
      return res.json();
    })
    .then(data => {
      const contenedor = document.getElementById('tabla-recursos');
      if (contenedor) {
        contenedor.innerHTML = "";
        data.forEach(rec => {
          const fila = document.createElement('tr');
          fila.innerHTML = `
            <td>${rec.id_recurso}</td>
            <td>${rec.Tipo}</td>
            <td>${rec.problema || 'disponible'}</td>
          `;
          contenedor.appendChild(fila);
        });
      }
    })
    .catch(err => console.error("Error cargando recursos:", err));
}

// --- Agregar un recurso ---
function agregarRecurso(id, tipo, problema = 'disponible') {
  fetch("../../back/recursos/agregar_recursos.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `id_recurso=${encodeURIComponent(id)}&Tipo=${encodeURIComponent(tipo)}&problema=${encodeURIComponent(problema)}`
  })
  .then(res => res.json())
  .then(data => {
    mostrarNotificacion(data.message, data.success ? 'success' : 'error');
    if (data.success) cargarRecursos();
  })
  .catch(err => mostrarNotificacion('Error al conectar con el servidor.', 'error'));
}

// --- Notificación flotante ---
function mostrarNotificacion(mensaje, tipo) {
  const notif = document.createElement('div');
  notif.className = 'notificacion-flotante ' + tipo;
  notif.innerText = mensaje;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 2500);
}