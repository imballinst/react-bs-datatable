"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldTableUpdate = exports.TableComponentsProvider = exports.useDatatableLifecycle = exports.Filter = exports.TableBody = exports.TableHeader = exports.PaginationOpts = exports.Pagination = exports.paginateData = exports.filterData = exports.sortData = void 0;
var data_1 = require("./helpers/data");
Object.defineProperty(exports, "sortData", { enumerable: true, get: function () { return data_1.sortData; } });
Object.defineProperty(exports, "filterData", { enumerable: true, get: function () { return data_1.filterData; } });
Object.defineProperty(exports, "paginateData", { enumerable: true, get: function () { return data_1.paginateData; } });
var Pagination_1 = __importDefault(require("./Pagination"));
exports.Pagination = Pagination_1.default;
var PaginationOpts_1 = __importDefault(require("./PaginationOpts"));
exports.PaginationOpts = PaginationOpts_1.default;
var TableHeader_1 = __importDefault(require("./TableHeader"));
exports.TableHeader = TableHeader_1.default;
var TableBody_1 = __importDefault(require("./TableBody"));
exports.TableBody = TableBody_1.default;
var Filter_1 = __importDefault(require("./Filter"));
exports.Filter = Filter_1.default;
var Table_1 = __importStar(require("./Table"));
Object.defineProperty(exports, "useDatatableLifecycle", { enumerable: true, get: function () { return Table_1.useDatatableLifecycle; } });
var TableContext_1 = require("./modules/TableContext");
Object.defineProperty(exports, "TableComponentsProvider", { enumerable: true, get: function () { return TableContext_1.TableComponentsProvider; } });
var object_1 = require("./helpers/object");
Object.defineProperty(exports, "shouldTableUpdate", { enumerable: true, get: function () { return object_1.shouldTableUpdate; } });
exports.default = Table_1.default;
//# sourceMappingURL=index.js.map