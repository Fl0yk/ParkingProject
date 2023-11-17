const sizeForm = document.getElementById("tableSize");
let max;

sizeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    //получаем все значения из формы
    const tableSize = +document.getElementById("inputSize").value || 1;
    max = +document.getElementById("inputMax").value || tableSize;

    generateTable(tableSize);
});

//Метод по созданию таблицы
function generateTable(size) {
    //Получаем контейнер для таблицы и очищаем его
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = null;

    //Создаем таблицу и задаем класс
    const table = document.createElement("table");
    table.setAttribute("class", "js");

    //В цикле создаем строки и ячейки
    for (let i = 0; i < size; i++) {
        const row = table.insertRow();
        row.setAttribute("class", "js");

        for (let j = 0; j < size; j++) {
            const cell = row.insertCell();
            const randomNum = Math.floor(Math.random() * 100);

            cell.textContent = randomNum;

            cell.setAttribute("class", "js");
            cell.addEventListener('click', () => {
                clickSell(cell, randomNum)
            });
        }
    }

    //Вставляем в контейнер табицу
    tableContainer.appendChild(table);
};

document.querySelector('#transposeBtn').addEventListener('click', transposeTable);

function transposeTable() {
    const table = document.querySelector('table');
    if (!table) {
        alert("Table does not exists");
        return;
    }

    const rows = Array.from(table.rows);

    const transposedData = [];

    // Создаем новый массив transposedData, чтобы хранить транспонированные данные.
    for (let i = 0; i < rows[0].cells.length; i++) {
        transposedData.push([]);
    }

    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].cells.length; j++) {
            transposedData[j][i] = rows[i].cells[j].textContent;
        }
    }

    // Очищаем таблицу перед вставкой транспонированных данных.
    table.innerHTML = '';

    // Создаем новую таблицу и вставляем транспонированные данные.
    for (let i = 0; i < transposedData.length; i++) {
        const row = table.insertRow();
        row.setAttribute("class", "js");

        for (let j = 0; j < transposedData[i].length; j++) {
            const cell = row.insertCell();
            cell.textContent = transposedData[i][j];
            cell.setAttribute("class", "js");

            cell.addEventListener('click', () => {
                clickSell(cell, transposedData[i][j])
            });
        }
    }
};

document.getElementById('addColumnBtn').addEventListener('click', function () {
    addColumn();
});

function addColumn() {
    const table = document.querySelector('table');
    if (!table) {
        alert("Table does not exists");
        return;
    }

    for (let i = 0; i < table.rows.length; i++) {
        const newCell = table.rows[i].insertCell();
        const randomNum = Math.floor(Math.random() * 100);

        newCell.textContent = randomNum;

        newCell.setAttribute("class", "js");
        newCell.addEventListener('click', () => {
            clickSell(newCell, randomNum)
        });
    }
}

document.getElementById('addRowBtn').addEventListener('click', function () {
    addRow();
});

function addRow() {
    const table = document.querySelector('table');
    if (!table) {
        alert("Table does not exists");
        return;
    }

    const newRow = table.insertRow();

    for (let i = 0; i < table.rows[0].cells.length; i++) {
        const newCell = newRow.insertCell();
        const randomNum = Math.floor(Math.random() * 100);

        newCell.textContent = randomNum;

        newCell.setAttribute("class", "js");
        newCell.addEventListener('click', () => {
            clickSell(newCell, randomNum)
        });
    }
}

function clickSell(cell, value) {
    if (cell.classList.contains('selected-even') || cell.classList.contains('selected-odd')) {
        cell.classList.remove('selected-even', 'selected-odd');
        cell.removeAttribute('clicked');
    }
    else if (checkSelectedCell(cell)) {
        if (value % 2 === 0) {
            cell.classList.add('selected-even');
        }
        else {
            cell.classList.add('selected-odd');
        }

        cell.setAttribute('clicked', 'true');
    }
};

function checkSelectedCell(cell) {
    const table = document.getElementsByTagName('table')[0];
    if (!table) {
        return false;
    }

    const rowId = cell.parentNode.rowIndex;
    const columnId = cell.cellIndex;

    const tableRow = table.rows[rowId];
    let count = 0;
    //Проверка строки
    for (let cell of tableRow.cells) {
        if (cell.hasAttribute('clicked')) {
            count++;
        }

        if (count >= max) {
            return false;
        }
    }
    
    count = 0;
    //Проверка столбца
    for (let row of table.rows) {
        
        if (row.cells[columnId].hasAttribute('clicked')) {
            count++;
        }

        if (count >= max) {
            return false;
        }
    }

    //Проверка соседей
    if ((tableRow.cells[columnId - 1] && tableRow.cells[columnId - 1].hasAttribute('clicked')) //left
        || (tableRow.cells[columnId + 1] && tableRow.cells[columnId + 1].hasAttribute('clicked')) //right
        || (table.rows[rowId - 1] && table.rows[rowId - 1].cells[columnId] && table.rows[rowId - 1].cells[columnId].hasAttribute('clicked')) // Up
        || (table.rows[rowId + 1] && table.rows[rowId + 1].cells[columnId] && table.rows[rowId + 1].cells[columnId].hasAttribute('clicked'))) //down
    {
        return false;
    }

    return true;
}