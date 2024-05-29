const connection = require('./connection');

function getDepartments() {
  return connection.promise().query('SELECT * FROM department');
}

function getRoles() {
  return connection.promise().query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id');
}

function getEmployees() {
  return connection.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id');
}

function addDepartment(name) {
  return connection.promise().query('INSERT INTO department (name) VALUES (?)', [name]);
}

function addRole(title, salary, department_id) {
  return connection.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
}

function addEmployee(first_name, last_name, role_id, manager_id) {
  return connection.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]);
}

function updateEmployeeRole(employee_id, role_id) {
  return connection.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [role_id, employee_id]);
}

module.exports = { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };
