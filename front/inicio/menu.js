let currentLang = localStorage.getItem('lang') || 'es'; // cargar lenguaje guardado, si no hay uno usar español por defecto
let isDarkMode = localStorage.getItem('darkMode') === "true"; // cargar modo oscuro o claro guardado

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    applyDarkMode();
}

function changeLanguage() {
    currentLang = currentLang === "es" ? "en" : "es";
    localStorage.setItem('lang', currentLang);
    updateTableHeaders();
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

document.addEventListener("DOMContentLoaded", () => {
        // aplicar preferencias guardadas
        applyDarkMode();
        updateTableHeaders();

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
    fetch(currentLang + ".json")
        .then(response => {
            if (!response.ok) {
                throw new Error ('Error al cargar $(currentLang).json');
            }
            return response.json();
        })
        .then(data => {
            // Sesion
            const TitleCont = document.querySelector("h1");
                if (TitleCont && data.sesion) {
                    TitleCont.innerText = data.sesion;
                }
    
            // Message
            const MessageCont = document.querySelector("h3");
                if (MessageCont && data.message) {
                    MessageCont.innerText = data.message;
                }
    
            // Options
            const OptionsCont = document.querySelectorAll('p');
            OptionsCont.forEach((item, index) => {
            if (data.options && data.options[index]) {
                item.innerText = data.options[index];
            }
        });
    })
        .catch(err => console.error("Error loading JSON:", err));
}