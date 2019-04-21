"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BodyRow = function BodyRow(_ref) {
  var tableHeader = _ref.tableHeader,
      keyName = _ref.keyName,
      data = _ref.data,
      rowIdx = _ref.rowIdx;
  var row = [];

  for (var i = 0; i < tableHeader.length; i += 1) {
    var cell = tableHeader[i].cell;
    var value = '';

    if (cell === undefined) {
      value = data[rowIdx][tableHeader[i].prop];
    } else {
      value = cell(data[rowIdx]);
    }

    row.push(_react.default.createElement("td", {
      key: "".concat(keyName, "-col-").concat(rowIdx).concat(i),
      className: "tbody-td-default"
    }, value));
  }

  return _react.default.createElement("tr", {
    className: "tbody-tr-default"
  }, row);
};

BodyRow.propTypes = {
  tableHeader: _propTypes.default.array.isRequired,
  keyName: _propTypes.default.string.isRequired,
  data: _propTypes.default.array.isRequired,
  rowIdx: _propTypes.default.number.isRequired
};
var _default = BodyRow;
exports.default = _default;