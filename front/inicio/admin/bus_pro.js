const modal = document.getElementById("modalAgregar");
const btnAbrir = document.getElementById("btnAgregarProfe");
const btnCerrar = document.querySelector(".close");
const btnGuardar = document.getElementById("guardarProfe");
const lista = document.getElementById("lista-profesores");

// Abrir modal
btnAbrir.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Cerrar modal
btnCerrar.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar si hace clic fuera
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Guardar profesor
btnGuardar.addEventListener("click", () => {
  const nombre = document.getElementById("nombreProfe").value.trim();
  const materia = document.getElementById("materiaProfe").value.trim();

  if (!nombre || !materia) {
    alert("Por favor completa ambos campos");
    return;
  }

  // Agregar a la tabla directamente (para probar)
  const fila = document.createElement("tr");
  fila.innerHTML = `<td>${nombre}</td><td>${materia}</td>`;
  lista.appendChild(fila);

  // (Opcional) Enviar al backend
  // fetch('/back/profesores/agregar_profesor.php', {
  //   method: 'POST',
  //   headers: {'Content-Type': 'application/json'},
  //   body: JSON.stringify({nombre, materia})
  // });

  document.getElementById("nombreProfe").value = "";
  document.getElementById("materiaProfe").value = "";
  modal.style.display = "none";
});