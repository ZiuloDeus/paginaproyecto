const formularios = [
    document.getElementById('id_materia_form'),
];

formularios.forEach(form =>
{
    form.addEventListener('submit', async (event) =>
    {
        event.preventDefault();

        const formData = new FormData(form);

        const response = await fetch('/agregacion_materia/conexion.php', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        if (result.success) {
            Swal.fire({
                icon: 'success',
                title: 'Materia obtenida',
                text: 'La materia ha sido obtenida exitosamente: ' + JSON.stringify(result.valor)
            });
            form.reset();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: result.mensaje || 'Hubo un error al obtener la materia.'
            });
        }
    })
});