require('dotenv').config()
const express = require('express')

const app = express()
const port = process.env.PORT || process.env.SERVER_PORT

const {getHTML, getStyles, getScript, getIncome, getExpenses, addIncome, addExpense, deleteIncome, deleteExpense, editIncome, editExpense, getTotalIncome, getTotalExpenses, getNetIncome, getFavicon} = require('./controller.js')

app.use(express.json())

app.get('/', getHTML)
app.get('/styles', getStyles)
app.get('/js', getScript)
app.get('/favicon', getFavicon)
app.get('/income', getIncome)
app.get('/expenses', getExpenses)
app.post('/income', addIncome)
app.post('/expenses', addExpense)
app.delete('/income/:id', deleteIncome)
app.delete('/expense/:id', deleteExpense)
app.put('/income/:id', editIncome)
app.put('/expense/:id', editExpense)
app.get('/total-income', getTotalIncome)
app.get('/total-expenses', getTotalExpenses)
app.get('/net-income', getNetIncome)

app.listen(port, () => console.log(`Listening on port ${port}`))