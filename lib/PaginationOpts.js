"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Form = _interopRequireDefault(require("react-bootstrap/Form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PaginationOpts(_ref) {
  var labels = _ref.labels,
      rowsPerPage = _ref.rowsPerPage,
      keyName = _ref.keyName,
      rowsPerPageOption = _ref.rowsPerPageOption,
      onRowsPerPageChange = _ref.onRowsPerPageChange;

  function rowChangeHandler(e) {
    onRowsPerPageChange(e.target.value);
  }

  var selectOption = [];
  var renderedElements = null;

  if (rowsPerPage !== undefined) {
    selectOption.push(rowsPerPage); // Make sure there are no duplicates being pushed.

    rowsPerPageOption.forEach(function (opt) {
      if (!selectOption.includes(opt) && typeof opt === 'number') {
        selectOption.push(opt);
      }
    }); // Order the pagination options ascending.

    selectOption = selectOption.sort(function (a, b) {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      }

      return 0;
    }); // Replace the numbers with array of React elements.

    selectOption.forEach(function (option, idx) {
      var optionProps = {
        key: "".concat(keyName, "-page-opt-").concat(option),
        value: option
      };
      selectOption[idx] = _react.default.createElement("option", optionProps, option);
    });
    renderedElements = _react.default.createElement(_Form.default, {
      inline: true
    }, _react.default.createElement(_Form.default.Group, {
      controlId: "formGroupPagination"
    }, _react.default.createElement("span", null, labels.show || 'Show', " "), _react.default.createElement(_Form.default.Control, {
      name: "form-control-pagination",
      defaultValue: rowsPerPage,
      as: "select",
      placeholder: "select",
      onChange: rowChangeHandler
    }, selectOption), _react.default.createElement("span", null, " ", labels.entries || 'entries')));
  }

  return renderedElements;
}

PaginationOpts.propTypes = {
  keyName: _propTypes.default.string.isRequired,
  labels: _propTypes.default.object.isRequired,
  onRowsPerPageChange: _propTypes.default.func.isRequired,
  rowsPerPageOption: _propTypes.default.array,
  rowsPerPage: _propTypes.default.number
};
PaginationOpts.defaultProps = {
  rowsPerPage: undefined,
  rowsPerPageOption: undefined
};
var _default = PaginationOpts;
exports.default = _default;