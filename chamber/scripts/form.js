document.addEventListener("DOMContentLoaded", () => {
  const timestampField = document.getElementById("formTimestamp");
  const now = new Date();
  const formatted = now.toISOString(); 
  timestampField.value = formatted;
});



document.querySelectorAll('.learn-more').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.card');
    const modal = card.querySelector('.card-modal');
    modal.classList.toggle('hidden'); 
  });
});