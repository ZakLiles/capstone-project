const addIncomeBtn = document.getElementById("add-income-btn");
const addExpenseBtn = document.getElementById("add-expense-btn");

const budgetTable = document.getElementById("budget-table")

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


const transactionCallback = ({data: transactions}) => showTransactions(transactions)
const errCallback = err => console.log(err)

const getTransactions = () => {
    axios.get(`/transactions`).then(transactionCallback)
}

const showTransactions = transactions => {
    for(i = budgetTable.rows.length-1; i > 0; i--){
        budgetTable.deleteRow(i)
    }

    let incomes = transactions.filter(trans => trans.type==="Income")
    let expenses = transactions.filter(trans => trans.type==="Expense")

    let incomeHeader = budgetTable.insertRow(-1)
    let incomeTitle = incomeHeader.insertCell(0)
    incomeTitle.innerHTML ="Income"
    incomeTitle.colSpan = 2

    for(i = 0; i < incomes.length; i++){
            let newRow = budgetTable.insertRow(-1)
            let descCell = newRow.insertCell(0)
            let amountCell = newRow.insertCell(1)
            descCell.innerHTML = incomes[i].description
            amountCell.innerHTML = incomes[i].amount
    }

    let expenseHeader = budgetTable.insertRow(-1)
    let expenseTitle = expenseHeader.insertCell(0)
    expenseTitle.innerHTML ="Expenses"
    expenseTitle.colSpan = 2
    for(i = 0; i < expenses.length; i++){
        let newRow = budgetTable.insertRow(-1)
        let descCell = newRow.insertCell(0)
        let amountCell = newRow.insertCell(1)
        descCell.innerHTML = expenses[i].description
        amountCell.innerHTML = expenses[i].amount
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
    let desc = document.getElementById('income-desc').value
    let amount = document.getElementById('income-amount').value

    let incomeObj = {
        desc: desc,
        amount: amount
    }
    console.log("addIncome")
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
    let newRow = budgetTable.insertRow(-1)
    let descCell = newRow.insertCell(0)
    let amountCell = newRow.insertCell(1)

    descCell.innerHTML = desc.value
    amountCell.innerHTML = amount.value

    console.log("addExpense")
    desc.value = ''
    amount.value = ''
    expenseFormCont.style.display = "none";
    unBlurBackground()
}

const cancelExpense = (event) => {
    expenseFormCont.style.display = "none";
    unBlurBackground()
}

addIncomeBtn.addEventListener('click', showIncomeForm)
addExpenseBtn.addEventListener('click', showExpenseForm)
incomeForm.addEventListener('submit', addIncome)
incomeForm.addEventListener('reset', cancelIncome)
expenseForm.addEventListener('submit', addExpense)
expenseForm.addEventListener('reset', cancelExpense)

getTransactions()