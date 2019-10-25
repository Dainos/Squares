/* jshint esversion: 6 */



class Element {
    constructor(rowsAmount = 4, columnsAmount = 4) {
        this.tableDiv = document.querySelector('.div-table');
        this.rowsAmount = rowsAmount;
        this.columnsAmount = columnsAmount;
        this.addRowButton = document.querySelector('.add-row-btn');
        this.addColumnButton = document.querySelector('.add-column-btn');
        this.removeRowButton = document.querySelector('.remove-row-btn');
        this.removeColumnButton = document.querySelector('.remove-column-btn');

        for (let i = 0; i < this.rowsAmount; i++) {
            let row = document.createElement('div');
            row.classList.add('row');
            this.tableDiv.appendChild(row);
            for (let j = 0; j < this.columnsAmount; j++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                row.appendChild(cell);
            }
        }
        this.hideRemoveBtns();

        this.addRowButton.addEventListener('mousedown', () => {
            this.addRow();
        });
        this.addColumnButton.addEventListener('mousedown', () => {
            this.addColumn();
        });
        this.removeRowButton.addEventListener('mousedown', () => {
            this.removeRow(this.currentRow);
            this.hideRemoveBtns();
            this.moveRemoveBtns("up");
        });
        this.removeColumnButton.addEventListener('mousedown', () => {
            this.removeColumn(this.currentColumn);
            this.hideRemoveBtns();
            this.moveRemoveBtns("left");
        });



        this.tableDiv.addEventListener('mouseover', (e) => {

            this.showRemoveBtns();

            this.changeCurrentPosition(e);

            this.moveRemoveBtns(e);


        });



        this.tableDiv.addEventListener('mouseout', () => {
            this.timerOff = setTimeout(() => {
                this.hideRemoveBtns();
            }, 200);
        });

        document.querySelectorAll('button').forEach((b) => {
            b.addEventListener('mouseover', () => {
                this.showRemoveBtns();
            });
        });

        document.querySelectorAll('button').forEach((b) => {
            b.addEventListener('mouseout', () => {
                this.hideRemoveBtns();
            });
        });
    }


    moveRemoveBtns(event) {
        if (event == "left") {
            this.targetX = document.querySelectorAll(".cell")[this.columnsAmount - 1].getBoundingClientRect().x;
            this.removeColumnButton.style.left = `${this.targetX - 65}px`;
        } else if (event == "up") {
            this.targetY = document.querySelectorAll(".row")[this.rowsAmount - 1].getBoundingClientRect().y;
            this.removeRowButton.style.top = `${this.targetY - 65}px`;
        } else if (event.target.classList.value === 'cell') {

            // Перемещение кнопок удаления

            this.btnPositionX = this.removeColumnButton.getBoundingClientRect().x;
            this.targetX = event.target.getBoundingClientRect().x;
            this.btnPositionY = this.removeRowButton.getBoundingClientRect().y;
            this.targetY = event.target.getBoundingClientRect().y;

            if (this.targetX != this.btnPositionX || this.targetY != this.btnPositionY) {
                this.removeColumnButton.style.left = `${this.targetX - 65}px`;
                this.removeRowButton.style.top = `${this.targetY - 65}px`;
            }

        }

    }


    addColumn() {

        // Добавление столбца

        let rows = document.querySelectorAll('.row');
        rows.forEach((r) => {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            r.appendChild(cell);
        });
        this.columnsAmount++;
    }


    addRow() {

        // Добавление строки

        this.rowsAmount++;
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < this.columnsAmount; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        this.tableDiv.appendChild(row);
    }


    removeRow(number = 0) {

        // Удаление строки

        let rows = document.querySelectorAll('.row');
        this.tableDiv.removeChild(rows[number]);
        this.rowsAmount--;
    }


    removeColumn(number = 0) {

        // Удаление столбца

        this.columnsAmount--;
        let position = number;
        let rows = document.querySelectorAll('.row');
        rows.forEach((row) => {
            let cells = document.querySelectorAll('.cell');
            row.removeChild(cells[position]);
            position += this.columnsAmount;
        });
    }


    // Скрытие/отображение кнопок удаления

    hideRemoveBtns() {
        this.removeRowButton.classList.add('hide');
        this.removeColumnButton.classList.add('hide');
    }

    showRemoveBtns() {
        this.removeRowButton.classList.remove('hide');
        this.removeColumnButton.classList.remove('hide');
        clearTimeout(this.timerOff);
        if (this.rowsAmount == 1) this.removeRowButton.classList.add('hide');
        if (this.columnsAmount == 1) this.removeColumnButton.classList.add('hide');
    }


    changeCurrentPosition(event) {
        let cells = document.querySelectorAll('.cell');

        cells.forEach((cell, num) => {

            // Определение текущего столбца/строки для удаления

            if (cell === event.target) {
                this.currentRow = Math.floor(num / this.columnsAmount);
                this.currentColumn = num % this.columnsAmount;
            }
        });
    }

}


const element = new Element();