document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-agregar')) {
        const fila = e.target.closest('tr');
        const datos = {
            nombre: fila.querySelector('[name="nombre"]').value,
            apellido: fila.querySelector('[name="apellido"]').value,
            correo: fila.querySelector('[name="correo"]').value,
            materia: fila.querySelector('[name="materia"]').value
        };

        fetch('/back/profesores/agregar_profesor.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datos)
        })
        .then(r => r.json())
        .then(respuesta => {
            alert(respuesta.mensaje);
        })
        .catch(err => console.error(err));
    }
});

