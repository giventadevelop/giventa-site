/**
 * Re-initializes Globex jQuery plugins after Next.js hydrates the DOM.
 * script.js runs before React paints header/carousels, so menu and sliders stay empty.
 */
(function (window) {
  'use strict';

  function getJQuery() {
    return window.jQuery;
  }

  function initNavigation($) {
    if (!$('.mobile-menu').length || !$('.main-header .nav-outer .main-menu .navigation').length) {
      return;
    }

    if (window.__globexNavSynced) {
      return;
    }

    // Clone only the nav list — not the full .main-menu (React owns navbar/header markup).
    var $sourceNav = $('.main-header .nav-outer .main-menu .navigation').first();
    var menuHtml = $sourceNav.prop('outerHTML');
    if (!menuHtml || !menuHtml.trim()) {
      return;
    }

    window.__globexNavSynced = true;

    $('.mobile-menu .menu-box .menu-outer').empty().html(menuHtml);
    $('.sticky-header .main-menu').empty().html(menuHtml);

    $('.mobile-nav-toggler')
      .off('click.globexNext')
      .on('click.globexNext', function () {
        $('body').addClass('mobile-menu-visible');
      });

    $('.mobile-menu .menu-backdrop, .mobile-menu .close-btn')
      .off('click.globexNext')
      .on('click.globexNext', function () {
        $('body').removeClass('mobile-menu-visible');
      });

    $('.mobile-menu li.dropdown .dropdown-btn')
      .off('click.globexNext')
      .on('click.globexNext', function () {
        $(this).toggleClass('open');
        $(this).prev('ul').slideToggle(500);
      });
  }

  function syncNavigationFromDom($) {
    if (!$('.mobile-menu').length || !$('.main-header .nav-outer .main-menu .navigation').length) {
      return;
    }

    var $sourceNav = $('.main-header .nav-outer .main-menu .navigation').first();
    var menuHtml = $sourceNav.prop('outerHTML');
    if (!menuHtml || !menuHtml.trim()) {
      return;
    }

    $('.mobile-menu .menu-box .menu-outer').empty().html(menuHtml);
    $('.sticky-header .main-menu').empty().html(menuHtml);

    $('.mobile-menu li.dropdown .dropdown-btn')
      .off('click.globexNext')
      .on('click.globexNext', function () {
        $(this).toggleClass('open');
        $(this).prev('ul').slideToggle(500);
      });
  }

  window.__globexSyncNavigation = function () {
    var $ = getJQuery();
    if ($) {
      syncNavigationFromDom($);
    }
  };

  function initOwl($, selector, options) {
    var $el = $(selector);
    if (!$el.length || !$.fn.owlCarousel) {
      return;
    }
    $el.each(function () {
      var $carousel = $(this);
      if ($carousel.hasClass('owl-loaded')) {
        return;
      }
      $carousel.owlCarousel(options);
    });
  }

  function initHeroBackgrounds($) {
    $('.banner-section .slide[data-bg]').each(function () {
      var bg = $(this).attr('data-bg');
      if (!bg) {
        return;
      }
      $(this).css({
        'background-image': 'url(' + bg + ')',
        'background-size': 'cover',
        'background-position': 'center center',
        'background-repeat': 'no-repeat',
      });
    });
  }

  function initCarousels($) {
    initHeroBackgrounds($);
    initOwl($, '.main-slider-carousel', {
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      loop: true,
      margin: 0,
      nav: true,
      autoHeight: true,
      smartSpeed: 500,
      autoplay: 6000,
      navText: [
        '<span class="flaticon-back-1"></span>',
        '<span class="flaticon-arrow-pointing-to-right"></span>',
      ],
      responsive: { 0: { items: 1 }, 600: { items: 1 }, 800: { items: 1 }, 1024: { items: 1 }, 1200: { items: 1 } },
      onInitialized: function () {
        initHeroBackgrounds($);
      },
    });

    initOwl($, '.sponsors-carousel', {
      loop: true,
      margin: 0,
      nav: true,
      smartSpeed: 500,
      autoplay: 4000,
      navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
      responsive: {
        0: { items: 1 },
        480: { items: 2 },
        600: { items: 3 },
        800: { items: 4 },
        1024: { items: 5 },
      },
    });

    initOwl($, '.testimonial-carousel', {
      loop: true,
      margin: 0,
      nav: true,
      smartSpeed: 500,
      autoplay: 4000,
      navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
      responsive: {
        0: { items: 1 },
        480: { items: 1 },
        600: { items: 1 },
        800: { items: 2 },
        1024: { items: 2 },
      },
    });

    initOwl($, '.single-item-carousel', {
      loop: true,
      margin: 0,
      nav: true,
      smartSpeed: 500,
      autoplay: 4000,
      navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
      responsive: {
        0: { items: 1 },
        480: { items: 1 },
        600: { items: 1 },
        800: { items: 1 },
        1024: { items: 1 },
      },
    });
  }

  function initSearch($) {
    $('.search-box-outer')
      .off('click.globexNext')
      .on('click.globexNext', function () {
        $('body').addClass('search-active');
      });

    $('.search-popup .close-search')
      .off('click.globexNext')
      .on('click.globexNext', function () {
        $('body').removeClass('search-active');
      });
  }

  function initSidebar($) {
    $('.navSidebar-button')
      .off('click.globexNext')
      .on('click.globexNext', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.info-group').addClass('isActive');
      });

    $('.info-group .close-side-widget, .info-group .xs-overlay')
      .off('click.globexNext')
      .on('click.globexNext', function (e) {
        e.preventDefault();
        $('.info-group').removeClass('isActive');
      });

    $('.xs-sidebar-widget')
      .off('click.globexNext')
      .on('click.globexNext', function (e) {
        e.stopPropagation();
      });
  }

  function initGlobexAfterHydration() {
    var $ = getJQuery();
    if (!$) {
      return false;
    }

    initNavigation($);
    initSearch($);
    initSidebar($);
    initCarousels($);

    if ($.fn.appear) {
      $('.progress-line').each(function () {
        var el = $(this);
        if (el.data('globex-appear-init')) {
          return;
        }
        el.data('globex-appear-init', true);
        el.appear(
          function () {
            var percent = el.data('width');
            el.css('width', percent + '%');
          },
          { accY: 0 }
        );
      });
    }

    if (typeof window.WOW === 'function' && $('.wow').length) {
      if (!window.__globexWowInit) {
        window.__globexWowInit = new window.WOW({
          boxClass: 'wow',
          animateClass: 'animated',
          offset: 0,
          mobile: true,
          live: true,
        });
        window.__globexWowInit.init();
      }
    }

    return true;
  }

  function waitAndInit(attempt) {
    if (initGlobexAfterHydration()) {
      return;
    }
    if (attempt >= 50) {
      return;
    }
    window.setTimeout(function () {
      waitAndInit(attempt + 1);
    }, 100);
  }

  if (document.readyState === 'complete') {
    waitAndInit(0);
  } else {
    window.addEventListener('load', function () {
      waitAndInit(0);
    });
  }
})(window);
