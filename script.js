document.addEventListener("DOMContentLoaded", () => {
  const userIcon = document.getElementById("user-icon");
  const userMenu = document.getElementById("user-menu");

  userIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    userMenu.style.display = userMenu.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (!userMenu.contains(e.target)) {
      userMenu.style.display = "none";
    }
  });
});
