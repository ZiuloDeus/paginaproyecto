document.body.innerHTML = `
  <form id="Registro">
    <h2>Registro</h2>
    <label>Nombre:<br><input type="text" name="nombre" required></label><br><br>
    <label>Apellido:<br><input type="text" name="apellido" required></label><br><br>
    <label>Cedula:<br><input type="number" name="cedula" required></label><br><br>
    <label>Contraseña:<br><input type="password" name="password" required></label><br>
    <span id="seguridadMsg" style="color:#2a4d8f;font-size:0.95em;"></span><br><br>
    <label>Repetir Contraseña:<br><input type="password" name="repetirPassword" required></label><br><br>
    <label>Fecha de nacimiento:<br><input type="date" name="fechaNacimiento" required></label><br><br>
    <button type="submit">Registrar</button>
    <button type="button" id="cancelarBtn">Cancelar</button>
  </form>
`;

const form = document.getElementById ('Registro');
const passwordInput = form.password;
const repetirPasswordInput = form.repetirPassword;
const seguridadMsg = document.getElementById('seguridadMsg');
const cedulaInput = form.cedula;
const nombreInput = form.nombre;
const apellidoInput = form.apellido;

function esContrasenaSegura(contrasena) {
  const tieneLetra = /[a-zA-Z]/.test(contrasena);
  const tieneNumero = /[0-9]/.test(contrasena);
  const longitudValida = contrasena.length >= 8 && contrasena.length <= 20;
  return tieneLetra && tieneNumero && longitudValida;
}

// Validación en tiempo real para cédula: solo números positivos y máximo 7 caracteres
cedulaInput.addEventListener('input', function() {
  // Eliminar cualquier caracter que no sea número
  cedulaInput.value = cedulaInput.value.replace(/[^0-9]/g, '');
  // Limitar a 7 caracteres
  if (cedulaInput.value.length > 7) {
    cedulaInput.value = cedulaInput.value.slice(0, 7);
  }
});

// Validación en tiempo real para nombre: solo letras y espacios
nombreInput.addEventListener('input', function() {
  // Eliminar cualquier caracter que no sea letra o espacio
  nombreInput.value = nombreInput.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
});

// Validación en tiempo real para apellido: solo letras y espacios
apellidoInput.addEventListener('input', function() {
  apellidoInput.value = apellidoInput.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
});

passwordInput.addEventListener('input', function() {
  const contrasena = passwordInput.value;
  if (contrasena.length === 0) {
    seguridadMsg.textContent = '';
    return;
  }
  if (contrasena.length < 8) {
    seguridadMsg.textContent = 'La contraseña debe tener al menos 8 caracteres';
    seguridadMsg.style.color = 'red';
    return;
  }
  if (contrasena.length > 20) {
    seguridadMsg.textContent = 'La contraseña no debe superar los 20 caracteres';
    seguridadMsg.style.color = 'red';
    return;
  }
  if (!/[a-zA-Z]/.test(contrasena) || !/[0-9]/.test(contrasena)) {
    seguridadMsg.textContent = 'La contraseña debe tener letras y números';
    seguridadMsg.style.color = 'red';
    return;
  }
  seguridadMsg.textContent = 'Contraseña segura ✔️';
  seguridadMsg.style.color = '#2a4d8f';
});

repetirPasswordInput.addEventListener('input', function() {
  if (repetirPasswordInput.value !== passwordInput.value) {
    seguridadMsg.textContent = 'Las contraseñas no coinciden';
    seguridadMsg.style.color = 'red';
  } else if (esContrasenaSegura(passwordInput.value)) {
    seguridadMsg.textContent = 'Contraseña segura ✔️';
    seguridadMsg.style.color = '#2a4d8f';
  }
});

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const data = {
    nombre: form.nombre.value,
    apellido: form.apellido.value,
    cedula: form.cedula.value,
    password: form.password.value,
    repetirPassword: form.repetirPassword.value,
    fechaNacimiento: form.fechaNacimiento.value
  };

  // Validación de cédula: exactamente 7 dígitos y solo números positivos
  if (data.cedula.length !== 7 || isNaN(data.cedula) || Number(data.cedula) < 0) {
    alert('La cédula debe tener exactamente 7 números y no puede ser negativa.');
    cedulaInput.focus();
    return;
  }

  if (data.password !== data.repetirPassword) {
    alert('Las contraseñas no coinciden.');
    repetirPasswordInput.focus();
    return;
  }

  if (!esContrasenaSegura(data.password)) {
    alert('La contraseña debe tener entre 8 y 20 caracteres, letras y números.');
    passwordInput.focus();
    return;
  }

  // Verificar si la cédula ya está registrada
  if (localStorage.getItem(data.cedula)) {
    alert('La cédula ya está registrada. Inicia sesión o usa otra.');
    cedulaInput.focus();
    return;
  }

  // Guardar usuario en localStorage
  localStorage.setItem(data.cedula, JSON.stringify({
    nombre: data.nombre,
    apellido: data.apellido,
    cedula: data.cedula,
    password: data.password,
    fechaNacimiento: data.fechaNacimiento
  }));

  alert('Registro exitoso. Ahora puedes iniciar sesión.');
  window.location.href = '../inicio/inicio.html'; // Cambia la ruta si es necesario
});

document.getElementById('cancelarBtn').addEventListener('click', function() {
  form.reset();
  seguridadMsg.textContent = '';
});