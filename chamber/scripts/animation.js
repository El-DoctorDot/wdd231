const colors = ['#FFC107', '#FF5722', '#8BC34A', '#00BCD4', '#E91E63', '#673AB7'];

function createConfetti() {
  const container = document.getElementById('confetti-container');
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');

  
  confetti.style.left = Math.random() * window.innerWidth + 'px';

  
  confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

  
  const duration = 2000 + Math.random() * 3000;
  confetti.style.animationDuration = duration + 'ms';

  
  const size = 5 + Math.random() * 7;
  confetti.style.width = size + 'px';
  confetti.style.height = size + 'px';

  container.appendChild(confetti);

  
  confetti.addEventListener('animationend', () => {
    confetti.remove();
  });
}


function startConfetti() {
  const interval = setInterval(createConfetti, 150); 
  
  setTimeout(() => clearInterval(interval), 10000);
}


window.onload = () => {
  startConfetti();
};
