# Pez.js
An Ultralightweight JS library for JSON data in a table.


## Getting Started

### Creating a table
  ```javascript
  let options = {
    relation: {'Column 1': 'data-key1', 'Column 1': 'data-key2s'}
  }
  // Usage - pez(id, data, options)
  let table = pez('table-id', data, options);
  ```

#### Required options
  ```javascript
  {
    relation: {'Column Name': 'Data Key'}
  }
  ```

#### Other options
  ```javascript
  {
    sortable: false // default: true
  }
  ```

### Pez table methods
    render() - render the table

### Common Practices
#### Styling the table
Create and size a `div` to control the table sizing.

#### Code
```javascript
// ajax some data
// use fields of first item to create table headers
let headers = Object.keys(json[0]);
let titles = ['Column 1', 'Column 2'];

pez('id', data, {
  titles[0]: headers[0],
  titles[1]: headers[1]
});
```
```javascript
Internal Model Structure
{
  "id": "element-id",
  "relation" : {
    "Col 1" : "key 1",
    "Col 2" : "key 2",
    "Col 3": "key 3"
  },
  "rows" : [
    {
      "key 1": "val 1",
      "key 2": "val 2"
    }
  ]

  // various options
}
```
