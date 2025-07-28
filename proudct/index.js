"use strict";

// Function to update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    cartCount.textContent = totalItems;
    cartCount.parentElement.classList.add("heartbeat");
    setTimeout(() => cartCount.parentElement.classList.remove("heartbeat"), 800);
  }
}

var xhr = new XMLHttpRequest();
xhr.open("GET", "./data.json");
xhr.send();

xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var data = JSON.parse(xhr.responseText);
    var products = data.cakes;
    var container = document.getElementById("product-list");

    for (let product of products) {
      var div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.previewDescription}</p>
        <p class="price">Price: $${product.price.toFixed(2)}</p>
        <button class="add-btn">Add to Cart</button>
      `;
      container.appendChild(div);
    }

    // Add to Cart
    container.addEventListener("click", function (e) {
      if (e.target.classList.contains("add-btn")) {
        const productElement = e.target.parentElement;
        const id = productElement.querySelector("h3").innerText; // Using title as ID
        const title = productElement.querySelector("h3").innerText;
        const price = parseFloat(productElement.querySelector(".price").innerText.replace("Price: $", ""));
        const image = productElement.querySelector("img").src;

        // Get existing cart from localStorage or initialize empty array
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        // Check if product already exists in cart
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({ id, name: title, price, quantity: 1, image });
        }

        // Save updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        
        // Update cart count with animation
        updateCartCount();
        
      
      }
    });

    // Initial cart count update
    updateCartCount();
  }
};