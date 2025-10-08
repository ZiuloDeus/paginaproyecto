<?php

require_once "../../registro/conectar.php";
header('Content-Type: application/json');
$conn = conectar_bd();

$busqueda = $_GET['q'] ?? '';
$sql = "SELECT * FROM asignaturas WHERE nombre LIKE ?";
$stmt = $conn->prepare($sql);
$like = "%$busqueda%";
$stmt->bind_param("s", $like);
$stmt->execute();
$result = $stmt->get_result();

$asignaturas = [];
while ($row = $result->fetch_assoc()) {
    $asignaturas[] = $row;
}
echo json_encode($asignaturas);

$stmt->close();
$conn->close();
?>