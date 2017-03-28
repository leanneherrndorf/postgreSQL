
const settings = require("./settings");

const knex = require('knex')({
  client: 'pg',
  connection: settings
});

const arg = process.argv.slice(2);
insert(arg[0], arg[1], arg[2]);
knex.destroy();

function insert(firstname, lastname, birthdate){
  let date = new Date(birthdate);
  knex('famous_people').insert({first_name: firstname, last_name: lastname, birthdate: date})
  .catch(function(err){
    console.log(err);
  });
}
