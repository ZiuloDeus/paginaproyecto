<?php
require_once dirname(__FILE__).'/../conexion/conexion.php';
$conn = conectar_bd();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_recurso = isset($_POST['id_recurso']) ? trim($_POST['id_recurso']) : '';
    $tipo = isset($_POST['tipo']) ? trim($_POST['tipo']) : '';
    $estado = isset($_POST['estado']) ? trim($_POST['estado']) : 'disponible';
    if ($id_recurso === '' || $tipo === '') {
        echo json_encode(['success' => false, 'message' => 'ID y tipo son requeridos.']);
        exit;
    }
    $sql = "INSERT INTO Recursos (id_recurso, tipo, estado) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param('iss', $id_recurso, $tipo, $estado);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Recurso agregado correctamente.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al agregar el recurso.']);
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
