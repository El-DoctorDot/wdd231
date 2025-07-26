const params = new URLSearchParams(window.location.search);
const requiredFields = ['firstname', 'lastname', 'email', 'phone', 'organization'];

let output = '<div class="output-fields">';
requiredFields.forEach(field => {
    output += `
        <div class="field-row">
            <span class="field-label">${field.replace(/([A-Z])/g, ' $1')}:</span>
            <span class="field-value">${params.get(field) || 'N/A'}</span>
        </div>`;
});
output += '</div>';

document.getElementById('output').innerHTML = output;