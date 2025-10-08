<?php
function conectar_bd()
{
    $servidor = "10.36.236.22";
    $bd = "proyecto_finde";
    $usuario = "root";
    $pass = "";

    $conn = mysqli_connect($servidor, $usuario, $pass, $bd);

    if (!$conn) {
        die("Error de conexion " . mysqli_connect_error());
    }

    // echo "Conectado correctamente <hr>"; // Elimina o comenta esta línea
    return $conn;
}