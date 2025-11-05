<?php
header('Content-Type: application/json');
require_once '/../../../back/conexion/conexion.php'; 

error_reporting(E_ALL); 
ini_set('display_errors', 1);

$conn = conectar_bd();

$input = json_decode(file_get_contents('php://input'), true);
$cedula = $input['cedula'] ?? '';
$password = $input['password'] ?? '';

if (empty($cedula) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Faltan datos.']);
    exit;
}

$sql = "SELECT * FROM administradores WHERE cedula = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, 's', $cedula);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($row = mysqli_fetch_assoc($result)) {
    if (password_verify($password, $row['password'])) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no encontrado.']);
}

mysqli_close($conn);
?>
