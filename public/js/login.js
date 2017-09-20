"use strict";
require(['js/config'], function () {
    require(['util/tab']);
    require(['jquery'], function () {
        var userInput = $('#form-account'), pwdInput = $('#form-pwd');
        $('.btn-login').click(function (e) {
            e.preventDefault();
            if (!userInput.val()) {
                alert('用户名不能为空！');
                return;
            }
            if (!pwdInput.val()) {
                alert('密码不能为空！');
                return;
            }
            $.ajax({
                method: 'post',
                url: root + 'login',
                data: {
                    name: userInput.val(),
                    pwd: pwdInput.val()
                },
                success: function (res) {
                    alert(res.status);
                    if (res.status === '登录成功！') {
                        localStorage.setItem('user', res.name);
                        $(window).attr('location', 'index.html');
                    }
                }
            });
        });
    });
});
//# sourceMappingURL=login.js.map