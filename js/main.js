import { setupDevMenu } from "./dev-menu.js";
import { setupMobileMenu } from "./mobile-menu.js";
import { setupDarkMode } from "./dark-mode.js";
import { setupHeroSlider } from "./hero-slider.js";
import { setupSmoothScroll } from "./smooth-scroll.js";
import { setupCartDropdown } from "./cart-dropdown.js";
import { setupModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
  setupDevMenu();
  setupMobileMenu();
  setupCartDropdown();
  setupDarkMode();
  setupHeroSlider();
  setupSmoothScroll();
  setupModal();
});
