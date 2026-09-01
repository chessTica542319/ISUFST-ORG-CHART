/* =========================================================
   ISUFST ORGANIZATIONAL CHART
   PROFILE MODAL
   CICI FACULTY
   BACK TO TOP
   SOCIAL ANIMATIONS
========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    const modal =
        document.getElementById("profileModal");

    const body =
        document.body;

    const modalName =
        document.getElementById("modalName");

    const modalRole =
        document.getElementById("modalRole");

    const modalDept =
        document.getElementById("modalDept");

    const modalPhoto =
        document.getElementById("modalPhoto");


    /* =====================================================
       ALL PROFILE CARDS
    ====================================================== */

    const cards =
        document.querySelectorAll(
            ".person-card, .faculty-card"
        );


    /* =====================================================
       CARD EVENTS
    ====================================================== */

    cards.forEach((card) => {

        card.setAttribute(
            "tabindex",
            "0"
        );

        card.setAttribute(
            "role",
            "button"
        );


        /* Mouse / Touch */

        card.addEventListener(
            "click",
            (event) => {

                /*
                 * If a real button or link inside
                 * the card is clicked, don't open modal.
                 */

                if (
                    event.target.closest(
                        "button, a"
                    )
                ) {

                    return;
                }


                openProfile(card);

            }
        );


        /* Keyboard */

        card.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openProfile(card);

                }

            }
        );

    });


    /* =====================================================
       OPEN PROFILE MODAL
    ====================================================== */

    function openProfile(card) {

        if (!modal) {
            return;
        }


        const name =
            card.dataset.name ||
            "Unknown";


        const role =
            card.dataset.role ||
            "Faculty Member";


        const dept =
            card.dataset.dept ||
            "Department";


        /* Update name */

        if (modalName) {

            modalName.textContent =
                name;

        }


        /* Update role */

        if (modalRole) {

            modalRole.textContent =
                role;

        }


        /* Update department */

        if (modalDept) {

            modalDept.textContent =
                dept;

        }


        /* =================================================
           GET CARD IMAGE
        ================================================== */

        const cardImage =
            card.querySelector(
                ".person-photo img, .faculty-photo img"
            );


        if (
            cardImage &&
            modalPhoto
        ) {

            modalPhoto.src =
                cardImage.src;

            modalPhoto.alt =
                cardImage.alt ||
                name;

        }


        /* =================================================
           GET DEPARTMENT THEME
        ================================================== */

        let theme =
            card.dataset.theme ||
            "admin";


        theme =
            theme
                .toLowerCase()
                .trim();


        const allowedThemes = [
            "admin",
            "president",
            "coag",
            "coed",
            "cici",
            "com"
        ];


        if (
            !allowedThemes.includes(theme)
        ) {

            theme = "admin";

        }


        /*
         * CSS reads this attribute:
         *
         * data-theme="admin"
         * data-theme="coag"
         * data-theme="coed"
         * data-theme="cici"
         * data-theme="com"
         */

        modal.dataset.theme =
            theme;


        /* Remember selected card */

        window.lastSelectedCard =
            card;


        /* Open modal */

        modal.classList.add(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        /* Stop page scrolling */

        body.style.overflow =
            "hidden";


        /* Focus close button */

        const closeButton =
            modal.querySelector(
                ".close-btn"
            );


        if (closeButton) {

            setTimeout(() => {

                closeButton.focus();

            }, 100);

        }

    }


    /* =====================================================
       CLICK OUTSIDE MODAL
    ====================================================== */

    if (modal) {

        modal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === modal
                ) {

                    closeModal();

                }

            }
        );

    }


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains(
                    "active"
                )
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       BACK TO TOP
    ====================================================== */

    const backToTopButton =
        document.getElementById(
            "backToTop"
        );


    if (backToTopButton) {

        backToTopButton.addEventListener(
            "click",
            backToTop
        );

    }


    /* =====================================================
       INITIAL MODAL STATE
    ====================================================== */

    if (modal) {

        modal.classList.remove(
            "active"
        );

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        modal.removeAttribute(
            "data-theme"
        );

    }

});


