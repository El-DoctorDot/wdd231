const listBtn = document.getElementById('list');
const gridBtn = document.getElementById('grid');
const title = document.getElementById('title');

listBtn.addEventListener('click', () => {
    cards.style.display = 'none';
    list.style.display = 'table';
    title.classList.remove('hidden');
});

gridBtn.addEventListener('click', () => {
    list.style.display = 'none';
    cards.style.display = 'grid';
    title.classList.add('hidden');
});