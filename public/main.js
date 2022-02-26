const addIncomeBtn = document.getElementById("add-income-btn");
const addExpenseBtn = document.getElementById("add-expense-btn");

const incomeTable = document.getElementById("income-table")
const expenseTable = document.getElementById("expense-table")

const incomeFormCont = document.getElementById("income-form-cont");
const incomeForm = document.getElementById("income-form");
const addIncomeFormBtn = document.getElementById("add-income-btn-popup");
const cancelIncomeFormBtn = document.getElementById("cancel-income-btn-popup");

const expenseFormCont = document.getElementById("expense-form-cont");
const expenseForm = document.getElementById("expense-form");
const addExpenseFormBtn = document.getElementById("add-expense-btn-popup");
const cancelExpenseFormBtn = document.getElementById("cancel-expense-btn-popup");
const mask = document.getElementById("mask");

const blurBackground = () => mask.style.display = "block"
const unBlurBackground = () => mask.style.display = "none"


const incomeCallback = ({data: income}) => showIncome(income)
const expensesCallback = ({data: expenses}) => showExpenses(expenses)
const errCallback = err => console.log(err)

const getTransactions = () => {
    getIncome()
    getExpenses()
}

const getIncome = () => {
    axios.get(`/income`).then(incomeCallback)
}

const getExpenses = () => {
    axios.get('/expenses').then(expensesCallback)
}

const showIncome = incomeArr => {
    for(i = incomeTable.rows.length-1; i > 1; i--){
        incomeTable.deleteRow(i)
    }

    for(i = 0; i < incomeArr.length; i++){
            let newRow = incomeTable.insertRow(-1)
            let descCell = newRow.insertCell(0)
            let amountCell = newRow.insertCell(1)
            let actionCell = newRow.insertCell(2)
            let id = incomeArr[i].income_id
            descCell.innerHTML = incomeArr[i].description
            amountCell.innerHTML = incomeArr[i].amount
            actionCell.innerHTML = `<button onclick="deleteIncome(${id})">Delete</button>`
    }
}

const showExpenses = expensesArr => {
    for(i = expenseTable.rows.length-1; i > 1; i--){
        expenseTable.deleteRow(i)
    }

    for(i = 0; i < expensesArr.length; i++){
        let newRow = expenseTable.insertRow(-1)
        let descCell = newRow.insertCell(0)
        let amountCell = newRow.insertCell(1)
        let actionCell = newRow.insertCell(2)
        let id = expensesArr[i].expense_id
        descCell.innerHTML = expensesArr[i].description
        amountCell.innerHTML = expensesArr[i].amount
        actionCell.innerHTML = `<button onclick="deleteExpense(${id})">Delete</button>`
    }
}

const showIncomeForm = () => {
    incomeFormCont.style.display = "block";
    blurBackground()
}

const showExpenseForm = () => {
    expenseFormCont.style.display = "block";
    blurBackground()
}

const addIncome = (event) => {
    event.preventDefault()
    let desc = document.getElementById('income-desc')
    let amount = document.getElementById('income-amount')

    let incomeObj = {
        desc: desc.value,
        amount: amount.value
    }

    desc.value = ''
    amount.value = ''

    console.log("addIncome")
    axios.post('/income', incomeObj).then(()=> getIncome())
    incomeFormCont.style.display = "none";
    unBlurBackground()
}

const cancelIncome = (event) => {
    incomeFormCont.style.display = "none";
    unBlurBackground()
}

const addExpense = (event) => {
    event.preventDefault()
    let desc = document.getElementById('expense-desc')
    let amount = document.getElementById('expense-amount')

    let expenseObj = {
        desc: desc.value,
        amount: amount.value
    }

    desc.value = ''
    amount.value = ''
    
    console.log("addExpense")
    axios.post('/expenses', expenseObj).then(()=> getExpenses())
    expenseFormCont.style.display = "none";
    unBlurBackground()
}

const cancelExpense = (event) => {
    expenseFormCont.style.display = "none";
    unBlurBackground()
}

const deleteIncome = id => {
    console.log('deleteIncome', id)
    axios.delete(`/income/${id}`).then(() => getIncome())
}

const deleteExpense = id => {
    console.log('deleteExpense', id)
    axios.delete(`/expense/${id}`).then(() => getExpenses())
}

addIncomeBtn.addEventListener('click', showIncomeForm)
addExpenseBtn.addEventListener('click', showExpenseForm)
incomeForm.addEventListener('submit', addIncome)
incomeForm.addEventListener('reset', cancelIncome)
expenseForm.addEventListener('submit', addExpense)
expenseForm.addEventListener('reset', cancelExpense)

getTransactions()