"use strict";
require.config({
    baseUrl: '/public/js',
    paths: {
        jquery: 'jquery-1.12.4.min',
        Rx: 'Rx.min'
    }
});
var log = function () {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    console.log.apply(console, rest);
};
log('hello');
//# sourceMappingURL=config.js.map