// === CART FUNCTIONS ===

// Get cart from localStorage
export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage
export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
export function addToCart(product) {
  const cart = getCart();
  cart.push(product);
  saveCart(cart);
  updateCartCount();
  updateCartDropdown();
}

// Reset cart
export function resetCart() {
  localStorage.removeItem("cart");
  updateCartCount();
  updateCartDropdown();
}

// Update cart count badge
export function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  const cart = getCart();
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// Update cart dropdown
export function updateCartDropdown() {
  const cartDropdown = document.getElementById("cartDropdown");
  if (!cartDropdown) return;

  const cart = getCart();

  if (cart.length === 0) {
    cartDropdown.innerHTML = `<p>No items in cart.</p>`;
    return;
  }

  cartDropdown.innerHTML =
    cart
      .map(
        (item) => `
    <p class="cart-item"> ${item.name} - ${item.price}</p>
  `
      )
      .join("") +
    `
    <hr />
    <p class="cart-total"><strong>Total: ${calculateTotal(
      cart
    )} USD</strong></p>
    <a href="#top" class="checkout-btn">Go to Checkout</a>
  `;
}

// Calculate total price
function calculateTotal(cart) {
  return cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);
}
