<?php
function conectar_bd()
{
    $servidor = "localhost";
    $bd = "proyecto_itsp";
    $usuario = "root";
    $pass = "";

    // Conexión con todos los parámetros
    $conn = mysqli_connect($servidor, $usuario, $pass, $bd);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'] ?? '';

    if (!empty($nombre)) {
        $sql = "INSERT INTO materias (nombre) VALUES (?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "s", $nombre);

        if (mysqli_stmt_execute($stmt)) {
            echo "<p style='color: green;'>Materia registrada correctamente.</p>";
        } else {
            echo "<p style='color: red;'>Error al registrar: " . mysqli_error($conn) . "</p>";
        }

        mysqli_stmt_close($stmt);
    } else {
        echo "<p style='color: red;'>Por favor, ingresa un nombre.</p>";
    }
}

    if (!$conn) {
        die("Error de conexion " . mysqli_connect_error());
    }

    return $conn;
}