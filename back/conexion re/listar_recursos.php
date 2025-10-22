<?php
require_once dirname(__FILE__).'/conexion.php';
$conn = conectar_bd();
header('Content-Type: application/json');

$sql = "SELECT id_recurso, tipo, estado FROM recursos";
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
