// Function to display the cart items on the Checkout page
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
                </tr>
            </thead>
            <tbody>
    `;

    cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartHTML += `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>₹${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    });

    cartHTML += `
        <tr>
            <td colspan="3"><strong>Total</strong></td>
            <td><strong>₹${total.toFixed(2)}</strong></td>
        </tr>
    </tbody>
    </table>`;

    cartItemsDiv.innerHTML = cartHTML;
}

// Function to process checkout
function processCheckout(event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;

    // Retrieve the cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Calculate the total amount
    let total = 0;
    cart.forEach((item) => {
        total += item.price * item.quantity;
    });

    // Save order details in localStorage
    const orderDetails = {
        name,
        email,
        address,
        payment,
        cart,
        total
    };

    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    // Redirect to order-details page
    window.location.href = 'order-details.html';
}

// Automatically display cart items when the checkout page loads
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});
