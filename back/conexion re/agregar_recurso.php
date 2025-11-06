<?php
require_once __DIR__.'/../conexion/conexion.php';
$conn = conectar_bd();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 1. **CAMBIO AQUÍ:** Leer 'id_recurso' (correcto)
    $id_recurso = isset($_POST['id_recurso']) ? trim($_POST['id_recurso']) : '';
    // 2. **CAMBIO AQUÍ:** Leer 'tipo' en minúsculas (el nombre del input en el HTML)
    $Tipo = isset($_POST['Tipo']) ? trim($_POST['Tipo']) : '';
    // 3. **CAMBIO AQUÍ:** Leer 'estado' (el nombre del select en el HTML)
    $problema = isset($_POST['problema']) ? trim($_POST['problema']) : 'disponible';
    
    if ($id_recurso === '' || $Tipo === '') {
        echo json_encode(['success' => false, 'message' => 'ID y tipo son requeridos.']);
        exit;
    }
    
    // **NOTA:** La consulta SQL debería usar el nombre de la columna de estado correcto, que en tu código original parece ser 'problema'. 
    // Usaremos 'problema' como en tu código original, asumiendo que es la columna para el estado.
    $sql = "INSERT INTO Recursos (id_recurso, Tipo, problema) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    
    if ($stmt) {
        // La variable $problema ahora contiene el valor de $estado
        $stmt->bind_param('iss', $id_recurso, $Tipo, $problema); 
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Recurso agregado correctamente.']);
        } else {
            // Error en la ejecución (ej. ID de recurso duplicado)
            echo json_encode(['success' => false, 'message' => 'Error al agregar el recurso: ' . $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Error en la preparación de la consulta: ' . $conn->error]);
    }
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
?>
