 document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.getElementById('sidebar');
    const header = document.querySelector('header');
    const headerTitle = document.getElementById('headerTitle');
    const headerCenter = document.getElementById('headerCenter');
    const dropdownLinks = document.querySelectorAll('.dropdown_menu a');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.toggle('expanded');
        });
    }

    if (headerCenter) {
        headerCenter.addEventListener('click', (e) => {
            headerCenter.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!headerCenter.contains(e.target)) {
                headerCenter.classList.remove('active');
            }
        });
    }

    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const menuName = link.getAttribute('data-name');

            if (targetSection) {
                const headerHeight = 80; 
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                if (menuName) headerTitle.textContent = menuName;
                
                setTimeout(() => {
                    headerCenter.classList.remove('active');
                }, 100);
            }
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '-80px 0px 0px 0px', 
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.id;
                const currentTitle = entry.target.getAttribute('data-title');

                if (currentId !== 'section1') {
                    header.classList.add('scrolled');
                    if (currentTitle) {
                        headerTitle.textContent = currentTitle;
                    }
                } else {
                    header.classList.remove('scrolled');
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});
