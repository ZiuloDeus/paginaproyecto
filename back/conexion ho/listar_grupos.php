<?php
include '../../../back/conexion/conexion.php';
$result = $conn->query("SELECT id_grupo, nombre FROM grupos");
$grupos = [];
while ($row = $result->fetch_assoc()) {
    $grupos[] = $row;
}
echo json_encode($grupos);
?>
