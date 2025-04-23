import { addToCart, updateCartCount } from "./cart.js";
import { openModal } from "./modal.js";

export async function loadProducts(gridSelector = ".card-grid") {
  const res = await fetch("assets/data/products.json");
  const products = await res.json();
  const grid = document.querySelector(gridSelector);

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
    <img 
      src="${product.image}" 
      alt="${product.name}" 
      class="view-details"
      data-id="${product.id}" 
      data-name="${product.name}"
      data-price="${product.price}" 
      data-image="${product.image}"
      data-description="${product.description || "No description."}"
      data-ingredients="${(product.ingredients || []).join(", ")}"
      data-category="${product.category || "Cupcake"}"
    />
    <h3 class="title-secondary">${product.name}</h3>
    <p class="text-secondary"><strong>${product.price} kr</strong></p>
    <button 
      class="btn btn-primary add-to-cart"
      data-id="${product.id}" 
      data-name="${product.name}"
      data-price="${product.price}" 
      data-image="${product.image}"
    >
      Add to Cart
    </button>
  `;

    grid.appendChild(card);
  });

  updateCartCount();
}
