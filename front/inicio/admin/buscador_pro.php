<?php
require_once __DIR__.'/../../../back/conexion/conexion.php';
$conn = conectar_bd();

$data = json_decode(file_get_contents('consulta.php'), true);
print_r($data);
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lista de Profesores</title>
  <link rel="stylesheet" href="panel.css" />
</head>
<body>
  <header>
    <div name="izquierda">
      <h2>Logo</h2>
    </div>
    <div name="derecha">
      <img src="person-circle.svg" alt="Perfil" style="width:40px; height:40px; border-radius:50%;">
      <button id="logout">Cerrar Sesion</button>
    </div>
  </header>

  <div class="container">
        <aside style="height: 100vh; min-height: 100vh;">
      <nav>
        <ul>
          <li>
            <a href="panel.html"><img src="arrow-left-circle-fill.svg" alt="Back"></a>
            <p>Regresar</p>
          </li>
          <li>
            <a href="aulas.html" ><img src="aula.png" alt="Aulas/etc"></a>
            <p>Salones/Aulas</p>
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

        <!-- Tabla solo muestra los datos -->
       <table id="tabla-profesores">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Materia</th>
            </tr>
            <?php
        if (true) {
            // Imprimir las filas de la tabla
            foreach($data as $d) {
                echo "<tr>";
                echo "<td>" . $d["nombre_profesor"] . "</td>";
                echo "<td>" . $d["nombre_materia"] . "</td>";
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='3'>No hay usuarios disponibles.</td></tr>";
        }
        ?>
    </table>

    <!-- Cerrar la conexión -->
    <?php
    $conn->close();
    ?>
          </thead>
          <tbody id="lista-profesores">
          </tbody>
        </table>

        <button id="btnAgregarProfe">Agregar Profesor</button>
        
      </div>
    </main>
  </div>

  <!-- Modal para agregar profesor -->
  <div id="modalAgregar" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>Agregar Profesor</h2>
      <input type="text" id="nombreProfe" placeholder="Nombre del profesor">
      <input type="text" id="materiaProfe" placeholder="Materia que dicta">
      <button id="guardarProfe">Guardar</button>
    </div>
  </div>
    <script src="bus_pro.js" defer></script>
    <script src="panel.js" defer></script>
    <script src="../preferencias.js" defer></script>
</body>
</html>
