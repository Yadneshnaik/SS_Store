// Function to display the order details
function displayOrderDetails() {
    const orderDetailsDiv = document.getElementById('order-details');
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));

    if (!orderDetails) {
        orderDetailsDiv.innerHTML = '<p>No order details found.</p>';
        return;
    }

    let orderHTML = `
        <h4>Customer Information</h4>
        <p><strong>Name:</strong> ${orderDetails.name}</p>
        <p><strong>Email:</strong> ${orderDetails.email}</p>
        <p><strong>Address:</strong> ${orderDetails.address}</p>
        <p><strong>Payment Method:</strong> ${orderDetails.payment}</p>
        <h4>Order Summary</h4>
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

    orderDetails.cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        orderHTML += `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>₹${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    });

    orderHTML += `
        <tr>
            <td colspan="3"><strong>Total</strong></td>
            <td><strong>₹${orderDetails.total.toFixed(2)}</strong></td>
        </tr>
    </tbody>
    </table>`;

    orderDetailsDiv.innerHTML = orderHTML;
}

// Function to download the order details as a text file
function downloadOrderDetails() {
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));

    if (!orderDetails) {
        alert('No order details found to download.');
        return;
    }

    let orderText = `
        Customer Information:
        Name: ${orderDetails.name}
        Email: ${orderDetails.email}
        Address: ${orderDetails.address}
        Payment Method: ${orderDetails.payment}

        Order Summary:
    `;

    orderDetails.cart.forEach((item) => {
        orderText += `
        Product: ${item.name}, Price: ₹${item.price.toFixed(2)}, Quantity: ${item.quantity}, Total: ₹${(item.price * item.quantity).toFixed(2)}
        `;
    });

    orderText += `Total Amount: ₹${orderDetails.total.toFixed(2)}`;

    // Create a Blob object from the text
    const blob = new Blob([orderText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    // Create a link and download the file
    const link = document.createElement('a');
    link.href = url;
    link.download = 'order-details.txt';
    link.click();
}

// Automatically display order details when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayOrderDetails();
});
