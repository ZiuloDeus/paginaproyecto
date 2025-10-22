let currentLang = localStorage.getItem('lang') || 'es'; // cargar lenguaje guardado, si no hay uno usar español por defecto
let isDarkMode = localStorage.getItem('darkMode') === "true"; // cargar modo oscuro o claro guardado

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
      // aplicar preferencias guardadas
      applyDarkMode();
      updateTableHeaders();

    const logout = document.getElementById('logout');

    logout.addEventListener('click', () => {
        sessionStorage.clear(); // Limpiar datos de sesión
        window.location.href = "../../inicio/index.html"; // redirigir a pagina de inicio de sesion
    });

    window.showBox = function() {
        if (document.getElementById('overlay')) return;

        const overlay = document.createElement('div');  
        overlay.id = 'overlay';
        overlay.onclick = closeBox;

        const box = document.createElement('div');
        box.id = 'customBox';

        // Botón "Modo oscuro"
        const darkModeButton = document.createElement('button');
        darkModeButton.style.backgroundColor = '#005f73';
        darkModeButton.textContent = (currentLang === "es") ? "Modo oscuro" : "Dark mode";
        darkModeButton.onclick = toggleDarkMode;

        // Botón "Cambiar idioma"
        const langButton = document.createElement('button');
        langButton.style.backgroundColor = '#1d3557';
        langButton.textContent = (currentLang === "es") ? "English" : "Español";
        langButton.onclick = () => {
            changeLanguage();
            updateModalLabels(darkModeButton, langButton, closeButton);
        };

        // Botón "Cerrar"
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

    updateTableHeaders(); // inicializar idioma al cargar
});

function updateTableHeaders() {
    fetch(currentLang + ".json")
        .then(response => response.json())
        .then(data => {
            // Sidebar
            const navItems = document.querySelectorAll("aside nav ul li p");
            navItems.forEach((item, index) => {
                if (data.sidebar && data.sidebar[index]) {
                    item.innerText = data.sidebar[index];
                }
            });

            // Main grid
            const mainItems = document.querySelectorAll(".botones > div > a > p");
            mainItems.forEach((item, index) => {
                if (data.main && data.main[index]) {
                    item.innerText = data.main[index];
                }
            });

            // Title
            const titleEl = document.querySelector('.botones div[style*="grid-area: e;"] h1');
            if (titleEl && data.title) {
                titleEl.innerText = data.title;
            }

            const logout = document.querySelector('#logout');
            if (logout && data.logout) {
                logout.textContent = data.logout;
            }

            // Tabla de horarios
            if (data.Lunes) document.getElementById('th-lunes').textContent = data.Lunes;
            if (data.Martes) document.getElementById('th-martes').textContent = data.Martes;
            if (data['Miércoles']) document.getElementById('th-miercoles').textContent = data['Miércoles'];
            if (data.Jueves) document.getElementById('th-jueves').textContent = data.Jueves;
            if (data.Viernes) document.getElementById('th-viernes').textContent = data.Viernes;
        })
        .catch(err => console.error("Error loading JSON:", err));
}

