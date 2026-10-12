export function initIndexTwoHero() {
    const heroSlider = document.getElementById("heroSlider");

    if (!heroSlider) return;

    if (heroSlider.dataset.initialized === "true") return;
    heroSlider.dataset.initialized = "true";

    const slides = Array.from(
        heroSlider.querySelectorAll<HTMLElement>(".hero-slide")
    );

    const prevButton = document.getElementById("prevSlide");
    const nextButton = document.getElementById("nextSlide");

    const slideTitle = document.getElementById("slideTitle");
    const slideDesc = document.getElementById("slideDesc");

    const currentIndex = document.getElementById("currentIndex");
    const totalIndex = document.getElementById("totalIndex");

    const progressFill = document.getElementById("progressFill");

    const thumbnails = Array.from(
        document.querySelectorAll<HTMLElement>("#thumbTrack .thumb")
    );

    const thumbViewport = document.getElementById("thumbViewport");

    if (!slides.length) return;

    let currentSlide = 0;
    let autoSlideTimer: number | undefined;

    const slideDuration = 5000;

    if (totalIndex) {
        totalIndex.textContent = String(slides.length).padStart(2, "0");
    }

    function scrollThumbIntoView(index: number) {
        if (!thumbViewport) return;
        const activeThumb = thumbnails[index];
        if (!activeThumb) return;

        const thumbLeft = activeThumb.offsetLeft;
        const thumbRight = thumbLeft + activeThumb.offsetWidth;
        const scrollLeft = thumbViewport.scrollLeft;
        const viewportWidth = thumbViewport.clientWidth;

        if (thumbLeft < scrollLeft) {
            thumbViewport.scrollTo({ left: thumbLeft, behavior: "smooth" });
        } else if (thumbRight > scrollLeft + viewportWidth) {
            thumbViewport.scrollTo({
                left: thumbRight - viewportWidth,
                behavior: "smooth",
            });
        }
    }

    function updateSlide(index: number) {
        currentSlide =
            (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle(
                "active",
                slideIndex === currentSlide
            );
        });

        thumbnails.forEach((thumbnail, thumbnailIndex) => {
            thumbnail.classList.toggle(
                "active",
                thumbnailIndex === currentSlide
            );
        });

        const activeSlide = slides[currentSlide];

        const title =
            activeSlide.getAttribute("data-title") || "";

        const description =
            activeSlide.getAttribute("data-desc") || "";

        if (slideTitle) {
            slideTitle.textContent = title;
        }

        if (slideDesc) {
            slideDesc.textContent = description;
        }

        if (currentIndex) {
            currentIndex.textContent = String(
                currentSlide + 1
            ).padStart(2, "0");
        }

        if (progressFill) {
            progressFill.style.width =
                `${((currentSlide + 1) / slides.length) * 100}%`;
        }

        scrollThumbIntoView(currentSlide);
        resetAutoSlide();
    }

    function nextSlide() {
        updateSlide(currentSlide + 1);
    }

    function previousSlide() {
        updateSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        autoSlideTimer = window.setInterval(() => {
            updateSlide(currentSlide + 1);
        }, slideDuration);
    }

    function resetAutoSlide() {
        window.clearInterval(autoSlideTimer);
        startAutoSlide();
    }

    if (nextButton) {
        nextButton.addEventListener("click", nextSlide);
    }

    if (prevButton) {
        prevButton.addEventListener("click", previousSlide);
    }

    let isDraggingThumb = false;
    if (thumbViewport) {
        let isDown = false;
        let startX = 0;
        let scrollStart = 0;

        thumbViewport.addEventListener("mousedown", (e) => {
            isDown = true;
            isDraggingThumb = false;
            thumbViewport.classList.add("dragging");
            startX = e.pageX - thumbViewport.offsetLeft;
            scrollStart = thumbViewport.scrollLeft;
        });

        window.addEventListener("mouseup", () => {
            if (isDown) {
                isDown = false;
                thumbViewport.classList.remove("dragging");
            }
        });

        thumbViewport.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            const x = e.pageX - thumbViewport.offsetLeft;
            const walk = x - startX;
            if (Math.abs(walk) > 5) {
                isDraggingThumb = true;
            }
            thumbViewport.scrollLeft = scrollStart - walk;
        });
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
            if (isDraggingThumb) return;
            updateSlide(index);
        });
    });

    let touchStartX = 0;
    heroSlider.addEventListener(
        "touchstart",
        (e) => {
            if (e.touches.length > 0) {
                touchStartX = e.touches[0].clientX;
            }
        },
        { passive: true }
    );

    heroSlider.addEventListener(
        "touchend",
        (e) => {
            if (e.changedTouches.length > 0) {
                const diff = touchStartX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        previousSlide();
                    }
                }
            }
        },
        { passive: true }
    );

    heroSlider.addEventListener("mouseenter", () => {
        window.clearInterval(autoSlideTimer);
    });

    heroSlider.addEventListener("mouseleave", () => {
        resetAutoSlide();
    });

    window.addEventListener("beforeunload", () => {
        window.clearInterval(autoSlideTimer);
    });

    document.addEventListener("astro:before-swap", () => {
        window.clearInterval(autoSlideTimer);
    });

    updateSlide(0);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initIndexTwoHero);
} else {
    initIndexTwoHero();
}

document.addEventListener("astro:page-load", initIndexTwoHero);
