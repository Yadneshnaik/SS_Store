document.getElementById('product-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents form from refreshing the page

    // Get input values
    const productName = document.getElementById('product-name').value;
    const productPrice = parseFloat(document.getElementById('product-price').value);

    // Log data to console
    console.log(`Product Name: ${productName}, Product Price: ${productPrice}`);

    // Check if product name and price are valid
    if (productName && !isNaN(productPrice)) {
        // Add product data to the table
        const tableBody = document.querySelector('#product-table tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${productName}</td><td>₹${productPrice.toFixed(2)}</td>`;
        tableBody.appendChild(newRow);

        // Optionally: Store products in local storage
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push({ name: productName, price: productPrice.toFixed(2) });
        localStorage.setItem('products', JSON.stringify(products));

        // Clear form inputs
        document.getElementById('product-form').reset();
    } else {
        alert("Please enter valid product details.");
    }
});

// Optional: Function to load products from local storage when page loads
window.addEventListener('load', function() {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const tableBody = document.querySelector('#product-table tbody');
    storedProducts.forEach(product => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${product.name}</td><td>₹${product.price}</td>`;
        tableBody.appendChild(newRow);
    });
});
