document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       HERO INTRO
    ================================================== */
    const heroTitle = document.querySelector(".hero_title");
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.classList.add("active");
        }, 300);
    }

    const header = document.getElementById("mainHeader");
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggleBtn");
    const headerTitle = document.getElementById("headerTitle");
    const loadMoreBtn = document.getElementById("loadMoreBtn");

    window.addEventListener("scroll", () => {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 50);
        }
    });

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("expanded");
        });
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            const hiddenCards = document.querySelectorAll("#archiveGrid .archive_card.hidden");
            const countToDisplay = 4;

            hiddenCards.forEach((card, index) => {
                if (index < countToDisplay) {
                    card.classList.remove('hidden');
                    card.classList.add('animate-in');
                }
            });

            if (document.querySelectorAll("#archiveGrid .archive_card.hidden").length === 0) {
                document.getElementById('moreBtnWrapper').style.display = 'none';
            }
        });
    }

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target.getAttribute("data-title");
                if (title && headerTitle) {
                    headerTitle.textContent = title;
                }

                if (entry.target.id === "section_home") {
                    startChatAnimation();
                }
            }
        });
    }, { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" });

    document.querySelectorAll("section").forEach(s => sectionObserver.observe(s));

    function startChatAnimation() {
        if (sessionStorage.getItem('chatAnimated')) {
            showChatDirectly();
            return;
        }

        const userBubble = document.getElementById('userBubble');
        const aiBubble = document.getElementById('aiBubble');
        const aiTyping = document.getElementById('aiTyping');
        const aiContent = document.getElementById('aiContent');

        setTimeout(() => { 
            if (userBubble) {
                userBubble.classList.add('animate-in'); 
                userBubble.style.opacity = '1'; 
            }
        }, 300);

        setTimeout(() => { 
            if (aiBubble) {
                aiBubble.classList.add('animate-in'); 
                aiBubble.style.opacity = '1'; 
            }
        }, 1000);

        setTimeout(() => {
            if (aiTyping) aiTyping.classList.add('hidden');
            if (aiContent) {
                aiContent.classList.remove('hidden');
                aiContent.classList.add('animate-in');
            }

            document.querySelectorAll(".archive_card:not(.hidden)").forEach((card, i) => {
                setTimeout(() => card.classList.add('animate-in'), i * 150);
            });

            if (document.querySelectorAll("#archiveGrid .archive_card.hidden").length > 0) {
                const wrapper = document.getElementById('moreBtnWrapper');
                if (wrapper) {
                    wrapper.classList.remove('hidden');
                    wrapper.classList.add('animate-in');
                }
            }
        }, 2200);

        sessionStorage.setItem('chatAnimated', 'true');
    }

    function showChatDirectly() {
        const u = document.getElementById('userBubble');
        const a = document.getElementById('aiBubble');
        const t = document.getElementById('aiTyping');
        const c = document.getElementById('aiContent');

        if (u) { u.style.opacity = '1'; u.classList.add('animate-in'); }
        if (a) { a.style.opacity = '1'; a.classList.add('animate-in'); }
        if (t) t.classList.add('hidden');
        if (c) c.classList.remove('hidden');

        document.querySelectorAll(".archive_card:not(.hidden)").forEach(card => {
            card.style.opacity = '1';
            card.classList.add('animate-in');
        });
        
        const wrapper = document.getElementById('moreBtnWrapper');
        if (wrapper && document.querySelectorAll("#archiveGrid .archive_card.hidden").length > 0) {
            wrapper.classList.remove('hidden');
        }
    }
});