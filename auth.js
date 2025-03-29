window.onload = function () {
    console.log("User Role:", localStorage.getItem('userRole'));
    
    const loggedIn = localStorage.getItem('loggedIn');
    const userRole = localStorage.getItem('userRole'); // Get stored user role

    if (!loggedIn && !window.location.pathname.endsWith('/login.html')) {
        window.location.href = 'login.html'; // Redirect to login if not logged in
    }

    // Hide admin features if the user is not admin
    if (userRole !== 'admin' && userRole !== null) {
        setTimeout(() => { // Delay hiding to avoid flickering
            document.querySelectorAll('.admin-only').forEach(element => {
                element.style.display = 'none';
            });
        }, 100);
    }
};

function logout() {
    localStorage.removeItem('loggedIn'); // Remove login session
    localStorage.removeItem('userRole'); // Clear role
    window.location.href = 'login.html'; // Redirect to login page
}
