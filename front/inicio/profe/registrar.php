<?php
require_once __DIR__ . '/../../back/conexion/conexion.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = conectar_bd();
if (!$conn) {
    die("Error al conectar con la base de datos");
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Registro de Docentes</title>
  <link rel="stylesheet" href="login.css">
</head>
<body>
<div class="login-container">
          <img class="back" src="arrow-left-circle-fill.svg" onclick="location.href='profe/prof_inicio.html'">
    <h1>Registro de Docentes</h1>
    <form method="post" action="registrar.php"> 
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

<?php
// Verifica si el formulario ha sido enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtén los datos del formulario
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $ci = $_POST['ci'];
    $email = $_POST['email'];
    $contrasena = password_hash($_POST['contrasena'], PASSWORD_DEFAULT);

    // Consulta SQL para insertar los datos
    $sqlu = "INSERT INTO Usuarios (nombre, apellido, ci, email, contrasena) VALUES (?, ?, ?, ?, ?)";
    
    // Prepara la consulta
    if ($stmt = $conn->prepare($sqlu)) {
        // Vincula los parámetros
        $stmt->bind_param("sssss", $nombre, $apellido, $ci, $email, $contrasena);

        // Ejecuta la consulta
        if ($stmt->execute()) {
            $id_usuario = $stmt->insert_id;

            // Consulta SQL para insertar los datos en la tabla profes
            $sqlp = "INSERT INTO Profesores (id_usuario) VALUES (?)";

            // Prepara la consulta
            if ($stmtp = $conn->prepare($sqlp)) {
                // Vincula los parámetros
                $stmtp->bind_param("i", $id_usuario);

                // Ejecuta la consulta
                if ($stmtp->execute()) {
                    echo "<script>alert('Docente registrado correctamente');</script>";
                    echo "<script>window.location.href='../../inicio/index.html'</script>";
                } else {
                    echo "<script>alert('Error al registrar el docente');</script>";
                }

                // Cierra la declaración
                $stmtp->close();
            } else {
                echo "<script>alert('Error al preparar la consulta para profes');</script>";
            }
        } else {
            echo "<script>alert('Error al registrar el usuario');</script>";
        }

        // Cierra la declaración
        $stmt->close();
    } else {
        echo "<script>alert('Error al preparar la consulta para usuarios');</script>";
    }
}

// Cierra la conexión
$conn->close();