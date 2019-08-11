"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var object_1 = require("../utils/object");
function FontAwesome(_a) {
    var icon = _a.icon, additionalClass = _a.additionalClass;
    var faIconString = "fa-" + icon;
    var faClass = object_1.makeClasses('fa', faIconString, additionalClass);
    return react_1.default.createElement("i", { className: faClass, "aria-hidden": "true" });
}
exports.default = FontAwesome;
//# sourceMappingURL=FontAwesome.js.map