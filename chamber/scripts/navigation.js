const menuBtn = document.querySelector('#menu')
const nav = document.querySelector('.navigation')
const main = document.querySelector('main');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    main.classList.toggle('main-shifted');
    menuBtn.textContent = nav.classList.contains('open') ? 'X' : '≡';
});