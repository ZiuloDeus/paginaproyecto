document.body.innerHTML = `
  <form id="Login">
    <h2>Iniciar Sesión</h2>
    <label>Cédula:<br><input type="number" name="cedula" required></label><br><br>
    <label>Contraseña:<br><input type="password" name="password" required></label><br><br>
    <button type="submit">Entrar</button>
    <button type="button" id="irRegistro">Registrarse</button>
  </form>
  <div id="loginMsg" class="hidden"></div>
`;

const loginForm = document.getElementById('Login');
const loginMsg = document.getElementById('loginMsg');

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
  // Aquí puedes redirigir o mostrar el contenido protegido
});

document.getElementById('irRegistro').addEventListener('click', function() {
  window.location.href = '../registro/registro.html';
});