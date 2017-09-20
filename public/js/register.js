"use strict";
require(['js/config'], function () {
    require(['jquery'], function () {
        var form = $(".register-form"), items = form.find('.form-item'), tips = form.find('.input-tip');
        var result = [];
        // 初始化验证是否通过数组
        var names = [
            '用户名', '密码', '确认密码', '邮箱'
        ];
        for (var i = 0; i < items.length; ++i) {
            result.push({
                name: names[i],
                isOK: false,
                msg: names[i] + "\u4E0D\u80FD\u4E3A\u7A7A\uFF01"
            });
        }
        var s = {
            'form-account': function (str) { return /^[a-zA-Z0-9_-]{4,20}$/.test(str); },
            'form-pwd': function (str) { return /^\w{6,20}$/.test(str); },
            'form-equalTopwd': function (str) { return str.length >= 6 && items.find('#form-pwd').val() === str; },
            'form-email': function (str) { return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(str); }
        };
        items.each(function (i, el) {
            var input = $($(el).children()[1]);
            function valide() {
                if (!input.val()) {
                    $(el).addClass('error');
                    result[i].isOK = false;
                    result[i].msg = result[i].name + "\u4E0D\u80FD\u4E3A\u7A7A\uFF01";
                    $(tips[i]).css('color', '#c00');
                }
                else if (s[input.attr('id')](input.val())) {
                    $(el)
                        .removeClass('inputting sucess error')
                        .addClass('sucess');
                    result[i].isOK = true;
                    result[i].msg = result[i].name + "\u9A8C\u8BC1\u901A\u8FC7\uFF01";
                    $(tips[i]).css('color', 'green');
                }
                else {
                    $(el)
                        .removeClass('inputting sucess error')
                        .addClass('error');
                    result[i].isOK = false;
                    result[i].msg = result[i].name + "\u9A8C\u8BC1\u5931\u8D25\uFF01";
                    $(tips[i]).css('color', '#c00');
                }
                // 更改信息
                $(tips[i]).text(result[i].msg);
            }
            input
                .on('focus', function () {
                $(el)
                    .removeClass('inputting sucess error')
                    .addClass('inputting');
            })
                .on('blur', function () {
                $(el).removeClass('inputting');
                // 验证
                valide();
            })
                .on('input', function () {
                valide();
            });
        });
        var subBtn = $('.btn-register');
        subBtn.click(function (e) {
            e.preventDefault();
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var x = result_1[_i];
                if (!x.isOK) {
                    alert(x.msg);
                    return;
                }
            }
            alert('注册成功');
        });
    });
});
//# sourceMappingURL=register.js.map