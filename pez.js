// Ian Burgan May 2018
let pez = (function () {
  'use strict';

  // globals
  const model = {};

  function sortColumn() {
    let col = this.innerText;
    // change direction and sorting column
    model['sort-dir'] = !((model['sort-col'] === col) && model['sort-dir']);
    model['sort-col'] = col;

    let key = model.relation[col];
    model.rows.sort(function (a, b) {
      return (a[key] > b[key]) === model['sort-dir'];
    });

    render(model['id']);
  }

  function createHeader() {
    const head = document.createElement('thead');
    const headRow = document.createElement('tr');

    Object.keys(model['relation']).forEach(function (title) {
      const cell = document.createElement('th');
      const t = document.createTextNode(title);
      cell.appendChild(t);

      if (model['sortable']) {
        cell.className = 'sortable';
        cell.onclick = sortColumn;

        if (title === model['sort-col']) {
          cell.className += model['sort-dir'] ? ' sort-up' : ' sort-down';
        }
      }

      headRow.appendChild(cell);
    });

    head.appendChild(headRow);
    return head;
  }

  function createRow(obj) {
    const row = document.createElement('tr');

    Object.keys(model['relation']).forEach(function (title) {
      const key = model.relation[title];

      const cell = document.createElement('td');
      const t = document.createTextNode(obj[key]);

      cell.appendChild(t);
      row.appendChild(cell);
    });

    return row;
  }

  function render(id) {
    // get and clear table
    const table = document.getElementById(id);
    table.innerHTML = '';
    table.className = 'pez-table';
    table.appendChild(createHeader());

    const body = document.createElement('tbody');
    model['rows'].forEach(function (row) {
      body.appendChild(createRow(row));
    });
    table.appendChild(body);
  }

  const pez = function (id, data, options) {
    if (!data) {
      throw new TypeError('pez requires non-empty data array');
    }
    if (options && !options.relation) {
      throw new TypeError('pez requires options object describing relation');
    }

    model['id'] = id;
    model['rows'] = data;
    model['relation'] = options.relation;
    model['sortable'] = options.sorting !== false;

    render(id);

    return {
      render: function () {
        render(id);
      },
      model: model
    }
  }

  return pez;
}());
