require('dotenv').config()
const express = require('express')

const app = express()
const port = process.env.PORT || process.env.SERVER_PORT

const {getHTML, getStyles, getScript, getTransactions} = require('./controller.js')

app.use(express.json())

app.get('/', getHTML)
app.get('/styles', getStyles)
app.get('/js', getScript)
app.get('/transactions', getTransactions)

app.listen(port, () => console.log(`Listening on port ${port}`))