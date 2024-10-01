const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Встановлення статики
app.use(express.static('public'));

// Змінні для боргу
let debt = 1000;
let lastUpdate = Date.now();

app.get('/api/debt', (req, res) => {
    const now = Date.now();
    const elapsedHours = (now - lastUpdate) / (1000 * 60 * 60); // Час в годинах

    if (elapsedHours >= 24) {
        const periods = Math.floor(elapsedHours / 24);
        debt *= Math.pow(1.05, periods); // Збільшення боргу на 5% кожні 24 години
        lastUpdate += periods * 24 * 60 * 60 * 1000; // Оновлення часу останнього оновлення
    }

    res.json({ debt: debt.toFixed(2), lastUpdate });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
