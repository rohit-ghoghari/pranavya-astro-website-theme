import Swiper from "swiper";
import "swiper/css";

export const initTestimonials = () => {
    const sliders = document.querySelectorAll<HTMLElement>(
        ".home-4_reviews .home-4_testimonial",
    );

    sliders.forEach((slider) => {
        if (slider.dataset.initialized === "true") return;
        slider.dataset.initialized = "true";

        const parent = slider.closest<HTMLElement>(".home-4_reviews");
        if (!parent) return;

        const prevButtons = parent.querySelectorAll<HTMLButtonElement>(".testimonial-prev");
        const nextButtons = parent.querySelectorAll<HTMLButtonElement>(".testimonial-next");

        const swiper = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 20,

            breakpoints: {
                0: { slidesPerView: 1, spaceBetween: 16 },
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 1, spaceBetween: 20 },
                1024: { slidesPerView: 1, spaceBetween: 30 },
                1280: { slidesPerView: 1, spaceBetween: 40 },
            },
        });

        const updateButtons = () => {
            prevButtons.forEach((btn) =>
                btn.classList.toggle("is-disabled", swiper.isBeginning),
            );
            nextButtons.forEach((btn) =>
                btn.classList.toggle("is-disabled", swiper.isEnd),
            );
        };

        prevButtons.forEach((btn) =>
            btn.addEventListener("click", () => swiper.slidePrev()),
        );
        nextButtons.forEach((btn) =>
            btn.addEventListener("click", () => swiper.slideNext()),
        );

        swiper.on("slideChange", updateButtons);
        swiper.on("breakpoint", updateButtons);
        swiper.on("resize", updateButtons);
        updateButtons();
    });
};

initTestimonials();
document.addEventListener("astro:page-load", initTestimonials);
