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
    getTransactions: (req, res) => {
        console.log(CONNECTION_STRING)
        sequelize.query(`SELECT * FROM transactions 
            ORDER BY type DESC;`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    }
}