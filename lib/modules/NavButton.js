"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Button_1 = require("react-bootstrap/Button");
function NavButton(_a) {
    var pageNumber = _a.pageNumber, disabled = _a.disabled, onPageNavigate = _a.onPageNavigate, label = _a.label;
    var btnProps = {
        disabled: disabled,
        onClick: onPageNavigate(pageNumber)
    };
    return react_1.default.createElement(Button_1.default, __assign({}, btnProps), label);
}
exports.default = NavButton;
//# sourceMappingURL=NavButton.js.map