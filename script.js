const descriptionInput = document.querySelector('input[type="text"]');
const amountInput = document.querySelector('input[type="number"]');
const categoryInput = document.getElementById('category');
const button = document.querySelector('button');
const transactionList = document.querySelector('ul');
const searchInput = document.getElementById('searchInput');
const balanceText = document.querySelector('h2');
const incomeText = document.getElementById('income-value');
const expenseText = document.getElementById('expense-value');

let balance = 0;
let income = 0;
let expenses = 0;
let transactions = [];
let categoryTotals = {
    "🍔 Food": 0,
    "🚗 Transport": 0,
    "💡 Bills": 0,
    "🎮 Entertainment": 0,
    "🛒 Shopping": 0,
    "💰 Salary": 0,
    "🏠 Rent": 0
};

const chartCanvas = document.getElementById('expenseChart');

    const expenseChart = new Chart(chartCanvas, {
    type: 'pie',
    data: {
        labels: Object.keys(categoryTotals),
        datasets: [{
            data: Object.values(categoryTotals)
        }]
    }
});
button.addEventListener('click', function () {
    const description = descriptionInput.value;
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    if (description === '' || amount === 0) {
        alert('Please enter a description and amount.');
        return;
    }

    const newTransaction = document.createElement('li');

if (amount > 0) {
    newTransaction.textContent = `${category} • ${description} +$${amount}`;
    income = income + amount;
} else {
    newTransaction.textContent = `${category} • ${description} -$${Math.abs(amount)}`;
    expenses = expenses + Math.abs(amount);
}categoryTotals[category] = categoryTotals[category] + Math.abs(amount);

expenseChart.data.datasets[0].data = Object.values(categoryTotals);
expenseChart.update();
const editButton = document.createElement('button');
editButton.textContent = 'Edit';

editButton.addEventListener('click', function () {
    descriptionInput.value = description;
    amountInput.value = amount;
    categoryInput.value = category;

    newTransaction.remove();

    balance = balance - amount;

    if (amount > 0) {
        income = income - amount;
    } else {
        expenses = expenses - Math.abs(amount);
    }

    balanceText.textContent = `Balance: $${balance.toFixed(2)}`;
    incomeText.textContent = `$${income.toFixed(2)}`;
    expenseText.textContent = `$${expenses.toFixed(2)}`;

    transactions = transactions.filter(function (transaction) {
        return !(
            transaction.description === description &&
            transaction.amount === amount &&
            transaction.category === category
        );
    });

    localStorage.setItem('transactions', JSON.stringify(transactions));
});
const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', function () {
    newTransaction.remove();

    balance = balance - amount;

    if (amount > 0) {
        income = income - amount;
    } else {
        expenses = expenses - Math.abs(amount);
    }

    balanceText.textContent = `Balance: $${balance.toFixed(2)}`;
    incomeText.textContent = `$${income.toFixed(2)}`;
    expenseText.textContent = `$${expenses.toFixed(2)}`;
    transactions = transactions.filter(function (transaction) {
    return !(
        transaction.description === description &&
        transaction.amount === amount &&
        transaction.category === category
    );
});

localStorage.setItem('transactions', JSON.stringify(transactions));
});
newTransaction.appendChild(editButton);
newTransaction.appendChild(deleteButton);
transactionList.appendChild(newTransaction);
transactions.push({
    description: description,
    amount: amount,
    category: category
});

localStorage.setItem('transactions', JSON.stringify(transactions));

    balance = balance + amount;

    balanceText.textContent = `Balance: $${balance.toFixed(2)}`;
incomeText.textContent = `$${income.toFixed(2)}`;
expenseText.textContent = `$${expenses.toFixed(2)}`;

    descriptionInput.value = '';
    amountInput.value = '';
});
const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

savedTransactions.forEach(function (transaction) {
    descriptionInput.value = transaction.description;
    amountInput.value = transaction.amount;
    categoryInput.value = transaction.category;

    button.click();
});
searchInput.addEventListener('input', function () {
    const searchText = searchInput.value.toLowerCase();
    const transactions = transactionList.querySelectorAll('li');

    transactions.forEach(function (transaction) {
        const transactionText = transaction.textContent.toLowerCase();

        if (transactionText.includes(searchText)) {
            transaction.style.display = 'list-item';
        } else {
            transaction.style.display = 'none';
        }
    });
});