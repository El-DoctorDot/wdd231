const navbutton = document.querySelector('#ham-btn')
const navbar = document.querySelector('.navigation')
const main = document.querySelector('main');

navbutton.addEventListener('click', () => {
    navbar.classList.toggle('open');
    main.classList.toggle('main-shifted');
    navbutton.textContent = nav.classList.contains('open') ? 'X' : '≡';
});