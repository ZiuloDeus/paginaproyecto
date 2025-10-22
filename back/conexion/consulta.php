<?php
// Configura las credenciales de la base de datos
$servername = "localhost";
$username = "Sistematizacion_de_datos";
$password = "54321";
$dbname = "db_Sistematizacion_de_datos";

// Conecta a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Ejecuta la consulta
$sql = "SELECT * FROM Clases";
$result = $conn->query($sql);

// Si hay resultados, devuelve los datos como JSON
if ($result->num_rows > 0) {
    $data = [];
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo json_encode([]);
}

// Cierra la conexión
$conn->close();
?>