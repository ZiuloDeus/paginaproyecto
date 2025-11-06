<?php
require_once __DIR__ . '/conexion/conexion.php';

if (isset($_GET['ci'])) {
    $ci = $_GET['ci'];

    $conn = conectar_bd();
    $stmt = $conn->prepare("SELECT Nombre, Apellido FROM usuarios WHERE CI = ?");
    $stmt->bind_param("s", $ci);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        echo json_encode($user);
    } else {
        echo json_encode(['error' => 'Usuario no encontrado']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['error' => 'Cédula no proporcionada']);
}
?>