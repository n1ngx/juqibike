"use strict";
require(['js/config'], function () {
    require(['jquery', 'Rx'], function () {
        // banner1 
        (function () {
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
        })();
        (function () {
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
        })();
        (function () {
            // 取得所有的tab元素
            var tabs = $('.tab');
            // 对每一个tab做处理
            tabs.each(function (tabIndex, tabEl) {
                // 取得链接和内容
                var navs = $(tabEl).find('.tab-nav').find('li a'), panels = $(tabEl).find('.tab-content').find('.tab-panel');
                // 显示第一个
                show(0);
                // 对每个链接绑定事件
                navs.each(function (navIndex, navEl) {
                    $(navEl).on('click', function () {
                        show(navIndex);
                    });
                });
                // 显示第i个的函数
                function show(i) {
                    navs.each(function (i, el) {
                        $(el).removeClass('active');
                    });
                    $(navs[i]).addClass('active');
                    panels.each(function (panelIndex, panelEl) {
                        $(panelEl).fadeOut(200);
                    });
                    $(panels[i]).fadeIn(200);
                }
            });
        })();
    });
});
//# sourceMappingURL=index.js.map