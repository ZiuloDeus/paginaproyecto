<?php
require_once dirname(__FILE__).'/../conexion/conexion.php';
$conn = conectar_bd();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
    if ($nombre === '') {
        echo json_encode(['success' => false, 'message' => 'El nombre del grupo es requerido.']);
        exit;
    }
    // Ajusta el nombre de la tabla si es diferente
    $sql = "INSERT INTO Grupos (nombre) VALUES (?)";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param('s', $nombre);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Grupo registrado correctamente.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al registrar el grupo.']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Error en la consulta.']);
    }
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
?>