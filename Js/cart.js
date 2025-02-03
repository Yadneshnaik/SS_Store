// Function to display the cart items on the Cart page
function displayCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let total = 0;
    let cartHTML = `
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartHTML += `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" min="1" class="form-control d-inline w-25" value="${item.quantity}" onchange="updateQuantityDirectly(${index}, this.value)">
                </td>
                <td>₹${itemTotal.toFixed(2)}</td>
                <td><button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button></td>
            </tr>
        `;
    });

    cartHTML += `
        <tr>
            <td colspan="3"><strong>Total</strong></td>
            <td><strong>₹${total.toFixed(2)}</strong></td>
            <td></td>
        </tr>
    </tbody>
    </table>`;

    cartItemsDiv.innerHTML = cartHTML;
}

// Function to remove an item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart)); // Update the cart in localStorage
    displayCartItems(); // Refresh the displayed cart items
}

// Function to update the quantity using +/- buttons
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += change;

    // Ensure the quantity does not go below 1
    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in localStorage
    displayCartItems(); // Refresh the cart display
}

// Function to update quantity directly via input field
function updateQuantityDirectly(index, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(newQuantity);

    // Ensure the quantity does not go below 1
    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in localStorage
    displayCartItems(); // Refresh the cart display
}

// Automatically display cart items when the cart page loads
document.addEventListener('DOMContentLoaded', displayCartItems);