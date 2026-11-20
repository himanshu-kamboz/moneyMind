import {
    getTransactions,
    addTransaction,
    saveTransactions
} from "./services/transactionService.js";

const transactions = getTransactions();

const incomeForm = document.querySelector('.income-form');
const cancelIncome = document.querySelector('#cancelIncome');

if (cancelIncome && incomeForm) {
    cancelIncome.addEventListener('click', function () {
        incomeForm.reset();
    })
}

if (incomeForm) {
    incomeForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const incomeTitle = document.getElementById('income-title').value;
        const incomeAmount = parseFloat(document.getElementById('income-amount').value);
        const incomeCategory = document.getElementById('income-category').value;
        const incomeDate = document.getElementById('income-date').value;
        const incomePaymentMethod = document.getElementById('income-payment-method').value;
        const incomeDescription = document.getElementById('income-description').value;

        const income = {
            id: Date.now(),
            title: incomeTitle,
            amount: incomeAmount,
            category: incomeCategory,
            date: incomeDate,
            paymentMethod: incomePaymentMethod,
            description: incomeDescription
        };

        addTransaction({
            ...income,
            type: 'income'
        })

        console.log('income saved')

    });
}

const expenseForm = document.querySelector('.expense-form');
const cancelExpense = document.querySelector('#cancelExpense');

if (cancelExpense && expenseForm) {
    cancelExpense.addEventListener('click', function () {
        expenseForm.reset();
    })
}

if (expenseForm) {
    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const expenseTitle = document.getElementById('expense-title').value;
        const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
        const expenseCategory = document.getElementById('expense-category').value;
        const expenseDate = document.getElementById('expense-date').value;
        const expensePaymentMethod = document.getElementById('expense-payment-method').value;
        const expenseDescription = document.getElementById('expense-description').value;

        const expense = {
            id: Date.now(),
            title: expenseTitle,
            amount: expenseAmount,
            category: expenseCategory,
            date: expenseDate,
            paymentMethod: expensePaymentMethod,
            description: expenseDescription
        };

        addTransaction({
            ...expense,
            type: 'expense'
        })
        console.log('expense saved');
    });
}

const tableBody = document.querySelector('#transactionTableBody');

tableBody.innerHTML = "";

transactions.forEach(transaction => {

    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${transaction.date}</td>
        <td>${transaction.title}</td>
        <td>${transaction.category}</td>
        <td>${transaction.type}</td>
        <td>₹${transaction.amount}</td>
        <td>
            <button class="text-action">Edit</button>
            <button class="text-action delete-action">Delete</button>
        </td>
    `
    tableBody.appendChild(row);

});

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