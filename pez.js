// Ian Burgan May 2018
let Pez = (function () {
  'use strict';

  function createHeader(table) {
    const head = document.createElement('thead');
    const headRow = document.createElement('tr');

    table.headers.forEach(function (title) {
      const cell = document.createElement('th');
      const text = document.createTextNode(title);
      cell.appendChild(text);

      if (table.sortable) {
        // preserve reference
        cell.className = 'sortable';
        cell.onclick = function () {
          table.sortColumn(this.innerText);
        };

        if (title === table.activeCol) {
          console.log();
          cell.className += table.sortDir ? ' sort-up' : ' sort-down';
        }
      }

      headRow.appendChild(cell);
    });

    head.appendChild(headRow);
    return head;
  }

  function createRow(rowData, columns) {
    const row = document.createElement('tr');

    columns.forEach(function (key) {
      const cell = document.createElement('td');
      const t = document.createTextNode(rowData[key]);

      cell.appendChild(t);
      row.appendChild(cell);
    });

    return row;
  }

  function Pez(id, data, options) {
    if (!(this instanceof Pez)) {
      throw new Error('Constructor must be called using "new"');
    }
    if (!data) {
      throw new TypeError('Non-Empty data array is required');
    }
    if (options && !options.relation) {
      throw new TypeError('Must specify options and options.relation');
    }

    this.id = id;
    this.headers = Object.keys(options.relation);
    this.columns = Object.values(options.relation);
    this.rows = data;
    this.sortable = options.sorting !== false;
    this.sortDir
    this.render();
  }

  Pez.prototype.render = function () {
    // preserve reference for callbacks
    let self = this;

    // get and clear table
    const table = document.getElementById(this.id);
    table.innerHTML = '';
    table.className = 'pez-table';
    table.appendChild(createHeader(this));

    const body = document.createElement('tbody');
    this.rows.forEach(function (row) {
      body.appendChild(createRow(row, self.columns));
    });
    table.appendChild(body);
  }

  Pez.prototype.sortColumn = function (col) {
    // preserve reference
    let self = this;

    // change direction and sorting column
    this.sortDir = !((this.activeCol === col) && this.sortDir);
    this.activeCol = col;

    let key = this.columns[this.headers.indexOf(col)];
    console.log(key);
    this.rows.sort(function (a, b) {
      return (a[key] > b[key]) === self.sortDir;
    });

    this.render();
  }

  return Pez;
}());
