// Fetch data from the PostgreSQL database via the server
async function fetchGradeData() {
    try {
        const response = await fetch('/api/grades'); // ✅ FIXED: matches your Node.js server route
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        populateGradebook(data);
    } catch (error) {
        console.error('Error fetching grade data:', error);
    }
}

// Populate the table with grade data
function populateGradebook(data) {
    const tableBody = document.querySelector('#gradebook tbody');
    if (!tableBody) {
        console.error("Table body not found. Make sure your HTML has a <tbody> inside #gradebook");
        return;
    }
    tableBody.innerHTML = ''; // Clear existing table rows

    data.forEach((row) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.first_name} ${row.last_name}</td>
            <td>Total Grade</td>
            <td>${Math.round(row.total_grade * 100) / 100}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// Automatically fetch data when the page loads
window.addEventListener('DOMContentLoaded', fetchGradeData);



