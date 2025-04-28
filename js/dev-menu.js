// =========================
// Dev Menu
// =========================

export function setupDevMenu() {
  const devBadge = document.getElementById("devBadge");
  const devMenu = document.getElementById("devMenu");

  if (devBadge && devMenu) {
    // Toggle dev menu open/close
    devBadge.addEventListener("click", (e) => {
      e.stopPropagation();
      devMenu.style.display =
        devMenu.style.display === "block" ? "none" : "block";
    });

    // Hide dev menu if clicking outside
    document.addEventListener("click", (e) => {
      if (!devBadge.contains(e.target) && !devMenu.contains(e.target)) {
        devMenu.style.display = "none";
      }
    });

    // Prevent dev menu from closing when clicking inside
    devMenu.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // Clear LocalStorage button inside dev menu
  const clearStorageLink = document.querySelector(
    "#devMenu a[href='#clear-storage']"
  );

  if (clearStorageLink) {
    clearStorageLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.clear();
      console.log("✅ LocalStorage cleared!");
      location.reload(); // Refresh to reflect cleared cart or theme
    });
  }
}
