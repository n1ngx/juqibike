"use strict";
define(['jquery'], function () {
    function ats(arr, cb) {
        return arr.map(cb).join('').trim();
    }
    $.ajax({
        url: root + 'banner?type=2',
        async: false,
        success: function (res) {
            init(res);
        }
    });
    function init(res) {
        var str = '';
        for (var i_1 = 0; i_1 < res.length; ++i_1) {
            str += '<li class="list-item">';
            for (var j = 0; j < 3; ++j) {
                var o = res.shift();
                str += "<a href=\"" + o.link + "\"><img class=\"lazy-load\" data-src=\"" + o.img + "\" alt=\"\"></a>";
            }
            str += '</li>';
        }
        if (res.length) {
            str += '<li class="list-item">';
            var o = void 0;
            while (o = res.shift()) {
                str += "<a href=\"" + o.link + "\"><img class=\"lazy-load\" data-src=\"" + o.img + "\" alt=\"\"></a>";
            }
            str += '</li>';
        }
        log(str);
        var banner2 = $('.banner2');
        banner2.find('.list').html(str);
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
    }
});
