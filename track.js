window.onload = function () {
    const loggedIn = localStorage.getItem('loggedIn');
    const userRole = localStorage.getItem('userRole'); // Get stored user role

    if (!loggedIn && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html'; // Redirect to login if not logged in
    }

    // Hide admin features if the user is not admin
    if (userRole !== 'admin') {
        const adminControls = document.querySelectorAll('.admin-only');
        if (adminControls) {
            adminControls.forEach(element => element.style.display = 'none');
        }
    }
    
};

function logout() {
    localStorage.removeItem('loggedIn'); // Remove login session
    localStorage.removeItem('userRole'); // Clear role
    window.location.href = 'login.html'; // Redirect to login page
}
