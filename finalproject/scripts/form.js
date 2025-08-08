document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('membershipForm');
  const timestampInput = document.getElementById('formTimestamp');

  if (form && timestampInput) {
    form.addEventListener('submit', (e) => {
      timestampInput.value = new Date().toISOString();
      
      const fullname = form.querySelector('input[name="fullname"]').value;
      const phone = form.querySelector('input[name="phone"]').value;

      if (!/^[A-Za-z\s]{2,}$/.test(fullname)) {
        e.preventDefault();
        alert('Please enter a valid full name (letters and spaces only, at least 2 characters).');
        return;
      }

      if (!/^[0-9]{10,15}$/.test(phone)) {
        e.preventDefault();
        alert('Please enter a valid phone number (10-15 digits only).');
        return;
      }
    });
  }
});