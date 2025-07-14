// SPA navigation for index.html

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = link.getAttribute('href');
            if (href === 'about.html' || href === 'projects.html' || href === 'index.html') {
                e.preventDefault();
                loadPage(href);
                window.history.pushState({ page: href }, '', href === 'index.html' ? '/' : href);
            }
        });
    });

    window.addEventListener('popstate', function (event) {
        const page = (event.state && event.state.page) || 'index.html';
        loadPage(page);
    });

    function loadPage(page) {
        if (page === 'index.html' || page === '/') {
            fetch('index.html')
                .then(res => res.text())
                .then(html => {
                    const temp = document.createElement('div');
                    temp.innerHTML = html;
                    const newMain = temp.querySelector('main');
                    if (newMain) main.innerHTML = newMain.innerHTML;
                });
        } else {
            fetch(page)
                .then(res => res.text())
                .then(html => {
                    const temp = document.createElement('div');
                    temp.innerHTML = html;
                    const newMain = temp.querySelector('main');
                    if (newMain) main.innerHTML = newMain.innerHTML;
                });
        }
        // update nav active class
        navLinks.forEach(link => {
            if (link.getAttribute('href') === page || (page === '/' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // On first load, if not index.html, load the correct page
    if (window.location.pathname.endsWith('about.html')) {
        loadPage('about.html');
    } else if (window.location.pathname.endsWith('projects.html')) {
        loadPage('projects.html');
    }
});

