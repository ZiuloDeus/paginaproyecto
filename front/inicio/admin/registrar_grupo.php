<?php
require_once __DIR__.'/../../../back/conexion/conexion.php';
$conn = conectar_bd();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
    $grado = isset($_POST['grado']) ? trim($_POST['grado']) : '';
    if ($nombre === '') {
        echo json_encode(['success' => false, 'message' => 'El nombre del grupo es requerido.']);
        exit;
    }
    
    if ($grado === '') {
        echo json_encode(['sucess' => false, 'message' => 'El grado del grupo es requerido.']);
    }
    $grado_int = intval($grado);
    // Ajusta el nombre de la tabla si es diferente
    $sql = "INSERT INTO Grupos (nombre,grado) VALUES (?,?)";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param('si', $nombre, $grado);
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