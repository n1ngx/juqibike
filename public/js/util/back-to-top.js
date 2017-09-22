"use strict";
define(['jquery'], function () {
    $('.back-to-top a').click(function () {
        $('html').animate({
            scrollTop: 0
        }, 500);
    });
});
