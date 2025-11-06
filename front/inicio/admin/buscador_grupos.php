<?php
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Profesores</title>
    <link rel="stylesheet" href="panel.css">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
</head>
<body>
    <header>
        <div name="izquierda">
            <h2>Logo</h2>
        </div>
        <div name="derecha">
            <img src="person-circle.svg" alt="Avatar" style="width:40px; height:40px; border-radius:50%;">
            <button id="logout"> Cerrar Sesión</button>
        </div>
    </header>

    <div class="container">
        <aside>
            <nav>
                <li>
                        <a href="panel.html"><img src="arrow-left-circle-fill.svg" alt="Back"></a>
                        <p>Regresar</p>
                    </li>
                    <li>
                        <a href="aulas.html">
                        <img src="aula.png" alt="Aulas/etc"></a>
                        <p>Salones/Aulas</p>
                    </li>
                    <li>
                        <a href="recursos.php"><img src="recurso-educativo.png" alt="Recursos"></a>
                        <p>Recursos</p>
                    </li>
                    <li onclick="showBox()">
                        <img src="gear-fill.svg" alt="Configuración">
                        <p>Configuración</p>
                    </li>
                </ul>
            </nav>
        </aside>

        <main>
            <div class="texto">
                <h1>Lista de Profesores</h1>
                <input id="id_profesor" type="text" placeholder="Buscar profesor..." onkeyup="buscarProfesor()">
                
                <!-- Lista de profesores -->
                <div id="listaProfesores">
                    <ul id="resultados_pro">
                        <?php
                        if (mysqli_num_rows($result) > 0) {
                            while ($row = mysqli_fetch_assoc($result)) {
                                echo "<li>" . htmlspecialchars($row['nombre']) . " " . htmlspecialchars($row['apellido']) . "</li>";
                            }
                        } else {
                            echo "<li>No hay profesores registrados.</li>";}
                        ?>
                    </ul>
                </div>
            </div>
        </main>
    </div>
    <script src="bus_pro.js" defer></script>
    <script src="panel.js" defer></script>
</body>
</html>

<?php mysqli_close($conn); ?>