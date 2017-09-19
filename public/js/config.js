"use strict";
try {
    require.config({
        baseUrl: '/public/js',
        paths: {
            jquery: 'jquery-1.12.4.min',
            Rx: 'Rx.min'
        }
    });
}
catch (e) {
}
var log = function () {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    console.log.apply(console, rest);
};
//# sourceMappingURL=config.js.map