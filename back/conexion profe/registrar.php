<?php
// Habilitar la visualización de errores solo en entorno de desarrollo
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 1. Iniciar la sesión al principio si es necesaria
session_start();

// 2. Definir la cabecera JSON al principio (después de session_start)
header('Content-Type: application/json');

// La ruta a 'conexion.php' parece ser la única necesaria para la conexión
// Asegúrate de que esta ruta sea correcta
require_once __DIR__ . '/../conexion/conexion.php'; 

// === Funciones Auxiliares (Asumo que existen en archivos externos) ===
// Nota: Dado que estás usando PHP plano y no un framework, estas funciones
// como 'registrarUsuarioSolicitante', 'SQL::actionQuery', y 'enviarRespuesta'
// deben existir y ser compatibles con el manejo de errores que deseas.

// El resto de tus includes no son necesarios si 'conexion.php' ya establece la conexión
// y las funciones necesarias para el manejo de SQL y usuarios ya están definidas.
// Si las necesitas, corrige las rutas:
// include_once '../db.php'; 
// include_once '../sql.php';
// include_once '../respuestas.php';
// include_once '../usuarios.php'; 
// ===================================================================

// 3. Conexión a la BD
$con = conectar_bd(); // Asumo que esta función está en conexion.php

// 4. Verificar el Método de Solicitud (CORRECTO)
if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    http_response_code(405); // Método no permitido (más apropiado que 500)
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no permitido.']);
    exit;
}

// 5. Obtener datos de la solicitud
// **IMPORTANTE:** Cuando el formulario es enviado por el navegador
// (usando un POST tradicional o la redirección que usaste),
// los datos están en $_POST. Si el JS usa 'fetch' con JSON, usa 'file_get_contents'.

// Asumo que el JS hace un POST tradicional de formulario (o que se accede
// directamente al script después de un submit), usando $_POST.

if (empty($_POST)) {
    // Si no hay $_POST, intentamos leer JSON (para compatibilidad con fetch)
    $input = json_decode(file_get_contents('php://input'), true);
} else {
    $input = $_POST;
}

$ci = $input['ci'] ?? '';
$nombre = $input['nombre'] ?? '';
$apellido = $input['apellido'] ?? '';
$contrasena = $input['contrasena'] ?? '';
$email = $input['email'] ?? '';

// 6. Validación básica de datos
if (empty($ci) || empty($nombre) || empty($apellido) || empty($contrasena) || empty($email)) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => 'Faltan campos obligatorios.']);
    exit;
}

// 7. Hash de Contraseña (CRUCIAL para la seguridad)
// Debes hashear la contraseña antes de guardarla, si no lo hace tu función auxiliar.
// Si tu función 'registrarUsuarioSolicitante' ya lo hace, puedes omitir esto.
// **RECOMENDACIÓN:** Asegúrate de usar password_hash() dentro de la función o aquí.
$contrasena_hash = password_hash($contrasena, PASSWORD_DEFAULT); 
// Usaremos $contrasena_hash en el paso 8

// 8. Registro del Solicitante
// Aquí debes decidir si usas $contrasena o $contrasena_hash.
// Uso $contrasena_hash para máxima seguridad, asumiendo que tu función lo manejará.
// Corregí el nombre de la variable de conexión a $con para consistencia.
$resultado = registrarUsuarioSolicitante($con, $ci, $nombre, $apellido, $contrasena_hash, $email);

// Asumo que UnError es una clase o un objeto de error que manejas.
if ($resultado instanceof UnError) {
    // Si la función devuelve un objeto de error, lo enviamos como respuesta
    // La función 'enviarRespuesta' debería manejar el código de respuesta HTTP.
    enviarRespuesta($resultado);
    exit;
}
$idSolicitante = $resultado; // Asumo que la función devuelve el ID insertado

// 9. Inserción en la tabla de Profesores
// Usamos sentencias preparadas para la seguridad (asumiendo que SQL::actionQuery lo hace)
$sql = "INSERT INTO Profesores (id_solicitante) VALUES (?)";

// Uso el ID obtenido del registro anterior
$resultado = SQL::actionQuery($con, $sql, "i", $idSolicitante); 

// 10. Envío de Respuesta Final
if ($resultado instanceof UnError) {
    enviarRespuesta($resultado);
} else {
    // Éxito
    echo json_encode(['success' => true, 'message' => 'Registro de profesor exitoso.', 'id' => $idSolicitante]);
}

// Cierre de conexión si es necesario (mejor dentro de una función de manejo de DB)
// mysqli_close($con);
?>