// buscador.js
function setupBuscador(inputId, resultadosId, phpFile, mostrarCallback) {
    const input = document.getElementById(inputId);
    const resultados = document.getElementById(resultadosId);

    if (!input || !resultados) return;

    input.addEventListener('input', function() {
        const q = this.value;
        fetch(`${phpFile}?q=${encodeURIComponent(q)}`)
            .then(res => res.json())
            .then(data => {
                resultados.innerHTML = '';
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = mostrarCallback(item);
                    resultados.appendChild(li);
                });
            });
    });
}

  function abrirModal(tipo) {
    if (tipo === 'grupo') {
      var modalGrupo = document.getElementById('modalGrupo');
      if (modalGrupo) modalGrupo.style.display = 'flex';
    } else if (tipo === 'materia') {
      var modalMateria = document.getElementById('modalMateria');
      if (modalMateria) modalMateria.style.display = 'flex';
    } else if (tipo === 'pro') {
      var modalPro = document.getElementById('modalPro');
      if (modalPro) modalPro.style.display = 'flex';
    }
    else if (tipo === 'horario') {
      var modalPro = document.getElementById('modalHorario');
      if (modalPro) modalPro.style.display = 'flex';
    }
  }
  function cerrarModal(tipo) {
    if (tipo === 'grupo') {
      var modalGrupo = document.getElementById('modalGrupo');
      if (modalGrupo) {
        modalGrupo.style.display = 'none';
        var mensajeGrupo = document.getElementById('mensajeGrupo');
        if (mensajeGrupo) mensajeGrupo.innerText = '';
      }
    } else if (tipo === 'materia') {
      var modalMateria = document.getElementById('modalMateria');
      if (modalMateria) {
        modalMateria.style.display = 'none';
        var mensajeMateria = document.getElementById('mensajeMateria');
        if (mensajeMateria) mensajeMateria.innerText = '';
      }
    } else if (tipo === 'pro') {
      var modalPro = document.getElementById('modalPro');
      if (modalPro) {
        modalPro.style.display = 'none';
        var mensajePro = document.getElementById('mensajePro');
        if (mensajePro) mensajePro.innerText = '';
      }
    }
    else if (tipo === 'horario') {
      var modalPro = document.getElementById('modalHorario');
      if (modalPro) {
        modalPro.style.display = 'none';
        var mensajePro = document.getElementById('mensajeHorario');
        if (mensajePro) mensajePro.innerText = '';
      }
    }
  }

  // --- FORMULARIO MATERIA ---
  document.addEventListener('DOMContentLoaded', function() {
    const formMateria = document.getElementById('formMateria');
    if (formMateria) {
      formMateria.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = this.nombre.value;
        fetch("registrar_materia.php", {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: 'nombre=' + encodeURIComponent(nombre)
        })
        .then(res => res.text())
        .then(data => {
          mostrarNotificacion(data, data.includes('correctamente') ? 'success' : 'error');
          document.getElementById('mensajeMateria').innerText = data;
          this.reset();
        })
        .catch(() => {
          mostrarNotificacion('Error al conectar con el servidor.', 'error');
          document.getElementById('mensajeMateria').innerText = 'Error al conectar con el servidor.';
        });
      });
    }

  // --- FORMULARIO GRUPO ---
const formGrupo = document.getElementById('formGrupo');
if (formGrupo) {
  formGrupo.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = this.nombre.value;

    fetch("registrar_grupo.php", {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'nombre=' + encodeURIComponent(nombre)
    })
    .then(res => res.json())
    .then(data => {
      // Mostrar mensaje y notificación
      document.getElementById('mensajeGrupo').innerText = data.message;
      mostrarNotificacion(data.message, data.success ? 'success' : 'error');

      if (data.success) {
        this.reset();
      }
    })
    .catch(() => {
      mostrarNotificacion('Error al conectar con el servidor.', 'error');
      document.getElementById('mensajeGrupo').innerText = 'Error al conectar con el servidor.';
    });
  });
}

  // --- FORMULARIO PROFESOR ---
  const formPro = document.getElementById('formPro');
  if (formPro) {
    formPro.addEventListener('submit', function(e) {
      e.preventDefault();
      const nombre = this.nombre.value;
      const apellido = this.apellido.value;
      fetch("registrar_pro.php", {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'nombre=' + encodeURIComponent(nombre) + '&apellido=' + encodeURIComponent(apellido)
      })
      .then(res => res.text())
      .then(data => {
        mostrarNotificacion(data, data.includes('correctamente') ? 'success' : 'error');
        document.getElementById('mensajePro').innerText = data;
        this.reset();
      })
      .catch(() => {
        mostrarNotificacion('Error al conectar con el servidor.', 'error');
        document.getElementById('mensajePro').innerText = 'Error al conectar con el servidor.';
      });
    });
  }
});

// --- Notificación flotante ---
function mostrarNotificacion(mensaje, tipo) {
  let notif = document.createElement('div');
  notif.className = 'notificacion-flotante ' + tipo;
  notif.innerText = mensaje;
  document.body.appendChild(notif);
  setTimeout(() => {
    notif.remove();
  }, 2500);
}

