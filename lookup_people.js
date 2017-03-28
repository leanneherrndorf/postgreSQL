const pg = require('pg');
const settings = require("./settings");

const arg = process.argv.slice(2);

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database:  settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

console.log("Searching...");
name = arg[0];

function results(result) {
  for(let row in result.rows){
    let birthday = (result.rows[row].birthdate).toLocaleDateString();
    console.log("Found " +result.rows.length+ " person(s) by the name " +name);
    console.log("- " +result.rows[row].id + ": " + result.rows[row].first_name, result.rows[row].last_name + ", born " +birthday);
  }
}

function findFamousPeople(name, callback) {
  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
      client.query('SELECT * FROM famous_people  WHERE first_name = $1::text OR last_name = $1::text', [name], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      callback(result);
      client.end();
    });
  });
}

findFamousPeople(name, results);

