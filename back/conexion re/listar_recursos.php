<?php
require_once dirname(__FILE__).'/../conexion/conexion.php';
$conn = conectar_bd();
header('Content-Type: application/json');

$sql = "SELECT * FROM Recursos";
$result = $conn->query($sql);
$recursos = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $recursos[] = $row;
    }
}
echo json_encode($recursos);
$conn->close();
?>
