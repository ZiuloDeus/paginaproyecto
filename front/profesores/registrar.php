<?php
require_once 'conectar.php';
$conn = conectar_bd();
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Registro de Docentes</title>
  <link rel="stylesheet" href="princi.css">
</head>
<body>
<div class="form-container">
    <h1>Registro de Docentes</h1>
    <form method="post" action="../../back/profesores/registrar.php">
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" name="nombre" required>

      <label for="apellido">Apellido:</label>
      <input type="text" id="apellido" name="apellido" required>

      <label for="ci">Cédula:</label>
      <input type="text" id="ci" name="ci" maxlength="7" required>

      <label for="email">Correo electrónico:</label>
      <input type="email" id="email" name="email" required>

      <label for="contrasena">Contraseña:</label>
      <input type="password" id="contrasena" name="contrasena" required>

      <input type="submit" value="Registrar">
    </form>
  </div>
</body>
</html>
