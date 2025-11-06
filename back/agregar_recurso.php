<?php
require_once __DIR__.'/conexion/conexion.php';
$conn = conectar_bd();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_recurso = isset($_POST['id_recurso']) ? trim($_POST['id_recurso']) : '';
    $Tipo = isset($_POST['Tipo']) ? trim($_POST['Tipo']) : '';
    $problema = isset($_POST['problema']) ? trim($_POST['problema']) : 'disponible';
    if ($id_recurso === '' || $Tipo === '') {
        echo json_encode(['success' => false, 'message' => 'ID y tipo son requeridos.']);
        exit;
    }
    $sql = "INSERT INTO Recursos (id_recurso, Tipo, problema) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param('iss', $id_recurso, $Tipo, $problema);
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