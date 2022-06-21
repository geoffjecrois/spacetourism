const navToggle = document.querySelector('.navbar-toggle');
const navBar = document.querySelector('.primary-navigation');

navToggle.addEventListener('click', () => {
    if (navToggle.getAttribute('aria-expanded') === "false") {
        navBar.style.transform = 'translateX(0%)';
        navToggle.setAttribute('aria-expanded', "true");

    } 
    else {
        navBar.style.transform = 'translateX(100%)';
        navToggle.setAttribute('aria-expanded', 'false');

    }
})
