"use strict";
require.config({
    baseUrl: '/public/js',
    paths: {
        jquery: 'jquery-1.12.4.min',
        Rx: 'Rx.min'
    }
});
require(['jquery', 'Rx'], function ($, Rx) {
    console.log($, Rx);
    Rx;
});
//# sourceMappingURL=index.js.map