// Dark mode persistence
function applyDarkMode(isDark) {
    if (isDark) {
        document.body.classList.add('bg-dark', 'text-white');
        document.querySelector('.navbar').classList.add('bg-dark');
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.add('text-white');
        });
        const darkModeLabel = document.querySelector('label[for="darkModeSwitch"]');
        if (darkModeLabel) {
            darkModeLabel.textContent = "Light Mode";
            darkModeLabel.classList.add('text-white');
        }
    } else {
        document.body.classList.remove('bg-dark', 'text-white');
        document.querySelector('.navbar').classList.remove('bg-dark');
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('text-white');
        });
        const darkModeLabel = document.querySelector('label[for="darkModeSwitch"]');
        if (darkModeLabel) {
            darkModeLabel.textContent = "Dark Mode";
            darkModeLabel.classList.remove('text-white');
        }
    }
}

// Apply saved dark mode preference on page load
document.addEventListener('DOMContentLoaded', function() {
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (darkModeSwitch) {
        darkModeSwitch.checked = savedDarkMode;
        applyDarkMode(savedDarkMode);
    }
});

document.addEventListener('DOMContentLoaded', function() {

    // Make the "About" link show an alert with information about the app
    const aboutLink = document.querySelector('#toAbout');
    if (aboutLink) {
        aboutLink.addEventListener('click', function(event) {
            event.preventDefault();
            alert('Market Basket Analyzer\n\nThis application helps you analyze market basket data to find associations between products. It is built using Flask for the backend and Bootstrap for the frontend.\n\nDeveloped by Andreas Darsaklis.');
        });
    }
    

    // Toggle the navbar on small screens
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarContent');
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function () {
            navbarCollapse.classList.toggle('show');
        });
    }
});

// Dark mode toggle
document.addEventListener('DOMContentLoaded', function() {
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    const darkModeLabel = document.querySelector('label[for="darkModeSwitch"]');
    // ensure dark mode stays on/off on all pages
    darkModeSwitch.addEventListener('change', function() {
        applyDarkMode(this.checked);
        localStorage.setItem('darkMode', this.checked);
    });
});

