<?php
header('Content-Type: application/json');
require_once __DIR__.'/../../../back/conexion/conexion.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = conectar_bd();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recuperar el nombre desde el POST, si está vacío usa un valor por defecto
    $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';

    if (!empty($nombre)) {
        // Preparar la consulta SQL
        $sql = "INSERT INTO Materias (nombre) VALUES (?)";
        $stmt = mysqli_prepare($conn, $sql);

        // Verificar si la consulta se preparó correctamente
        if ($stmt) {
            // Vincular el parámetro de entrada
            mysqli_stmt_bind_param($stmt, "s", $nombre);

            // Ejecutar la consulta
            if (mysqli_stmt_execute($stmt)) {
                echo json_encode(['success' => true, 'message' => 'Materia registrada correctamente']);
            } else {
                echo json_encode(['success' => false, 'error' => mysqli_stmt_error($stmt)]);
            }

            // Cerrar el statement
            mysqli_stmt_close($stmt);
        } else {
            echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'El campo nombre está vacío']);
    }
}

// Cerrar la conexión a la base de datos
mysqli_close($conn);
?>

