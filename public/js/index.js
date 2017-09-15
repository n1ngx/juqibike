"use strict";
require(['js/config'], function () {
    require(['jquery', 'Rx'], function () {
        // banner1 
        (function () {
            var banner1 = $('.banner1').find('li');
            var btn = $('.banner1').find('.btn').children();
            log(banner1);
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
                log('out');
                paused = false;
            });
        })();
        (function () {
            var banner2 = $('.banner2');
            var items = banner2.find('.list-item');
            var w = $(items[0]).parent().width();
            log(w);
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
            log(prevBtn, nextBtn);
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
        })();
    });
});
//# sourceMappingURL=index.js.map