<?php
require_once dirname(__FILE__).'/conexion.php';
$conn = conectar_bd();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'] ?? '';

    if (!empty($nombre)) {
        $nombre = trim($nombre);
        $sql = "INSERT INTO Materias (nombre) VALUES (?)";
        $stmt = mysqli_prepare($conn, $sql);

        if ($stmt) {
            mysqli_stmt_bind_param($stmt, "s", $nombre);
            if (mysqli_stmt_execute($stmt)) {
                echo json_encode(['success' => true, 'message' => 'Materia registrada correctamente']);
            } else {
                echo json_encode(['success' => false, 'error' => mysqli_stmt_error($stmt)]);
            }
            mysqli_stmt_close($stmt);
        } else {
            echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'El campo nombre está vacío']);
    }
}

mysqli_close($conn);
?>