document.getElementById('sales-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const month = document.getElementById('month').value.trim();
    const year = document.getElementById('year').value.trim();
    const sales = document.getElementById('sales').value.trim();

    if (month === '' || year === '' || sales === '') {
        alert('Please fill in all fields');
        return;
    }

    const salesData = JSON.parse(localStorage.getItem('salesData')) || [];
    salesData.push({ month, year, sales });
    localStorage.setItem('salesData', JSON.stringify(salesData));

    document.getElementById('sales-form').reset();
    displaySales();
});

function displaySales() {
    const salesData = JSON.parse(localStorage.getItem('salesData')) || [];
    const salesTable = document.getElementById('sales-table').getElementsByTagName('tbody')[0];
    salesTable.innerHTML = ''; // Clear previous data

    salesData.forEach(data => {
        const row = salesTable.insertRow();
        row.insertCell(0).innerText = data.month;
        row.insertCell(1).innerText = data.year;
        row.insertCell(2).innerText = data.sales;
    });
}

// Call displaySales on page load
document.addEventListener('DOMContentLoaded', displaySales);

