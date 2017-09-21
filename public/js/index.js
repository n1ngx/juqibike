"use strict";
require(['js/config'], function () {
    require([
        'common',
        'util/banner1',
        'util/banner2',
    ]);
    require(['jquery'], function () {
        $(window).on('scroll', function (e) {
            var scrollTop = $(e.target).scrollTop();
            loadImg(scrollTop);
        });
        loadImg(0);
        function loadImg(scrollTop) {
            var imgs = $('img.lazy-load');
            imgs.each(function (i, el) {
                if ($(el).offset().top - $(window).height() < scrollTop) {
                    setTimeout(function () {
                        $(el).attr('src', $(el).attr('data-src')).removeAttr('data-src').removeClass('lazy-load');
                    }, 500);
                }
            });
        }
    });
});
//# sourceMappingURL=index.js.map