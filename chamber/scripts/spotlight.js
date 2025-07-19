const file = 'data/members.json';
const cards = document.querySelector("#spotlight-cards");

async function getSpotlightData() {
    try {
        const response = await fetch(file);
        if (response.ok) {
            const data = await response.json();
            const selectedMembers = selectRandomMembers(data.members);
            displaySelectedMembers(selectedMembers);
        } else {
            throw Error(`Error loading JSON: ${await response.text()}`);
        }
    } catch (error) {
        console.error("Error loading data:", error.message);
        cards.innerHTML = "<p>Error loading members</p>";
    }
}

function selectRandomMembers(memberList) {
    
    const goldMembers = memberList.filter(member => member.membership === 3);
    const silverMembers = memberList.filter(member => member.membership === 2);

    const selectedGold = [];
    const goldCopy = [...goldMembers];

    
    if (goldCopy.length > 0) {
        const randomGold1 = Math.floor(Math.random() * goldCopy.length);
        selectedGold.push(goldCopy[randomGold1]);
        goldCopy.splice(randomGold1, 1);
    }
    if (goldCopy.length > 0) {
        const randomGold2 = Math.floor(Math.random() * goldCopy.length);
        selectedGold.push(goldCopy[randomGold2]);
    }

    
    const selectedSilver = silverMembers.length > 0 
        ? silverMembers[Math.floor(Math.random() * silverMembers.length)]
        : null;

    return [...selectedGold, selectedSilver].filter(member => member !== null);
}

const displaySelectedMembers = (members) => {
    cards.innerHTML = ""; 
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
        spanReed.innerHTML = `<strong>Phone:</strong> ${member.phone}`;
        description.innerHTML = `<strong>Description:</strong> ${member.description}`; 
        website.setAttribute('href', member.website); 
        website.textContent = member.website;

        card.appendChild(businessName);
        card.appendChild(icon);
        card.appendChild(address);
        card.appendChild(spanReed);
        card.appendChild(description);
        card.appendChild(website);
        cards.appendChild(card);
    });
}

getSpotlightData();