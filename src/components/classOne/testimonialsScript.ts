import Swiper from "swiper";
import { Navigation, EffectFade, Controller } from "swiper/modules";

export function initTestimonials() {
    const sections = document.querySelectorAll<HTMLElement>("[data-testimonials]");

    sections.forEach((section) => {
        const imageElement = section.querySelector<HTMLElement>("[data-testimonials-images]");
        const contentElement = section.querySelector<HTMLElement>("[data-testimonials-content]");
        const prevButton = section.querySelector<HTMLElement>(".testimonials-prev");
        const nextButton = section.querySelector<HTMLElement>(".testimonials-next");

        if (!imageElement || !contentElement || !prevButton || !nextButton) {
            return;
        }

        const imageSwiper = new Swiper(imageElement, {
            modules: [Controller],
            slidesPerView: 1,
            spaceBetween: 0,
            allowTouchMove: true,
            watchSlidesProgress: true,
        });

        const contentSwiper = new Swiper(contentElement, {
            modules: [Navigation, EffectFade, Controller],
            slidesPerView: 1,
            effect: "fade",
            fadeEffect: {
                crossFade: true,
            },
            autoHeight: true,
            watchSlidesProgress: true,
            navigation: {
                prevEl: prevButton,
                nextEl: nextButton,
            },
            speed: 600,
            allowTouchMove: true,
        });

        imageSwiper.controller.control = contentSwiper;
        contentSwiper.controller.control = imageSwiper;

        imageSwiper.slideTo(contentSwiper.activeIndex, 0);

        imageSwiper.on("slideChange", () => {
            if (contentSwiper.activeIndex !== imageSwiper.activeIndex) {
                contentSwiper.slideTo(imageSwiper.activeIndex);
            }
        });

        contentSwiper.on("slideChange", () => {
            if (imageSwiper.activeIndex !== contentSwiper.activeIndex) {
                imageSwiper.slideTo(contentSwiper.activeIndex);
            }
        });
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTestimonials, { once: true });
} else {
    initTestimonials();
}
