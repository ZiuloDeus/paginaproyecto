window.addEventListener("load", () => {
  document.getElementById("main-content").classList.add("visible");
});

document.getElementById("calendarBtn").addEventListener("click", () => {
  alert("Abrir calendario");
});

document.getElementById("downBtn").addEventListener("click", () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
});

