const products = [
    { id: 1, name: "Redmi 10", price: 8749, image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/mobile/g/p/x/-original-imagk4nz54s7a7rf.jpeg?q=90&crop=false" },
    { id: 2, name: "Sony Camera", price: 30999, image: "https://cdn.outsideonline.com/wp-content/uploads/2024/06/Sony-AC7II_Square_Schiller.jpg" },
    { id: 3, name: "Men's T-Shirt", price: 499, image: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/30064811/2024/6/28/7d96a2ec-9743-4839-aeae-dbf37341630a1719580801595HMMenPackOf3T-Shirts1.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display Products
function displayProducts() {
    let productList = document.getElementById("product-list");
    if (!productList) return;
    
    productList.innerHTML = "";
    products.forEach((product) => {
        productList.innerHTML += `
            <div class="product">
                <img src="${product.image}" width="150">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>`;
    });
}
function displayProducts() {
    let productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products.forEach((product) => {
        productList.innerHTML += `
            <div class="product" onclick="viewProduct(${product.id})">
                <img src="${product.image}" width="150">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
                <button onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
            </div>`;
    });
}

// Function to view product details
function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}


// Add to Cart
function addToCart(productId) {
    let product = products.find(p => p.id === productId);
    let cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Update Cart Count
function updateCartCount() {
    let cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    }
}

// Load Cart Items on Cart Page
function loadCart() {
    let cartItems = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total-price");

    if (!cartItems) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <li>${item.name} x${item.quantity} - ₹${item.price * item.quantity}
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </li>`;
    });

    totalPrice.innerText = total;
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Process Payment
function processPayment() {
    localStorage.removeItem("cart");
    window.location.href = "index1.html"; // Redirect to Home Page after payment
}

window.onload = function () {
    displayProducts();
    updateCartCount();
    loadCart();
};
