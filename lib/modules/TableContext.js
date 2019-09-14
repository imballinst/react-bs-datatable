"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var TableContext = react_1.createContext({});
function useComponentProvider() {
    return react_1.useContext(TableContext);
}
exports.useComponentProvider = useComponentProvider;
function TableComponentsProvider(_a) {
    var children = _a.children, Components = _a.Components;
    return (react_1.default.createElement(TableContext.Provider, { value: Components }, children));
}
exports.TableComponentsProvider = TableComponentsProvider;
//# sourceMappingURL=TableContext.js.map