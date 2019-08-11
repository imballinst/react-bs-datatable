"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var classnames_1 = __importDefault(require("classnames"));
exports.makeClasses = classnames_1.default;
function customJoin(array, separator, lastSeparator) {
    if (lastSeparator === void 0) { lastSeparator = ''; }
    var lastSep = array.length === 2 ? lastSeparator : "" + separator + lastSeparator;
    return "" + array.slice(0, -1).join(separator) + lastSep + array.slice(-1);
}
exports.customJoin = customJoin;
//# sourceMappingURL=object.js.map