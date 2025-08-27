document.body.innerHTML = `
  <form id="fichaEstudiante">
    <h2>Ficha de Estudiante</h2>
    <label>Nombre:<br><input type="text" name="nombre" required></label><br><br>
    <label>Apellido:<br><input type="text" name="apellido" required></label><br><br>
    <label>Email:<br><input type="email" name="email" required></label><br><br>
    <label>Contraseña:<br><input type="password" name="password" required></label><br>
    <span id="seguridadMsg" style="color:#2a4d8f;font-size:0.95em;"></span><br><br>
    <label>Repetir Contraseña:<br><input type="password" name="repetirPassword" required></label><br><br>
    <label>Fecha de nacimiento:<br><input type="date" name="fechaNacimiento" required></label><br><br>
    <button type="submit">Registrar</button>
    <button type="button" id="cancelarBtn">Cancelar</button>
  </form>
`;

const form = document.getElementById ('fichaEstudiante');
const passwordInput = form.password;
const repetirPasswordInput = form.repetirPassword;
const seguridadMsg = document.getElementById('seguridadMsg');

function esContrasenaSegura(contrasena) {
  const tieneLetra = /[a-zA-Z]/.test(contrasena);
  const tieneNumero = /[0-9]/.test(contrasena);
  const longitudValida = contrasena.length >= 8 && contrasena.length <= 20;
  return tieneLetra && tieneNumero && longitudValida;
}

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
    email: form.email.value,
    password: form.password.value,
    repetirPassword: form.repetirPassword.value,
    fechaNacimiento: form.fechaNacimiento.value
  };
  

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

  console.log('Enviando a la base de datos:', data);
  alert('Registro enviado.');
  form.reset();
  seguridadMsg.textContent = '';
});

document.getElementById('cancelarBtn').addEventListener('click', function() {
  form.reset();
  seguridadMsg.textContent = '';
});