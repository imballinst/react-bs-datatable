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
var Row_1 = require("react-bootstrap/Row");
var Col_1 = require("react-bootstrap/Col");
var Table_1 = require("react-bootstrap/Table");
var data_1 = require("./utils/data");
var Pagination_1 = require("./Pagination");
var PaginationOpts_1 = require("./PaginationOpts");
var TableHeader_1 = require("./TableHeader");
var TableBody_1 = require("./TableBody");
var Filter_1 = require("./Filter");
var object_1 = require("./utils/object");
console.log('reactxx', react_1.default);
/** Datatable Component. */
function Datatable(_a) {
    var initialSort = _a.initialSort, onSort = _a.onSort, onFilter = _a.onFilter, _b = _a.rowsPerPage, rowsPerPage = _b === void 0 ? 5 : _b, _c = _a.rowsPerPageOption, rowsPerPageOption = _c === void 0 ? [] : _c, tableHeaders = _a.tableHeaders, tableBody = _a.tableBody, _d = _a.tableBsClass, tableBsClass = _d === void 0 ? '' : _d, _e = _a.labels, labels = _e === void 0 ? {} : _e;
    var _f = react_1.useState(function () {
        var defaultSort = {};
        if (initialSort !== undefined) {
            var found = false;
            var i = 0;
            while (!found && i < tableHeaders.length) {
                if (tableHeaders[i].prop === initialSort.prop) {
                    found = true;
                    if (tableHeaders[i].sortable === true) {
                        defaultSort = initialSort;
                    }
                }
                i += 1;
            }
        }
        // Define initial state.
        return {
            sortedProp: defaultSort,
            rowsPerPage: rowsPerPage,
            currentPage: 1,
            filterText: ''
        };
    }), state = _f[0], setState = _f[1];
    react_1.useEffect(function () {
        // Resets the table if the data passed down is different.
        if (tableBody !== undefined) {
            setState(function (oldState) { return (__assign({}, oldState, { filterText: '', currentPage: 1, rowsPerPage: rowsPerPage })); });
        }
    }, [tableBody, rowsPerPage]);
    function onChangeFilter(text) {
        setState(function (oldState) { return (__assign({}, oldState, { filterText: text, currentPage: 1 })); });
    }
    function onPageNavigate(nextPage) {
        return function () {
            setState(function (oldState) { return (__assign({}, oldState, { currentPage: nextPage })); });
        };
    }
    function onRowsPerPageChange(numOfPage) {
        return function () {
            setState(function (oldState) { return (__assign({}, oldState, { rowsPerPage: numOfPage, currentPage: 1 })); });
        };
    }
    function onSortChange(nextProp) {
        return function () {
            var nextSort = state.sortedProp;
            if (nextProp !== state.sortedProp.prop) {
                nextSort.prop = nextProp;
                nextSort.isAscending = true;
            }
            else {
                nextSort.isAscending = !state.sortedProp.isAscending;
            }
            setState(function (oldState) { return (__assign({}, oldState, { sortedProp: nextSort })); });
        };
    }
    var filteredData = data_1.filterData(tableBody, tableHeaders, state.filterText, onFilter);
    var sortedData = data_1.sortData(filteredData, state.sortedProp, onSort);
    var data = data_1.paginateData(sortedData, state.currentPage, state.rowsPerPage);
    var tableClass = object_1.makeClasses("table-datatable", tableBsClass);
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(Row_1.default, { className: "controlRow" },
            react_1.default.createElement(Col_1.default, { xs: 12, md: 4 },
                react_1.default.createElement(Filter_1.default, { tableHeaders: tableHeaders, placeholder: labels.filterPlaceholder, onChangeFilter: onChangeFilter, filterText: state.filterText })),
            react_1.default.createElement(Col_1.default, { xs: 12, md: 4 },
                react_1.default.createElement(PaginationOpts_1.default, { labels: labels, onRowsPerPageChange: onRowsPerPageChange, rowsPerPage: state.rowsPerPage, rowsPerPageOption: rowsPerPageOption })),
            react_1.default.createElement(Col_1.default, { xs: 12, md: 4, className: "text-right" },
                react_1.default.createElement(Pagination_1.default, { data: tableBody, rowsPerPage: state.rowsPerPage, currentPage: state.currentPage, onPageNavigate: onPageNavigate, labels: labels }))),
        react_1.default.createElement(Row_1.default, null,
            react_1.default.createElement(Col_1.default, { xs: "12" },
                react_1.default.createElement(Table_1.default, { className: tableClass },
                    react_1.default.createElement(TableHeader_1.default, { tableHeaders: tableHeaders, sortedProp: state.sortedProp, onSortChange: onSortChange }),
                    react_1.default.createElement(TableBody_1.default, { tableHeaders: tableHeaders, labels: labels, data: data }))))));
}
exports.default = Datatable;
//# sourceMappingURL=Table.js.map