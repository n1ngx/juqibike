"use strict";
var data = ['lll', 'aaa', 'bbb'];
var s = "\n  <ul>\n    " + data.map(function (v) { return "<li>" + v + "</li>"; }).join('') + "\n  </ul>\n";
console.log(s);
//# sourceMappingURL=tempCodeRunnerFile.js.map