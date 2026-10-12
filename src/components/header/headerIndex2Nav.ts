declare const jQuery: any;
import { initHeaderSidebars } from './headerSidebars';
import { initHeaderShopSwiper } from './headerHelpers';
(function () {
    function headerIndex2Init() {
        if (typeof jQuery === 'undefined') {
            setTimeout(headerIndex2Init, 80);
            return;
        }
        // ── References ────────────────────────────────────────────
        var body    = jQuery('body');
        var sidebar = jQuery('#mainmenu');
        var overlay = jQuery('.bg_body_box');
        // ── Overlay helpers ───────────────────────────────────────
        function showOverlay() { overlay.removeClass('hidden').css('display', 'block'); }
        function hideOverlay() { overlay.addClass('hidden').css('display', 'none'); }
        // ── Logo paths ────────────────────────────────────────────
        var WHITE_LOGO = '/main-logo-white.svg';
        var BLACK_LOGO = '/main-logo-black.svg';
        // ── applyScrolledState ────────────────────────────────────
        // header-2 uses the same transparent→white-on-scroll logic as header-1.
        // No no-toggle-color class → logo and icons toggle normally.
        function applyScrolledState() {
            var scrolled     = jQuery(window).scrollTop() > 20;
            var megaOpen     = jQuery('.mega-panel:visible').length > 0;
            var sidebarOpen  = jQuery('#mainmenu').hasClass('active');
            var searchOpen   = jQuery('#nav-site-search').hasClass('open');
            var $wishlist    = jQuery('#wishlistSidebar');
            var $cart        = jQuery('#cartSidebar');
            var wishlistOpen = $wishlist.length > 0 && !$wishlist.hasClass('translate-x-full');
            var cartOpen     = $cart.length > 0 && !$cart.hasClass('translate-x-full');
            var hasHover     = jQuery('.all-header').hasClass('not_scrolled_hover');
            var header       = jQuery('.all-header').closest('header');
            var siteLogo     = jQuery('.all-header .site-logo img').first();
            var useBlack = scrolled || megaOpen || sidebarOpen || searchOpen || wishlistOpen || cartOpen || hasHover;
            if (useBlack) {
                siteLogo.attr('src', BLACK_LOGO);
                jQuery('.all-header').addClass('bg-white');
            } else {
                siteLogo.attr('src', WHITE_LOGO);
                if (!header.hasClass('bg-color')) jQuery('.all-header').removeClass('bg-white');
            }
            if (scrolled) {
                jQuery('.all-header').addClass('header-scrolled');
                jQuery('header').addClass('header-wrapper-scrolled');
                jQuery('header .container').addClass('header-container-scrolled');
            } else {
                jQuery('.all-header').removeClass('header-scrolled');
                jQuery('header').removeClass('header-wrapper-scrolled');
                jQuery('header .container').removeClass('header-container-scrolled');
            }
        }
        function fixInnerTextWhite() {
            jQuery('#mainmenu .mega-panel .text-white').removeClass('text-white');
            jQuery('.site-search__suggestions-block .text-white').removeClass('text-white');
        }
        // ── Force correct initial state ───────────────────────────
        jQuery('.all-header').removeClass('bg-white header-scrolled');
        jQuery('header').removeClass('header-wrapper-scrolled');
        jQuery('header .container').removeClass('header-container-scrolled');
        jQuery('.all-header .site-logo img').first().attr('src', WHITE_LOGO);
        setTimeout(applyScrolledState, 0);

        // ── Desktop mega menu ──────────────────────────────────────
        function initDesktopMenu() {
            if (jQuery(window).width() < 1220) return;

            jQuery('#mainmenu .has-mega').each(function (this: any) {
                var item = jQuery(this);
                item.off('mouseenter mouseleave');
                item.find('.mega-panel').off('mouseenter mouseleave');

                item.on('mouseenter', function () {
                    clearTimeout(item.data('closeTimer'));
                    item.addClass('mega-open');
                    item.find('.mega-panel').stop(true, true).fadeIn(160);
                    fixInnerTextWhite();
                    jQuery('.bg_body_box').removeClass('hidden').css('display', 'block');
                    var isScrolled = jQuery(window).scrollTop() > 0;
                    var searchOpen = jQuery('#nav-site-search').hasClass('open');
                    if (!isScrolled && !searchOpen) jQuery('.all-header').addClass('not_scrolled_hover');
                    applyScrolledState();
                });

                item.find('.mega-panel').on('mouseenter', function () {
                    clearTimeout(item.data('closeTimer'));
                    applyScrolledState();
                });

                item.find('.mega-panel').on('mouseleave', function () {
                    applyScrolledState();
                });

                item.on('mouseleave', function () {
                    item.removeClass('mega-open');
                    item.find('.mega-panel').stop(true, true).fadeOut(150, function () {
                        setTimeout(function () {
                            var stillOnMenu   = jQuery('#mainmenu > ul > li:hover').length > 0;
                            var stillOnHeader = jQuery('.all-header:hover').length > 0;
                            var megaOpen2     = jQuery('.mega-panel:visible').length > 0;
                            var sidebarOpen2  = jQuery('#mainmenu').hasClass('active');
                            var searchOpen2   = jQuery('#nav-site-search').hasClass('open');
                            if (!megaOpen2 && !sidebarOpen2 && !searchOpen2 && !stillOnMenu && !stillOnHeader) {
                                jQuery('.all-header').removeClass('not_scrolled_hover');
                            }
                            applyScrolledState();
                        }, 100);
                    });
                    jQuery('.bg_body_box').addClass('hidden').css('display', 'none');
                });
            });

            jQuery('#mainmenu > ul > li').on('mouseenter', function (this: any) {
                var item = jQuery(this);
                if (!item.hasClass('has-mega')) {
                    var isScrolled = jQuery(window).scrollTop() > 0;
                    var searchOpen = jQuery('#nav-site-search').hasClass('open');
                    if (!isScrolled && !searchOpen) jQuery('.all-header').addClass('not_scrolled_hover');
                    jQuery('#mainmenu .has-mega').removeClass('mega-open');
                    jQuery('#mainmenu .mega-panel').stop(true, true).fadeOut(150, function () { applyScrolledState(); });
                    jQuery('.bg_body_box').addClass('hidden').css('display', 'none');
                } else {
                    var isScrolled2 = jQuery(window).scrollTop() > 0;
                    var searchOpen2 = jQuery('#nav-site-search').hasClass('open');
                    if (!isScrolled2 && !searchOpen2) jQuery('.all-header').addClass('not_scrolled_hover');
                }
            });
        }

        initDesktopMenu();

        // ── Header mouseleave ─────────────────────────────────────
        jQuery('.all-header').on('mouseleave', function () {
            jQuery('#mainmenu .has-mega').removeClass('mega-open');
            jQuery('#mainmenu .mega-panel').stop(true, true).fadeOut(150);
            setTimeout(function () {
                var stillOnHeader = jQuery('.all-header:hover').length > 0;
                var stillOnMenu   = jQuery('#mainmenu > ul > li:hover').length > 0;
                var megaOpen      = jQuery('.mega-panel:visible').length > 0;
                var searchOpen    = jQuery('#nav-site-search').hasClass('open');
                var sidebarOpen   = jQuery('#mainmenu').hasClass('active');
                if (!megaOpen && !searchOpen && !sidebarOpen && !stillOnHeader && !stillOnMenu) {
                    jQuery('.all-header').removeClass('not_scrolled_hover');
                    applyScrolledState();
                }
            }, 100);
            if (jQuery('#wishlistSidebar').hasClass('translate-x-full') && jQuery('#cartSidebar').hasClass('translate-x-full')) {
                jQuery('.bg_body_box').addClass('hidden').css('display', 'none');
            }
        });

        // ── Overlay click ─────────────────────────────────────────
        overlay.on('click', function () {
            sidebar.removeClass('active in-submenu');
            body.removeClass('overflow-hidden');
            hideOverlay();
            jQuery('#mainmenu .has-mega').removeClass('mobile-open');
            jQuery('#mainmenu .mega-panel').slideUp(0);
            applyScrolledState();
        });

        // ── Mobile submenu ────────────────────────────────────────
        function initMobileMenu() {
            jQuery(document).off('click.mobileMenu click.mobileBackBtn');
            if (jQuery(window).width() >= 1220) return;

            jQuery(document).on('click.mobileMenu', '#mainmenu .has-mega > a', function (this: any, e: any) {
                e.preventDefault();
                var wrap  = jQuery(this).closest('.has-mega');
                var panel = wrap.find('.mega-panel').first();

                jQuery('#mainmenu .has-mega').not(wrap).removeClass('mobile-open').find('.mega-panel').removeClass('mobile-step in').hide();
                wrap.addClass('mobile-open');
                panel.removeClass('mobile-step in').hide();
                panel.css({ position: 'fixed', top: '4px', left: '0', width: '100%', height: '100vh', backgroundColor: '#fff', zIndex: '9999', transform: 'translateX(100%)', opacity: '0', visibility: 'hidden', display: 'block' });
                fixInnerTextWhite();

                requestAnimationFrame(function () {
                    panel.css({ visibility: 'visible', opacity: '1' });
                    requestAnimationFrame(function () {
                        panel.addClass('mobile-step');
                        requestAnimationFrame(function () {
                            if (panel[0] && panel[0].animate) {
                                var anim = panel[0].animate([{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }], { duration: 260, easing: 'ease', fill: 'forwards' });
                                anim.onfinish = function () { panel.addClass('in').css('transform', 'translateX(0)'); };
                            } else {
                                setTimeout(function () { panel.addClass('in'); }, 10);
                            }
                        });
                    });
                });

                jQuery('#mainmenu').addClass('in-submenu');

                if (!panel.find('.mobile-back-btn').length) {
                    var parentTitle = wrap.find('> a .menu_link_text, > a p, > a span').first().text().trim() || 'Back';
                    panel.prepend('<div class="px-4"><button class="mobile-back-btn w-full text-left py-3 border-b border-[#673E2C33] text-thunder-100"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none"><path d="M5.98377 11.2168L0.75 5.98302L5.98377 0.74925M1.47691 5.98302L12.0898 5.98302" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="uppercase sm:text-lg text-base">' + parentTitle + '</span></button></div>');
                }
            });

            jQuery(document).on('click.mobileBackBtn', '.mobile-back-btn', function (this: any) {
                var panel = jQuery(this).closest('.mega-panel');
                var wrap  = panel.closest('.has-mega');
                if (panel[0] && panel[0].animate) {
                    var anim = panel[0].animate([{ transform: 'translateX(0)' }, { transform: 'translateX(110%)' }], { duration: 220, easing: 'ease', fill: 'forwards' });
                    anim.onfinish = function () { panel.removeClass('mobile-step in').hide().css('transform', ''); };
                }
                wrap.removeClass('mobile-open');
                if (!jQuery('#mainmenu .has-mega.mobile-open').length) jQuery('#mainmenu').removeClass('in-submenu');
            });

            jQuery(document).on('click', '#mainmenu .mega-panel li.group > a', function (this: any, e: any) {
                e.preventDefault();
                e.stopPropagation();
                var $li = jQuery(this).closest('li.group');
                var submenu = $li.find('> div ul').first();
                if (!submenu.length) return;
                var title = jQuery(this).text().trim();
                var panelId = 'mobile-step3';
                var $panel = jQuery('#' + panelId);
                if (!$panel.length) {
                    $panel = jQuery('<div id="' + panelId + '" class="mobile-drawer"><div class="px-4 py-3 border-b border-[#673E2C33] flex items-center gap-3 sticky top-0 z-9999 bg-white"><button class="step3-back w-full flex items-center text-left gap-3 text-thunder-100"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none"><path d="M5.98377 11.2168L0.75 5.98302L5.98377 0.74925M1.47691 5.98302L12.0898 5.98302" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="uppercase sm:text-lg text-base">' + title + '</span></button></div><div><ul class="p-4 step3-content"></ul></div></div>');
                    jQuery('body').append($panel);
                }
                var content = $panel.find('.step3-content');
                content.empty();
                submenu.children('li').each(function (this: any) { content.append(jQuery(this).clone(true)); });
                requestAnimationFrame(function () { $panel.addClass('active'); });
            });

            jQuery(document).on('click', '.step3-back', function (this: any) {
                var panel = jQuery(this).closest('.mobile-drawer');
                panel.removeClass('active');
                setTimeout(function () { panel.remove(); }, 350);
            });
        }

        initMobileMenu();

        // ── Resize ────────────────────────────────────────────────
        jQuery(window).on('resize', function () {
            if (jQuery(window).width() >= 1220) {
                sidebar.removeClass('active in-submenu');
                jQuery('#mainmenu .mega-panel').removeAttr('style');
                jQuery('#mainmenu .has-mega').removeClass('mobile-open');
                hideOverlay();
                body.removeClass('overflow-hidden');
            }
            initDesktopMenu();
            initMobileMenu();
        });

        // ── Mobile hamburger ──────────────────────────────────────
        jQuery(document).on('click', "button[name='mobile-menu-view']", function () {
            jQuery('#mainmenu').addClass('active');
            jQuery('html,body').addClass('overflow-hidden');
        });

        jQuery(document).on('click', "button[name='close']", function () {
            jQuery('#mainmenu').removeClass('active');
            jQuery('html,body').removeClass('overflow-hidden');
            applyScrolledState();
            if (jQuery(window).scrollTop() === 0) {
                var megaOpen   = jQuery('.mega-panel:visible').length > 0;
                var searchOpen = jQuery('#nav-site-search').hasClass('open');
                if (!megaOpen && !searchOpen) jQuery('.all-header').removeClass('not_scrolled_hover');
            }
        });

        jQuery(document).on('keyup', function (e: any) {
            if (e.key === 'Escape') {
                jQuery('#mainmenu').removeClass('active');
                jQuery('html,body').removeClass('overflow-hidden');
            }
        });

                initHeaderSidebars(applyScrolledState, showOverlay, hideOverlay);

// ── Scroll / resize ───────────────────────────────────────
        jQuery(window).on('scroll.headerToggle resize.headerToggle', function () {
            applyScrolledState();
        });

        // ── Periodic hover cleanup ────────────────────────────────
        setInterval(function () {
            var megaOpen      = jQuery('.mega-panel:visible').length > 0;
            var sidebarOpen   = jQuery('#mainmenu').hasClass('active');
            var searchOpen    = jQuery('#nav-site-search').hasClass('open');
            var wishlistOpen  = !jQuery('#wishlistSidebar').hasClass('translate-x-full');
            var cartOpen      = !jQuery('#cartSidebar').hasClass('translate-x-full');
            var hasHover      = jQuery('.all-header').hasClass('not_scrolled_hover');
            var stillOnHeader = jQuery('.all-header:hover').length > 0;
            var stillOnMenu   = jQuery('#mainmenu > ul > li:hover').length > 0;
            var stillOnMega   = jQuery('.mega-panel:hover').length > 0;
            if (hasHover && !megaOpen && !sidebarOpen && !searchOpen && !wishlistOpen && !cartOpen && !stillOnHeader && !stillOnMenu && !stillOnMega) {
                jQuery('.all-header').removeClass('not_scrolled_hover');
                applyScrolledState();
            }
        }, 200);

        // ── Shop Swiper (nav mega menu) ───────────────────────────
        initHeaderShopSwiper();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', headerIndex2Init);
    } else {
        headerIndex2Init();
    }
})();