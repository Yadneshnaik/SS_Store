// Form validation and data logging to console
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Check if all fields are filled
    if (name && email && phone && subject && message) {
        // Log data to the console
        console.log("Name: " + name);
        console.log("Email: " + email);
        console.log("Phone: " + phone);
        console.log("Subject: " + subject);
        console.log("Message: " + message);

        // You can also show a confirmation message to the user
        alert("Form submitted successfully! Check the console for details.");
    } else {
        // If any field is empty, display an alert
        alert("Please fill out all the fields.");
    }
});

// Function to add items to the cart
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart from localStorage or initialize as an empty array

    // Check if the product already exists in the cart
    let productExists = cart.find(item => item.name === productName);

    if (productExists) {
        // If the product is already in the cart, just increase its quantity
        productExists.quantity += 1;
    } else {
        // If the product is new, add it to the cart
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Alert the user that the item has been added to the cart
    alert(`${productName} has been added to the cart.`);
}

function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart from localStorage or initialize as an empty array

    // Check if the product already exists in the cart
    let productExists = cart.find(item => item.name === productName);

    if (productExists) {
        // If the product is already in the cart, just increase its quantity
        productExists.quantity += 1;
    } else {
        // If the product is new, add it to the cart
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Alert the user that the item has been added to the cart
    alert(`${productName} has been added to the cart.`);
}


// Scroll to Top Button Script
window.onscroll = function () {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
};

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}
