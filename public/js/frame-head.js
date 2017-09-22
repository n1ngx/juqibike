"use strict";
require(['js/config'], function () {
    require(['jquery'], function () {
        function ats(arr, cb) {
            return arr.map(cb).join('').trim();
        }
        // 登录 退出
        var userName = localStorage.getItem('user');
        if (userName) {
            $('.login .no').hide();
            var logout = $('<a href="javascript:">退出</a>');
            $('.login .yes')
                .show()
                .html("\n          \u6B22\u8FCE\u60A8\uFF0C" + userName + "\uFF0C\n        ")
                .append(logout);
            logout.click(function () {
                localStorage.removeItem('user');
                $(window).attr('location', rootUrl);
            });
        }
        // 搜索
        $('#search-input').on('input', function (e) {
            var el = e.target, $sug = $('.s-suggestion');
            if (el.value) {
                $sug.show();
            }
            else {
                $sug.hide();
            }
            $.ajax({
                method: 'get',
                url: 'http://suggestion.baidu.com/su',
                dataType: 'jsonp',
                jsonp: 'cb',
                data: {
                    wd: el.value
                },
                success: function (res) {
                    var s = res.s;
                    s = s.map(function (x) { return "<li>" + x + "</li>"; });
                    $sug
                        .html('')
                        .append($('<ul>')
                        .append(s)
                        .click(function (e) {
                        if (e.target.tagName.toLowerCase() !== 'li') {
                            return;
                        }
                        $(el).val($(e.target).text());
                        $sug.html('');
                    }));
                }
            });
        });
        // 购物车
        var shopcar = $('.shop-car'), nothing = $('.nothing'), list = shopcar.find('.list');
        if (userName) {
            shopcar.find('.no-login').hide();
            shopcar.find('.yes-login').show();
        }
        nothing.hide();
        $.ajax({
            method: 'get',
            url: root + 'shopcar',
            data: {
                username: localStorage.getItem('user')
            },
            success: function (res) {
                if (res.length === 0) {
                    nothing.show();
                    list.hide();
                    shopcar.find('.pay').hide();
                }
                log(res);
                var str = ats(res, function (v) { return "\n          <li good-id=\"" + v.goodId + "\">\n            <div class=\"pic\">\n              <img src=\"" + v.img + "\" alt=\"\">\n            </div>\n            <div class=\"link\">\n              <a href=\"javascript:\">" + v.msg + "</a>\n            </div>\n            <div class=\"price\">\uFFE5<span>" + v.price + "</span>x<span>" + v.num + "</span></div>\n            <div class=\"del\">\n              <a href=\"javascript:\">\u5220\u9664</a>\n            </div>\n          </li>\n        "; });
                list
                    .html(str)
                    .find('a').click(function (e) {
                    var _this = this;
                    // 删除列表
                    var li = $(this).parent().parent();
                    log(li);
                    $.ajax({
                        type: 'delete',
                        url: root + 'shopcar',
                        data: {
                            username: localStorage.getItem('user'),
                            goodId: li.attr('good-id')
                        },
                        success: function (res) {
                            log(res);
                            $(_this).parent().parent().remove();
                            if (list.children().length === 0) {
                                nothing.show();
                                list.hide();
                                shopcar.find('.pay').hide();
                            }
                            count();
                        }
                    });
                });
                $('#shopcar .shop-count').text(res.length);
                function count() {
                    var o = {
                        total: 0,
                        num: 0
                    };
                    var l = list.find('.price');
                    l.each(function (i, v) {
                        var s = $(v).find('span'), s0 = $(s[0]), s1 = $(s[1]);
                        o.total += +s0.text() * +s1.text();
                        o.num += +s1.text();
                    });
                    var pay = shopcar.find('.pay .total span');
                    $(pay[0]).text(o.num);
                    $(pay[1]).text('￥' + o.total);
                    $('#shopcar .shop-count').text(o.num);
                }
                count();
                // let o = res.reduce((p: any, n: any) => ({
                //   total: p.total + n.price * n.num,
                //   num: p.num + n.num
                // }), {
                //   total: 0,
                //   num: 0
                // })
                // let pay = $('.shop-car .pay .total span')
                // $(pay[0]).text(o.num)
                // $(pay[1]).text('￥' + o.total)
            }
        });
        // 
    });
});
