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
      case "Add An Employee":
        addEmployee()
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
  const newQuery = 'SELECT * FROM department'
  connection.query(newQuery, (err, rows) => {
    if(err) console.log(err)
    let departments = rows
    let departmentChoices = departments.map(({id, name}) => ({
      name: name,
      value: id
    }))
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
        choices: departmentChoices
      },
    ])
    .then((answers) => {
  
      const queryRole = 'INSERT INTO role (title, salary, department_id) VALUES (?,?,?) '
      const params = [answers.role, answers.salary, answers.department]
      connection.query(queryRole, params, (err, rows) => {
        if(err) console.log(err)
        connection.query("SELECT * FROM role", (err, rows) => {
          console.table(rows)
          promptMenu()
        })
       
      })
  
    })
  }) 
  
}

function addEmployee(){
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the employees first name?',
      name: 'firstName'
    },
    {
      type: 'input',
      message: 'What is the employees last name?',
      name: 'lastName'
    },
    {
      type: 'list',
      message: 'What is the employees role?',
      name: 'role',
      choices: [
        'Branch Manager',
        'Head of Human Resources',
        'Sales Representative',
        'Accountant',
        'Head of Accounting',
        'Supplier Relations',
        'Warehouse Associate',
        'Warehouse Foreman',
        'VP of North East Sales',
        'Customer Service Representative',
        'Quality Assurance Representative',
        'Receptionist',
        'Administrative Assistant',
        'Cheif Financial Officer',
        'Assitant to the Regional Manager'
      ]
    },
  ])
  .then((answers) => {
   
    const queryEmployee = "INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)"
    const query = "SELECT * FROM employee INNER JOIN role ON employee.role_id=role.id"

    if(!answers.first_name) {
      console.log('Please enter employees first name!')
      promptMenu();
    }
    if(!answers.last_name) {
      console.log('Please enter the employees last name!')
      promptMenu();

    }
    if(answers.firstName && answers.lastName && answers.role){
      connection.query(queryEmployee, [answers.firstName, answers.lastName, 1], (err, rows) => {
        if(err) {
          console.log(err)
        }else {
          connection.query(query, (err, rows) => {
            console.table(rows)
            promptMenu();
            
          })
        }
      })
    }
  })
}


//query to get names in role and have them = to id that way you can match them and display the name


//query to look for all employees then show it
//to show it i need to do a map by mapping their id to their name VALUE: id name:${``}
//