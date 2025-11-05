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
$sql = "SELECT Usuarios.nombre, Materias.nombre, Profesores.id_profesor
FROM Usuarios, Profesores, Materias, Clases
WHERE
Usuarios.id_usuario = Profesores.id_usuario AND
Profesores.id_profesor = Clases.id_profesor AND
Materias.id_materia = Clases.id_materia";
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