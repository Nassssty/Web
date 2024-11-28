(function() {
    window.addEventListener('load', () => {
        const loadTime = (performance.now() / 1000).toFixed(2);
        const footer = document.querySelector('footer ul');
        const loadInfo = document.createElement('li');
        loadInfo.textContent = `Страница загружена за ${loadTime} секунд`;
        footer.appendChild(loadInfo);

        generateTable();
    });
})();

let cakeCount = 1;

function addCake() {
    const formContainer = document.getElementById('individualFormContainer');
    const filling = formContainer.querySelector('.filling-select').value;
    const color = formContainer.querySelector('.color-select').value;
    const design = formContainer.querySelector('.design-select').value;

    const cakeData = { filling, color, design };
    let orderData = JSON.parse(localStorage.getItem('cakeOrder')) || [];
    orderData.push(cakeData);
    localStorage.setItem('cakeOrder', JSON.stringify(orderData));

    generateTable();

    cakeCount++;
}

function generateTable() {
    const resultContainer = document.getElementById('resultContainer').getElementsByTagName('tbody')[0];
    resultContainer.innerHTML = '';

    const orderData = JSON.parse(localStorage.getItem('cakeOrder')) || [];

    if (orderData.length > 0) {
        document.getElementById('orderHeader').style.display = 'block';

        orderData.forEach((cake, index) => {
            const rowTemplate = document.getElementById('cakeRowTemplate');
            const row = rowTemplate.content.cloneNode(true);

            row.querySelector('.cake-number').textContent = index + 1;
            row.querySelector('.cake-filling').textContent = cake.filling;
            row.querySelector('.cake-color').textContent = cake.color;
            row.querySelector('.cake-design').textContent = cake.design;

            resultContainer.appendChild(row);
        });
    }
}
