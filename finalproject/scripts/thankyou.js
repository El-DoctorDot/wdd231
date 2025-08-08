document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);

  const fields = {
    fullname: document.getElementById('fullname'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    membershipLevel: document.getElementById('membershipLevel'),
    message: document.getElementById('message'),
    formTimestamp: document.getElementById('formTimestamp')
  };

  const membershipLabels = {
    fan: 'Fan Membership (Free)',
    silver: 'Silver Membership ($500/year)',
    gold: 'Gold Membership ($1000/year)'
  };

  fields.fullname.textContent = urlParams.get('fullname') || 'Not provided';
  fields.email.textContent = urlParams.get('email') || 'Not provided';
  fields.phone.textContent = urlParams.get('phone') || 'Not provided';
  fields.membershipLevel.textContent = membershipLabels[urlParams.get('membershipLevel')] || 'Not provided';
  fields.message.textContent = urlParams.get('message') || 'No message provided';
  fields.formTimestamp.textContent = urlParams.get('formTimestamp') ? new Date(urlParams.get('formTimestamp')).toLocaleString() : 'Not provided';
});