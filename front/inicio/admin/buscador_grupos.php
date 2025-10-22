<?php
require_once dirname(__FILE__).'/conexion.php';
$conn = conectar_bd();

// Consulta grupos
$sql = "SELECT nombre FROM grupos";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Grupos</title>
    <link rel="stylesheet" href="panel.css">
    <script src="bus_pro.js" defer></script>
    <link rel="icon" href="favicon.ico" type="image/x-icon">
</head>
<body>
    <header>
        <div name="izquierda">
            <h2>Logo</h2>
        </div>
        <div name="derecha">
            <p>Nombre del Admin</p>
            <img src="person-circle.svg" alt="Avatar" style="width:40px; height:40px; border-radius:50%;">
        </div>
    </header>

    <div class="container">
        <aside>
            <nav>
                <ul>
                    <li>
                        <a href="panel.html"><img src="arrow-left-circle-fill.svg" alt="Back"></a>
                        <p>Regresar</p>
                    </li>
                </ul>
            </nav>
        </aside>

        <main>
            <div class="texto">
                <h1>Lista de Grupos</h1>
                
                <!-- Lista de grupos -->
                <div id="listaGrupos">
                    <ul id="resultados_gru">
                        <?php
                        if ($result && $result->num_rows > 0) {
                            while ($row = $result->fetch_assoc()) {
                                echo "<li>" . htmlspecialchars($row['nombre']) . "</li>";
                            }
                        } else {
                            echo "<li>No hay grupos registrados.</li>";
                        }
                        ?>
                    </ul>
                </div>
            </div>
        </main>
    </div>
</body>
</html>

<?php $conn->close(); ?>