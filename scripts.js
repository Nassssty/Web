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

