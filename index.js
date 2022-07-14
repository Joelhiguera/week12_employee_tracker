const inquirer = require("inquirer");
const cTable = require('console.table');
const mysql = require('mysql2');

inquirer.prompt([
  {
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add A Department',
      'Add A Role',
      'Add An Employee'
    ],
    name: 'home'
  } 
])

.then((answers) => {
    if(answers == 'View All Departments') {
      console.log(answers)
    }
  }
)



