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
var ButtonGroup_1 = __importDefault(require("react-bootstrap/ButtonGroup"));
var Button_1 = __importDefault(require("react-bootstrap/Button"));
var NavButton_1 = __importDefault(require("./modules/NavButton"));
function Pagination(_a) {
    var data = _a.data, rowsPerPage = _a.rowsPerPage, currentPage = _a.currentPage, onPageNavigate = _a.onPageNavigate, labels = _a.labels;
    var renderedElements = null;
    if (rowsPerPage !== undefined) {
        var dataLength = data.length;
        var numberOfPages = Math.ceil(dataLength / rowsPerPage);
        var buttons = [];
        var firstLabel = labels.first || 'First';
        var prevLabel = labels.prev || 'Prev';
        var nextLabel = labels.next || 'Next';
        var lastLabel = labels.last || 'Last';
        var startNumber = void 0;
        var i = 0;
        var hasPrev = true;
        var hasNext = true;
        if (currentPage === 1) {
            startNumber = 1;
            hasPrev = false;
            hasNext = numberOfPages > 1;
        }
        else if (currentPage === numberOfPages && numberOfPages !== 1) {
            startNumber = numberOfPages - 2 > 0 ? currentPage - 2 : 1;
            hasNext = false;
        }
        else {
            startNumber = currentPage - 1;
        }
        buttons.push(react_1.default.createElement(NavButton_1.default, { key: "page-" + firstLabel, pageNumber: 1, disabled: !hasPrev, onPageNavigate: onPageNavigate, label: firstLabel }), react_1.default.createElement(NavButton_1.default, { key: "page-" + prevLabel, pageNumber: currentPage - 1, disabled: !hasPrev, onPageNavigate: onPageNavigate, label: prevLabel }));
        while (i < 3 && startNumber <= numberOfPages) {
            var pageBtnProps = {
                key: "page-btn-" + startNumber,
                onClick: onPageNavigate(startNumber),
                active: currentPage === startNumber
            };
            buttons.push(react_1.default.createElement(Button_1.default, __assign({}, pageBtnProps), startNumber));
            i += 1;
            startNumber += 1;
        }
        buttons.push(react_1.default.createElement(NavButton_1.default, { key: "page-" + nextLabel, pageNumber: currentPage + 1, disabled: !hasNext, onPageNavigate: onPageNavigate, label: nextLabel }), react_1.default.createElement(NavButton_1.default, { key: "page-" + lastLabel, pageNumber: numberOfPages, disabled: !hasNext, onPageNavigate: onPageNavigate, label: lastLabel }));
        renderedElements = (react_1.default.createElement(ButtonGroup_1.default, { className: "btn-group-page-nav" }, buttons));
    }
    return renderedElements;
}
exports.default = Pagination;
//# sourceMappingURL=Pagination.js.map