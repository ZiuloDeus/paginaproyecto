document.getElementById('form-docentes-registrar').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('../../back/profesores/registrar_backend.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        Swal.fire('¡Registrado!', 'El docente fue registrado.', 'success');
    })
    .catch(err => {
        Swal.fire('Error', 'No se pudo registrar.', 'error');
    });
});