export function openModal(product, addToCartCallback) {
  document.getElementById("modal-product-image").src = product.image;
  document.getElementById("modal-product-name").textContent = product.name;
  document.getElementById("modal-product-price").textContent = `${product.price} kr`;
  document.getElementById("modal-product-description").textContent = product.description;
  document.getElementById("modal-product-ingredients").textContent = "Ingredients: " + (product.ingredients || "N/A");
  document.getElementById("modal-product-category").textContent = "Category: " + (product.category || "N/A");

  document.getElementById("modal-add-to-cart").onclick = () => {
    addToCartCallback(product);
    closeModal();
  };

  document.getElementById("product-modal").classList.add("active");
}

export function closeModal() {
  document.getElementById("product-modal").classList.remove("active");
}