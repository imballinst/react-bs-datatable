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
var includedProps = [
    'classes',
    'async',
    'rowsPerPage',
    'rowsPerPageOption',
    'tableBody'
];
function shouldTableUpdate(prevProps, nextProps) {
    var checkedPropsLength = includedProps.length;
    var isSame = true;
    var index = 0;
    while (isSame && index < checkedPropsLength) {
        var prop = includedProps[index];
        if (prevProps[prop] !== nextProps[prop]) {
            if (prop === 'rowsPerPageOption') {
                // First, check if defined -- defaults to empty array.
                var prevOptions = prevProps[prop] || [];
                var nextOptions = nextProps[prop] || [];
                // Then, check if they have same length.
                isSame = prevOptions.length === nextOptions.length;
            }
            else {
                isSame = false;
            }
        }
        index += 1;
    }
    return isSame;
}
exports.shouldTableUpdate = shouldTableUpdate;
//# sourceMappingURL=object.js.map