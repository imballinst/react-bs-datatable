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
var Form_1 = require("react-bootstrap/Form");
function PaginationOpts(_a) {
    var labels = _a.labels, rowsPerPage = _a.rowsPerPage, rowsPerPageOption = _a.rowsPerPageOption, onRowsPerPageChange = _a.onRowsPerPageChange;
    function rowChangeHandler(e) {
        onRowsPerPageChange(e.target.value);
    }
    var selectOption = [];
    var renderedElements = null;
    if (rowsPerPage !== undefined) {
        var opts_1 = [rowsPerPage];
        // Make sure there are no duplicates being pushed.
        if (rowsPerPageOption !== undefined) {
            rowsPerPageOption.forEach(function (opt) {
                if (!opts_1.includes(opt) && typeof opt === 'number') {
                    opts_1.push(opt);
                }
            });
            // Order the pagination options ascending.
            opts_1 = opts_1.sort(function (a, b) {
                if (a < b) {
                    return -1;
                }
                else if (a > b) {
                    return 1;
                }
                return 0;
            });
        }
        // Replace the numbers with array of React elements.
        selectOption = opts_1.map(function (option, idx) {
            var optionProps = {
                key: "page-opt-" + option,
                value: option
            };
            return react_1.default.createElement("option", __assign({}, optionProps), option);
        });
        renderedElements = (react_1.default.createElement(Form_1.default, { inline: true },
            react_1.default.createElement(Form_1.default.Group, { controlId: "formGroupPagination" },
                react_1.default.createElement("span", null,
                    labels.show || 'Show',
                    " "),
                react_1.default.createElement(Form_1.default.Control, { name: "form-control-pagination", defaultValue: rowsPerPage, as: "select", placeholder: "select", onChange: rowChangeHandler }, selectOption),
                react_1.default.createElement("span", null,
                    " ",
                    labels.entries || 'entries'))));
    }
    return renderedElements;
}
exports.default = PaginationOpts;
//# sourceMappingURL=PaginationOpts.js.map