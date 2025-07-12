const file = 'data/members.json';
const cards = document.querySelector('#members-cards');
const list = document.querySelector('#members-list');

async function getMembershipData() {
    const response = await fetch(file);
    const data = await response.json();
    displayMembers(data.members);
}

getMembershipData();

const displayMembers = (members) => {
    members.forEach(member => {
        let card = document.createElement('section');
        let businessName = document.createElement('h2');
        let address = document.createElement('p');
        let spanReed = document.createElement('p');
        let description = document.createElement('p'); 
        let icon = document.createElement('img');
        let website = document.createElement('a');

        businessName.textContent = member.name;
        icon.setAttribute('src', member.image);
        icon.setAttribute('alt', `Icon for ${member.name} provided by Icons8`);
        icon.setAttribute('loading', 'lazy');
        icon.setAttribute('width', '64');
        icon.setAttribute('height', '64');
        address.innerHTML = `<strong>Found in:</strong> ${member.address}`;
        spanReed.innerHTML = `<strong>Span Reed ID#:</strong> ${member.phone}`;
        description.innerHTML = `<strong>About:</strong> ${member.description}`;
        website.setAttribute('href', member.website); 
        website.textContent = member.website;

        card.appendChild(businessName);
        card.appendChild(icon);
        card.appendChild(address);
        card.appendChild(spanReed);
        card.appendChild(description);
        card.appendChild(website);
        cards.appendChild(card);

        let row = document.createElement('tr');
        let nameCell = document.createElement('td');
        let addressCell = document.createElement('td');
        let phoneCell = document.createElement('td');
        let urlCell = document.createElement('td');

        nameCell.textContent = member.name;
        addressCell.textContent = member.address;
        phoneCell.textContent = member.phone;
        urlCell.innerHTML = `<a href="${member.website}">${member.website}</a>`; 

        row.appendChild(nameCell);
        row.appendChild(addressCell);
        row.appendChild(phoneCell);
        row.appendChild(urlCell);
        list.appendChild(row);
    });

    list.style.display = 'none';
}