let currentLang = localStorage.getItem('lang') || 'es'; // cargar lenguaje guardado, si no hay uno usar español por defecto
let isDarkMode = localStorage.getItem('darkMode') === "true"; // cargar modo oscuro o claro guardado

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    applyDarkMode();
}

function applyDarkMode() {
    if (isDarkMode) {
        document.body.style.backgroundColor = '#121212';
        document.body.style.backgroundImage = 'none';
        document.body.style.color = '#ffffff';
    } else {
        document.body.style.backgroundColor = '#e5e5f7';
        document.body.style.backgroundImage =
            'linear-gradient(#444cf7 1px, transparent 1px), linear-gradient(to right, #444cf7 1px, #e5e5f7 1px)';
        document.body.style.color = '#333';
    }
}

function changeLanguage() {
    currentLang = currentLang === "es" ? "en" : "es";
    localStorage.setItem('lang', currentLang);
    updateTableHeaders();
}

document.addEventListener("DOMContentLoaded", () => {
    // aplicar preferencias guardadas
    applyDarkMode();
    updateTableHeaders();

    const logout = document.getElementById('logout');

    logout.addEventListener('click', () => {
        sessionStorage.clear(); // Limpiar datos de sesión
        window.location.href = "../index.html"; // redirigir a pagina de inicio de sesion
    });


    window.showBox = function() {
        if (document.getElementById('overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.onclick = closeBox;

        const box = document.createElement('div');
        box.id = 'customBox';

        // Botón "Modo oscuro"
        const darkModeButton = document.createElement('button');
        darkModeButton.style.backgroundColor = '#005f73';
        darkModeButton.textContent = (currentLang === "es") ? "Modo oscuro" : "Dark mode";
        darkModeButton.onclick = toggleDarkMode;

        // Botón "Cambiar idioma"
        const langButton = document.createElement('button');
        langButton.style.backgroundColor = '#1d3557';
        langButton.textContent = (currentLang === "es") ? "English" : "Español";
        // Actualizar etiquetas al cambiar idioma
        langButton.onclick = () => {
            changeLanguage();
            updateModalLabels(darkModeButton, langButton, closeButton);
        };

        // Botón "Cerrar"
        const closeButton = document.createElement('button');
        closeButton.style.backgroundColor = '#e63946';
        closeButton.textContent = (currentLang === "es") ? "Cerrar" : "Close";
        closeButton.onclick = closeBox;

        function closeBox() {
            overlay.remove();
            box.remove();
        }

        function updateModalLabels(dmBtn, lBtn, cBtn) {
            dmBtn.textContent = (currentLang === "es") ? "Modo oscuro" : "Dark mode";
            lBtn.textContent = (currentLang === "es") ? "English" : "Español";
            cBtn.textContent = (currentLang === "es") ? "Cerrar" : "Close";
        }

        box.appendChild(darkModeButton);
        box.appendChild(langButton);
        box.appendChild(closeButton);

        document.body.appendChild(overlay);
        document.body.appendChild(box);
    };

    updateTableHeaders(); // inicializar idioma al cargar
});

function updateTableHeaders() {
    let titleIndex = -1;
   console.log(`Loading JSON file: ${previousLang}.json`);
  fetch(`${previousLang}.json?cacheBust=${Date.now()}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Error de HTTP, estado: ${response.status}")
        }
        return response.json();
      })
      .then(previousData => {
        // Conseguir posición del título actual antes de cambiar el idioma
        const title = document.querySelector('h1');
        if (title && Array.isArray(previousData.title)) {
          titleIndex = previousData.title.findIndex((t) => t === title.textContent);
        }
        
            // Cargar el nuevo idioma
                console.log(`Loading JSON file: ${currentLang}.json`);
    fetch(`${currentLang}.json?cacheBust=${Date.now()}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Error de HTTP, estado: ${response.status}")
        }
        return response.json();
        })
        .then(data => {
            console.log('Loaded JSON data:', data);
            
            // Sidebar
            const navItems = document.querySelectorAll("aside nav ul li p");
            navItems.forEach((item) => {
                if (item && Array.isArray(previousData.sidebar)) {
        // Encontrar el index de cada elemento
        const sidebarIndex = previousData.sidebar.findIndex((t) => t === item.textContent);

        if (sidebarIndex !== -1 && Array.isArray(data.sidebar)) {
            // Usar los index para traducir cada elemento
            item.textContent = data.sidebar[sidebarIndex];
        } else {
            console.warn(`Sidebar item not found in the new language file: ${item.textContent}`);
        }
    }
});

            // Main grid
            const mainItems = document.querySelectorAll(".botones > div > a > p");
            mainItems.forEach((item, index) => {
                if (data.main && data.main[index]) {
                    item.innerText = data.main[index];
                }
            });

            // Tabla de horarios
            if (document.getElementById('tablaHorarios')) {
            if (data.Lunes) document.getElementById('th-lunes').textContent = data.Lunes;
            if (data.Martes) document.getElementById('th-martes').textContent = data.Martes;
            if (data['Miércoles']) document.getElementById('th-miercoles').textContent = data['Miércoles'];
            if (data.Jueves) document.getElementById('th-jueves').textContent = data.Jueves;
            if (data.Viernes) document.getElementById('th-viernes').textContent = data.Viernes;
            }

            //Cierre de sesion
            if (logout && data.logout) {
              logout.textContent = data.logout;
              //Titulos
 if (titleIndex !== -1) {
        if (Array.isArray(data.title) && data.title[titleIndex]) {
          title.textContent = data.title[titleIndex];
        } else {
          console.warn('Titulo no encontrado en el nuevo archivo de idioma');
        }
 }

// Botones
            const addItems = document.querySelectorAll(".add");
            addItems.forEach((item) => {
                if (item && Array.isArray(previousData.add)) {
        // Encontrar el index de cada elemento
        const addIndex = previousData.add.findIndex((t) => t === item.textContent);

        if (addIndex !== -1 && Array.isArray(data.add)) {
            // Usar los index para traducir cada elemento
            item.textContent = data.add[addIndex];
        } else {
            console.warn(`Item not found in the new language file: ${item.textContent}`);
        }
    }
});

// Tabla
            const tableItems = document.querySelectorAll("th");
            tableItems.forEach((item) => {
                if (item && Array.isArray(previousData.table)) {
        // Encontrar el index de cada elemento
        const tableIndex = previousData.table.findIndex((t) => t === item.textContent);

        if (tableIndex !== -1 && Array.isArray(data.table)) {
            // Usar los index para traducir cada elemento
            item.textContent = data.table[tableIndex];
        } else {
            console.warn(`Table item not found in the new language file: ${item.textContent}`);
        }
    }
});
 
      }
    })

        .catch(err => console.error("Error loading JSON:", err));
      })
      .catch(err => console.error ("Error loading JSON:", err));
    }

// buscador.js
function setupBuscador(id_materia, resultadosId, phpFile, mostrarCallback) {
    const input = document.getElementById(id_materia);
    const resultados = document.getElementById(resultadosId);

    if (!input || !resultados) return;

    input.addEventListener('input', function() {
        const q = this.value;
        fetch(`${phpFile}?q=${encodeURIComponent(q)}`)
            .then(res => res.json())
            .then(data => {
                resultados.innerHTML = '';
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = mostrarCallback(item);
                    resultados.appendChild(li);
                });
            });
    });
}

// Ejemplo de uso para grupos:
setupBuscador(
    'busqueda_gru',
    'resultados_gru',
    'buscador_grupos.php',
    gru => gru.nombre
);