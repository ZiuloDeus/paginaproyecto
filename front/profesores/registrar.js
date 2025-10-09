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

document.getElementById('Registro').addEventListener('submit', function(e) {
    const cedula = document.getElementById('cedula').value;
    if (!/^\d{7}$/.test(cedula)) {
        e.preventDefault();
        document.getElementById('seguridadMsg').textContent = "La cédula debe tener exactamente 7 números.";
        return false;
    }
    // Aquí va tu fetch si usas AJAX, o deja que el form se envíe normalmente
});
