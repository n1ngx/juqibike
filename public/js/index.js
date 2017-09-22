"use strict";
require(['js/config'], function () {
    require([
        'common',
        'util/banner1',
        'util/banner2',
        'jquery'
    ], cb);
    function cb() {
        $('.tab-panel a').attr('href', 'details.html');
        $(window).on('scroll', function (e) {
            var scrollTop = $(e.target).scrollTop();
            loadImg(scrollTop);
        });
        loadImg(500);
        function loadImg(scrollTop) {
            // log($('.banner1 a img'))
            var imgs = $('img.lazy-load');
            imgs.each(function (i, el) {
                if ($(el).offset().top <= scrollTop + $(window).height()) {
                    setTimeout(function () {
                        $(el).attr('src', $(el).attr('data-src')).removeAttr('data-src').removeClass('lazy-load');
                    }, 500);
                }
            });
        }
        //---
    }
});
//# sourceMappingURL=index.js.map