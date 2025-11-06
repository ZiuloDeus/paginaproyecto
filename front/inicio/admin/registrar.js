document.getElementById('id_materia').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch('registrar_materia.php', {   // ← ruta correcta, mismo nivel
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            Swal.fire('¡Registrado!', 'La materia se añadió correctamente.', 'success');
            this.reset(); // limpia el formulario
        } else {
            Swal.fire('Error', data.error || 'No se pudo registrar.', 'error');
        }
    })
    .catch(err => {
        Swal.fire('Error', 'No se pudo registrar (problema de conexión).', 'error');
        console.error(err);
    });
});