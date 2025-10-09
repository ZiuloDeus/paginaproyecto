<?php
require_once dirname(__FILE__).'/conexion.php';
$conn = conectar_bd();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <title>Registrar Materia</title>
</head>
<body>
    <form id="id_materia">
        <input type="text" name="nombre" placeholder="Nombre de materia" required>
        <button type="submit">Registrar</button>
    </form>

    <script src="registrar.js"></script>
</body>
</html> 
