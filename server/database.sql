CREATE TABLE income(
    income_id SERIAL PRIMARY KEY,
    description VARCHAR(40),
    amount NUMERIC(12,2)
);

CREATE TABLE expenses(
    expense_id SERIAL PRIMARY KEY,
    description VARCHAR(40), 
    amount NUMERIC(12,2)
);

CREATE TABLE transactions(
    transaction_id SERIAL PRIMARY KEY,
    type VARCHAR(40)
    description VARCHAR(40), 
    amount NUMERIC(12,2)
);

INSERT INTO transactions(type, description, amount)
VALUES ('Expense','Rent', 1000),
('Expense','Car Payment', 385.25),
('Expense','USAA Insurance', 107.34),
('Expense','UCCU CC', 100),
('Expense','Progressive Inusurance', 17.50),
('Expense','Motorcylce Payment', 125.30),
('Income','Prime', 3379.20),
('Income','Uber', 435.15);

INSERT INTO income(description, amount)
VALUES ('Income','Prime', 3379.20),
('Income','Uber', 435.15);