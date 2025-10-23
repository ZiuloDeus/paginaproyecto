<?php
header('Content-Type: application/json');
include("conexion.php"); 

$sql = "SELECT dia, hora, materia FROM horarios ORDER BY FIELD(dia, 'Lunes','Martes','Miércoles','Jueves','Viernes'), hora";
$result = $conn->query($sql);

$horarios = [];

while ($row = $result->fetch_assoc()) {
  $horarios[] = $row;
}

echo json_encode($horarios);
?>