const tablas = ['tabla-aulas', 'tabla-salones'];

tablas.forEach(id => {
    const tabla = document.getElementById(id);
    if (tabla) {
        // Seleccionamos todas las celdas de la tabla
        const celdas = tabla.getElementsByTagName('td');
        for (let td of celdas) {
            td.addEventListener('click', () => {
                // Alterna clases verde/amarillo
                if (td.classList.contains('verde')) {
                    td.classList.remove('verde');
                    td.classList.add('amarillo');
                } else if (td.classList.contains('amarillo')) {
                    td.classList.remove('amarillo');
                    td.classList.add('verde');
                } else {
                    td.classList.add('verde'); // color inicial
                }
            });
        }
    }
});

// --- RECURSOS MODAL Y TABLA ---
function estadoColor(estado) {
  if (estado === 'disponible') return 'verde';
  if (estado === 'pedido') return 'amarillo';
  if (estado === 'averiado') return 'rojo';
  return '';
}
function cargarRecursos() {
  fetch('listar_recursos.php')
    .then(res => res.json())
    .then(data => {
      const ul = document.getElementById('listaRecursos');
      ul.innerHTML = '';
      const tbody = document.querySelector('#tablaRecursos tbody');
      tbody.innerHTML = '';
      if (data.length === 0) {
        ul.innerHTML = '<li>No hay recursos registrados.</li>';
        tbody.innerHTML = '<tr><td colspan="3">No hay recursos registrados.</td></tr>';
      } else {
        data.forEach(r => {
          ul.innerHTML += `<li>${r.tipo}</li>`;
          let estado = r.estado || 'disponible';
          let color = estadoColor(estado);
          tbody.innerHTML += `<tr>
            <td>${r.id_recurso}</td>
            <td>${r.tipo}</td>
            <td class="${color}" style="text-align:center;">${estado.charAt(0).toUpperCase() + estado.slice(1)}</td>
          </tr>`;
        });
      }
    });
}
window.cargarRecursos = cargarRecursos;

document.addEventListener('DOMContentLoaded', function() {
  cargarRecursos();
  const btnAgregarRecurso = document.getElementById('btnAgregarRecurso');
  if (btnAgregarRecurso) {
    btnAgregarRecurso.addEventListener('click', function() {
      document.getElementById('modalRecurso').style.display = 'flex';
    });
  }
  const closeRecurso = document.getElementById('closeRecurso');
  if (closeRecurso) {
    closeRecurso.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('modalRecurso').style.display = 'none';
      document.getElementById('mensajeRecurso').innerText = '';
    });
  }
  const modalRecurso = document.getElementById('modalRecurso');
  if (modalRecurso) {
    modalRecurso.addEventListener('click', function(e) {
      if (e.target === modalRecurso) {
        document.getElementById('modalRecurso').style.display = 'none';
        document.getElementById('mensajeRecurso').innerText = '';
      }
    });
  }
  const formRecurso = document.getElementById('formRecurso');
  if (formRecurso) {
    formRecurso.addEventListener('submit', function(e) {
      e.preventDefault();
      const id_recurso = this.id_recurso.value;
      const tipo = this.tipo.value;
      const estado = this.estado.value;
      fetch('agregar_recurso.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'id_recurso=' + encodeURIComponent(id_recurso) + '&tipo=' + encodeURIComponent(tipo) + '&estado=' + encodeURIComponent(estado)
      })
      .then(res => res.json())
      .then(data => {
        document.getElementById('mensajeRecurso').innerText = data.message;
        if (data.success) {
          this.reset();
          cargarRecursos();
          setTimeout(() => {
            document.getElementById('modalRecurso').style.display = 'none';
            document.getElementById('mensajeRecurso').innerText = '';
          }, 1200);
        }
      })
      .catch(() => {
        document.getElementById('mensajeRecurso').innerText = 'Error al conectar con el servidor.';
      });
    });
  }
});