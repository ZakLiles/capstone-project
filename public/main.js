const addIncomeBtn = document.getElementById("add-income");
const addExpenseBtn = document.getElementById("add-expense");
const incomeForm = document.getElementById("income-form-cont");
const expenseForm = document.getElementById("expense-form-cont");
const mask = document.getElementById("mask");

const blurBackground = () => mask.style.display = "block"

const showIncomeForm = () => {
    incomeForm.style.display = "block";
    blurBackground()
}

const showExpenseForm = () => {
    expenseForm.style.display = "block";
    blurBackground()
}

addIncomeBtn.addEventListener('click', showIncomeForm)
addExpenseBtn.addEventListener('click', showExpenseForm)