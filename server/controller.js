const path = require('path')
require('dotenv').config()
const CONNECTION_STRING = process.env.DATABASE_URL || process.env.CONNECTION_STRING
const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    getHTML: (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    }, 
    getStyles: (req, res) => {
        res.sendFile(path.join(__dirname, '../public/styles.css'))
    },
    getScript: (req, res) => {
        res.sendFile(path.join(__dirname, '../public/main.js'))
    },
    getFavicon: (req, res) => {
        res.sendFile(path.join(__dirname, '../public/favicon-32x32.png'))
    },
    getIncome: (req, res) => {
        sequelize.query(`SELECT * FROM income ORDER BY income_id;`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },
    getExpenses: (req, res) => {
        sequelize.query(`SELECT * FROM expenses ORDER BY expense_id;`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },
    addIncome: (req, res) => {
        console.log("Adding Income")
        let {desc, amount} = req.body;
        sequelize.query(`INSERT INTO income(description, amount)
            VALUES ('${desc}', ${amount});`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },
    addExpense: (req, res) => {
        console.log("Adding Expenses")
        let {desc, amount} = req.body;
        sequelize.query(`INSERT INTO expenses(description, amount)
            VALUES ('${desc}', ${amount});`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },
    deleteIncome: (req, res) => {
        console.log("Deleting Income")
        console.log(req.params)
        let {id} = req.params
        sequelize.query(`DELETE FROM income WHERE income_id=${id}`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },
    deleteExpense: (req, res) => {
        console.log("Deleting Expense")
        console.log(req.params)
        let {id} = req.params
        sequelize.query(`DELETE FROM expenses WHERE expense_id=${id}`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },
    editIncome: (req, res) => {
        console.log("Editing Income DB Entry")
        let {id} = req.params
        let {desc, amount} = req.body
        sequelize.query(`UPDATE income SET description = '${desc}', amount = ${amount} WHERE income_id=${id}`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },
    editExpense: (req, res) => {
        console.log("Editing Expense DB Entry")
        let {id} = req.params
        let {desc, amount} = req.body
        sequelize.query(`UPDATE expenses SET description = '${desc}', amount = ${amount} WHERE expense_id=${id}`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },
    getTotalIncome: (req, res) => {
        console.log("Getting Total Income from DB")
        sequelize.query(`SELECT SUM(amount) FROM income`)
            .then(dbRes => res.status(200).send(dbRes[0][0]))
            .catch(err => console.log(err))
    },
    getTotalExpenses: (req, res) => {
        console.log("Getting Total Expenses from DB")
        sequelize.query(`SELECT SUM(amount) FROM expenses`)
        .then(dbRes => res.status(200).send(dbRes[0][0]))
        .catch(err => console.log(err))
    },
    getNetIncome: (req, res) => {
        sequelize.query(`SELECT (totalincome - totalexpenses) AS netincome, totalincome, totalexpenses
        FROM (SELECT sum(amount) as totalincome FROM income) x CROSS JOIN
             (SELECT sum(amount) as totalexpenses FROM expenses) y;`)
            .then(dbRes => res.status(200).send(dbRes[0][0]))
            .catch(err => console.log(err))
    }
}