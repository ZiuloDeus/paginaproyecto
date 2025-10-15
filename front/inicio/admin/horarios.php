<?php
header('Content-Type: application/json; charset=utf-8');

// Datos de conexión (ajustá según tu entorno XAMPP)
$host = "localhost";
$user = "root";
$pass = "";
$db = "nombre_de_tu_base"; // <-- cambia por el nombre real

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conn->connect_error]));
}

// Obtener grupo desde la URL (por ejemplo horarios.php?grupo=Grupo%20A)
$grupo = $_GET['grupo'] ?? '';

if (empty($grupo)) {
    echo json_encode(["error" => "No se especificó grupo"]);
    exit;
}

// Buscar en la base
$stmt = $conn->prepare("SELECT lunes, martes, miercoles, jueves, viernes FROM horarios WHERE grupo = ?");
$stmt->bind_param("s", $grupo);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $horario = $result->fetch_assoc();
    echo json_encode(["success" => true, "data" => $horario]);
} else {
    echo json_encode(["success" => false, "message" => "No se encontró el grupo"]);
}

$stmt->close();
$conn->close();
?>
