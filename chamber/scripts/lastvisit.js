function daysBetween(date1, date2) {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((date2 - date1) / msPerDay);
}

function showLastVisitMessage() {
  const sidebar = document.getElementById('sidebar-content');
  if (!sidebar) {
    console.warn('Element with id "sidebar-content" not found.');
    return;
  }

  const now = Date.now();
  const lastVisit = localStorage.getItem('lastVisit');

  if (!lastVisit) {
    sidebar.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const lastVisitTime = parseInt(lastVisit, 10);
    const diffDays = daysBetween(lastVisitTime, now);

    if (diffDays < 1) {
      sidebar.textContent = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
      sidebar.textContent = "You last visited 1 day ago.";
    } else {
      sidebar.textContent = `You last visited ${diffDays} days ago.`;
    }
  }

  localStorage.setItem('lastVisit', now.toString());
}

window.addEventListener('load', showLastVisitMessage);

window.addEventListener('load', () => {
  const sidebar = document.getElementById('sidebar-content');
  sidebar.style.display = 'block';
  setTimeout(() => {
    sidebar.classList.add('show');
  }, 100); 

 
  setTimeout(() => {
    sidebar.classList.remove('show');
    setTimeout(() => sidebar.style.display = 'none', 500); 
  }, 5000);
});