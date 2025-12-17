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

    /* ==================================================
       CHAT SECTION INTERACTION (Container2)
       - sessionStorage 기반 1회 실행
       - 재방문 시 즉시 노출
    ================================================== */
    const sectionHome  = document.querySelector("#section_home");
    const chatQ        = document.querySelector(".chat_q");
    const chatTyping   = document.querySelector(".chat_typing");
    const chatTitle    = document.querySelector(".chat_title");
    const chatText     = document.querySelector(".chat_a p");
    const archiveList  = document.querySelector(".archive_list");

    let chatPlayed = sessionStorage.getItem("chatPlayed") === "true";

    /* ✅ 이미 한 번 실행된 경우 → 즉시 완료 상태로 */
    if (chatPlayed) {
        chatQ?.classList.add("show");
        chatTitle?.classList.add("show");
        chatText?.classList.add("show");
        archiveList?.classList.add("show");
        if (chatTyping) chatTyping.style.display = "none";
    }

    /* ✅ 첫 방문일 때만 인터랙션 실행 */
    if (sectionHome && !chatPlayed) {
        const chatObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !chatPlayed) {
                    chatPlayed = true;
                    sessionStorage.setItem("chatPlayed", "true");

                    // 1. 질문 등장
                    setTimeout(() => {
                        chatQ?.classList.add("show");
                    }, 300);

                    // 2. typing dots
                    setTimeout(() => {
                        if (chatTyping) chatTyping.style.display = "block";
                    }, 1200);

                    // 3. 제목
                    setTimeout(() => {
                        if (chatTyping) chatTyping.style.display = "none";
                        chatTitle?.classList.add("show");
                    }, 2600);

                    // 4. 답변 텍스트
                    setTimeout(() => {
                        chatText?.classList.add("show");
                    }, 3200);

                    // 5. 리스트
                    setTimeout(() => {
                        archiveList?.classList.add("show");
                    }, 4200);
                }
            });
        }, { threshold: 0.3 });

        chatObserver.observe(sectionHome);
    }

    /* ==================================================
       SIDEBAR TOGGLE
    ================================================== */
    const toggleBtn = document.getElementById("toggleBtn");
    const sidebar   = document.getElementById("sidebar");

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            sidebar.classList.toggle("expanded");
        });
    }

    /* ==================================================
       HEADER DROPDOWN
    ================================================== */
    const header        = document.querySelector("header");
    const headerCenter  = document.getElementById("headerCenter");
    const headerTitle   = document.getElementById("headerTitle");
    const dropdownLinks = document.querySelectorAll(".dropdown_menu a");

    if (headerCenter) {
        headerCenter.addEventListener("click", () => {
            headerCenter.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (!headerCenter.contains(e.target)) {
                headerCenter.classList.remove("active");
            }
        });
    }

    dropdownLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const targetId      = link.getAttribute("href")?.substring(1);
            const targetSection = document.getElementById(targetId);
            const menuName      = link.getAttribute("data-name");

            if (targetSection) {
                const headerHeight   = 80;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

                if (menuName && headerTitle) {
                    headerTitle.textContent = menuName;
                }

                setTimeout(() => {
                    headerCenter?.classList.remove("active");
                }, 100);
            }
        });
    });

    /* ==================================================
       HEADER SCROLL STATE & TITLE SYNC
    ================================================== */
    const sectionObserverOptions = {
        root: null,
        rootMargin: "-80px 0px 0px 0px",
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentTitle = entry.target.getAttribute("data-title");

                if (entry.target.id !== "section1") {
                    header?.classList.add("scrolled");
                    if (currentTitle && headerTitle) {
                        headerTitle.textContent = currentTitle;
                    }
                } else {
                    header?.classList.remove("scrolled");
                }
            }
        });
    }, sectionObserverOptions);

    document.querySelectorAll("section").forEach(section => {
        sectionObserver.observe(section);
    });

});
