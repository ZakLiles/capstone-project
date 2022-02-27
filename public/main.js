const addIncomeBtn = document.getElementById("add-income-btn");
const addExpenseBtn = document.getElementById("add-expense-btn");

const incomeTable = document.getElementById("income-table").tBodies[0]
const expenseTable = document.getElementById("expense-table").tBodies[0]

const incomeFormCont = document.getElementById("income-form-cont");
const incomeForm = document.getElementById("income-form");
const addIncomeFormBtn = document.getElementById("add-income-btn-popup");
const editIncomeFormBtn = document.getElementById("edit-income-btn");
const cancelIncomeFormBtn = document.getElementById("cancel-income-btn-popup");

const expenseFormCont = document.getElementById("expense-form-cont");
const expenseForm = document.getElementById("expense-form");
const addExpenseFormBtn = document.getElementById("add-expense-btn-popup");
const editExpenseFormBtn = document.getElementById("edit-expense-btn");
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
    for(i = expenseTable.rows.length-1; i >= 0; i--){
        incomeTable.deleteRow(i)
    }

    for(i = 0; i < incomeArr.length; i++){
            let newRow = incomeTable.insertRow(-1)
            let descCell = newRow.insertCell(0)
            let amountCell = newRow.insertCell(1)
            let actionCell = newRow.insertCell(2)
            let id = incomeArr[i].income_id
            let desc = incomeArr[i].description
            let amount = incomeArr[i].amount
            descCell.innerHTML = desc
            amountCell.innerHTML = '$' + amount
            amountCell.classList.add("text-end")
            actionCell.classList.add("text-center")
            actionCell.innerHTML = `<button type="button" class="btn" onclick="editIncome(${id}, '${desc}', ${amount})"><i class="fa-solid fa-pen-to-square"></i></button><button type="button" class ="btn" onclick="deleteIncome(${id})"><i class="fa-solid fa-trash-can"></i></button>`
    }
}

const showExpenses = expensesArr => {

    for(i = expenseTable.rows.length-1; i >= 0; i--){
        console.log("deleting row", i)
        expenseTable.deleteRow(i)
    }

    for(i = 0; i < expensesArr.length; i++){
        let newRow = expenseTable.insertRow(-1)
        let descCell = newRow.insertCell(0)
        let amountCell = newRow.insertCell(1)
        let actionCell = newRow.insertCell(2)
        let id = expensesArr[i].expense_id
        let desc = expensesArr[i].description
        let amount = expensesArr[i].amount
        descCell.innerHTML = desc
        amountCell.innerHTML = '-$' + amount
        amountCell.classList.add("text-end", "text-danger")
        actionCell.classList.add("text-center")
        actionCell.innerHTML = `<button type="button" class="btn" onclick="editExpense(${id}, '${desc}', ${amount})"><i class="fa-solid fa-pen-to-square"></i></button><button type="button" class ="btn" onclick="deleteExpense(${id})"><i class="fa-solid fa-trash-can"></i></button>`
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

const editIncome = (id, desc, amount) => {
    console.log(`Id: ${id} Desc: ${desc} Amount: ${amount}`)
    editIncomeFormBtn.dataset.id = id;
    editIncomeFormBtn.style.display = "inline-block";
    addIncomeFormBtn.style.display = "none";
    showIncomeForm()
    document.getElementById('income-desc').value = desc
    document.getElementById('income-amount').value = amount
}

const editExpense = (id, desc, amount) => {
    console.log(`Id: ${id} Desc: ${desc} Amount: ${amount}`)
    editExpenseFormBtn.dataset.id = id;
    editExpenseFormBtn.style.display = "inline-block";
    addExpenseFormBtn.style.display = "none";
    showExpenseForm()
    document.getElementById('expense-desc').value = desc
    document.getElementById('expense-amount').value = amount
}

const saveIncomeEdit = (event) => {
    event.preventDefault()
    let id = editIncomeFormBtn.dataset.id
    let desc = document.getElementById('income-desc')
    let amount = document.getElementById('income-amount')

    let incomeObj = {
        desc: desc.value,
        amount: amount.value
    }

    desc.value = ''
    amount.value = ''

    console.log("SaveEditIncome")
    axios.put(`/income/${id}`, incomeObj).then(()=> getIncome())
    incomeFormCont.style.display = "none";
    editIncomeFormBtn.style.display = "none";
    addIncomeFormBtn.style.display = "inline-block";
    unBlurBackground()
}

const saveExpenseEdit = (event) => {
    event.preventDefault()
    let id = editExpenseFormBtn.dataset.id
    let desc = document.getElementById('expense-desc')
    let amount = document.getElementById('expense-amount')

    let expenseObj = {
        desc: desc.value,
        amount: amount.value
    }

    desc.value = ''
    amount.value = ''
    
    console.log("SaveEditExpense")
    axios.put(`/expense/${id}`, expenseObj).then(()=> getExpenses())
    expenseFormCont.style.display = "none";
    editExpenseFormBtn.style.display = "none";
    addExpenseFormBtn.style.display = "inline-block";
    unBlurBackground()
}

addIncomeBtn.addEventListener('click', showIncomeForm)
addExpenseBtn.addEventListener('click', showExpenseForm)
incomeForm.addEventListener('submit', addIncome)
incomeForm.addEventListener('reset', cancelIncome)
expenseForm.addEventListener('submit', addExpense)
expenseForm.addEventListener('reset', cancelExpense)
editIncomeFormBtn.addEventListener('click', saveIncomeEdit)
editExpenseFormBtn.addEventListener('click', saveExpenseEdit)

getTransactions()