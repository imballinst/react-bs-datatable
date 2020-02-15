"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var object_1 = require("./helpers/object");
function BodyRow(_a) {
    var tableHeaders = _a.tableHeaders, data = _a.data, rowIdx = _a.rowIdx, classes = _a.classes, components = _a.components, onClick = _a.onClick;
    var row = [];
    for (var i = 0; i < tableHeaders.length; i += 1) {
        var cell = tableHeaders[i].cell;
        var value = '';
        if (cell === undefined) {
            value = data[rowIdx][tableHeaders[i].prop];
        }
        else {
            value = cell(data[rowIdx]);
        }
        row.push(react_1.default.createElement(components.TableCell, { key: "col-" + rowIdx + i, className: object_1.makeClasses('tbody-td', classes.tbodyCol) }, value));
    }
    function onRowClick() {
        if (typeof onClick === 'function') {
            onClick(data[rowIdx]);
        }
    }
    return (react_1.default.createElement(components.TableRow, { className: object_1.makeClasses('tbody-tr', classes.tbodyRow), onClick: onRowClick }, row));
}
exports.default = BodyRow;
//# sourceMappingURL=BodyRow.js.map