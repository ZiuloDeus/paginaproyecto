<?php
function conectar_bd()
{
    $servidor = "localhost";
    $bd = "db_Sistematizacion_de_datos";
    $usuario = "Sistematizacion_de_datos";
    $pass = "54321";
    // Conexión con todos los parámetros
    $conn = mysqli_connect($servidor, $usuario, $pass, $bd);
    if (!$conn) {
        die("Error de conexion " . mysqli_connect_error());
    }
    return $conn;
}