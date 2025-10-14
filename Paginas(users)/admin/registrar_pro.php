<?php
require_once "conexion.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recibir el JSON del fetch
    $input = json_decode(file_get_contents("php://input"), true);

    $nombre = $input['nombre'] ?? '';
    $materia = $input['materia'] ?? '';

    if (empty($nombre) || empty($materia)) {
        echo json_encode(["success" => false, "message" => "Faltan datos"]);
        exit;
    }

    $conn = conectar_bd();
    $sql = "INSERT INTO profesores (nombre, materia) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $nombre, $materia);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Profesor registrado correctamente."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al registrar el profesor."]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}
?>

