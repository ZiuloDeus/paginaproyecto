<?php
require_once __DIR__ . '/../../back/conexion/conexion.php';
error_reporting(E_ALL); 
ini_set('display_errors', 1);

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
      <form method="post" action="back\conexion profe\registrar.php"> 
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