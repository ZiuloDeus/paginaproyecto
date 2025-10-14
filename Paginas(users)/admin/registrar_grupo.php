<?php
require_once "conexion.php";
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = trim($_POST['nombre'] ?? '');

    if (empty($nombre)) {
        echo json_encode([
            "success" => false,
            "message" => "El nombre del grupo es requerido."
        ]);
        exit;
    }

    $conn = conectar_bd();
    $sql = "INSERT INTO grupos (nombre) VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $nombre);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Grupo registrado correctamente."
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Error al registrar el grupo: " . $stmt->error
        ]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode([
        "success" => false,
        "message" => "Método no permitido."
    ]);
}
?>

