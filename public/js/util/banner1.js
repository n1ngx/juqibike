"use strict";
define(['jquery'], function () {
    var banner1 = $('.banner1').find('li');
    var btn = $('.banner1').find('.btn').children();
    var i = 0, paused = false;
    $(banner1[i]).fadeIn(500);
    $(btn[i]).css('background', '#f90');
    ++i;
    setInterval(show, 3000);
    function show() {
        if (paused)
            return;
        banner1.each(function (i, el) {
            $(el).fadeOut(500);
            $(btn[i]).css('background', '#666');
        });
        $(banner1[i]).fadeIn(500);
        $(btn[i]).css('background', '#f90');
        if (++i > banner1.length - 1) {
            i = 0;
        }
    }
    btn
        .on('mouseenter', function () {
        var num = parseInt(this.dataset.num);
        i = num;
        show();
        paused = true;
    })
        .on('mouseleave', function () {
        paused = false;
    });
});
//# sourceMappingURL=banner1.js.map