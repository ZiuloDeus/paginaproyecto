<?php
include_once "conectar.php";
// preparar consulta

$con = conectar_bd();
$peticion = $con->prepare("SELECT * FROM usuarios");
$peticion->execute();
$resultado = $peticion->get_result();
while ($fila = $resultado->fetch_assoc()) {
    echo "ID: " . $fila['id_user'] . " <br> Nombre: " . $fila['nombre']. "<br><br>";
}

$resultado->free();
$peticion->close();
$con->close();