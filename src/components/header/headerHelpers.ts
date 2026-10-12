declare const jQuery: any;
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export function initHeaderMarquee() {
    if (typeof jQuery === "undefined") return;
    jQuery(".marquee-track").each(function (this: any) {
        const $track = jQuery(this);
        if ($track.children(".marquee").length === 1) {
            $track.append($track.find(".marquee").first().clone());
        }
    });
}

export function initHeaderShopSwiper() {
    const shopElements = document.querySelectorAll<HTMLElement>(".swiper.shop");
    if (!shopElements.length) return;

    shopElements.forEach((shopEl) => {
        if ((shopEl as any).swiper) {
            (shopEl as any).swiper.update();
            return;
        }

        const nextBtn = shopEl.querySelector<HTMLElement>(".swiper-button-next");
        const prevBtn = shopEl.querySelector<HTMLElement>(".swiper-button-prev");

        const swiper = new Swiper(shopEl, {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true,
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            watchSlidesProgress: true,
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
            },
            breakpoints: {
                640: { slidesPerView: 2, spaceBetween: 10 },
                768: { slidesPerView: 2.9, spaceBetween: 10 },
                769: { slidesPerView: 2.9, spaceBetween: 17 },
            },
        });

        const updateSwiper = () => {
            swiper.update();
        };

        const shopMegaMenu = shopEl.closest(".has-mega");
        if (shopMegaMenu) {
            shopMegaMenu.addEventListener("mouseenter", function () {
                updateSwiper();
                setTimeout(updateSwiper, 50);
                setTimeout(updateSwiper, 170);
                setTimeout(updateSwiper, 300);
            });
        }
    });
}
