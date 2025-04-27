// === Cart Dropdown ===
export function setupCartDropdown() {
  const cartToggle = document.getElementById("cartToggle");
  const cartDropdown = document.getElementById("cartDropdown");

  if (cartToggle && cartDropdown) {
    cartToggle.addEventListener("click", (e) => {
      e.preventDefault();
      cartDropdown.style.display =
        cartDropdown.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (e) => {
      if (!cartToggle.contains(e.target) && !cartDropdown.contains(e.target)) {
        cartDropdown.style.display = "none";
      }
    });
  }
}
