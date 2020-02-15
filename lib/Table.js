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
var data_1 = require("./helpers/data");
var Pagination_1 = __importDefault(require("./Pagination"));
var PaginationOpts_1 = __importDefault(require("./PaginationOpts"));
var TableHeader_1 = __importDefault(require("./TableHeader"));
var TableBody_1 = __importDefault(require("./TableBody"));
var Filter_1 = __importDefault(require("./Filter"));
var object_1 = require("./helpers/object");
var Row_1 = __importDefault(require("react-bootstrap/Row"));
var Button_1 = __importDefault(require("react-bootstrap/Button"));
var Table_1 = __importDefault(require("react-bootstrap/Table"));
var Col_1 = __importDefault(require("react-bootstrap/Col"));
var ButtonGroup_1 = __importDefault(require("react-bootstrap/ButtonGroup"));
var FontAwesome_1 = __importDefault(require("./modules/FontAwesome"));
var TableContext_1 = require("./modules/TableContext");
/**
 * Datatable lifecycle convenient function.
 * It will be used when we are extending the table.
 **/
function useDatatableLifecycle(_a) {
    var initialSort = _a.initialSort, onSort = _a.onSort, onFilter = _a.onFilter, rowsPerPage = _a.rowsPerPage, rowsPerPageOption = _a.rowsPerPageOption, async = _a.async, tableHeaders = _a.tableHeaders, _b = _a.classes, classes = _b === void 0 ? {} : _b, tableBody = _a.tableBody, _c = _a.labels, labels = _c === void 0 ? {} : _c, Components = _a.Components, onRowClick = _a.onRowClick;
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
    var _d = react_1.useState(function () {
        var sortObj = initialSort || {};
        var filterable = async !== undefined && async.onFilter !== undefined;
        var defaultSort = {};
        tableHeaders.forEach(function (header) {
            if (header.prop === sortObj.prop) {
                if (header.sortable) {
                    defaultSort = {
                        isAscending: true,
                        prop: header.prop
                    };
                }
            }
            if (header.filterable && async === undefined && !filterable) {
                filterable = true;
            }
        });
        // Define initial state.
        return {
            sortedProp: defaultSort,
            filterable: filterable,
            rowsPerPage: rowsPerPage,
            currentPage: 1,
            filterText: ''
        };
    }), state = _d[0], setState = _d[1];
    react_1.useEffect(function () {
        // Resets the table if the data passed down is different.
        if (tableBody !== undefined) {
            setState(function (oldState) { return (__assign(__assign({}, oldState), { filterText: '', currentPage: 1, rowsPerPage: rowsPerPage })); });
        }
    }, [tableBody, rowsPerPage]);
    function onChangeFilter(text) {
        if (async && async.onFilter) {
            async.onFilter(text);
        }
        else {
            setState(function (oldState) { return (__assign(__assign({}, oldState), { filterText: text, currentPage: 1 })); });
        }
    }
    function onPageNavigate(nextPage) {
        if (async && async.onPaginate) {
            async.onPaginate(nextPage);
        }
        else {
            setState(function (oldState) { return (__assign(__assign({}, oldState), { currentPage: nextPage })); });
        }
    }
    function onRowsPerPageChange(numOfPage) {
        if (async && async.onRowsPerPageChange) {
            async.onRowsPerPageChange(numOfPage);
        }
        else {
            setState(function (oldState) { return (__assign(__assign({}, oldState), { rowsPerPage: numOfPage, currentPage: 1 })); });
        }
    }
    function onSortChange(nextProp) {
        if (async && async.onSort) {
            async.onSort(nextProp);
        }
        else {
            var nextSort_1 = state.sortedProp;
            if (nextProp !== state.sortedProp.prop) {
                nextSort_1.prop = nextProp;
                nextSort_1.isAscending = true;
            }
            else {
                nextSort_1.isAscending = !state.sortedProp.isAscending;
            }
            setState(function (oldState) { return (__assign(__assign({}, oldState), { sortedProp: nextSort_1 })); });
        }
    }
    var data = tableBody;
    var maxPage;
    if (async === undefined) {
        data = data_1.filterData(tableBody, tableHeaders, state.filterText, onFilter);
        data = data_1.sortData(data, state.sortedProp, onSort);
        if (state.rowsPerPage) {
            // Pagination needs.
            data = data_1.paginateData(data, state.currentPage, state.rowsPerPage);
            maxPage = Math.ceil(tableBody.length / state.rowsPerPage);
        }
    }
    else {
        maxPage = async.maxPage;
    }
    var tableClass = object_1.makeClasses("table-datatable__root", classes.table);
    // Default components.
    // If context has keys, then use context. Instead, use Components props.
    var context = TableContext_1.useComponentProvider();
    var passedComponents = Object.keys(context).length > 0 ? context : Components;
    var usedComponents = {
        // Global.
        Row: Row_1.default,
        Col: Col_1.default,
        Button: Button_1.default,
        // Table.
        Table: Table_1.default,
        TableHead: 'thead',
        TableBody: 'tbody',
        TableRow: 'tr',
        TableCell: 'td',
        // Filter.
        FilterGroup: undefined,
        // Pagination.
        ButtonGroup: ButtonGroup_1.default,
        // Pagination options.
        PaginationOptsGroup: undefined,
        // ICons.
        SortIcon: FontAwesome_1.default
    };
    if (passedComponents !== undefined) {
        if (typeof passedComponents === 'object') {
            for (var key in passedComponents) {
                // Replace usedComponent fields with the passedComponents fields.
                usedComponents[key] = passedComponents[key];
            }
        }
    }
    return {
        data: data,
        tableHeaders: tableHeaders,
        onChangeFilter: onChangeFilter,
        onPageNavigate: onPageNavigate,
        classes: classes,
        onRowsPerPageChange: onRowsPerPageChange,
        onSortChange: onSortChange,
        tableClass: tableClass,
        labels: labels,
        rowsPerPageOption: rowsPerPageOption,
        Components: usedComponents,
        onRowClick: onRowClick,
        // States.
        filterable: state.filterable,
        filterText: async ? async.filterText : state.filterText,
        rowsPerPage: async ? async.rowsPerPage : state.rowsPerPage,
        currentPage: async ? async.currentPage : state.currentPage,
        sortedProp: async ? async.sortedProp : state.sortedProp,
        maxPage: maxPage
    };
}
exports.useDatatableLifecycle = useDatatableLifecycle;
/** Datatable Component. */
function Datatable(props) {
    var _a = useDatatableLifecycle(props), data = _a.data, rowsPerPageOption = _a.rowsPerPageOption, tableHeaders = _a.tableHeaders, onChangeFilter = _a.onChangeFilter, onPageNavigate = _a.onPageNavigate, classes = _a.classes, onRowsPerPageChange = _a.onRowsPerPageChange, onSortChange = _a.onSortChange, tableClass = _a.tableClass, labels = _a.labels, filterable = _a.filterable, filterText = _a.filterText, rowsPerPage = _a.rowsPerPage, currentPage = _a.currentPage, sortedProp = _a.sortedProp, maxPage = _a.maxPage, Components = _a.Components, onRowClick = _a.onRowClick;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Components.Row, { className: object_1.makeClasses('controlRow__root', classes.controlRow) },
            react_1.default.createElement(Components.Col, { xs: 12, sm: 4, className: classes.filterCol },
                react_1.default.createElement(Filter_1.default, { filterable: filterable, classes: classes, placeholder: labels.filterPlaceholder, onChangeFilter: onChangeFilter, filterText: filterText, CustomFilterGroup: Components.FilterGroup })),
            react_1.default.createElement(Components.Col, { xs: 12, sm: 2, className: classes.paginationOptsCol },
                react_1.default.createElement(PaginationOpts_1.default, { classes: classes, labels: labels, onRowsPerPageChange: onRowsPerPageChange, rowsPerPage: rowsPerPage, rowsPerPageOption: rowsPerPageOption, CustomPaginationOptsGroup: Components.PaginationOptsGroup })),
            react_1.default.createElement(Components.Col, { xs: 12, sm: 6, className: object_1.makeClasses('text-right', classes.paginationCol) },
                react_1.default.createElement(Pagination_1.default, { maxPage: maxPage, classes: classes, rowsPerPage: rowsPerPage, currentPage: currentPage, onPageNavigate: onPageNavigate, labels: labels, components: {
                        Button: Components.Button,
                        ButtonGroup: Components.ButtonGroup
                    } }))),
        react_1.default.createElement(Components.Row, null,
            react_1.default.createElement(Components.Col, { xs: 12 },
                react_1.default.createElement(Table_1.default, { className: tableClass },
                    react_1.default.createElement(TableHeader_1.default, { classes: classes, tableHeaders: tableHeaders, sortedProp: sortedProp, onSortChange: onSortChange, components: {
                            TableHead: Components.TableHead,
                            TableCell: Components.TableCell,
                            TableRow: Components.TableRow
                        } }),
                    react_1.default.createElement(TableBody_1.default, { classes: classes, tableHeaders: tableHeaders, labels: labels, data: data, components: {
                            TableBody: Components.TableBody,
                            TableCell: Components.TableCell,
                            TableRow: Components.TableRow
                        }, onRowClick: onRowClick }))))));
}
// Only update if rowsPerPage, rowsPerPageOption, and tableBody changes.
exports.default = react_1.default.memo(Datatable, object_1.shouldTableUpdate);
//# sourceMappingURL=Table.js.map