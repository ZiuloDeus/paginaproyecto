<?php

require_once "../../registro/conectar.php";

header('Content-Type: application/json');

$conn = conectar_bd();

$busqueda = $_GET['q'] ?? '';
$sql = "SELECT * FROM profesores WHERE nombre LIKE ?";
$stmt = $conn->prepare($sql);
$like = "%$busqueda%";
$stmt->bind_param("s", $like);
$stmt->execute();
$result = $stmt->get_result();

$profesores = [];
while ($row = $result->fetch_assoc()) {
    $profesores[] = $row;
}
echo json_encode($profesores);

$stmt->close();
$conn->close();
?>