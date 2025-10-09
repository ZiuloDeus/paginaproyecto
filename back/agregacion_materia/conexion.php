<?php
function conectar_bd()
{
    $servidor = "localhost";
    $bd = "proyecto_itsp";
    $usuario = "root";
    $pass = "";

    // Conexión con todos los parámetros
    $conn = mysqli_connect($servidor, $usuario, $pass, $bd);

    

    if (!$conn) {
        die("Error de conexion " . mysqli_connect_error());
    }

    return $conn;
}