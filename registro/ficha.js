const form = document.getElementById ('form');
const passwordInput = form.querySelector('[name="password"]');
const repetirPasswordInput = form.querySelector('[name="repetirPassword"]');;
const seguridadMsg = document.getElementById('seguridadMsg');
const cedulaInput = form.querySelector('[name="cedula"]');;
const nombreInput = form.querySelector('[name="nombre"]');;
const apellidoInput = form.querySelector('[name="apellido"]');;

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

/*
repetirPasswordInput.addEventListener('input', function() {
  if (repetirPasswordInput.value !== passwordInput.value) {
    seguridadMsg.textContent = 'Las contraseñas no coinciden';
    seguridadMsg.style.color = 'red';
  } else if (esContrasenaSegura(passwordInput.value)) {
    seguridadMsg.textContent = 'Contraseña segura ✔️';
    seguridadMsg.style.color = '#2a4d8f';
  }
});
*/

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const data = {
    nombre: form.nombre.value,
    apellido: form.apellido.value,
    cedula: form.cedula.value,
    password: form.password.value
  };

  // Validación de cédula: exactamente 7 dígitos y solo números positivos
  if (data.cedula.length !== 7 || isNaN(data.cedula) || Number(data.cedula) < 0) {
    alert('La cédula debe tener exactamente 7 números y no puede ser negativa.');
    cedulaInput.focus();
    return;
  }

  if (!esContrasenaSegura(data.password)) {
    alert('La contraseña debe tener entre 8 y 20 caracteres, letras y números.');
    passwordInput.focus();
    return;
  }

  fetch('consulta.php', {
    method: 'POST',
    body: new FormData(form)
  })
  .then(response => response)
  .then(result => {
    if (result.ok) {
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    window.location.href = '../inicio/inicio.html'; // Cambia la ruta si es necesario
    } else {
      console.error('Error:', error);
    alert('Hubo un error en el registro. Intenta nuevamente.');
    }
  })
  .catch(error => {
    
  });
});

document.getElementById('cancelarBtn').addEventListener('click', function() {
  window.location.href = '../inicio/inicio.html'; 
});