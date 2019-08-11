"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function BodyRow(_a) {
    var tableHeaders = _a.tableHeaders, data = _a.data, rowIdx = _a.rowIdx;
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
        row.push(react_1.default.createElement("td", { key: "col-" + rowIdx + i, className: "tbody-td" }, value));
    }
    return react_1.default.createElement("tr", { className: "tbody-tr" }, row);
}
exports.default = BodyRow;
//# sourceMappingURL=BodyRow.js.map