const inquirer = require('inquirer');
const queries = require('../db/queries');

function mainMenu() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ]).then(function (answer) {
    switch (answer.action) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        promptAddDepartment();
        break;
      case 'Add a role':
        promptAddRole();
        break;
      case 'Add an employee':
        promptAddEmployee();
        break;
      case 'Update an employee role':
        promptUpdateEmployeeRole();
        break;
      default:
        process.exit();
    }
  });
}

function viewDepartments() {
  queries.getDepartments().then(function ([rows]) {
    console.table(rows);
    mainMenu();
  });
}

function viewRoles() {
  queries.getRoles().then(function ([rows]) {
    console.table(rows);
    mainMenu();
  });
}

function viewEmployees() {
  queries.getEmployees().then(function ([rows]) {
    console.table(rows);
    mainMenu();
  });
}

function promptAddDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the department name:'
    }
  ]).then(function (answer) {
    queries.addDepartment(answer.name).then(function () {
      console.log(`Added ${answer.name} to the database.`);
      mainMenu();
    });
  });
}

function promptAddRole() {
  queries.getDepartments().then(function ([departments]) {
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the role title:'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the role salary:'
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Select the department for this role:',
        choices: departments.map(function (department) {
          return { name: department.name, value: department.id };
        })
      }
    ]).then(function (answer) {
      queries.addRole(answer.title, answer.salary, answer.department_id).then(function () {
        console.log(`Added ${answer.title} to the database.`);
        mainMenu();
      });
    });
  });
}

function promptAddEmployee() {
  Promise.all([queries.getRoles(), queries.getEmployees()]).then(function ([[roles], [employees]]) {
    inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the employee\'s first name:'
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the employee\'s last name:'
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'Select the employee\'s role:',
        choices: roles.map(function (role) {
          return { name: role.title, value: role.id };
        })
      },
      {
        type: 'list',
        name: 'manager_id',
        message: 'Select the employee\'s manager:',
        choices: [{ name: 'None', value: null }].concat(employees.map(function (employee) {
          return { name: employee.first_name + ' ' + employee.last_name, value: employee.id };
        }))
      }
    ]).then(function (answer) {
      queries.addEmployee(answer.first_name, answer.last_name, answer.role_id, answer.manager_id).then(function () {
        console.log(`Added ${answer.first_name} ${answer.last_name} to the database.`);
        mainMenu();
      });
    });
  });
}

function promptUpdateEmployeeRole() {
  Promise.all([queries.getEmployees(), queries.getRoles()]).then(function ([[employees], [roles]]) {
    inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Select the employee to update:',
        choices: employees.map(function (employee) {
          return { name: employee.first_name + ' ' + employee.last_name, value: employee.id };
        })
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'Select the new role:',
        choices: roles.map(function (role) {
          return { name: role.title, value: role.id };
        })
      }
    ]).then(function (answer) {
      queries.updateEmployeeRole(answer.employee_id, answer.role_id).then(function () {
        console.log('Updated employee\'s role.');
        mainMenu();
      });
    });
  });
}

module.exports = mainMenu;
