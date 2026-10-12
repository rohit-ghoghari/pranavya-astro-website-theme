export function initBookingSuccessPopup() {
    const popup = document.querySelector<HTMLElement>("#booking-success-popup");
    const popupClose = popup?.querySelector<HTMLButtonElement>(".popup-close");

    const closePopup = () => {
        if (!popup) return;
        popup.classList.add("hidden");
        popup.classList.remove("flex");
        document.body.classList.remove("overflow-hidden");
    };

    popupClose?.addEventListener("click", closePopup);

    popup?.addEventListener("click", (event) => {
        if (event.target === popup) closePopup();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && popup && !popup.classList.contains("hidden")) {
            closePopup();
        }
    });
}
