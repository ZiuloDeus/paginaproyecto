<?php
include '../../../back/conexion/conexion.php';
$result = $conn->query("SELECT id_materia, nombre FROM materias");
$materias = [];
while ($row = $result->fetch_assoc()) {
    $materias[] = $row;
}
echo json_encode($materias);
?>
