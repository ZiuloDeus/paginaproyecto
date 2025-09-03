<?php
// preparar consulta

function ver_datos(){
$peticion = $con->prepare("SELECT nombre_use FROM usuarios");
$peticion->execute();
$resultado = $peticion->get_result();

// recorrer todas las filas
// fila -> atributos del wolsom
while ($usuario = $resultado->fetch_assoc()) {
    echo "<pre>";
    foreach ($usuario as $nombreAtrib => $valorAtrib) {
        echo $nombreAtrib. " --> ". $valorAtrib. "<br>";
    }
    echo "</pre><hr>";
}

$peticion->close();
$con->close();
}


ver_datos();
