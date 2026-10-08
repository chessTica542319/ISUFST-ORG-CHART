document.addEventListener("DOMContentLoaded", () => {

    const gallery = document.getElementById("activityGallery");
    const closeButton = document.getElementById("galleryClose");
    const mainImage = document.getElementById("galleryMainImage");
    const thumbnails = document.getElementById("galleryThumbnails");
    const previousButton = document.getElementById("galleryPrev");
    const nextButton = document.getElementById("galleryNext");
    const counter = document.getElementById("galleryCounter");
    const galleryTitle = gallery?.querySelector(".gallery-header h2");
    const galleryLabel = gallery?.querySelector(".gallery-header span");

    if (
        !gallery ||
        !closeButton ||
        !mainImage ||
        !thumbnails ||
        !previousButton ||
        !nextButton
    ) {
        return;
    }


    /* =====================================================
       ACTIVITY GALLERIES
    ====================================================== */

    const galleries = {

        itquaint: {
            title: "ITQuaint 2026",
            label: "CICI · ACTIVITY 01",

            images: [
                "activities/ITQuaint.jpg",
                "activities/ITQ1.jpg",
                "activities/ITQ2.jpg",
                "activities/ITQ3.jpg",
                "activities/ITQ4.jpg",
                "activities/ITQ5.jpg",
                "activities/ITQ6.jpg"
            ]
        },


        colorsUnity: {
            title: "Colors of Unity 2026",
            label: "CICI · ACTIVITY 02",

            images: [
                "activities/colors-of-unity/UnityColors.jpg",
                "activities/colors-of-unity/UNC1.jpg",
                "activities/colors-of-unity/UNC2.jpg",
                "activities/colors-of-unity/UNC3.jpg",
                "activities/colors-of-unity/UNC4.jpg",
                "activities/colors-of-unity/UNC5.jpg",
                "activities/colors-of-unity/UNC6.jpg",
                "activities/colors-of-unity/UNC7.jpg",
                "activities/colors-of-unity/UNC8.jpg",
                "activities/colors-of-unity/UNC9.jpg",
                "activities/colors-of-unity/UNC10.jpg",
                "activities/colors-of-unity/UNC11.jpg"
            ]
        }

    };


    let currentGallery = null;
    let currentIndex = 0;


    /* =====================================================
       SHOW IMAGE
    ====================================================== */

    function showImage(index) {

        if (!currentGallery) {
            return;
        }

        const images = currentGallery.images;

        currentIndex =
            (index + images.length) % images.length;

        mainImage.src = images[currentIndex];

        mainImage.alt =
            `${currentGallery.title} photo ${currentIndex + 1}`;

        counter.textContent =
            `${currentIndex + 1} / ${images.length}`;

        const thumbnailButtons =
            thumbnails.querySelectorAll(".gallery-thumbnail");

        thumbnailButtons.forEach((button, buttonIndex) => {

            button.classList.toggle(
                "active",
                buttonIndex === currentIndex
            );

        });

    }


    /* =====================================================
       CREATE THUMBNAILS
    ====================================================== */

    function createThumbnails() {

        thumbnails.innerHTML = "";

        currentGallery.images.forEach((image, index) => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "gallery-thumbnail";

            button.setAttribute(
                "aria-label",
                `View photo ${index + 1}`
            );


            const thumbnail =
                document.createElement("img");

            thumbnail.src = image;

            thumbnail.alt =
                `${currentGallery.title} photo ${index + 1}`;


            button.appendChild(thumbnail);


            button.addEventListener("click", (event) => {

                event.stopPropagation();

                showImage(index);

            });


            thumbnails.appendChild(button);

        });

    }


    /* =====================================================
       OPEN GALLERY
    ====================================================== */

    function openGallery(galleryData) {

        currentGallery = galleryData;

        currentIndex = 0;

        galleryTitle.textContent =
            galleryData.title;

        galleryLabel.textContent =
            galleryData.label;

        createThumbnails();

        showImage(0);

        gallery.classList.add("active");

        gallery.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    }


    /* =====================================================
       CLOSE GALLERY
    ====================================================== */

    function closeGallery() {

        gallery.classList.remove("active");

        gallery.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

        currentGallery = null;

    }


    /* =====================================================
       ACTIVITY 01
    ====================================================== */

    const itquaintActivity =
        document.getElementById("itquaintActivity");

    if (itquaintActivity) {

        itquaintActivity.addEventListener(
            "click",
            (event) => {

                if (event.target.closest("a, button")) {
                    return;
                }

                openGallery(galleries.itquaint);

            }
        );


        itquaintActivity.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openGallery(galleries.itquaint);

                }

            }
        );

    }


    /* =====================================================
       ACTIVITY 02
    ====================================================== */

    const colorsUnityActivity =
        document.getElementById("colorsUnityActivity");

    if (colorsUnityActivity) {

        colorsUnityActivity.addEventListener(
            "click",
            (event) => {

                if (event.target.closest("a, button")) {
                    return;
                }

                openGallery(galleries.colorsUnity);

            }
        );


        colorsUnityActivity.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openGallery(galleries.colorsUnity);

                }

            }
        );

    }


    /* =====================================================
       GALLERY CONTROLS
    ====================================================== */

    closeButton.addEventListener(
        "click",
        closeGallery
    );


    previousButton.addEventListener(
        "click",
        () => {

            if (currentGallery) {
                showImage(currentIndex - 1);
            }

        }
    );


    nextButton.addEventListener(
        "click",
        () => {

            if (currentGallery) {
                showImage(currentIndex + 1);
            }

        }
    );


    /* Click dark background */

    gallery.addEventListener(
        "click",
        (event) => {

            if (event.target === gallery) {
                closeGallery();
            }

        }
    );


    /* =====================================================
       KEYBOARD
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (!gallery.classList.contains("active")) {
                return;
            }


            if (event.key === "Escape") {

                closeGallery();

                return;

            }


            if (event.key === "ArrowLeft") {

                showImage(currentIndex - 1);

            }


            if (event.key === "ArrowRight") {

                showImage(currentIndex + 1);

            }

        }
    );

});
