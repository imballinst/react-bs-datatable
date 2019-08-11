"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var BodyRow_1 = require("./BodyRow");
function TableBody(_a) {
    var tableHeaders = _a.tableHeaders, labels = _a.labels, data = _a.data;
    var body = [];
    var dataLength = data.length;
    if (dataLength !== 0) {
        for (var i = 0; i < dataLength; i += 1) {
            body.push(react_1.default.createElement(BodyRow_1.default, { key: "row-" + i, tableHeaders: tableHeaders, data: data, rowIdx: i }));
        }
    }
    else {
        body.push(react_1.default.createElement("tr", { key: "row-zero-length", className: "tbody-tr" },
            react_1.default.createElement("td", { className: "tbody-td", colSpan: tableHeaders.length }, labels.noResults || 'No results to be shown.')));
    }
    return react_1.default.createElement("tbody", { className: "tbody" }, body);
}
exports.default = TableBody;
//# sourceMappingURL=TableBody.js.map