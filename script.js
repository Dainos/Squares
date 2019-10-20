/* jshint esversion: 6 */

let rowsAmount = 4,
    columnsAmount = 4;      // Дефолтные размеры


let tableDiv = document.querySelector('#table');

let addRowButton = document.querySelector('#add-row'),
    addColumnButton = document.querySelector('#add-column'),
    removeRowButton = document.querySelector('#remove-row'),
    removeColumnButton = document.querySelector('#remove-column');

firstCreate();
hideRemoveBtns();

addRowButton.addEventListener('click', addRow);
addColumnButton.addEventListener('click', addColumn);
removeRowButton.addEventListener('click', () => {
    removeRow();
    hideRemoveBtns();
});
removeColumnButton.addEventListener('click', () => {
    removeColumn();
    hideRemoveBtns();
});



tableDiv.addEventListener('mouseover', (e) => {
    removeRowButton.classList.remove('hide');
    removeColumnButton.classList.remove('hide');
    if (e.target.classList.value === 'cell') {

        // Отслеживание положения мыши и перемещение кнопок удаления

        let btnPosition = removeColumnButton.getBoundingClientRect().x,
            target = e.target.getBoundingClientRect().x,
            moving = target - btnPosition;
        if (target > btnPosition) removeColumnButton.style.left = `${btnPosition + moving -58}px`;
        else if (target < btnPosition) removeColumnButton.style.left = `${btnPosition + moving -58}px`;
    }

    if (e.target.classList.value === 'cell') {
        let btnPosition = removeRowButton.getBoundingClientRect().y,
            target = e.target.getBoundingClientRect().y,
            moving = target - btnPosition;
        if (target > btnPosition) removeRowButton.style.top = `${btnPosition + moving -138}px`;
        else if (target < btnPosition) removeRowButton.style.top = `${btnPosition + moving - 138}px`;
    }
});

tableDiv.addEventListener('mouseout', hideRemoveBtns);

document.querySelectorAll('button').forEach((b) => {
    b.addEventListener('mouseover', showRemoveBtns);
});

document.querySelectorAll('button').forEach((b) => {
    b.addEventListener('mouseout', hideRemoveBtns);
});



function addColumn() {

    // Добавление столбца

    let rows = document.querySelectorAll('.row');
    rows.forEach((r) => {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        r.appendChild(cell);
    });
    columnsAmount++;
}


function addRow() {

    // Добавление строки

    rowsAmount++;
    let row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < columnsAmount; j++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        row.appendChild(cell);
    }
    tableDiv.appendChild(row);
}


function removeRow(number = 0) {

    // Удаление строки

    let rows = document.querySelectorAll('.row');
    tableDiv.removeChild(rows[number]);
    rowsAmount--;
}


function removeColumn(number = 0) {

    // Удаление столбца

    columnsAmount--;
    let position = number;
    let rows = document.querySelectorAll('.row');
    rows.forEach((row) => {
        let cells = document.querySelectorAll('.cell');
        row.removeChild(cells[position]);
        position += columnsAmount;
    });
}


// Скрытие/отображение кнопок удаления

function hideRemoveBtns() {
    removeRowButton.classList.add('hide');
    removeColumnButton.classList.add('hide');
}

function showRemoveBtns() {
    removeRowButton.classList.remove('hide');
    removeColumnButton.classList.remove('hide');
}


function firstCreate() {

    // Инициализация основного элемента

    for (let i = 0; i < rowsAmount; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        tableDiv.appendChild(row);
        for (let j = 0; j < columnsAmount; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
    }
}