// =========================
// Simple Modal for Product Quick View
// =========================
import { addToCart, updateCartCount, updateCartDropdown } from "./cart.js";

export function setupModal() {
  console.log("🔔 setupModal() running");

  const cards = document.querySelectorAll(".product-card");
  const overlay = document.getElementById("simple-modal");
  const closeBtn = document.getElementById("close-simple-modal");
  const modalAddBtn = document.getElementById("modal-add-to-cart");
  let currentItem = null;

  console.log("🗂️ Found cards:", cards.length);

  cards.forEach((card) => {
    const img = card.querySelector(".product-image");
    const cardAddBtn = card.querySelector(".card-add-to-cart");

    // 1) Open modal on image click
    if (img) {
      img.addEventListener("click", (e) => {
        e.stopPropagation();
        const name = card.querySelector(".product-name").textContent;
        const price = card
          .querySelector(".product-price")
          .textContent.replace("$", "");
        const desc = card.querySelector(".product-description").textContent;
        const src = img.src;

        // Populate modal
        document.getElementById("modal-product-name").textContent = name;
        document.getElementById(
          "modal-product-price"
        ).textContent = `$${price}`;
        document.getElementById("modal-product-description").textContent = desc;
        document.getElementById("modal-product-image").src = src;

        // Save for later
        currentItem = { name, price, image: src };

        // Show overlay
        overlay.classList.add("active");
        overlay.setAttribute("aria-hidden", "false");
      });
    }

    // 2) Direct “Add to Cart” from product card
    if (cardAddBtn) {
      cardAddBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const directProduct = {
          name: card.querySelector(".product-name").textContent,
          price: card
            .querySelector(".product-price")
            .textContent.replace("$", ""),
          image: img.src,
        };
        console.log("🛒 Adding directly:", directProduct);
        addToCart(directProduct);
        updateCartCount();
        updateCartDropdown();
      });
    }
  });

  // 3) Add to Cart inside Modal
  if (modalAddBtn) {
    modalAddBtn.addEventListener("click", () => {
      if (!currentItem) {
        console.warn("🚫 No product selected for modal Add to Cart!");
        return;
      }
      console.log("🛒 Adding from modal:", currentItem);
      addToCart(currentItem);
      updateCartCount();
      updateCartDropdown();
      overlay.classList.remove("active");
      overlay.setAttribute("aria-hidden", "true");
    });
  }

  // 4) Close modal via “×” button
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("active");
      overlay.setAttribute("aria-hidden", "true");
    });
  }

  // 5) Close modal by clicking outside the content box
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
      overlay.setAttribute("aria-hidden", "true");
    }
  });

  // Initialize cart count & dropdown
  updateCartCount();
  updateCartDropdown();
}
