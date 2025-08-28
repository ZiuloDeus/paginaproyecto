document.body.innerHTML = `
  <form id="Login">
    <h2>Iniciar Sesión</h2>
    <label>Cédula:<br><input type="number" name="cedula" required></label><br><br>
    <label>Contraseña:<br><input type="password" name="password" required></label><br><br>
    <button type="submit">Entrar</button>
    <button type="button" id="irRegistro">Registrarse</button>
  </form>
  <div id="loginMsg" style="color:red;"></div>
`;

const loginForm = document.getElementById('Login');
const loginMsg = document.getElementById('loginMsg');

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const cedula = loginForm.cedula.value;
  const password = loginForm.password.value;
  const usuario = JSON.parse(localStorage.getItem(cedula));

  if (!usuario) {
    loginMsg.textContent = 'Usuario no registrado.';
    return;
  }
  if (usuario.password !== password) {
    loginMsg.textContent = 'Contraseña incorrecta.';
    return;
  }
  loginMsg.style.color = 'green';
  loginMsg.textContent = '¡Inicio de sesión exitoso!';
  // Aquí puedes redirigir o mostrar el contenido protegido
});

document.getElementById('irRegistro').addEventListener('click', function() {
  window.location.href = '../registro/registro.html';
});