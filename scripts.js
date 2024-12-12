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

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const dots = document.getElementById('dots');
    const userData = document.getElementById('userData');
    const errorElement = document.getElementById('error');

    const fetchUserData = async () => {
        const userId = Math.floor(Math.random() * 10) + 1;
        const url = `https://jsonplaceholder.typicode.com/users/${userId}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Не удалось загрузить данные');
            }
            const data = await response.json();
            preloader.style.display = 'none';
            displayUserData(data);
        } catch (error) {
            preloader.style.display = 'none';
            errorElement.textContent = '⚠ Что-то пошло не так';
            errorElement.style.display = 'block';
        }
    };

    const displayUserData = (data) => {
        const { username, name, email, address, phone, website, company } = data;

        document.getElementById('userName').textContent = name;
        document.getElementById('userUsername').textContent = username;
        document.getElementById('userEmail').textContent = email;
        document.getElementById('userAddress').textContent = `${address.street}, ${address.city}`;
        document.getElementById('userPhone').textContent = phone;
        document.getElementById('userWebsite').textContent = website;
        document.getElementById('userCompany').textContent = company.name;

        userData.style.display = 'block';
    };

    let dotCount = 1;
    setInterval(() => {
        if (dotCount < 3) {
            dotCount++;
        } else {
            dotCount = 1;
        }
        dots.textContent = '.'.repeat(dotCount);
    }, 500);

    fetchUserData();
});


document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('#gallery', {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        mousewheel: true,
        grabCursor: true,
    });
});

