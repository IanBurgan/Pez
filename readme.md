# Pez.js
An Ultralightweight JS library for JSON data in a table.


## Getting Started

### Creating a table
```javascript
let options = {
  relation: {'Column 1': 'data-key1', 'Column 1': 'data-key2'}
}
// Usage - Pez(id, data, options)
let table = new Pez('table-id', data, options);
```

#### Required options
```javascript
{
  relation: {'Column Name': 'data-key'}
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

new Pez('id', data, {
  titles[0]: headers[0],
  titles[1]: headers[1]
});
```
```javascript
Internal Model Structure
{
  'id': 'tableId',
  'headers': ['Column 1, Column 2'],
  'columns': ['data-key1', 'data-key2'],
  'rows': [obj, obj, obj]

  // prototype and various options
}
```
