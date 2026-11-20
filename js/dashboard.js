import { getTransactions } from "./services/transactionService.js";

const date = new Date();

document.querySelector('#newDate').textContent = date.toLocaleDateString("en-CA", {
    day: "numeric",
    month: "long",
    year: "numeric"
});

const transactions = getTransactions();

const selectedMonth = document.querySelector('#dashboard-month').value;

const monthlyTransactions = transactions.filter(transaction => {
    return transaction.date.startsWith(selectedMonth);
})

const monthlyIncome = monthlyTransactions
    .filter(item => item.type === 'income')
    .reduce((total, item) => total + item.amount, 0);

const displayIncome = document.querySelector('#monthlyIncome');
displayIncome.textContent = `₹ ${monthlyIncome}`;

const monthlyExpense = monthlyTransactions
    .filter(item => item.type === 'expense')
    .reduce((total, item) => total + item.amount, 0);

const displayExpense = document.querySelector('#monthlyExpense');
displayExpense.textContent = `₹ ${monthlyExpense}`;

const monthlyBalance = monthlyIncome - monthlyExpense;

const displayBalance = document.querySelector('#monthlyBalance');

displayBalance.textContent = `₹ ${monthlyBalance}`;

const tableBody = document.querySelector('#dashboardTableBody');

monthlyTransactions.forEach(transaction => {

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${transaction.title}</td>
        <td>${transaction.category}</td>
        <td>${transaction.date}</td>
        <td>₹${transaction.amount}</td>
        `;

    tableBody.appendChild(row);
})

const savedProfile = JSON.parse(localStorage.getItem('userProfile'));

if (savedProfile) {

    const name = document.querySelector('#sidebarName');
    const avatar = document.querySelector('#sidebarAvatar');

    const initials = savedProfile.fullName
        .trim()
        .split(/\s+/)
        .map(word => word[0])
        .join('')
        .toUpperCase();

    if (name) name.textContent = savedProfile.fullName;
    if (avatar) avatar.textContent = initials;
}