const navbutton = document.querySelector('#ham-btn');
const navbar = document.querySelector('.navigation');
const main = document.querySelector('main');

navbutton.addEventListener('click', () => {
    navbar.classList.toggle('open');
    main.classList.toggle('main-shifted');
    navbutton.textContent = navbar.classList.contains('open') ? 'X' : '☰';
});

const filterAll = document.querySelector('#filter-all');
const filterWDD = document.querySelector('#filter-wdd');
const filterCSE = document.querySelector('#filter-cse');

filterAll.addEventListener('click', () => filterCourses('all'));
filterWDD.addEventListener('click', () => filterCourses('WDD'));
filterCSE.addEventListener('click', () => filterCourses('CSE'));