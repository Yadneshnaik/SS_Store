// Function to validate email format
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Function to validate password strength (minimum 6 characters)
function validatePassword(password) {
    return password.length >= 6;
}

// Function to validate name (only letters and spaces allowed)
function validateName(name) {
    const namePattern = /^[A-Za-z\s]+$/;
    return namePattern.test(name);
}

// Function to handle user signup
function signup(event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const messageElement = document.getElementById('signup-message');

    // Validate form fields
    if (name === '') {
        messageElement.style.display = 'block';
        messageElement.classList.remove('alert-success');
        messageElement.classList.add('alert-danger');
        messageElement.innerText = 'Name is required.';
        return;
    }

    if (!validateName(name)) {
        messageElement.style.display = 'block';
        messageElement.classList.remove('alert-success');
        messageElement.classList.add('alert-danger');
        messageElement.innerText = 'Name should contain only letters and spaces.';
        return;
    }

    if (!validateEmail(email)) {
        messageElement.style.display = 'block';
        messageElement.classList.remove('alert-success');
        messageElement.classList.add('alert-danger');
        messageElement.innerText = 'Please enter a valid email address.';
        return;
    }

    if (!validatePassword(password)) {
        messageElement.style.display = 'block';
        messageElement.classList.remove('alert-success');
        messageElement.classList.add('alert-danger');
        messageElement.innerText = 'Password must be at least 6 characters long.';
        return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        messageElement.style.display = 'block';
        messageElement.classList.remove('alert-success');
        messageElement.classList.add('alert-danger');
        messageElement.innerText = 'User already exists. Please login.';
        return;
    }

    // Store new user
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    // Clear the form
    document.getElementById('signup-form').reset();
    messageElement.style.display = 'block';
    messageElement.classList.remove('alert-danger');
    messageElement.classList.add('alert-success');
    messageElement.innerText = 'Signup successful! You can now login.';
}

// Function to handle login
function login(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const messageElement = document.getElementById('login-message');

    if (!validateEmail(email)) {
        messageElement.style.display = 'block';
        messageElement.innerText = 'Please enter a valid email address.';
        return;
    }

    if (!validatePassword(password)) {
        messageElement.style.display = 'block';
        messageElement.innerText = 'Password must be at least 6 characters long.';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));

        if (email === 'naikyadnesh9@gmail.com') {
            // Redirect to admin page if the user is an admin
            window.location.href = 'admin.html';
        } else {
            // Redirect to home page for regular users
            window.location.href = 'index.html';
        }
    } else {
        messageElement.style.display = 'block';
        messageElement.innerText = 'Invalid email or password.';
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    alert('Logout successful!');
    window.location.href = 'index.html';
}

// Function to update navbar based on login state
function updateNavbar() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const loginSignupNav = document.getElementById('login-signup-nav');
    const logoutNav = document.getElementById('logout-nav');

    if (loggedInUser) {
        // User is logged in, show logout option
        loginSignupNav.style.display = 'none';
        logoutNav.style.display = 'block';
    } else {
        // User is not logged in, show login/signup option
        loginSignupNav.style.display = 'block';
        logoutNav.style.display = 'none';
    }
}

// Call updateNavbar on page load to check login state
document.addEventListener('DOMContentLoaded', updateNavbar);