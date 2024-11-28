(function() {
    window.addEventListener('load', () => {
        const loadTime = (performance.now() / 1000).toFixed(2);
        const footer = document.querySelector('footer ul');
        const loadInfo = document.createElement('li');
        loadInfo.textContent = `Страница загружена за ${loadTime} секунд`;
        footer.appendChild(loadInfo);

        // Генерация таблицы сразу при загрузке страницы, если есть данные
        generateTable();
    });
})();

let cakeCount = 1;  // Номер текущего торта

// Функция для добавления нового торта
function addCake() {
    const formContainer = document.getElementById('individualFormContainer');
    const filling = formContainer.querySelector('.filling-select').value;
    const color = formContainer.querySelector('.color-select').value;
    const design = formContainer.querySelector('.design-select').value;

    // Сохраняем данные о торте в localStorage
    const cakeData = { filling, color, design };
    let orderData = JSON.parse(localStorage.getItem('cakeOrder')) || [];
    orderData.push(cakeData);
    localStorage.setItem('cakeOrder', JSON.stringify(orderData));

    // Генерация таблицы
    generateTable();

    // Очищаем форму для следующего торта
    cakeCount++;
}

// Функция для добавления новой строки в таблицу
function generateTable() {
    const resultContainer = document.getElementById('resultContainer').getElementsByTagName('tbody')[0];
    resultContainer.innerHTML = '';  // Очищаем предыдущие строки

    const orderData = JSON.parse(localStorage.getItem('cakeOrder')) || [];

    if (orderData.length > 0) {
        // Показываем заголовок заказа
        document.getElementById('orderHeader').style.display = 'block';

        // Для каждого торта генерируем строку в таблице
        orderData.forEach((cake, index) => {
            const rowTemplate = document.getElementById('cakeRowTemplate');
            const row = rowTemplate.content.cloneNode(true);  // Клонируем шаблон строки

            // Заполняем ячейки строки
            row.querySelector('.cake-number').textContent = index + 1;
            row.querySelector('.cake-filling').textContent = cake.filling;
            row.querySelector('.cake-color').textContent = cake.color;
            row.querySelector('.cake-design').textContent = cake.design;

            resultContainer.appendChild(row);  // Добавляем строку в таблицу
        });
    }
}
