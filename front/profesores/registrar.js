document.getElementById('form-docentes-registrar').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que se recargue la página

    const formData = new FormData(this);

 
    fetch('C:\Users\Admin\Documents\GitHub\paginaproyecto\back\profesores\registrar.php', { // usa / para ruta absoluta
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

