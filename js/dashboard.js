import {getTransactions } from "./transaction.js";

const date = new Date();

document.querySelector('#newDate').textContent = date.toLocaleDateString("en-CA", {
    day: "numeric",
    month: "long",
    year: "numeric"
});

const transactions = getTransactions();

const selectedMonth = document.querySelector('#dashboard-month').value;

const monthlyTransactions = transactions.filter(transaction => {
    return transaction.date.startsWith(selectedMonth.value);
})

const monthlyIncome = monthlyTransactions
    .filter(item => item.type === 'income')
    .reduce((total, item) => total + item.amount, 0);

const displayIncome = document.querySelector('#monthlyIncome');
displayIncome.textContent = monthlyIncome;

const monthlyExpense = monthlyTransactions
    .filter(item => item.type === 'expense')
    .reduce((total, item) => total + item.amount, 0);


const displayExpense = document.querySelector('#monthlyExpense');
displayExpense.textContent = monthlyExpense;