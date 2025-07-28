// Wait for DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Function to render cart items
  function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    
    if (!cartContainer || !totalElement) {
      console.error('Cart container or total element not found!');
      return;
    }

    // Get cart from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
      cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
      totalElement.textContent = 'Total: $0';
      return;
    }

    cartItems.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
          <h3>${item.name}</h3>
          <p>$ ${item.price.toFixed(2)}</p>
        </div>
        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      `;
      cartContainer.appendChild(itemElement);
    });

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
  }

  // Update quantity
  document.addEventListener('change', (e) => {
    if (e.target.classList.contains('quantity-input')) {
      const id = e.target.dataset.id;
      const quantity = parseInt(e.target.value);
      let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      const item = cartItems.find(item => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cartItems));
        renderCart();
      }
    }
  });

  // Remove item
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const id = e.target.dataset.id;
      let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      cartItems = cartItems.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      renderCart();
    }
  });

  // Checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      alert('Checkout completed successfully!');
      localStorage.removeItem('cart'); // Clear cart after checkout
      renderCart();
    });
  }

  // Initial render
  renderCart();
});