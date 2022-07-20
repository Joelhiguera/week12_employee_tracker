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
        break;
      case "Add A Role":
        addRole()
        break;
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
    const query = "INSERT INTO department (name) VALUES (?) ";
    const answer = answers.department;
    const newQuery = 'SELECT * FROM department '

    connection.query(query, answer, (err, rows) => {
      if(err){
        console.log(err)
      }else{
        connection.query(newQuery, (err, rows) => {
          if(err) console.log(err)
          console.table(rows)
          promptMenu();
        })
      }   
    })
  })
  
};

function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the role?',
      name: 'role'
    },
    {
      type: 'input',
      message: 'What is the salary of the role?',
      name: 'salary'
    },
    {
      type: 'list',
      message: 'Which department does the role belong to?',
      name: 'department',
      choices: [
        'Sales',
        'Accounting',
        'Customer Service',
        'Quality Assurance',
        'Human Resources',
        'Warehouse',
        'Administration'
      ]
    },
  ])
  .then((answers) => {
    console.log(answers);
    const queryEmployee = "SELECT * FROM employee INNER JOIN role ON employee.role_id=role.id";
    const queryRole = 'INSERT INTO role (title, salary, department_id) VALUES (?,?,?) '
    if(!answers.role) {
      console.log('Please enter the name of the role!')
      promptMenu();
    }
    if(!answers.salary) {
      console.log('Please enter the salary!')
      promptMenu();

    }
    if(!answers.department) {
      console.log('Please enter the name of the department!')
      promptMenu();

    }
    if(answers.role && answers.salary && answers.department){
      connection.query(queryRole, [answers.role, answers.salary, 1], (err, rows) => {
        connection.query
       
        if(err) {
          console.log(err)
        }
          
        
        promptMenu();
      })
    }
  })
}


//query to get names in role and have them = to id that way you can match them and display the name


//query to look for all employees then show it
//to show it i need to do a map by mapping their id to their name VALUE: id name:${``}
//