// Ian Burgan May 2018
let pez = (function () {
  // globals
  const model = {};

  function createHeader() {
    const head = document.createElement('thead');
    const headRow = document.createElement('tr');

    model['titles'].forEach(function (item) {
      const cell = document.createElement('th');
      const t = document.createTextNode(item);
      cell.appendChild(t);
      headRow.appendChild(cell);
    });

    head.appendChild(headRow);
    return head;
  }

  function createRow(obj) {
    const row = document.createElement('tr');

    model['titles'].forEach(function (title) {
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
    table.appendChild(createHeader());

    const body = document.createElement('tbody');
    model['rows'].forEach(function (item) {
      body.appendChild(createRow(item));
    });
    table.appendChild(body);
  }

  const pez = function (id, data, options) {
    if (!data) {
      throw new TypeError('pez requires non-empty data array');
    }
    if (options) {
      if (!options.titles) {
        throw new TypeError('pez requires titles to be described in options');
      }
      if (!options.relation) {
        throw new TypeError('pez requires relation to be described in options');
      }
    } else {
      throw new TypeError('pez requires options object describing titles and relation')
    }

    model['titles'] = options.titles;
    model['relation'] = options.relation;
    model['rows'] = data;

    render(id);

    return {
      render: function () {
        render(id);
      }
    }
  }

  return pez;
}());
