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
var FontAwesome_1 = require("./modules/FontAwesome");
var object_1 = require("./utils/object");
function TableHeader(_a) {
    var tableHeaders = _a.tableHeaders, sortedProp = _a.sortedProp, onSortChange = _a.onSortChange;
    var headings = [];
    for (var i = 0; i < tableHeaders.length; i += 1) {
        var thClass = object_1.makeClasses({
            'thead-th': true,
            sortable: tableHeaders[i].sortable === true
        });
        var thProps = {
            key: "th-" + i,
            onClick: tableHeaders[i].sortable === true
                ? onSortChange(tableHeaders[i].prop)
                : undefined,
            className: thClass
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
        headings.push(react_1.default.createElement("th", __assign({}, thProps),
            tableHeaders[i].title,
            react_1.default.createElement("span", { className: "pull-right" }, sortIconRender)));
    }
    return (react_1.default.createElement("thead", { className: "thead" },
        react_1.default.createElement("tr", { className: "thead-tr" }, headings)));
}
exports.default = TableHeader;
//# sourceMappingURL=TableHeader.js.map