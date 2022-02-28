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
const totalIncomeCallback = ({data: sum}) => showTotalIncome(sum)
const totalExpenseCallback = ({data: sum}) => showTotalExpenses(sum)
const netIncomeCallback = ({data: netIncome}) => showNetIncome(netIncome)

const errCallback = err => console.log(err)

const getTransactions = () => {
    getIncome()
    getExpenses()
    calcTotalIncome()
    calcTotalExpenses()
    getNetIncome()
}

const getIncome = () => axios.get(`/income`).then(incomeCallback).catch(errCallback)
const getExpenses = () => axios.get('/expenses').then(expensesCallback).catch(errCallback)
const calcTotalIncome = () => axios.get('/total-income').then(totalIncomeCallback).catch(errCallback)
const calcTotalExpenses = () => axios.get('/total-expenses').then(totalExpenseCallback).catch(errCallback)
const getNetIncome = () => axios.get('/net-income').then(netIncomeCallback).catch(errCallback)

const showIncome = incomeArr => {

    for(i = incomeTable.rows.length-1; i >= 0; i--){
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
            descCell.classList.add("align-middle")
            amountCell.innerHTML = '$' + amount
            amountCell.classList.add("text-end","align-middle")
            actionCell.classList.add("text-center")
            actionCell.innerHTML = `<button type="button" class="btn" onclick="editIncome(${id}, '${desc}', ${amount})"><i class="fa-solid fa-pen-to-square"></i></button><button type="button" class ="btn" onclick="deleteIncome(${id})"><i class="fa-solid fa-trash-can"></i></button>`
    }
    calcTotalIncome()
    getNetIncome()
}

const showExpenses = expensesArr => {

    for(i = expenseTable.rows.length-1; i >= 0; i--){
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
        descCell.classList.add("align-middle")
        amountCell.innerHTML = '-$' + amount
        amountCell.classList.add("text-end", "text-danger", "align-middle")
        actionCell.classList.add("text-center")
        actionCell.innerHTML = `<button type="button" class="btn" onclick="editExpense(${id}, '${desc}', ${amount})"><i class="fa-solid fa-pen-to-square"></i></button><button type="button" class = "btn" onclick="deleteExpense(${id})"><i class="fa-solid fa-trash-can"></i></button>`
    }
    calcTotalExpenses()
    getNetIncome()
}

const showTotalIncome = totalIncome => {
    const totalIncomes = document.querySelectorAll(".total-income")
    totalIncomes.forEach((tI) =>  {
        if(totalIncome.sum){
            tI.innerHTML="$"+totalIncome.sum
        } else {
            tI.innerHTML="-"
        }
    })
}

const showTotalExpenses = totalExpenses => {
    const totalExpensesItems = document.querySelectorAll(".total-expenses")
    totalExpensesItems.forEach((tE) => {
        if(totalExpenses.sum){
            tE.innerHTML="-$"+totalExpenses.sum
        } else {
            tE.innerHTML="-"
        }
    })
}

const showNetIncome = netIncomeObj => {
    let netIncomeElem = document.getElementById('net-income')
    let netIncome = netIncomeObj.netincome

    if(!netIncome) {
        if (netIncomeObj.totalincome) {
            netIncome = netIncomeObj.totalincome
        } else if (netIncomeObj.totalexpenses) {
            netIncome = -netIncomeObj.totalexpenses
        } else {
            netIncome = 0
        }
    }

    if(netIncome > 0){
         if(netIncomeElem.classList.contains('text-danger')){
            netIncomeElem.classList.remove('text-danger')
         }
         netIncomeElem.innerHTML = "$" + netIncome
    } else if (netIncome < 0){
        if(!netIncomeElem.classList.contains('text-danger')){
            netIncomeElem.classList.add('text-danger')
        }
        netIncomeElem.innerHTML = "-$" + netIncome*-1
    } else {
        if(netIncomeElem.classList.contains('text-danger')){
            netIncomeElem.classList.remove('text-danger')
         }
         netIncomeElem.innerHTML = "-"
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
    axios.delete(`/expense/${id}`).then(() => getExpenses())
}

const editIncome = (id, desc, amount) => {
    editIncomeFormBtn.dataset.id = id;
    editIncomeFormBtn.style.display = "inline-block";
    addIncomeFormBtn.style.display = "none";
    showIncomeForm()
    document.getElementById('income-desc').value = desc
    document.getElementById('income-amount').value = amount
}

const editExpense = (id, desc, amount) => {
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