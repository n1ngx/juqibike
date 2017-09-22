"use strict";
define(['jquery', 'Rx'], function ($, Rx) {
    var e = $('.detail .detail-box .left .pic');
    var small = e.find('.small'), big = e.find('.big'), bigImg = e.find('.big-img'), smallImg = e.find('.small-img'), box = e.find('.box');
    var ob = Rx.Observable;
    var move = ob.fromEvent(small, 'mousemove');
    var enter = ob.fromEvent(small, 'mouseenter');
    var leave = ob.fromEvent(small, 'mouseleave');
    enter.do(function () {
        box.show();
        big.show();
    }).subscribe();
    leave.do(function () {
        box.hide();
        big.hide();
    }).subscribe();
    var validValue = function (v, min, max) { return Math.max(min, Math.min(v, max)); };
    move
        .do(function (e) {
        // log(e.offsetX, e.offsetY)
    })
        .map(function (e) { return ({
        x: e.clientX,
        y: e.clientY
    }); })
        .do(function () {
        var bX = box.position().left / (smallImg.width() - box.width()), bY = box.position().top / (smallImg.height() - box.height()), w = bigImg.width() - big.width(), h = bigImg.height() - big.height();
        bigImg.css('left', -bX * w);
        bigImg.css('top', -bY * h);
    })
        .subscribe(function (p) {
        box.css('cursor', 'pointer');
        var boxW = box.width(), boxH = box.height(), smallW = small.width(), smallH = small.height(), offsetY = small.offset().top - $(window).scrollTop(), x = validValue(p.x - boxW / 2 - small.offset().left, 0, smallW - boxW), y = validValue(p.y - boxH / 2 - offsetY, 0, smallH - boxH);
        box.css('left', x);
        box.css('top', y);
    });
});
