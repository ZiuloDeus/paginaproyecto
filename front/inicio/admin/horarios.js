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