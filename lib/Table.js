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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Row_1 = __importDefault(require("react-bootstrap/Row"));
var Col_1 = __importDefault(require("react-bootstrap/Col"));
var Table_1 = __importDefault(require("react-bootstrap/Table"));
var data_1 = require("./utils/data");
var Pagination_1 = __importDefault(require("./Pagination"));
var PaginationOpts_1 = __importDefault(require("./PaginationOpts"));
var TableHeader_1 = __importDefault(require("./TableHeader"));
var TableBody_1 = __importDefault(require("./TableBody"));
var Filter_1 = __importDefault(require("./Filter"));
var object_1 = require("./utils/object");
/**
 * Datatable lifecycle convenient function.
 * It will be used when we are extending the table.
 **/
function useDatatableLifecycle(_a) {
    var initialSort = _a.initialSort, onSort = _a.onSort, onFilter = _a.onFilter, _b = _a.rowsPerPage, rowsPerPage = _b === void 0 ? 5 : _b, _c = _a.rowsPerPageOption, rowsPerPageOption = _c === void 0 ? [] : _c, async = _a.async, tableHeaders = _a.tableHeaders, tableBody = _a.tableBody, _d = _a.tableBsClass, tableBsClass = _d === void 0 ? '' : _d, _e = _a.labels, labels = _e === void 0 ? {} : _e;
    react_1.useEffect(function () {
        // If in development, warn if async and onSort/onFilter are both passed.
        if (process.env.NODE_ENV === 'development') {
            if (async !== undefined) {
                // Warn if onSort and/or onFilter is/are also passed down.
                var str = [];
                if (onSort !== undefined) {
                    str.push('[onSort]');
                }
                if (onFilter !== undefined) {
                    str.push('[onFilter]');
                }
                if (str.length > 0) {
                    console.warn("You are passing [async] props along with " + object_1.customJoin(str, ' and ') + ". When [async] is enabled, you should not pass onFilter or onSort.");
                }
                // Warn if all async options are not passed.
                str = [];
                if (async.onFilter === undefined) {
                    str.push('[async.onFilter]');
                }
                if (async.onSort === undefined) {
                    str.push('[async.onSort]');
                }
                if (async.onPaginate === undefined) {
                    str.push('[async.onPaginate]');
                }
                if (str.length > 0) {
                    console.warn("These async props are missing: " + object_1.customJoin(str, ', ', 'and '));
                }
            }
        }
    }, []);
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
    return {
        data: data,
        state: state,
        rowsPerPageOption: rowsPerPageOption,
        tableHeaders: tableHeaders,
        onChangeFilter: onChangeFilter,
        onPageNavigate: onPageNavigate,
        onRowsPerPageChange: onRowsPerPageChange,
        onSortChange: onSortChange,
        tableBody: tableBody,
        tableClass: tableClass,
        labels: labels
    };
}
exports.useDatatableLifecycle = useDatatableLifecycle;
/** Datatable Component. */
function Datatable(props) {
    var _a = useDatatableLifecycle(props), data = _a.data, state = _a.state, rowsPerPageOption = _a.rowsPerPageOption, tableHeaders = _a.tableHeaders, onChangeFilter = _a.onChangeFilter, onPageNavigate = _a.onPageNavigate, onRowsPerPageChange = _a.onRowsPerPageChange, onSortChange = _a.onSortChange, tableBody = _a.tableBody, tableClass = _a.tableClass, labels = _a.labels;
    return (react_1.default.createElement(react_1.default.Fragment, null,
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