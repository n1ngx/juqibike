"use strict";
define(['jquery'], function () {
    var banner2 = $('.banner2');
    var items = banner2.find('.list-item');
    var w = $(items[0]).parent().width();
    items.each(function (i, el) {
        $(el).css('left', i * w);
    });
    var i = 0, paused = false, startTime = 0, nowTime;
    var timer = setInterval(show, 3000);
    function show() {
        var next = (i + 1 + items.length) % items.length;
        $(items[next]).css('left', w).animate({ left: 0 }, 500);
        $(items[i]).animate({ left: -w }, 500);
        i = (++i + items.length) % items.length;
    }
    var prevBtn = banner2.find('.prev'), nextBtn = banner2.find('.next');
    prevBtn.click(function () {
        // 节流
        nowTime = new Date().getTime();
        var t = nowTime - startTime;
        startTime = nowTime;
        if (t < 500)
            return;
        // 显示
        var prev = (i - 1 + items.length) % items.length;
        $(items[prev]).css('left', -w).animate({ left: 0 }, 500);
        $(items[i]).animate({ left: w }, 500);
        i = (--i + items.length) % items.length;
        // 重启定时器
        clearInterval(timer);
        timer = setInterval(show, 3000);
    });
    nextBtn.click(function () {
        // 节流
        nowTime = new Date().getTime();
        var t = nowTime - startTime;
        startTime = nowTime;
        if (t < 500)
            return;
        // 显示
        show();
        // 重启定时器
        clearInterval(timer);
        timer = setInterval(show, 3000);
    });
});
//# sourceMappingURL=banner2.js.map