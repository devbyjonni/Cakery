export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function updateCartCount() {
  const total = getCart().reduce((sum, item) => sum + (item.quantity || 0), 0);
  document
    .querySelectorAll(".cart-count")
    .forEach((el) => (el.textContent = total));
}

export function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  updateCartCount();
}

export function resetCart() {
  localStorage.removeItem("cart");
  updateCartCount();
}
