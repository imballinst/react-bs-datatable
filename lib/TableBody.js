"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _BodyRow = _interopRequireDefault(require("./BodyRow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TableBody = function TableBody(_ref) {
  var tableHeader = _ref.tableHeader,
      labels = _ref.labels,
      data = _ref.data;
  var body = [];

  if (data.length !== 0) {
    for (var i = 0; i < data.length; i += 1) {
      body.push(_react["default"].createElement(_BodyRow["default"], {
        key: "row-".concat(i),
        tableHeader: tableHeader,
        data: data,
        rowIdx: i
      }));
    }
  } else {
    body.push(_react["default"].createElement("tr", {
      key: "row-zero-length",
      className: "tbody-tr"
    }, _react["default"].createElement("td", {
      className: "tbody-td",
      colSpan: tableHeader.length
    }, labels.noResults || 'No results to be shown.')));
  }

  return _react["default"].createElement("tbody", {
    className: "tbody"
  }, body);
};

TableBody.propTypes = {
  tableHeader: _propTypes["default"].array.isRequired,
  labels: _propTypes["default"].object.isRequired,
  data: _propTypes["default"].array.isRequired
};
var _default = TableBody;
exports["default"] = _default;