/* =========================================================
   CLOSE PROFILE MODAL
========================================================= */

function closeModal() {

    const modal =
        document.getElementById(
            "profileModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "active"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    modal.removeAttribute(
        "data-theme"
    );


    /* Restore page scrolling */

    document.body.style.overflow =
        "";


    /* Return focus */

    if (
        window.lastSelectedCard &&
        document.body.contains(
            window.lastSelectedCard
        )
    ) {

        window.lastSelectedCard.focus();

    }

}


/* =========================================================
   CICI FACULTY TOGGLE
========================================================= */

function toggleFaculty() {

    const facultyGrid =
        document.getElementById(
            "itFaculty"
        );


    const button =
        document.querySelector(
            ".toggle-faculty-btn"
        );


    if (
        !facultyGrid ||
        !button
    ) {

        return;

    }


    const expanded =
        facultyGrid.classList.toggle(
            "expanded"
        );


    button.setAttribute(
        "aria-expanded",
        expanded
            ? "true"
            : "false"
    );


    /* =====================================================
       EXPANDED
    ====================================================== */

    if (expanded) {

        button.innerHTML =
            `
            <span>
                <i class="fa-solid fa-chevron-up"></i>
                Hide CICI IT Faculty
            </span>
            `;


        button.classList.add(
            "faculty-open"
        );

    }


    /* =====================================================
       COLLAPSED
    ====================================================== */

    else {

        button.innerHTML =
            `
            <span>
                <i class="fa-solid fa-users"></i>
                CICI IT Faculty
            </span>

            <strong>
                (8)
            </strong>
            `;


        button.classList.remove(
            "faculty-open"
        );

    }

}


/* =========================================================
   BACK TO TOP
========================================================= */

function backToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   PROFILE ICON ANIMATION
   Facebook / Email
========================================================= */

function profileIconAnimation(button) {

    if (!button) {
        return;
    }


    button.classList.remove(
        "icon-clicked"
    );


    /*
     * Force animation restart.
     */

    void button.offsetWidth;


    button.classList.add(
        "icon-clicked"
    );


    setTimeout(() => {

        button.classList.remove(
            "icon-clicked"
        );

    }, 450);

}


/* =========================================================
   SEND MESSAGE ANIMATION
   No navigation / no action
========================================================= */

function profileMessageAnimation(button) {

    if (!button) {
        return;
    }


    button.classList.remove(
        "message-clicked"
    );


    /*
     * Force animation restart.
     */

    void button.offsetWidth;


    button.classList.add(
        "message-clicked"
    );


    setTimeout(() => {

        button.classList.remove(
            "message-clicked"
        );

    }, 500);

}


/* =========================================================
   SOCIAL PLACEHOLDER
========================================================= */

function socialPlaceholder(
    event,
    element
) {

    if (!element) {
        return;
    }


    const href =
        element.getAttribute(
            "href"
        );


    /*
     * Prevent empty / # links.
     */

    if (
        !href ||
        href === "#" ||
        href.trim() === ""
    ) {

        if (event) {
            event.preventDefault();
        }

    }


    element.classList.remove(
        "social-clicked"
    );


    void element.offsetWidth;


    element.classList.add(
        "social-clicked"
    );


    setTimeout(() => {

        element.classList.remove(
            "social-clicked"
        );

    }, 450);

}


/* =========================================================
   PAGE RESTORE / BFCACHE SAFETY
========================================================= */

window.addEventListener(
    "pageshow",
    () => {

        const modal =
            document.getElementById(
                "profileModal"
            );


        if (modal) {

            modal.classList.remove(
                "active"
            );

            modal.setAttribute(
                "aria-hidden",
                "true"
            );

            modal.removeAttribute(
                "data-theme"
            );

        }


        document.body.style.overflow =
            "";

    }
);