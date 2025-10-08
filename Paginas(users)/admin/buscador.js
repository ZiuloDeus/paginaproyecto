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
    document.querySelectorAll('.buscador').forEach(buscador => {
        const resultados = document.getElementById('resultados');
        buscador.addEventListener('input', function() {
            const valor = buscador.value;
            const tipo = buscador.dataset.tipo;
            if (valor.length < 2) {
                resultados.innerHTML = "";
                return;
            }
            let endpoint = "";
            if (tipo === "grupos") endpoint = "buscador_grupos.php";
            if (tipo === "asignaturas") endpoint = "buscador_asignaturas.php";
            if (tipo === "profesores") endpoint = "buscador_profesores.php";
            fetch(`${endpoint}?q=${encodeURIComponent(valor)}`)
                .then(res => res.json())
                .then(data => {
                    if (data.length === 0) {
                        resultados.innerHTML = "<p>No se encontraron resultados.</p>";
                    } else {
                        resultados.innerHTML = data.map(item => `<p>${item.nombre}</p>`).join('');
                    }
                })
                .catch(() => {
                    resultados.innerHTML = "<p>Error al buscar.</p>";
                });
        });
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
        })
        .catch(err => console.error("Error loading JSON:", err));
}