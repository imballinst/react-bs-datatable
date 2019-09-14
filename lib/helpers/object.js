"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeClasses() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var classes = [];
    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        if (!arg)
            continue;
        var argType = typeof arg;
        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        }
        else if (argType === 'object') {
            for (var key in arg) {
                if (arg[key]) {
                    classes.push(key);
                }
            }
        }
    }
    return classes.join(' ');
}
exports.makeClasses = makeClasses;
function customJoin(array, separator, lastSeparator) {
    if (lastSeparator === void 0) { lastSeparator = ''; }
    var lastSep = array.length === 2 ? lastSeparator : "" + separator + lastSeparator;
    return "" + array.slice(0, -1).join(separator) + lastSep + array.slice(-1);
}
exports.customJoin = customJoin;
function shouldTableUpdate(prevProps, nextProps) {
    var includedProps = ['rowsPerPage', 'rowsPerPageOption', 'tableBody'];
    var checkedPropsLength = includedProps.length;
    var shouldUpdate = false;
    var index = 0;
    while (!shouldUpdate && index < checkedPropsLength) {
        if (prevProps[includedProps[index]] !== nextProps[includedProps[index]]) {
            shouldUpdate = true;
        }
        index += 1;
    }
    return shouldUpdate;
}
exports.shouldTableUpdate = shouldTableUpdate;
//# sourceMappingURL=object.js.map