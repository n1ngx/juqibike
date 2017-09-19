"use strict";
define(['jquery'], function () {
    log($('.back-to-top a'));
    $('.back-to-top a').click(function () {
        $('html').animate({
            scrollTop: 0
        }, 500);
    });
});
//# sourceMappingURL=back-to-top.js.map