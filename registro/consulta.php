<?php
include_once "conectar.php";
// preparar consulta

$nombre = $_POST['nombre'];
$passwordHash = password_hash($_POST['password'], PASSWORD_BCRYPT);
$con = conectar_bd();
$peticion = $con->prepare("INSERT INTO usuarios (nombre, contrasena) VALUES (?, ?)");
$peticion->bind_param("ss", $nombre, $passwordHash);
$peticion->execute();
$resultado = $peticion->get_result();

$peticion->close();
$con->close();