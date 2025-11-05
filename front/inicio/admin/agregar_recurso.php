<?php
// RUTA DE CONEXIÓN CORREGIDA para el archivo movido
require_once __DIR__.'/../../../back/conexion/conexion.php'; 
$conn = conectar_bd();
header('Content-Type: application/json');

// MANEJO DE ERROR 500: Si la conexión a la BD falla
if (!$conn) {
    echo json_encode(['success' => false, 'message' => 'Error 500: Fallo interno al iniciar la conexión a la base de datos.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 1. OBTENER VALORES del POST (usan nombres del HTML/JS: id_recurso, tipo, estado)
    $id_recurso = isset($_POST['id_recurso']) ? trim($_POST['id_recurso']) : '';
    $tipo_recibido = isset($_POST['Tipo']) ? trim($_POST['Tipo']) : ''; 
    $estado_recibido = isset($_POST['problema']) ? trim($_POST['problema']) : 'disponible'; 

    if ($id_recurso === '' || $tipo_recibido === '') {
        echo json_encode(['success' => false, 'message' => 'ID y tipo son requeridos.']);
        exit;
    }

    // 2. MAPEO DE VALORES: Convierte los valores del formulario a los valores literales de la BD
    $estado_para_bd = '';
    switch (strtolower($estado_recibido)) {
        case 'disponible':
            $estado_para_bd = 'Disponible';
            break;
        case 'pedido':
            $estado_para_bd = 'Pedido';
            break;
        case 'averiado': // Si el valor del select es 'averiado'
            $estado_para_bd = 'Averiando'; // El valor exacto que quieres en la BD
            break;
        default:
            $estado_para_bd = 'Disponible'; 
            break;
    }

    // 3. CONSULTA SQL: Usar nombres de columna EXACTOS de la BD (Tipo con mayúscula, problema)
    $sql = "INSERT INTO Recursos (id_recurso, Tipo, problema) VALUES (?, ?, ?)"; // <-- Nombres de columnas correctos
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        // 4. BIND PARAM: Pasar los valores recibidos a las columnas esperadas.
        // Pasa: ($id_recurso, valor de $tipo_recibido, valor de $estado_para_bd)
        $stmt->bind_param('iss', $id_recurso, $tipo_recibido, $estado_para_bd); 

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Recurso agregado correctamente.']);
        } else {
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
