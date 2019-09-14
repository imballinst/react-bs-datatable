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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var FontAwesome_1 = __importDefault(require("./modules/FontAwesome"));
var object_1 = require("./helpers/object");
function TableHeader(_a) {
    var tableHeaders = _a.tableHeaders, sortedProp = _a.sortedProp, onSortChange = _a.onSortChange, classes = _a.classes, _b = _a.components, TableHead = _b.TableHead, TableRow = _b.TableRow, TableCell = _b.TableCell;
    function onSortHandler(prop) {
        return function () { return onSortChange(prop); };
    }
    var headings = [];
    for (var i = 0; i < tableHeaders.length; i += 1) {
        var thClass = object_1.makeClasses({
            'thead-th': true,
            sortable: tableHeaders[i].sortable === true
        });
        var thProps = {
            key: "th-" + i,
            onClick: tableHeaders[i].sortable === true
                ? onSortHandler(tableHeaders[i].prop)
                : undefined,
            className: object_1.makeClasses(thClass, classes.theadCol)
        };
        var sortIcon = 'sort';
        var sortIconRender = null;
        if (tableHeaders[i].sortable === true) {
            if (sortedProp !== {} && sortedProp.prop === tableHeaders[i].prop) {
                if (sortedProp.isAscending) {
                    sortIcon = 'sort-asc';
                }
                else {
                    sortIcon = 'sort-desc';
                }
            }
            sortIconRender = react_1.default.createElement(FontAwesome_1.default, { icon: sortIcon, additionalClass: "fa-fw" });
        }
        headings.push(react_1.default.createElement(TableCell, __assign({}, thProps),
            tableHeaders[i].title,
            react_1.default.createElement("span", { className: "pull-right" }, sortIconRender)));
    }
    return (react_1.default.createElement(TableHead, { className: object_1.makeClasses('thead', classes.thead) },
        react_1.default.createElement(TableRow, { className: object_1.makeClasses('thead-tr', classes.theadRow) }, headings)));
}
exports.default = TableHeader;
//# sourceMappingURL=TableHeader.js.map