<?php
// === CONFIGURACIÓN INICIAL ===
//error_reporting(E_ALL);
//ini_set('display_errors', 1);

header('Content-Type: application/json');
require_once __DIR__ . '/../../../back/conexion/conexion.php'; 


$conn = conectar_bd();

// 1. VERIFICACIÓN DE FALLO DE CONEXIÓN
if ($conn === null) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error 500: Fallo crítico al conectar con la Base de Datos.']);
    exit;
}

// === LECTURA DE DATOS DESDE $_POST (Formulario estándar) ===
// 🚨 CAMBIO CLAVE: Leer directamente desde $_POST
$cedula = $_POST['cedula'] ?? ''; 
$password = $_POST['password'] ?? '';

// 2. VERIFICACIÓN DE DATOS RECIBIDOS
if (empty($cedula) || empty($password)) {
    http_response_code(400); 
    echo json_encode(['success' => false, 'message' => 'Faltan datos de cédula o contraseña.']);
    exit;
}

// === BÚSQUEDA DE USUARIO ===
// 🎯 Corrección: Usamos 'ci' como columna para la cédula
$sql = "SELECT * FROM Usuarios WHERE ci = ?"; 
$stmt = mysqli_prepare($conn, $sql);

// 3. VERIFICACIÓN DE PREPARACIÓN DE SENTENCIA (SQL)
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error SQL (Preparación): ' . mysqli_error($conn)]);
    mysqli_close($conn);
    exit;
}

// Enlace de parámetros y ejecución
mysqli_stmt_bind_param($stmt, 's', $cedula);

if (!mysqli_stmt_execute($stmt)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error SQL (Ejecución): ' . mysqli_stmt_error($stmt)]);
    mysqli_close($conn);
    exit;
}

$result = mysqli_stmt_get_result($stmt);

// === VERIFICACIÓN DE AUTENTICACIÓN ===
if ($row = mysqli_fetch_assoc($result)) {
    // 4. Asumimos que la columna de hash es 'password'
    if (password_verify($password, $row['contrasena'])) {
        
        // 🔑 Inicia la sesión aquí si el login es exitoso
        // session_start();
        // $_SESSION['logged_in'] = true;
        // $_SESSION['cedula'] = $cedula;
        
        echo json_encode(['success' => true]);
        
    } else {
        echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no encontrado.']);
}

// === LIMPIEZA ===
mysqli_close($conn);
?>
