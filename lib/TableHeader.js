"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _FontAwesome = _interopRequireDefault(require("./modules/FontAwesome"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableHeader = function TableHeader(_ref) {
  var tableHeader = _ref.tableHeader,
      keyName = _ref.keyName,
      sortedProp = _ref.sortedProp,
      onSortChange = _ref.onSortChange;
  var headings = [];

  for (var i = 0; i < tableHeader.length; i += 1) {
    var thClass = (0, _classnames.default)({
      'thead-th-default': true,
      sortable: tableHeader[i].sortable === true
    });
    var thProps = {
      key: "".concat(keyName, "-th-").concat(i),
      onClick: tableHeader[i].sortable === true ? onSortChange(tableHeader[i].prop) : undefined,
      className: thClass
    };
    var sortIcon = 'sort';
    var sortIconRender = null;

    if (tableHeader[i].sortable === true) {
      if (sortedProp !== {} && sortedProp.prop === tableHeader[i].prop) {
        if (sortedProp.isAscending) {
          sortIcon = 'sort-asc';
        } else {
          sortIcon = 'sort-desc';
        }
      }

      sortIconRender = _react.default.createElement(_FontAwesome.default, {
        icon: sortIcon,
        additionalClass: "fa-fw"
      });
    }

    headings.push(_react.default.createElement("th", thProps, tableHeader[i].title, _react.default.createElement("span", {
      className: "pull-right"
    }, sortIconRender)));
  }

  return _react.default.createElement("thead", {
    className: "thead-default"
  }, _react.default.createElement("tr", {
    className: "thead-tr-default"
  }, headings));
};

TableHeader.propTypes = {
  tableHeader: _propTypes.default.array.isRequired,
  keyName: _propTypes.default.string.isRequired,
  sortedProp: _propTypes.default.object.isRequired,
  onSortChange: _propTypes.default.func.isRequired
};
var _default = TableHeader;
exports.default = _default;