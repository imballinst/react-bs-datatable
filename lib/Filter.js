"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var InputGroup_1 = __importDefault(require("react-bootstrap/InputGroup"));
var Form_1 = __importDefault(require("react-bootstrap/Form"));
var Button_1 = __importDefault(require("react-bootstrap/Button"));
var FontAwesome_1 = __importDefault(require("./modules/FontAwesome"));
function FilterGroup(_a) {
    var classes = _a.classes, filterText = _a.filterText, placeholder = _a.placeholder, onChangeFilter = _a.onChangeFilter, onClearFilter = _a.onClearFilter;
    return (react_1.default.createElement(InputGroup_1.default, { className: classes.filterInputGroup },
        react_1.default.createElement(Form_1.default.Control, { type: "text", value: filterText, placeholder: placeholder, onChange: onChangeFilter, className: classes.filterFormControl }),
        react_1.default.createElement(InputGroup_1.default.Append, null,
            react_1.default.createElement(Button_1.default, { onClick: onClearFilter, className: classes.filterClearButton },
                react_1.default.createElement(FontAwesome_1.default, { icon: "times", additionalClass: "fa-fw" })))));
}
exports.FilterGroup = FilterGroup;
function Filter(_a) {
    var filterable = _a.filterable, filterText = _a.filterText, _b = _a.placeholder, placeholder = _b === void 0 ? 'Enter text...' : _b, onChangeFilter = _a.onChangeFilter, classes = _a.classes, CustomFilterGroup = _a.CustomFilterGroup;
    // Event handlers.
    function onInputChange(e) {
        onChangeFilter(e.target.value);
    }
    function onClearFilter() {
        onChangeFilter('');
    }
    var filterRender = null;
    if (filterable) {
        var UsedFilterGroup = CustomFilterGroup || FilterGroup;
        filterRender = (react_1.default.createElement(UsedFilterGroup, { classes: classes, filterText: filterText, placeholder: placeholder, onChangeFilter: onInputChange, onClearFilter: onClearFilter }));
    }
    return filterRender;
}
exports.default = react_1.default.memo(Filter);
//# sourceMappingURL=Filter.js.map