"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function getLastChildren(reactElement) {
    var isReactElement = react_1.default.isValidElement(reactElement);
    return isReactElement
        ? getLastChildren(reactElement.props.children)
        : reactElement;
}
exports.getLastChildren = getLastChildren;
function isPropFilterable(tableHeaders, prop) {
    var headersLength = tableHeaders.length;
    var i = 0;
    var found = false;
    var isFilterable = false;
    while (!found && i < headersLength) {
        if (tableHeaders[i].prop === prop) {
            found = true;
            if (tableHeaders[i].filterable === true) {
                isFilterable = true;
            }
        }
        i += 1;
    }
    return isFilterable;
}
exports.isPropFilterable = isPropFilterable;
function sortData(data, sortedProp, onSort) {
    var sortedData = __spreadArrays(data);
    if (sortedProp.prop !== undefined) {
        var prop_1 = sortedProp.prop, isAscending = sortedProp.isAscending;
        var sortMultiplier_1 = isAscending ? 1 : -1;
        sortedData = sortedData.sort(function (a, b) {
            var quantifiedValue1 = getLastChildren(a[prop_1]);
            var quantifiedValue2 = getLastChildren(b[prop_1]);
            // if onSort use the onSort[prop] function
            // this is a handler for custom objects, such as Date
            if (onSort && typeof onSort[prop_1] === 'function') {
                quantifiedValue1 = onSort[prop_1](quantifiedValue1);
                quantifiedValue2 = onSort[prop_1](quantifiedValue2);
            }
            if (quantifiedValue1 < quantifiedValue2) {
                return -1 * sortMultiplier_1;
            }
            else if (quantifiedValue1 > quantifiedValue2) {
                return 1 * sortMultiplier_1;
            }
            return 0;
        });
    }
    return sortedData;
}
exports.sortData = sortData;
function filterData(data, tableHeaders, filterText, onFilter) {
    var filteredData = __spreadArrays(data);
    if (filterText !== '') {
        filteredData = filteredData.filter(function (element) {
            var isElementIncluded = false;
            var i = 0;
            var elementProps = Object.keys(element);
            var elementPropLength = elementProps.length;
            while (!isElementIncluded && i < elementPropLength) {
                var prop = elementProps[i];
                if (isPropFilterable(tableHeaders, prop)) {
                    var columnValue = element[prop];
                    // Get last children and fill columnValue with empty string if undefined
                    columnValue = getLastChildren(columnValue) || '';
                    if (onFilter && typeof onFilter[prop] === 'function') {
                        columnValue = onFilter[prop](columnValue);
                    }
                    else if (typeof columnValue !== 'string') {
                        // Convert to string if it is not a string
                        columnValue = columnValue.toString();
                    }
                    columnValue = columnValue.toLowerCase();
                    // If filterText is string/substring of columnValue
                    isElementIncluded = columnValue.includes(filterText.toLowerCase());
                }
                i += 1;
            }
            return isElementIncluded;
        });
    }
    return filteredData;
}
exports.filterData = filterData;
function paginateData(data, currentPage, rowsPerPage) {
    var paginatedData = __spreadArrays(data);
    if (rowsPerPage !== undefined) {
        var startRow = (currentPage - 1) * rowsPerPage;
        var endRow = currentPage * rowsPerPage;
        paginatedData = data.slice(startRow, endRow);
    }
    return paginatedData;
}
exports.paginateData = paginateData;
//# sourceMappingURL=data.js.map