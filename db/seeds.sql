USE company_db;

INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Manager', 80000, 1),
       ('Software Engineer', 100000, 2),
       ('Accountant', 70000, 3),
       ('Marketing Coordinator', 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kris', 'Kringle', 1, NULL),
       ('Janet', 'Jackson', 2, 1),
       ('Michael', 'Buble', 3, NULL),
       ('Buzz', 'Lightyear', 4, 1);
