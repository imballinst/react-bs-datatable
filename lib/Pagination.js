"use strict";
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
var NavButton_1 = __importDefault(require("./modules/NavButton"));
var object_1 = require("./helpers/object");
function Pagination(_a) {
    var rowsPerPage = _a.rowsPerPage, currentPage = _a.currentPage, onPageNavigate = _a.onPageNavigate, labels = _a.labels, maxPage = _a.maxPage, classes = _a.classes, _b = _a.components, Button = _b.Button, ButtonGroup = _b.ButtonGroup;
    var paginateHandler = react_1.useCallback(function (pageNum) {
        return function () { return onPageNavigate(pageNum); };
    }, [onPageNavigate]);
    var renderedElements = null;
    if (rowsPerPage !== undefined && maxPage !== undefined) {
        var buttons = [];
        var firstLabel = labels.first || 'First';
        var prevLabel = labels.prev || 'Prev';
        var nextLabel = labels.next || 'Next';
        var lastLabel = labels.last || 'Last';
        var isCurrentPageOutOfBounds = currentPage > maxPage;
        var startNumber = void 0;
        var i = 0;
        var hasPrev = true;
        var hasNext = true;
        if (currentPage === 1) {
            // Active button is the first one.
            startNumber = 1;
            hasPrev = false;
            hasNext = maxPage > 1;
        }
        else if (currentPage === maxPage && maxPage !== 1) {
            // Active button is in the last.
            startNumber = maxPage - 2 > 0 ? currentPage - 2 : 1;
            hasNext = false;
        }
        else {
            // Active button is in the middle.
            startNumber = currentPage - 1;
        }
        buttons.push(react_1.default.createElement(NavButton_1.default, { Component: Button, className: classes.paginationButton, key: "page-" + firstLabel, pageNumber: 1, disabled: !hasPrev, onPageNavigate: paginateHandler, label: firstLabel }), react_1.default.createElement(NavButton_1.default, { Component: Button, className: classes.paginationButton, key: "page-" + prevLabel, 
            // If out of bounds, prev button refers to the last page.
            pageNumber: isCurrentPageOutOfBounds ? maxPage : currentPage - 1, disabled: !hasPrev, onPageNavigate: paginateHandler, label: prevLabel }));
        if (!isCurrentPageOutOfBounds) {
            while (i < 3 && startNumber <= maxPage) {
                buttons.push(react_1.default.createElement(NavButton_1.default, { Component: Button, key: "page-btn-" + i, pageNumber: startNumber, disabled: currentPage === startNumber, onPageNavigate: paginateHandler, label: startNumber, className: classes.paginationButton }));
                i += 1;
                startNumber += 1;
            }
        }
        else {
            // If current page is more than maxPage, we disable the button.
            // This is intentional so the user knows that no data in there.
            hasNext = false;
            buttons.push(react_1.default.createElement(NavButton_1.default, { Component: Button, key: "page-btn-" + startNumber, className: classes.paginationButton, pageNumber: currentPage - 1, disabled: true, onPageNavigate: paginateHandler, label: currentPage }));
        }
        buttons.push(react_1.default.createElement(NavButton_1.default, { Component: Button, className: classes.paginationButton, key: "page-" + nextLabel, pageNumber: currentPage + 1, disabled: !hasNext, onPageNavigate: paginateHandler, label: nextLabel }), react_1.default.createElement(NavButton_1.default, { Component: Button, className: classes.paginationButton, key: "page-" + lastLabel, pageNumber: maxPage, disabled: !hasNext, onPageNavigate: paginateHandler, label: lastLabel }));
        renderedElements = (react_1.default.createElement(ButtonGroup, { className: object_1.makeClasses('ButtonGroup__root', classes.paginationButtonGroup) }, buttons));
    }
    return renderedElements;
}
exports.default = Pagination;
//# sourceMappingURL=Pagination.js.map