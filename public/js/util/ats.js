"use strict";
define(function () {
    return function ats(arr, cb) {
        return arr.map(cb).join('').trim();
    };
});
//# sourceMappingURL=ats.js.map