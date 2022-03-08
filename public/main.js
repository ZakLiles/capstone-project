const addIncomeBtn = document.getElementById("add-income-btn");
const addExpenseBtn = document.getElementById("add-expense-btn");

const incomeTable = document.getElementById("income-table").tBodies[0]
const expenseTable = document.getElementById("expense-table").tBodies[0]

const incomeFormCont = document.getElementById("incomeFormCont");
const incomeForm = document.getElementById("income-form");
const addIncomeFormBtn = document.getElementById("add-income-btn-popup");
const editIncomeFormBtn = document.getElementById("edit-income-btn");
const cancelIncomeFormBtn = document.getElementById("cancel-income-btn-popup");
const incomeModalTitle = document.getElementById("incomeModalTitle");

const expenseFormCont = document.getElementById("expenseFormCont");
const expenseForm = document.getElementById("expense-form");
const addExpenseFormBtn = document.getElementById("add-expense-btn-popup");
const editExpenseFormBtn = document.getElementById("edit-expense-btn");
const cancelExpenseFormBtn = document.getElementById("cancel-expense-btn-popup");
const expenseModalTitle = document.getElementById("expenseModalTitle");

const graphBtn = document.getElementById('graph-btn');

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

const tooltipTriggerList = [].slice.call(document.querySelectorAll('tt'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

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
            actionCell.innerHTML = `<button type="button" class="btn tt" data-bs-placement="left" title="Edit" data-bs-toggle="modal" data-bs-target="#incomeFormCont" onclick="editIncome(${id}, '${desc}', ${amount})"><i class="fa-solid fa-pen-to-square fa-ms"></i></button><button type="button" class ="btn tt" data-bs-placement="top" title="Delete" onclick="deleteIncome(${id})"><i class="fa-solid fa-trash-can fa-sm"></i></button>`
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
        actionCell.innerHTML = `<button type="button" class="btn tt" data-bs-placement="left" title="Edit" data-bs-toggle="modal" data-bs-target="#expenseFormCont" onclick="editExpense(${id}, '${desc}', ${amount})"><i class="fa-solid fa-pen-to-square fa-sm"></i></button><button type="button" class="btn tt" data-bs-placement="top" title="Delete" onclick="deleteExpense(${id})"><i class="fa-solid fa-trash-can fa-sm"></i></button>`
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
    incomeModalTitle.innerHTML ="Add Income";
    editIncomeFormBtn.style.display = "none";
    addIncomeFormBtn.style.display = "inline-block";
}

const showExpenseForm = () => {
    expenseModalTitle.innerHTML ="Add Expense";
    editExpenseFormBtn.style.display = "none";
    addExpenseFormBtn.style.display = "inline-block";
}

const addIncome = (event) => {
    event.preventDefault()
    console.log("add Income called")
    if(addIncomeFormBtn.style.display === "none") {
        saveIncomeEdit(event)
    } else {
        let desc = document.getElementById('income-desc')
        let amount = document.getElementById('income-amount')
    
        let incomeObj = {
            desc: desc.value,
            amount: amount.value
        }
    
        desc.value = ''
        amount.value = ''
    
        axios.post('/income', incomeObj).then(()=> getIncome())

    }
}

const addExpense = (event) => {
    event.preventDefault()

    if(addExpenseFormBtn.style.display === "none"){
        saveExpenseEdit(event)
    } else {
        let desc = document.getElementById('expense-desc')
        let amount = document.getElementById('expense-amount')
    
        let expenseObj = {
            desc: desc.value,
            amount: amount.value
        }
    
        desc.value = ''
        amount.value = ''
        
        axios.post('/expenses', expenseObj).then(()=> getExpenses())
    }
}

const deleteIncome = id => {
    axios.delete(`/income/${id}`).then(() => getIncome())
}

const deleteExpense = id => {
    axios.delete(`/expense/${id}`).then(() => getExpenses())
}

const editIncome = (id, desc, amount) => {
    incomeModalTitle.innerHTML ="Edit Income";
    editIncomeFormBtn.dataset.id = id;
    editIncomeFormBtn.style.display = "inline-block";
    addIncomeFormBtn.style.display = "none";
    document.getElementById('income-desc').value = desc
    document.getElementById('income-amount').value = amount
}

const editExpense = (id, desc, amount) => {
    expenseModalTitle.innerHTML ="Edit Expense";
    editExpenseFormBtn.dataset.id = id;
    editExpenseFormBtn.style.display = "inline-block";
    addExpenseFormBtn.style.display = "none";
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
    editIncomeFormBtn.style.display = "none";
    addIncomeFormBtn.style.display = "inline-block";
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
    editExpenseFormBtn.style.display = "none";
    addExpenseFormBtn.style.display = "inline-block";
}

const spendingGraph = () => {

    axios.all([axios.get('/expenses'), axios.get('/total-income'), axios.get('/total-expenses')]).then(axios.spread((...responses) => {
        const expenses = responses[0].data
        const totalIncome = responses[1].data.sum
        const totalExpenses = responses[2].data.sum

        const expensesDesc = []
        const expensesPerc = []

        expenses.forEach((expense) => {
            let amount = expense.amount
            let desc = expense.description
            expensesDesc.push(desc)
            expensesPerc.push(amount)
        })
        
        if(totalExpenses < totalIncome){
            expensesDesc.push('Remainder')
            expensesPerc.push(totalIncome-totalExpenses)       
        } 

        const colorScale = d3.interpolateRainbow

        const colorRangeInfo = {
            colorStart: 0,
            colorEnd: 1,
            useEndAsStart: true
        }
        const chartData = {
            labels: expensesDesc,
            data: expensesPerc
        }
        drawPieChart('spendingChart', chartData, colorScale, colorRangeInfo)
    }))

}

const calculatePoint = (i, intervalSize, colorRangeInfo) => {
    let { colorStart, colorEnd, useEndAsStart } = colorRangeInfo
    return (useEndAsStart ? (colorEnd - (i * intervalSize)) : (colorStart + (i * intervalSize)));
}

const interpolateColors = (dataLength, colorScale, colorRangeInfo) => {
    let { colorStart, colorEnd } = colorRangeInfo;
    let colorRange = colorEnd - colorStart;
    let intervalSize = colorRange / dataLength;

    let colorArray = [];
  
    for (let i = 0; i < dataLength; i++) {
      let colorPoint = calculatePoint(i, intervalSize, colorRangeInfo);
      colorArray.push(colorScale(colorPoint));
    }
  
    return colorArray;
}  

function drawPieChart(chartId, chartData, colorScale, colorRangeInfo) {
    /* Grab chart element by id */
    const chartElement = document.getElementById(chartId);
  
    const dataLength = chartData.data.length;
  
    /* Create color array */
    var COLORS = interpolateColors(dataLength, colorScale, colorRangeInfo);
  
    if(myChart != undefined) {
        myChart.destroy()
    }

    /* Create chart */
    window.myChart = new Chart(chartElement, {
      type: 'pie',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            backgroundColor: COLORS,
            hoverBackgroundColor: COLORS,
            data: chartData.data
          }
        ],
      }
    });
  
}

addIncomeBtn.addEventListener('click', showIncomeForm)
addExpenseBtn.addEventListener('click', showExpenseForm)
incomeForm.addEventListener('submit', addIncome)
expenseForm.addEventListener('submit', addExpense)
editIncomeFormBtn.addEventListener('click', saveIncomeEdit)
editExpenseFormBtn.addEventListener('click', saveExpenseEdit)
graphBtn.addEventListener('click', spendingGraph)

getTransactions()