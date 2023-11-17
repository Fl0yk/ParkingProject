const elements = new Map();

const table = document.getElementById('elemTable');
const allTable = document.getElementById('allElem');
const form = document.getElementById('elemsForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const name = form.querySelector('input[name=nameElem]').value;
    const dens = form.querySelector('input[name=density]').value;
    const conduct = form.querySelector('select[name=conductivity]').value;

    //elements[name] = { density: dens, conductivity: conduct };
    elements.set(name, { density: dens, conductivity: conduct });

    if (conduct === 'semiconductor') {
        const tbody = table.querySelector('tbody');
        tbody.appendChild(createSemiRow(name, dens));
    }

    const allBody = allTable.getElementsByTagName('tbody')[0];
    allBody.appendChild(createAllDataRow(name, dens, conduct));
    //allEl();
});

function allEl() {
    const tbody = allTable.querySelector('tbody');
    tbody.innerHTML = null;

    for (let elem of elements) {

        tbody.appendChild(createAllDataRow(elem[0], elem[1]['density'], elem[1]['conductivity']));
    }
}

function createAllDataRow(name, dens, conduct) {
    const row = document.createElement('tr');
    row.setAttribute("class", "js");

    const nameCell = document.createElement('td');
    nameCell.innerText = name;
    nameCell.setAttribute("class", "js");
    row.appendChild(nameCell);

    const densCell = document.createElement('td');
    densCell.innerText = dens;
    densCell.setAttribute("class", "js");
    row.appendChild(densCell);

    const condCell = document.createElement('td');
    condCell.innerText = conduct;
    condCell.setAttribute("class", "js");
    row.appendChild(condCell);

    return row;
}

function createSemiRow(name, dens) {
    const row = document.createElement('tr');
    row.setAttribute("class", "js");

    const nameCell = document.createElement('td');
    nameCell.innerText = name;
    nameCell.setAttribute("class", "js");
    row.appendChild(nameCell);

    const densCell = document.createElement('td');
    densCell.innerText = dens;
    densCell.setAttribute("class", "js");
    row.appendChild(densCell);

    return row;
}

function initMap() {
    elements.set('Gold', { density: 19.32, conductivity: 'conductor' });
    elements.set('Silicon', { density: 2.33, conductivity: 'semiconductor' });
    elements.set('Air', { density: 0.001225, conductivity: 'dielectric' });
    elements.set('Aluminum', { density: 2.7, conductivity: 'conductor' });
}


initMap();
allEl();

const tbody = table.querySelector('tbody');
tbody.innerHTML = null;

for (let elem of elements) {
    if (elem[1]['conductivity'] !== 'semiconductor') {
        continue;
    }

    tbody.appendChild(createSemiRow(elem[0], elem[1]['density']));
}