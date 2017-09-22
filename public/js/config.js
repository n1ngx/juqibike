"use strict";
try {
    require.config({
        baseUrl: '/public/js',
        paths: {
            jquery: 'jquery-1.12.4.min',
            Rx: 'Rx.min',
            'jquery-ui': 'jquery-ui.min'
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
var now = 'dev', root = '';
function switchEnv(e) {
    switch (e) {
        case 'dev': {
            root = 'http://localhost:5555/';
            break;
        }
        case 'prod': {
            root = '/';
            break;
        }
    }
}
switchEnv(now);
log(root);
var rootUrl = '/public/';
