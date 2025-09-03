<?php
function conectar_bd()
{
    $servidor = "localhost";
    $bd = "proyecto_finde";
    $usuario = "root";
    $pass = "";

    $conn = mysqli_connect($servidor, $usuario, $pass, $bd);

    if (!$conn) {
        die("Error de conexion " . mysqli_connect_error());
    }

    echo "Conectado correctamente <hr>";
    return $conn;
}

$con = conectar_bd();