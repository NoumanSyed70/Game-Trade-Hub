// auth.js - Updated Authentication Logic for Game Trade Hub

// Login functionality
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Hardcoded admin credentials
    if (email === 'admin@gametradehub.pk' && password === 'admin123') {
        // Store login status in sessionStorage
        sessionStorage.setItem('isLoggedIn', 'true');
        // Redirect to home page
        window.location.href = 'home.html';
    } else {
        alert('Invalid login credentials');
    }
});

// Logout functionality
document.getElementById('logout')?.addEventListener('click', function(e) {
    e.preventDefault();
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
        sessionStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    }
});

// Check login status on protected pages
function checkLogin() {
    // Skip check for login page
    if (window.location.pathname.includes('index.html')) return;
    
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
}

// Hamburger menu functionality for mobile
document.querySelector('.hamburger')?.addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('nav ul').classList.toggle('show');
});

// Check login status when page loads
window.addEventListener('DOMContentLoaded', () => {
    checkLogin();
    
    // Close mobile menu when clicking a nav link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            const hamburger = document.querySelector('.hamburger');
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                document.querySelector('nav ul').classList.remove('show');
            }
        });
    });
});

// Auto-fill admin credentials for demo purposes (remove in production)
window.addEventListener('load', () => {
    if (window.location.pathname.includes('index.html')) {
        document.getElementById('email').value = 'admin@gametradehub.pk';
        document.getElementById('password').value = 'admin123';
    }
});