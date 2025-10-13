document.addEventListener("DOMContentLoaded", () => {
  fetch("mostrar_horarios.php")
    .then(res => res.json())
    .then(data => {
      const tabla = document.getElementById("tabla-horarios");

      // agrupamos los horarios por día
      const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
      const agrupados = {};

      dias.forEach(d => agrupados[d] = []);

      data.forEach(h => {
        if (agrupados[h.dia]) agrupados[h.dia].push(h.materia + " (" + h.hora + ")");
      });

      // Determinamos cuántas filas máximo hay que crear
      const maxFilas = Math.max(...Object.values(agrupados).map(a => a.length));

      for (let i = 0; i < maxFilas; i++) {
        const fila = document.createElement("tr");
        dias.forEach(dia => {
          const celda = document.createElement("td");
          celda.textContent = agrupados[dia][i] || ""; // vacío si no hay dato
          fila.appendChild(celda);
        });
        tabla.appendChild(fila);
      }
    })
    .catch(err => console.error("Error cargando horarios:", err));
});

