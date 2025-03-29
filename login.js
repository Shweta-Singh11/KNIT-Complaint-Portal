document.addEventListener('DOMContentLoaded', function () {
    // Redirect to index.html if already logged in
    if (localStorage.getItem('loggedIn') === 'true') {
        window.location.href = 'index.html';
    }
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Prevent login with empty fields
    if (!username || !password) {
        alert("Username and password cannot be empty!");
        return;
    }

    // Store user role (Admin has special privileges)
    let userRole = "user";
    if (username === "admin" && password === "password123") {
        userRole = "admin";
    }

    // Store login details
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userRole', userRole); // Store role in localStorage
    localStorage.setItem('username', username); // Store username for display

    alert('Login successful!');
    window.location.href = 'index.html'; // Redirect to dashboard or home page
});
