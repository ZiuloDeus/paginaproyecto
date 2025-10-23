<?php
include '../../../back/conexion/conexion.php';
$result = $conn->query("SELECT id_profesor, nombre, apellido FROM profesores");
$profesores = [];
while ($row = $result->fetch_assoc()) {
    $profesores[] = $row;
}
echo json_encode($profesores);
?>
