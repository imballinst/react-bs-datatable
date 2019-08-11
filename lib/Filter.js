"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var InputGroup_1 = require("react-bootstrap/InputGroup");
var Button_1 = require("react-bootstrap/Button");
var FormControl_1 = require("react-bootstrap/FormControl");
var FontAwesome_1 = require("./modules/FontAwesome");
function Filter(_a) {
    var tableHeaders = _a.tableHeaders, filterText = _a.filterText, _b = _a.placeholder, placeholder = _b === void 0 ? 'Enter tezt...' : _b, onChangeFilter = _a.onChangeFilter;
    // Event handlers.
    function onInputChange(e) {
        onChangeFilter(e.target.value);
    }
    function onClearFilter() {
        onChangeFilter('');
    }
    var filterRender = null;
    var i = 0;
    var filterable = false;
    while (!filterable && i < tableHeaders.length) {
        if (tableHeaders[i].filterable === true) {
            filterable = true;
        }
        i += 1;
    }
    if (filterable) {
        filterRender = (react_1.default.createElement(InputGroup_1.default, null,
            react_1.default.createElement(FormControl_1.default, { type: "text", value: filterText, placeholder: placeholder, onChange: onInputChange }),
            react_1.default.createElement(InputGroup_1.default.Append, null,
                react_1.default.createElement(Button_1.default, { onClick: onClearFilter },
                    react_1.default.createElement(FontAwesome_1.default, { icon: "times", additionalClass: "fa-fw" })))));
    }
    return filterRender;
}
exports.default = Filter;
//# sourceMappingURL=Filter.js.map