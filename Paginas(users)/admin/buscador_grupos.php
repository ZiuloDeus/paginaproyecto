<?php

require_once "../../registro/conectar.php";

header('Content-Type: application/json');

$conn = conectar_bd();

$busqueda = $_GET['q'] ?? '';
$sql = "SELECT * FROM grupos WHERE nombre LIKE ?";
$stmt = $conn->prepare($sql);
$like = "%$busqueda%";
$stmt->bind_param("s", $like);
$stmt->execute();
$result = $stmt->get_result();

$grupos = [];
while ($row = $result->fetch_assoc()) {
    $grupos[] = $row;
}
echo json_encode($grupos);

$stmt->close();
$conn->close();
?>