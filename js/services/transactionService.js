export function getTransactions() {
    return JSON.parse(localStorage.getItem('transactions')) || [];
}

export function saveTransactions(transactions) {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

export function addTransaction(transaction) {
    const transactions = getTransactions();
    transactions.push(transaction);
    saveTransactions(transactions);
}
