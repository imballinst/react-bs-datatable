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
var object_1 = require("./helpers/object");
var Form_1 = __importDefault(require("react-bootstrap/Form"));
function PaginationOptsGroup(_a) {
    var classes = _a.classes, labels = _a.labels, value = _a.value, onChange = _a.onChange, options = _a.options;
    return (react_1.default.createElement(Form_1.default, { inline: true, className: object_1.makeClasses('paginationOpts__root', classes.paginationOptsForm) },
        react_1.default.createElement(Form_1.default.Group, { controlId: "formGroupPagination", className: classes.paginationOptsFormGroup },
            react_1.default.createElement("span", { className: classes.paginationOptsFormText },
                labels.show || 'Show',
                ' '),
            react_1.default.createElement(Form_1.default.Control, { name: "form-control-pagination", defaultValue: value, as: "select", placeholder: "select", onChange: onChange, className: classes.paginationOptsFormControl }, options.map(function (option, idx) {
                var optionProps = {
                    key: "page-opt-" + option,
                    value: option
                };
                return react_1.default.createElement("option", __assign({}, optionProps), option);
            })),
            react_1.default.createElement("span", { className: classes.paginationOptsFormText },
                ' ',
                labels.entries || 'entries'))));
}
exports.PaginationOptsGroup = PaginationOptsGroup;
function PaginationOpts(_a) {
    var labels = _a.labels, rowsPerPage = _a.rowsPerPage, rowsPerPageOption = _a.rowsPerPageOption, onRowsPerPageChange = _a.onRowsPerPageChange, classes = _a.classes, CustomPaginationOptsGroup = _a.CustomPaginationOptsGroup;
    function onRowsPerPageChangeHandler(e) {
        onRowsPerPageChange(Number(e.target.value));
    }
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
        // Only render option if the length is more than 1.
        if (opts_1.length > 1) {
            var UsedPaginationOpts = CustomPaginationOptsGroup || PaginationOptsGroup;
            renderedElements = (react_1.default.createElement(UsedPaginationOpts, { classes: classes, labels: labels, onChange: onRowsPerPageChangeHandler, options: opts_1, value: rowsPerPage }));
        }
    }
    return renderedElements;
}
exports.default = PaginationOpts;
//# sourceMappingURL=PaginationOpts.js.map