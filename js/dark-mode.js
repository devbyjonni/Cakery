// =========================
// Dark Mode Toggle
// =========================

export function setupDarkMode() {
  window.toggleDarkMode = (event) => {
    event.preventDefault();
    document.body.classList.toggle("dark-mode");
  };
}
