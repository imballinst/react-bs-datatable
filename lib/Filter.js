"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var InputGroup_1 = __importDefault(require("react-bootstrap/InputGroup"));
var Button_1 = __importDefault(require("react-bootstrap/Button"));
var FormControl_1 = __importDefault(require("react-bootstrap/FormControl"));
var FontAwesome_1 = __importDefault(require("./modules/FontAwesome"));
function Filter(_a) {
    var filterable = _a.filterable, filterText = _a.filterText, _b = _a.placeholder, placeholder = _b === void 0 ? 'Enter text...' : _b, onChangeFilter = _a.onChangeFilter, classes = _a.classes;
    // Event handlers.
    function onInputChange(e) {
        onChangeFilter(e.target.value);
    }
    function onClearFilter() {
        onChangeFilter('');
    }
    var filterRender = null;
    if (filterable) {
        filterRender = (react_1.default.createElement(InputGroup_1.default, { className: classes.filterInputGroup },
            react_1.default.createElement(FormControl_1.default, { type: "text", value: filterText, placeholder: placeholder, onChange: onInputChange, className: classes.filterFormControl }),
            react_1.default.createElement(InputGroup_1.default.Append, null,
                react_1.default.createElement(Button_1.default, { onClick: onClearFilter, className: classes.filterClearButton },
                    react_1.default.createElement(FontAwesome_1.default, { icon: "times", additionalClass: "fa-fw" })))));
    }
    return filterRender;
}
exports.default = Filter;
//# sourceMappingURL=Filter.js.map