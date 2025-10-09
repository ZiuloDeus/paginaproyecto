document.getElementById('form-materia-registrar').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('registrar_materia.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        Swal.fire('¡Registrado!', 'La materia se añadio correctamente.', 'success');
    })
    .catch(err => {
        Swal.fire('Error', 'No se pudo registrar.', 'error');
    });
});