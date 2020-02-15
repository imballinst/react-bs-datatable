"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var BodyRow_1 = __importDefault(require("./BodyRow"));
var object_1 = require("./helpers/object");
function TableBody(_a) {
    var tableHeaders = _a.tableHeaders, labels = _a.labels, data = _a.data, classes = _a.classes, _b = _a.components, TableBody = _b.TableBody, TableRow = _b.TableRow, TableCell = _b.TableCell, onRowClick = _a.onRowClick;
    var body = [];
    var dataLength = data.length;
    if (dataLength !== 0) {
        for (var i = 0; i < dataLength; i += 1) {
            body.push(react_1.default.createElement(BodyRow_1.default, { key: "row-" + i, classes: classes, components: {
                    TableRow: TableRow,
                    TableCell: TableCell
                }, tableHeaders: tableHeaders, data: data, onClick: onRowClick, rowIdx: i }));
        }
    }
    else {
        body.push(react_1.default.createElement(TableRow, { key: "row-zero-length", className: "tbody-tr" },
            react_1.default.createElement(TableCell, { className: "tbody-td", colSpan: tableHeaders.length }, labels.noResults || 'No results to be shown.')));
    }
    return (react_1.default.createElement(TableBody, { className: object_1.makeClasses('tbody', classes.tbody) }, body));
}
exports.default = TableBody;
//# sourceMappingURL=TableBody.js.map