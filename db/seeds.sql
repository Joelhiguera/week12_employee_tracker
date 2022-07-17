INSERT INTO department(name)VALUES
("Sales"),
("Accounting"),
("Customer Service"),
("Quality Assurance"), 
("Human Resources"), 
("Warehouse"),     
("Administration");


INSERT INTO role(title, salary, department_id)VALUES
("Branch Manager", 75000, 7),
("Head of Human Resources", 50000, 5),
("Sales Representative", 60000, 1),
("Accountant", 45000, 2),
("Head of Accounting", 50000, 2),
("Supplier Relations", 40000, 4),
("Warehouse Associate", 30000, 6),
("Warehouse Foreman", 55000, 6),
("VP of North East Sales", 150000, 7),
("Customer Service Representative", 37000, 3),
("Quality Assurance Representative", 40000, 4),
("Receptionist", 30000, 3),
("Administrative Assistant", 50000, 7),
("Cheif Financial Officer", 200000, 7 ),
("Assistant to the Regional Manager", 60000, 1);



INSERT INTO employee(first_name, last_name, role_id, manager_id)VALUES
("Michael", "Scott", 1, 13), 
("Jim", "Halpert", 3, 1),
("Dwight", "Shrute", 15, 1),
("Pam", "Beesly", 3, 1),
("Ryan", "Howard", 3, 1),
("Stanley", "Hudson", 3, 1),
("Kevin", "Malone", 4, 1),
("Meredith", "Palmer", 6, 1),
("Angela", "Martin", 5, 1),
("Oscar", "Martinez", 4, 1),
("Phyllis", "Vance", 3, 1),
("Roy", "Anderson", 7, 18),
("Jan", "levinson", 9, 21),
("Toby", "Flenderson", 2, 1),
("Kelly", "Kapoor", 10, 1),
("Andy", "Bernard", 3, 1),
("Creed", "Bratton", 11, 1),
("Darryl", "Philbin", 8, 1),
("Erin", "Hannon", 12, 1),
("Gabe", "Lewis", 13, 1),
("David", "Wallace", 14, null);

