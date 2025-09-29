         function showBox() {
            // Crear el contenedor de la caja
            const box = document.createElement('div');
            box.id = 'customBox'; // Asignar un ID para estilos y manipulación
            box.style.position = 'absolute';
            box.style.top = '50%';
            box.style.left = '50%';
            box.style.transform = 'translate(-50%, -50%)';
            box.style.width = '300px';
            box.style.height = '200px';
            box.style.backgroundColor = '#002c59';
            box.style.color = 'white';
            box.style.display = 'flex';
            box.style.flexDirection = 'column';
            box.style.justifyContent = 'space-around';
            box.style.alignItems = 'center';
            box.style.borderRadius = '10px';
            box.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            box.style.zIndex = '1000';

            // Crear el botón "Iniciar sesión"
            const loginButton = document.createElement('button');
            loginButton.textContent = 'Iniciar sesión';
            loginButton.style.padding = '10px 20px';
            loginButton.style.border = 'none';
            loginButton.style.borderRadius = '5px';
            loginButton.style.backgroundColor = '#005f73';
            loginButton.style.color = 'white';
            loginButton.style.cursor = 'pointer';
            loginButton.onclick = () => alert('Iniciar sesión presionado');

            // Crear el botón "Modo oscuro"
            const darkModeButton = document.createElement('button');
            darkModeButton.textContent = 'Modo oscuro';
            darkModeButton.style.padding = '10px 20px';
            darkModeButton.style.border = 'none';
            darkModeButton.style.borderRadius = '5px';
            darkModeButton.style.backgroundColor = '#005f73';
            darkModeButton.style.color = 'white';
            darkModeButton.style.cursor = 'pointer';

            // Alternar entre modo oscuro y claro
            let isDarkMode = false;
            darkModeButton.onclick = () => {
                if (isDarkMode) {
                    document.body.style.backgroundColor = '';
                    document.body.style.color = '';
                    darkModeButton.textContent = 'Modo oscuro';
                } else {
                    document.body.style.backgroundColor = '#121212';
                    document.body.style.color = '#ffffff';
                    darkModeButton.textContent = 'Modo claro';
                }
                isDarkMode = !isDarkMode;
            };

            // Crear el botón "Cerrar"
            const closeButton = document.createElement('button');
            closeButton.textContent = 'Cerrar';
            closeButton.style.padding = '10px 20px';
            closeButton.style.border = 'none';
            closeButton.style.borderRadius = '5px';
            closeButton.style.backgroundColor = '#e63946';
            closeButton.style.color = 'white';
            closeButton.style.cursor = 'pointer';
            closeButton.onclick = () => box.remove();

            // Agregar los botones a la caja
            box.appendChild(loginButton);
            box.appendChild(darkModeButton);
            box.appendChild(closeButton);

            // Agregar la caja al cuerpo del documento
            document.body.appendChild(box);
        }
