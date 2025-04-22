// Function to add product to cart
function addToCart(product) {
  const cart = getCart(); // Get the current cart from localStorage
  const existingProduct = cart.find((item) => item.id === product.id); // Check if product already exists in cart

  if (existingProduct) {
    existingProduct.quantity += 1; // If product exists, increase the quantity
  } else {
    cart.push({ ...product, quantity: 1 }); // Otherwise, add the new product with quantity 1
  }

  saveCart(cart); // Save updated cart to localStorage
  updateCartCount(); // Update the cart count in the UI
}

// Cart Reset Function
function resetCart() {
  localStorage.removeItem("cart");  // Remove cart from localStorage
  updateCartCount();  // Reset cart count in the UI to 0
}

// Event listener for resetting the cart
document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("clear-cart-btn")) {
    e.preventDefault();  // Prevent default action (if any)
    resetCart();  // Call resetCart to clear the cart
  }
});

// Event listener for dynamically created "Add to Cart" buttons
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("product-btn")) {
    e.preventDefault();  // Prevent the default action (e.g., navigating if it's a link)

    // Extract product data from the clicked button's data attributes
    const product = {
      id: e.target.dataset.id,
      name: e.target.dataset.name,
      price: parseFloat(e.target.dataset.price),  // Convert the price to a number
      image: e.target.dataset.image,
    };

    // Log the product being added (for debugging)
    console.log("Adding to cart:", product);

    // Add the product to the cart
    addToCart(product);  // This will update the cart and the cart count
  }
});

// Get cart from localStorage or initialize an empty array
function getCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Cart loaded:", cart);  // Log the cart when loaded
  return cart;
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Cart saved:", cart);  // Log the cart when saved
}

// Update the cart count in the UI
function updateCartCount() {
  const cart = getCart(); // Get the cart from localStorage
  const count = cart.reduce((sum, item) => sum + item.quantity, 0); // Sum the quantities of all items in the cart
  const countEl = document.querySelector(".cart-count"); // Find the element that shows the cart count
  if (countEl) countEl.textContent = count; // Update the UI with the new cart count
}

// Load products from JSON and add them to the page
async function loadProducts() {
  const response = await fetch("assets/data/products.json");
  const products = await response.json();
  const grid = document.querySelector(".card-grid"); // Can be Home or Products page

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price} kr</p>
      <p class="product-quantity">In Cart: 0</p>
      <a href="#order" class="product-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
        Add to Cart
      </a>
    `;
    grid.appendChild(card);
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  updateCartCount();  // Update cart count after loading products
});