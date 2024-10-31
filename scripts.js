(function() {
    window.addEventListener('load', () => {
        const loadTime = (performance.now() / 1000).toFixed(2);
        const footer = document.querySelector('footer ul');
        const loadInfo = document.createElement('li');
        loadInfo.textContent = `Страница загружена за ${loadTime} секунд`;
        footer.appendChild(loadInfo);
    });
})();

document.querySelectorAll('.main_menu li').forEach(item => {
    item.addEventListener('mouseenter', () => item.classList.add('hovered'));
    item.addEventListener('mouseleave', () => item.classList.remove('hovered'));
});

const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.main_menu a').forEach(link => {
    const page = link.getAttribute('href');
    if (currentPage === page) {
        link.classList.add('active');
    }
});

