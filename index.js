const inquirer = require("inquirer");
require('console.table');
const mysql = require('mysql2');
var figlet = require('figlet');




function asciText() {
  figlet('Employee\n\n Tracker', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    promptMenu();

  });
  }
  
  asciText()

const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
  }
);


function promptMenu() {
inquirer.prompt([
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'home',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add A Department',
      'Add A Role',
      'Add An Employee',
      'Update Employee Role',
      'Quit'
    ]

   
  } ,
])

.then((answers) => {
     switch(answers.home){
      case "View All Departments":
        viewDepartments()
        break;
      case "View All Roles":
        viewAllRoles()
        break;
        case "View All Employees":
        viewAllEmployees()
        break;
      case "Add A Department":
        addDepartment()
        default: process.exit()
      
     }

    
  }
)
}

function viewDepartments() {
  const query = "SELECT * FROM department"
  connection.query(query, (err, rows) => {
    if (err) console.log(err)
    console.table(rows)
    promptMenu();

  })
}


function viewAllRoles() {
  const query = "SELECT * FROM role"
  connection.query(query, (err, rows) => {
    if(err) console.log(err)
    console.table(rows)
    promptMenu();
  })
}

function viewAllEmployees() {

  const query = "SELECT * FROM employee INNER JOIN role ON employee.role_id=role.id"
  connection.query(query, (err, rows) => {
    if(err) console.log(err)
    console.table(rows)
    promptMenu();
  })
}

function addDepartment () {
   inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the department?',
      name: 'department'
    }
  ]).then((answers) => {
    connection.query("INSERT INTO department SET ?", departmentName, (err, rows) => {
      if(err) console.log(err)
      console.table(rows)
      promptMenu();
    })
  })
  
};

// .then(
  //   connection.query("INSERT INTO department SET ?", departmentName, (err, rows) => {
  //     if(err) console.log(err)
  //     console.table(rows)
  //     promptMenu();
  //   })
  // )
//connection.query("INSERT INTO department SET ?", departmentName)


// asciText();





//query to look for all employees then show it
//to show it i need to do a map by mapping their id to their name VALUE: id name:${``}
//