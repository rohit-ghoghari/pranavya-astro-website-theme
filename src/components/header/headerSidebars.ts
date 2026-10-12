declare const jQuery: any;

export function initHeaderSidebars(
    applyScrolledState: () => void,
    showOverlay: () => void,
    hideOverlay: () => void
) {
    if (typeof jQuery === "undefined") return;

    function fixInnerTextWhite() {
        jQuery("#mainmenu .mega-panel .text-white").removeClass("text-white");
        jQuery(".site-search__suggestions-block .text-white").removeClass("text-white");
    }

    // ── Cart & Wishlist sidebars ──────────────────────────────
    jQuery("#openWishlist").off("click").on("click", function () {
        jQuery("#wishlistSidebar")
            .removeClass("translate-x-full shadow-none")
            .addClass("shadow-[-20px_0px_14px_0_#00000069]");
        jQuery("body").addClass("overflow-hidden");
        showOverlay();
        applyScrolledState();
    });

    jQuery("#openWishlistMobile").off("click").on("click", function () {
        jQuery("#wishlistSidebar")
            .removeClass("translate-x-full shadow-none")
            .addClass("shadow-[-20px_0px_14px_0_#00000069]");
        jQuery("body").addClass("overflow-hidden");
        showOverlay();
        applyScrolledState();
    });

    jQuery("#closeWishlist").off("click").on("click", function () {
        jQuery("#wishlistSidebar")
            .addClass("translate-x-full shadow-none")
            .removeClass("shadow-[-20px_0px_14px_0_#00000069]");
        jQuery("body").removeClass("overflow-hidden");
        const megaOpen = jQuery(".mega-panel:visible").length > 0;
        const sidebarOpen = jQuery("#mainmenu").hasClass("active");
        const searchOpen = jQuery("#nav-site-search").hasClass("open");
        const cartOpen = !jQuery("#cartSidebar").hasClass("translate-x-full");
        if (!megaOpen && !sidebarOpen && !searchOpen && !cartOpen) hideOverlay();
        applyScrolledState();
    });

    jQuery("#openCart").off("click").on("click", function () {
        jQuery("#cartSidebar")
            .removeClass("translate-x-full shadow-none")
            .addClass("shadow-[-20px_0px_14px_0_#00000069]");
        jQuery("body").addClass("overflow-hidden");
        showOverlay();
        applyScrolledState();
    });

    jQuery("#closeCart").off("click").on("click", function () {
        jQuery("#cartSidebar")
            .addClass("translate-x-full shadow-none")
            .removeClass("shadow-[-20px_0px_14px_0_#00000069]");
        jQuery("body").removeClass("overflow-hidden");
        const megaOpen = jQuery(".mega-panel:visible").length > 0;
        const sidebarOpen = jQuery("#mainmenu").hasClass("active");
        const searchOpen = jQuery("#nav-site-search").hasClass("open");
        const wishlistOpen = !jQuery("#wishlistSidebar").hasClass("translate-x-full");
        if (!megaOpen && !sidebarOpen && !searchOpen && !wishlistOpen) hideOverlay();
        applyScrolledState();
    });

    // ── Search ────────────────────────────────────────────────
    jQuery(".site-search__open").off("click").on("click", function () {
        showOverlay();
        jQuery("#nav-site-search").addClass("open");
        setTimeout(function () {
            jQuery("#nav-site-search").addClass("search_bar");
            fixInnerTextWhite();
        }, 300);
    });

    jQuery(".site-search__close").off("click").on("click", function () {
        jQuery("#nav-site-search").removeClass("search_bar");
        const megaOpen = jQuery(".mega-panel:visible").length > 0;
        const sidebarOpen = jQuery("#mainmenu").hasClass("active");
        const wishlistOpen = !jQuery("#wishlistSidebar").hasClass("translate-x-full");
        const cartOpen = !jQuery("#cartSidebar").hasClass("translate-x-full");
        if (!megaOpen && !sidebarOpen && !wishlistOpen && !cartOpen) hideOverlay();
        setTimeout(function () {
            jQuery("#nav-site-search").removeClass("open");
            applyScrolledState();
        }, 300);
    });

    jQuery(document).off("click.headerSearchOutside").on("click.headerSearchOutside", function (event: any) {
        const searchIsOpen = jQuery("#nav-site-search").hasClass("open");
        if (!searchIsOpen) return;
        if (!jQuery(event.target).closest("#nav-site-search, .site-search__open").length) {
            jQuery("#nav-site-search").removeClass("search_bar");
            const megaOpen = jQuery(".mega-panel:visible").length > 0;
            const sidebarOpen = jQuery("#mainmenu").hasClass("active");
            const wishlistOpen = !jQuery("#wishlistSidebar").hasClass("translate-x-full");
            const cartOpen = !jQuery("#cartSidebar").hasClass("translate-x-full");
            if (!megaOpen && !sidebarOpen && !wishlistOpen && !cartOpen) hideOverlay();
            setTimeout(function () {
                jQuery("#nav-site-search").removeClass("open");
                applyScrolledState();
            }, 300);
        }
    });
}
