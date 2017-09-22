"use strict";
define(['jquery'], function () {
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
            $(panels[i]).fadeIn(200);
            panels.each(function (panelIndex, panelEl) {
                if (panelIndex !== i) {
                    $(panelEl).hide();
                }
            });
        }
    });
});
