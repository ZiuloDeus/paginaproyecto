document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const cedulaInput = document.getElementById("cedula");
  const passwordInput = document.getElementById("password");
  const mensaje = document.getElementById("mensaje");

  if (!form) {
    console.error("No se encontró el formulario con id 'loginForm'");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const cedula = cedulaInput.value.trim();
    const password = passwordInput.value.trim();

    if (!cedula || !password) {
      mensaje.textContent = "Por favor, completa todos los campos.";
      mensaje.style.color = "red";
      return;
    }

    try {
    
      const response = await fetch("../../Api/Login_admin.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cedula, password }),
      });

      if (!response.ok) {
        throw new Error("Error al conectar con el servidor");
      }

      const data = await response.json();

      if (data.success) {
        mensaje.textContent = "Inicio de sesión exitoso. Redirigiendo...";
        mensaje.style.color = "green";

        // Pequeña pausa y redirección
        setTimeout(() => {
          window.location.href = "panel.html"; 
        }, 1500);
      } else {
        mensaje.textContent = data.message || "Credenciales incorrectas.";
        mensaje.style.color = "red";
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
      mensaje.textContent = "Error al conectar con el servidor.";
      mensaje.style.color = "red";
    }
  });
});
