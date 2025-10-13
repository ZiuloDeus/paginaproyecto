<?php
require_once "conexion.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'] ?? '';

    if (empty($nombre)) {
        echo "El nombre del grupo es requerido.";
        exit;
    }

    $conn = conectar_bd();
    $sql = "INSERT INTO grupos (nombre) VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $nombre);

    if ($stmt->execute()) {
        echo "Grupo registrado correctamente.";
    } else {
        echo "Error al registrar el grupo: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Método no permitido.";
}
?>

