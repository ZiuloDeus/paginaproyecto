document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("buscarGrupo");
  const tbody = document.querySelector("#tablaHorarios tbody");

  input.addEventListener("input", () => {
    const grupo = input.value.trim();
    if (grupo === "") {
      tbody.innerHTML = "<tr><td colspan='5' style='text-align:center;'>Ingrese un grupo para ver su horario</td></tr>";
      return;
    }

    fetch(`horarios.php?grupo=${encodeURIComponent(grupo)}`)
      .then(res => res.json())
      .then(data => {
        tbody.innerHTML = "";

        if (data.success) {
          const fila = data.data;
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${fila.lunes}</td>
            <td>${fila.martes}</td>
            <td>${fila.miercoles}</td>
            <td>${fila.jueves}</td>
            <td>${fila.viernes}</td>
          `;
          tbody.appendChild(tr);
        } else {
          tbody.innerHTML = `<tr><td colspan='5' style='text-align:center;'>${data.message || data.error}</td></tr>`;
        }
      })
      .catch(err => {
        console.error(err);
        tbody.innerHTML = "<tr><td colspan='5' style='text-align:center;'>Error al cargar datos</td></tr>";
      });
  });

  tbody.innerHTML = "<tr><td colspan='5' style='text-align:center;'>Ingrese un grupo para ver su horario</td></tr>";
});

function abrirModal(tipo) {
  if (tipo === 'horario') {
    const modal = document.getElementById('modalHorario');
    if (modal) modal.style.display = 'flex';
  }
}

function cerrarModal(tipo) {
  if (tipo === 'horario') {
    const modal = document.getElementById('modalHorario');
    if (modal) modal.style.display = 'none';
    const mensaje = document.getElementById('mensajeHorario');
    if (mensaje) mensaje.innerText = '';
  }
}

// Cargar selects de grupo, materia y profesor al abrir el modal
function cargarSelectsHorario() {
  fetch('listar_grupos.php')
    .then(res => res.json())
    .then(data => {
      const selectGrupo = document.getElementById('selectGrupo');
      selectGrupo.innerHTML = '<option value="">Seleccione grupo</option>' +
        data.map(g => `<option value="${g.id_grupo}">${g.nombre}</option>`).join('');
    });
  fetch('listar_materias.php')
    .then(res => res.json())
    .then(data => {
      const selectMateria = document.getElementById('selectMateria');
      selectMateria.innerHTML = '<option value="">Seleccione materia</option>' +
        data.map(m => `<option value="${m.id_materia}">${m.nombre}</option>`).join('');
    });
  fetch('listar_profesores.php')
    .then(res => res.json())
    .then(data => {
      const selectProfesor = document.getElementById('selectProfesor');
      selectProfesor.innerHTML = '<option value="">Seleccione profesor</option>' +
        data.map(p => `<option value="${p.id_profesor}">${p.nombre} ${p.apellido}</option>`).join('');
    });
}

// Feedback de guardado al seleccionar en los selects del modal
function mostrarGuardado() {
  const mensaje = document.getElementById('mensajeHorario');
  if (mensaje) {
    mensaje.innerText = 'Guardado';
    mensaje.style.color = '#28a745';
    setTimeout(() => {
      mensaje.innerText = '';
      mensaje.style.color = '';
    }, 1500);
  }
}

['selectGrupo', 'selectMateria', 'selectProfesor', 'selectHorario'].forEach(id => {
  const sel = document.getElementById(id);
  if (sel) {
    sel.addEventListener('change', mostrarGuardado);
  }
});

// Abrir modal y cargar selects
const btnAgregarHorario = document.getElementById('btnAgregarHorario');
if (btnAgregarHorario) {
  btnAgregarHorario.addEventListener('click', function() {
    abrirModal('horario');
    cargarSelectsHorario();
  });
}

// Mostrar horarios ya cargados
const btnMostrarHorarios = document.getElementById('btnMostrarHorarios');
if (btnMostrarHorarios) {
  btnMostrarHorarios.addEventListener('click', function() {
    fetch('mostrar_horarios.php')
      .then(res => res.json())
      .then(data => {
        const tbody = document.querySelector('#tablaHorarios tbody');
        tbody.innerHTML = '';
        if (data.length === 0) {
          tbody.innerHTML = '<tr><td colspan="5">No hay horarios registrados.</td></tr>';
        } else {
          data.forEach(h => {
            tbody.innerHTML += `<tr>
              <td>${h.lunes || ''}</td>
              <td>${h.martes || ''}</td>
              <td>${h.miercoles || ''}</td>
              <td>${h.jueves || ''}</td>
              <td>${h.viernes || ''}</td>
            </tr>`;
          });
        }
      });
  });
}

// Cerrar modal si se hace clic fuera del contenido
window.addEventListener('click', function (e) {
  const modal = document.getElementById('modalHorario');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});