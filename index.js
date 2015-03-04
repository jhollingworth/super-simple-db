var fs = require('fs');

function SuperSimpleDB(path) {
  if (!fs.existsSync(path)) {
    write({});
  }

  this.get = get;
  this.set = set;

  function get(key) {
    var json = read();

    if (!key) {
      return json;
    }

    return json[key];
  }

  function set(key, value) {
    var json = read();

    json[key] = value;

    write(json);
  }

  function read() {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  }

  function write(json) {
    fs.writeFileSync(path, JSON.stringify(json));
  }
}

module.exports = SuperSimpleDB;