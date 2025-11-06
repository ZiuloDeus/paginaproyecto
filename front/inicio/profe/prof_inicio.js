document.body.innerHTML = `
<div class="login-container">
  <form id="loginForm">
        <img class="back" src="arrow-left-circle-fill.svg" onclick="location.href='../index.html'">
    <h2>Iniciar Sesión - Profesor </h2>
    <label>Cédula:<br><input type="number" name="cedula" required></label><br><br>
    <label>Contraseña:<br><input type="password" name="password" required></label><br><br>
    <button type="submit">Entrar</button>
    <button type="button" id="irRegistro">Registrarse</button>
  </form>
  <div id="loginMsg" class="hidden"></div>
  </div>
`;

const loginForm = document.getElementById('loginForm');
const loginMsg = document.getElementById('loginMsg');
const cedulaInput = loginForm.cedula;

// Solo permitir 7 números en el campo cédula
cedulaInput.addEventListener('input', function() {
  cedulaInput.value = cedulaInput.value.replace(/[^0-9]/g, '');
  if (cedulaInput.value.length > 7) {
    cedulaInput.value = cedulaInput.value.slice(0, 7);
  }
});

function showMessage(message, type) {
  loginMsg.textContent = message;
  loginMsg.className = `loginMsg ${type}`; // Corrección de sintaxis aquí
  loginMsg.style.backgroundColor = type === 'success' ? 'green' : 'red';
  loginMsg.classList.remove('hidden');
  setTimeout(() => {
    loginMsg.classList.add('hidden');
  }, 10000); 
}

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Captura los datos del formulario usando FormData (más fiable)
    const formData = new FormData(loginForm);
    const cedula = formData.get('cedula');
    
    // Validar que la cédula tenga exactamente 7 números
    if (cedula.length !== 7) {
      showMessage('La cédula debe tener exactamente 7 números.', 'error');
        cedulaInput.focus();
        return;
    }

   fetch('profe-inicio.php', {
       method: 'POST',
     body: formData // Envía los datos como formulario estándar
    })
    .then(response => {
        if (!response.ok) {
     throw new Error('Error de red o del servidor.');
       }
        return response.json();
    })
     .then(data => {
        if (data.success) {
           showMessage('Inicio de sesión exitoso!', 'success');
           setTimeout(() => {
               window.location.href = '../../../front/inicio/profe/panel.html';
           }, 1000);
       } else {
           showMessage(data.message || 'Error de autenticación.', 'error');
       }
    })
    .catch(error => {
         console.error('Error en la solicitud:', error);
        showMessage('Error al conectar con el servidor. Intente más tarde.', 'error');
    });
});

document.getElementById('irRegistro').addEventListener('click', function() {
    window.location.href = '../registrar.php';
});