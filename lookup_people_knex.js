
const settings = require("./settings");

const arg = process.argv.slice(2);

const knex = require('knex')({
  client: 'pg',
  connection: settings
});

console.log("Searching...");
name = arg[0];

knex.select('*')
.from('famous_people')
.where('first_name', name)
.orWhere('last_name', name)
.asCallback(function(err, rows) {
  if (err) {
    return console.error("Connection Error", err);
  }
    rows.forEach(results);
    knex.destroy();
});


function results(user) {
   let birthday = (user.birthdate).toLocaleDateString();
    console.log("Found 1 person(s) by the name " +name);
    console.log("- " +user.id + ": " + user.first_name, user.last_name + ", born " +birthday);
}



