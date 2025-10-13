<?php
require_once "conexion.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'] ?? '';
    $apellido = $_POST['apellido'] ?? '';
    if (empty($nombre) || empty($apellido)) {
        echo "El nombre y apellido del profesor son requeridos.";
        exit;
    }
    $conn = conectar_bd();
    $sql = "INSERT INTO profesores (nombre, apellido) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $nombre, $apellido);
    if ($stmt->execute()) {
        echo "Profesor registrado correctamente.";
    } else {
        echo "Error al registrar el profesor.";
    }
    $stmt->close();
    $conn->close();
} else {
    echo "Método no permitido.";
}
?>
