const mainMenu = require('./prompts');
const connection = require('../db/connection');

connection.connect(function (err) {
  if (err) throw err;
  mainMenu();
});
