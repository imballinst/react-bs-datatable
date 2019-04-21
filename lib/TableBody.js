"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _BodyRow = _interopRequireDefault(require("./BodyRow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableBody = function TableBody(_ref) {
  var tableHeader = _ref.tableHeader,
      keyName = _ref.keyName,
      labels = _ref.labels,
      paginatedData = _ref.paginatedData;
  var body = [];

  if (paginatedData.length !== 0) {
    for (var i = 0; i < paginatedData.length; i += 1) {
      body.push(_react.default.createElement(_BodyRow.default, {
        key: "".concat(keyName, "-row-").concat(i),
        tableHeader: tableHeader,
        keyName: keyName,
        data: paginatedData,
        rowIdx: i
      }));
    }
  } else {
    body.push(_react.default.createElement("tr", {
      key: "".concat(keyName, "-row-zero-length"),
      className: "tbody-tr-default"
    }, _react.default.createElement("td", {
      className: "tbody-td-default",
      colSpan: tableHeader.length
    }, labels.noResults || 'No results to be shown.')));
  }

  return _react.default.createElement("tbody", {
    className: "tbody-default"
  }, body);
};

TableBody.propTypes = {
  tableHeader: _propTypes.default.array.isRequired,
  keyName: _propTypes.default.string.isRequired,
  labels: _propTypes.default.object.isRequired,
  paginatedData: _propTypes.default.array.isRequired
};
var _default = TableBody;
exports.default = _default;