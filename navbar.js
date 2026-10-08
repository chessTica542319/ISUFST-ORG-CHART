document.addEventListener("DOMContentLoaded", () => {
    const siteNav = document.getElementById("siteNav");
    const menuToggle = document.getElementById("navMenuToggle");

    if (!siteNav || !menuToggle) return;

    function openMenu() {
        siteNav.classList.add("nav-open");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation");

        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    }

    function closeMenu() {
        siteNav.classList.remove("nav-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");

        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }

    menuToggle.addEventListener("click", (event) => {
        event.stopPropagation();

        if (siteNav.classList.contains("nav-open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    /*
     * Clicking outside the navigation closes it.
     */
    document.addEventListener("click", (event) => {
        if (!siteNav.contains(event.target)) {
            closeMenu();
        }
    });

    /*
     * Clicking a navigation link also closes the mobile menu.
     */
    siteNav.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    /*
     * Escape closes the menu.
     */
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
});
