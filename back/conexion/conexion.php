<?php
function conectar_bd()
{
    $servidor = "127.0.0.1";
    $bd = "db_Sistematizacion_de_datos";
    $usuario = "Sistematizacion_de_datos";
    $pass = "54321";

    $conn = @mysqli_connect($servidor, $usuario, $pass, $bd);

    if (!$conn) {
        return null;
    }
    return $conn;
}
