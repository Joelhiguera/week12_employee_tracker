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
      'Delete Employee',
      'Delete Department',
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
      case "Update Employee Role":
        updateEmployeeRole()
        break;
      case "Delete Employee":
        deleteEmployee()
        break;
      case "Delete Department":
        deleteDepartment()
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
  // const alias = "SELECT manager_id, CONCAT_WS(', ', first_name, last_name) AS Manager FROM employee"

  const query = "SELECT employee.id, first_name, last_name, title, salary, CONCAT_WS(', ', last_name, first_name) `Manager` FROM employee INNER JOIN role ON employee.role_id=role.id"

  // "SELECT * FROM employee INNER JOIN role ON employee.role_id=role.id"


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
  const query = 'SELECT * FROM employee, role'
  connection.query(query, (err, rows) => {
    if(err) console.log(err)
    let role = rows
    let roleChoices = role.map(({id, title}) => ({
      value: id,
      name: title
    }))
    let managerChoice = role.map(({manager_id, first_name, last_name}) => ({
      name: `${first_name} ${last_name}`,
      value: manager_id
    }))
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
        choices: roleChoices
      },
      {
        type: 'list',
        message: 'Who is the eomplyees manager?',
        name: 'manager',
        choices: managerChoice

      }
    ])
    .then((answers) => {
     
      const queryEmployee = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)"
      const params = [answers.firstName, answers.lastName, answers.role, answers.manager]
      connection.query(queryEmployee, params, (err, rows) => {
        if(err) console.log(err)
        viewAllEmployees()
      })
    })
  })
  
}

function updateEmployeeRole() {
  const query = "SELECT * FROM employee"
  connection.query(query, (err, rows) => {
    if(err) console.log(err)
    let employees = rows
    let employeeChoice = employees.map(({id, first_name, last_name}) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }))
    inquirer.prompt([
      {
        type: 'list',
        message: 'Which employee would you like to update?',
        name: 'employeeId',
        choices: employeeChoice
      }
    ])
    .then((answers) => {
      let employeeId = answers.employeeId
      const query = "SELECT * FROM role"
      connection.query(query, (err, rows) => {
        if(err) console.log(err)
        let roleChoices = rows.map(({id, title}) => ({
          value: id,
          name: `${title}`
        }))
        updateRole(employeeId, roleChoices)
      })
    })
  })

}

function updateRole(employeeId, roleChoices) {
  inquirer.prompt([
    {
      type: 'list',
      message: 'What is the updated role?',
      name: 'role',
      choices: roleChoices
    }
  ]).then((answers) => {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?'
    const params = [answers.role, employeeId]
    connection.query(query, params, (err, rows) => {
      if(err) console.log(err)
      viewAllEmployees();
    })
  })
}

function deleteEmployee() {
  const query = "SELECT * FROM employee"
  connection.query(query, (err, rows) => {
    if(err) console.log(err)
    let employees = rows
    let employeeChoice = employees.map(({id, first_name, last_name}) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }))
    inquirer.prompt([
      {
        type: 'list',
        message: 'Which employee would you like to delete?',
        name: 'deletedEmployee',
        choices: employeeChoice
        
      }
    ])
    .then((answers) => {
      const deleteQuery =  "DELETE FROM employee WHERE id= (?)"
      connection.query(deleteQuery, answers.deletedEmployee, (err, rows) => {
        if(err) console.log(err)
        viewAllEmployees()
      })
    })
  })
}

function deleteDepartment() {
  const query = "SELECT * FROM department"
  connection.query(query, (err, rows) => {
    if(err) console.log(err)
    let departments = rows
    let departmentChoice = departments.map(({id, name}) => ({
      name: name,
      value: id
    }))
    inquirer.prompt([
      {
        type: 'list',
        message: 'Which department would you like to delete?',
        name: 'deleteDepartment',
        choices: departmentChoice
      }
    ])
    .then((answers) => {
      console.log(answers.deleteDepartment)
      // const foreignKeyCheck = "SET foreign_key_checks = 0"
      const deleteQuery = "DELETE FROM department WHERE id= (?)"
      // const addForeignKey = "SET foreign_key_checks = 0"
      connection.query(deleteQuery, answers.deleteDepartment, (err, rows) => {
        if(err) console.log(err)
        viewDepartments()
      })
    })
  })
}




//query to get names in role and have them = to id that way you can match them and display the name


//query to look for all employees then show it
//to show it i need to do a map by mapping their id to their name VALUE: id name:${``}
//