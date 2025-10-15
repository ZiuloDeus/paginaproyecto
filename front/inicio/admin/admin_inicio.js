document.body.innerHTML = `
  <form id="Login">
    <h2>Iniciar Sesión - Administrador </h2>
    <label>Cédula:<br><input type="number" name="cedula" required></label><br><br>
    <label>Contraseña:<br><input type="password" name="password" required></label><br><br>
    <button type="submit">Entrar</button>
    <button type="button" id="irRegistro">Registrarse</button>
  </form>
  <div id="loginMsg" class="hidden"></div>
`;

const loginForm = document.getElementById('Login');
const loginMsg = document.getElementById('loginMsg');
const cedulaInput = loginForm.cedula;

// Solo permitir 7 números en el campo cédula
cedulaInput.addEventListener('input', function() {
  // Eliminar cualquier caracter que no sea número
  cedulaInput.value = cedulaInput.value.replace(/[^0-9]/g, '');
  // Limitar a 7 caracteres
  if (cedulaInput.value.length > 7) {
    cedulaInput.value = cedulaInput.value.slice(0, 7);
  }
});

function showMessage(message, type) {
  loginMsg.textContent = message;
  loginMsg.className = 'loginMsg ${type}';
  loginMsg.style.backgroundColor = type === 'success' ? 'green' : 'red';
  loginMsg.classList.remove('hidden');
  setTimeout(() => {
    loginMsg.classList.add('hidden');
  }, 10000); // Ocultar después de 10 segundos
}

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const cedula = loginForm.cedula.value;
  const password = loginForm.password.value;

  // Validar que la cédula tenga exactamente 7 números
  if (cedula.length !== 7) {
    showMessage('La cédula debe tener exactamente 7 números.', 'error');
    cedulaInput.focus();
    return;
  }

  const usuario = JSON.parse(localStorage.getItem(cedula));

  if (!usuario) {
    showMessage('Usuario no registrado.' , 'error');
    return;
  }
  if (usuario.password !== password) {
    showMessage('Contraseña incorrecta.' , 'error');
    return; 
  }
  showMessage('Inicio de sesión exitoso!' , 'success');
  window.location.href = 'panel.html' // redirigir a pagina principal de admin
});