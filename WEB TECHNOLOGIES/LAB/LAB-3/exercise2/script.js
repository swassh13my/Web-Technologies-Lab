// 1. Data Structure
const products = [
    { id: 1, name: "Laptop", price: 1000, category: "Electronics" },
    { id: 2, name: "Headphones", price: 200, category: "Electronics" },
    { id: 3, name: "Notebook", price: 10, category: "Stationery" }
];

let cart = [];
let activeDiscount = 0; // Percentage

// 2. Render Products to UI
function displayProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = products.map(p => `
        <div class="product-item">
            <span>${p.name} - $${p.price}</span>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

// 3. Add/Update Logic
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

// 4. Discount Logic (Bulk & Category)
function calculateTotals() {
    let subtotal = 0;
    const now = new Date().getHours();

    cart.forEach(item => {
        let itemPrice = item.price * item.quantity;

        // Bulk Discount: 10% off if more than 3 of same item
        if (item.quantity > 3) itemPrice *= 0.9;

        // Time-based Discount: 5% off everything during "Happy Hour" (e.g., 2 PM - 4 PM)
        if (now >= 14 && now <= 16) itemPrice *= 0.95;

        subtotal += itemPrice;
    });

    // Apply Coupon (Exercise Req #4 & #5)
    return subtotal * (1 - activeDiscount);
}

// 5. DOM Manipulation (Real-time update)
function updateCartUI() {
    const cartDiv = document.getElementById('cart-display');
    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Cart is empty.</p>";
        return;
    }

    cartDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    const finalTotal = calculateTotals();
    document.getElementById('total-price').innerText = `Total: $${finalTotal.toFixed(2)}`;
}

// 6. Coupon Validation (String Methods)
function applyCoupon() {
    const code = document.getElementById('coupon-input').value.trim().toUpperCase();
    
    if (code === "SAVE10") {
        activeDiscount = 0.10;
        alert("10% Discount Applied!");
    } else {
        activeDiscount = 0;
        alert("Invalid Coupon");
    }
    updateCartUI();
}

// Initial Call
displayProducts();