<?php

include 'conexion.php';

if (isset($_POST['nombre']) && !empty($_POST['nombre'])) {
    $nombre = trim($_POST['nombre']);
    // Evita inyección SQL usando prepared statements
    $stmt = $conn->prepare("INSERT INTO materias (nombre) VALUES (?)");
    $stmt->bind_param("s", $nombre);

    if ($stmt->execute()) {
        echo "Materia registrada correctamente";
    } else {
        echo "Error al registrar: " . $conn->error;
    }
    $stmt->close();
    $conn->close();
} else {
    echo "No se recibió el nombre";
}
?>
<?php