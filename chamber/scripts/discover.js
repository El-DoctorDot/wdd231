const file = 'data/discover.json';
const container = document.getElementById("cards-container");

async function getMembershipData() {
    const response = await fetch(file);
    const data = await response.json();
    displayMembers(data.discover);
}

function displayMembers(discoverArray) {
    discoverArray.forEach(location => {
        const card = document.createElement("div");
        card.classList.add("card");

        const title = document.createElement("h2");
        title.textContent = location.name;
        title.style.gridArea = "name"; 

        const figure = document.createElement("figure");
        figure.style.gridArea = "photo"; 
        const img = document.createElement("img");
        img.src = location.photos;
        img.alt = location.name;
        figure.appendChild(img);

        const address = document.createElement("address");
        address.textContent = location.address;
        address.style.gridArea = "address"; 

        const description = document.createElement("p");
        description.textContent = location.description;
        description.style.gridArea = "description"; 

        const button = document.createElement("button");
        button.textContent = "Learn More";
        button.style.gridArea = "button";

        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        container.appendChild(card);
    });
}

getMembershipData();