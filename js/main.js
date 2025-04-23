import { addToCart, resetCart, updateCartCount } from "./cart.js";
import { openModal, closeModal } from "./modal.js";
import { loadProducts } from "./productLoader.js";

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  loadProducts();

  window.addEventListener("scroll", () => {
    document
      .querySelector(".main-nav")
      ?.classList.toggle("scrolled", window.scrollY > 50);
  });

  document.getElementById("close-modal")?.addEventListener("click", closeModal);

  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      e.preventDefault();
      const btn = e.target;
      addToCart({
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price),
        image: btn.dataset.image,
      });
    }

    if (e.target.classList.contains("reset-cart-btn")) {
      e.preventDefault();
      resetCart();
    }

    const view = e.target.closest(".view-details");
    if (view) {
      e.preventDefault();
      openModal(
        {
          id: view.dataset.id,
          name: view.dataset.name,
          price: parseFloat(view.dataset.price),
          image: view.dataset.image,
          description: view.dataset.description,
          ingredients: view.dataset.ingredients,
          category: view.dataset.category,
        },
        addToCart
      );
    }
  });
});
