<?php
function conectarBd() : ?mysqli
{
    $servername = "localhost"; // Or your database host
    $username = "db_Sistematizacion_de_datos";
    $password = "54321";
    $dbname = "Sistematizacion_de_datos";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    mysqli_report(MYSQLI_REPORT_OFF);

    // Check connection
    if (!$conn) return null;
    return $conn;
}
?>