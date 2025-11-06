<?php
require_once dirname(__FILE__).'/../../../back/conexion/conexion.php';
$conn = conectar_bd();
$sql = "SELECT nombre FROM Materias";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración</title>
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
            <button id="logout">Cerrar Sesion</button>
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
                <h1>Lista de Materias</h1>
                
                <!-- Lista de grupos -->
                <div id="lista">
                    <ul id="resultados">
                        <?php
                        if ($result && $result->num_rows > 0) {
                            while ($row = $result->fetch_assoc()) {
                                echo "<li>" . htmlspecialchars($row['nombre']) . "</li>";
                            }
                        } else {
                            echo "<li>No hay materias registradas.</li>";
                        }
                        ?>
                    </ul>
                    <button class="add" type="button" onclick="abrirModal('materia')">Agregar materia</button>
                </div>
            </div>
        </main>
            </div> 

    <div id="modalMateria" class="modal" style="display:none;">
      <div class="modal-content">
        <span class="close" onclick="cerrarModal('materia')">&times;</span>
        <h2 class="add">Agregar Materia</h2>
    <form id="formulario">
       <input type="text" name="nombre" placeholder="Nombre de la materia" required>
       <button class="add"type="submit">Agregar materia</button>
    </form>

<div id="mensaje"></div>

      </div>
    </div>
        <script src="panel.js" defer></script>
        <script src="../preferencias.js" defer></script>
</body>
</html>
<?php $conn->close(); ?>