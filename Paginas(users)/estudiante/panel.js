let currentLang = "es";
let isDarkMode = false;

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
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

document.addEventListener("DOMContentLoaded", () => {
    const logout = document.getElementById('logout');

    logout.addEventListener('click', () => {
        sessionStorage.clear(); // Limpiar datos de sesión
        window.location.href = "../../inicio/menu.html"; // redirigir a pagina de inicio de sesion
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
        langButton.onclick = () => {
            currentLang = currentLang === "es" ? "en" : "es";
            updateTableHeaders();
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
    fetch(currentLang + ".json")
        .then(response => response.json())
        .then(data => {
            // Sidebar
            const navItems = document.querySelectorAll("aside nav ul li p");
            navItems.forEach((item, index) => {
                if (data.sidebar && data.sidebar[index]) {
                    item.innerText = data.sidebar[index];
                }
            });

            // Main grid
            const mainItems = document.querySelectorAll(".botones > div > a > p");
            mainItems.forEach((item, index) => {
                if (data.main && data.main[index]) {
                    item.innerText = data.main[index];
                }
            });

            // Title
            const titleEl = document.querySelector('.botones div[style*="grid-area: e;"] h1');
            if (titleEl && data.title) {
                titleEl.innerText = data.title;
            }

            // Tabla de horarios
            if (data.Lunes) document.getElementById('th-lunes').textContent = data.Lunes;
            if (data.Martes) document.getElementById('th-martes').textContent = data.Martes;
            if (data['Miércoles']) document.getElementById('th-miercoles').textContent = data['Miércoles'];
            if (data.Jueves) document.getElementById('th-jueves').textContent = data.Jueves;
            if (data.Viernes) document.getElementById('th-viernes').textContent = data.Viernes;
        })
        .catch(err => console.error("Error loading JSON:", err));
}

// buscador.js
function setupBuscador(inputId, resultadosId, phpFile, mostrarCallback) {
    const input = document.getElementById(inputId);
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

// Ejemplo de uso para profesores:
setupBuscador(
    'busqueda_pro',      // id del input
    'resultados_pro',    // id del ul
    'buscador_pro.php',  // archivo PHP
    prof => prof.nombre + ' ' + (prof.apellido || '')
);

// Para grupos:
setupBuscador(
    'busqueda_gru',
    'resultados_gru',
    'buscador_grupos.php',
    gru => gru.nombre
);