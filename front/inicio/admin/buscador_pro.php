<?php
// Incluye el archivo de consulta
$ruta_base = __DIR__ . '/../../back/conexion/';
   require_once($ruta_base . 'consulta.php');

// Recibe los datos desde el archivo consulta.php
$data = json_decode(file_get_contents('consulta.php'), true);

// Imprime los datos
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
      <p>Admin</p>
      <img src="person-circle.svg" alt="Perfil" style="width:40px; height:40px; border-radius:50%;">
    </div>
  </header>

  <div class="container">
        <aside>
            <nav>
                <ul>
                    <li>
                        <a href="horarios.html"><img src="calendar-fill.svg" alt="Horarios"></a>
                        <p>Horarios</p>
                    </li>
                    <li>
                        <a href="aulas.html" ><img src="event-fill.svg" alt="Aulas/etc"></a>
                        <p>Salones/Aulas</p>
                    </li>
                    <li>
                        <a href="recursos.html"><img src="resources-fill.svg" alt="Recursos"></a>
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
        <!-- Tabla solo muestra los datos -->
        <table id="tabla-profesores">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Materia</th>
            </tr>
            <?php
        if ($result->num_rows > 0) {
            // Imprimir las filas de la tabla
            while($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row["nombre"] . "</td>";
                echo "<td>" . $row["materia"] . "</td>";
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
  <script src="bus.pro.js" defer></script>
  <script src="panel.js" defer></script>
  <script src="../preferencias.js" defer></script>
</body>
</html>
