(function() {
    window.addEventListener('load', () => {
        const loadTime = (performance.now() / 1000).toFixed(2);
        const footer = document.querySelector('footer ul');
        const loadInfo = document.createElement('li');
        loadInfo.textContent = `Страница загружена за ${loadTime} секунд`;
        footer.appendChild(loadInfo);
    });
})();


const currentURL = window.location.href;
document.querySelectorAll('.main_menu a').forEach(link => {
    const pageURL = link.href;
    if (currentURL === pageURL) {
        link.classList.add('active');
    }
});


document.getElementById('initialForm').addEventListener('submit', function(event) {
    event.preventDefault();
    generateForms();
});

function generateForms() {
    const cakeCount = document.getElementById('cakeCount').value;
    const formsContainer = document.getElementById('individualFormsContainer');
    formsContainer.innerHTML = '';  // Очистка предыдущих форм

    const template = document.getElementById('cakeFormTemplate');

    for (let i = 1; i <= cakeCount; i++) {
        const formClone = template.content.cloneNode(true);
        formClone.querySelector('h3').textContent = `Торт №${i}`;

        formClone.querySelector('.filling-select').setAttribute('name', `filling${i}`);
        formClone.querySelector('.color-select').setAttribute('name', `color${i}`);
        formClone.querySelector('.design-select').setAttribute('name', `design${i}`);

        formsContainer.appendChild(formClone);
    }


    formsContainer.innerHTML += `
        <button type="button" class="button" onclick="generateTable()">Создать заказ</button>
        <button type="button" class="button" onclick="saveFormData()">Сохранить данные</button>
        <button type="button" class="button" onclick="loadFormData()">Загрузить данные</button>
    `;
}

function saveFormData() {
    const cakeCount = document.getElementById('cakeCount').value;
    const formData = { cakeCount, cakes: [] };

    for (let i = 1; i <= cakeCount; i++) {
        const filling = document.querySelector(`select[name="filling${i}"]`).value;
        const color = document.querySelector(`select[name="color${i}"]`).value;
        const design = document.querySelector(`select[name="design${i}"]`).value;
        formData.cakes.push({ filling, color, design });
    }

    localStorage.setItem('cakeOrder', JSON.stringify(formData));
    alert('Данные сохранены!');
}

// Загрузка данных формы из localStorage
function loadFormData() {
    const savedData = JSON.parse(localStorage.getItem('cakeOrder'));
    if (!savedData) {
        alert('Нет сохранённых данных');
        return;
    }

    // Восстанавливаем количество тортов
    document.getElementById('cakeCount').value = savedData.cakeCount;
    generateForms();  // Создаём формы для каждого торта

    // Заполняем формы данными из сохранённого заказа
    savedData.cakes.forEach((cake, index) => {
        document.querySelector(`select[name="filling${index + 1}"]`).value = cake.filling;
        document.querySelector(`select[name="color${index + 1}"]`).value = cake.color;
        document.querySelector(`select[name="design${index + 1}"]`).value = cake.design;
    });

    alert('Данные загружены!');
}

// Генерация таблицы для отображения заказа
function generateTable() {
    const cakeCount = document.getElementById('cakeCount').value;
    const resultContainer = document.getElementById('resultContainer');

    // Используем шаблон для заголовков таблицы
    const tableTemplate = document.getElementById('tableTemplate').content.cloneNode(true);
    const table = tableTemplate.querySelector('.grid-table');

    const rowTemplate = document.getElementById('rowTemplate');

    // Добавляем строки с данными для каждого торта
    for (let i = 1; i <= cakeCount; i++) {
        const filling = document.querySelector(`select[name="filling${i}"]`).value;
        const color = document.querySelector(`select[name="color${i}"]`).value;
        const design = document.querySelector(`select[name="design${i}"]`).value;

        const rowClone = rowTemplate.content.cloneNode(true);
        rowClone.querySelector('.cake-number').textContent = i;
        rowClone.querySelector('.cake-filling').textContent = filling;
        rowClone.querySelector('.cake-color').textContent = color;
        rowClone.querySelector('.cake-design').textContent = design;

        table.appendChild(rowClone);
    }

    resultContainer.innerHTML = '<h3>Заказ:</h3>';
    resultContainer.appendChild(table);
}
