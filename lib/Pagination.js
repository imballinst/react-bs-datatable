"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ButtonGroup = _interopRequireDefault(require("react-bootstrap/ButtonGroup"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _NavButton = _interopRequireDefault(require("./modules/NavButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Pagination(_ref) {
  var data = _ref.data,
      rowsPerPage = _ref.rowsPerPage,
      keyName = _ref.keyName,
      currentPage = _ref.currentPage,
      onPageNavigate = _ref.onPageNavigate,
      labels = _ref.labels;
  var renderedElements = null;

  if (rowsPerPage !== undefined) {
    var dataLength = data.length;
    var numberOfPages = Math.ceil(dataLength / rowsPerPage);
    var buttons = [];
    var firstLabel = labels.first || 'First';
    var prevLabel = labels.prev || 'Prev';
    var nextLabel = labels.next || 'Next';
    var lastLabel = labels.last || 'Last';
    var startNumber;
    var i = 0;
    var hasPrev = true;
    var hasNext = true;

    if (currentPage === 1) {
      startNumber = 1;
      hasPrev = false;
      hasNext = numberOfPages > 1;
    } else if (currentPage === numberOfPages && numberOfPages !== 1) {
      startNumber = numberOfPages - 2 > 0 ? currentPage - 2 : 1;
      hasNext = false;
    } else {
      startNumber = currentPage - 1;
    }

    buttons.push(_react.default.createElement(_NavButton.default, {
      key: "".concat(keyName, "-page-").concat(firstLabel),
      pageNavNumber: 1,
      disabled: !hasPrev,
      onPageNavigate: onPageNavigate,
      label: firstLabel
    }), _react.default.createElement(_NavButton.default, {
      key: "".concat(keyName, "-page-").concat(prevLabel),
      pageNavNumber: currentPage - 1,
      disabled: !hasPrev,
      onPageNavigate: onPageNavigate,
      label: prevLabel
    }));

    while (i < 3 && startNumber <= numberOfPages) {
      var pageBtnProps = {
        key: "".concat(keyName, "-page-btn-").concat(startNumber),
        onClick: onPageNavigate(startNumber),
        active: currentPage === startNumber
      };
      buttons.push(_react.default.createElement(_Button.default, pageBtnProps, startNumber));
      i += 1;
      startNumber += 1;
    }

    buttons.push(_react.default.createElement(_NavButton.default, {
      key: "".concat(keyName, "-page-").concat(nextLabel),
      pageNavNumber: currentPage + 1,
      disabled: !hasNext,
      onPageNavigate: onPageNavigate,
      label: nextLabel
    }), _react.default.createElement(_NavButton.default, {
      key: "".concat(keyName, "-page-").concat(lastLabel),
      pageNavNumber: numberOfPages,
      disabled: !hasNext,
      onPageNavigate: onPageNavigate,
      label: lastLabel
    }));
    renderedElements = _react.default.createElement(_ButtonGroup.default, {
      className: "btn-group-page-nav"
    }, buttons);
  }

  return renderedElements;
}

Pagination.propTypes = {
  data: _propTypes.default.array.isRequired,
  keyName: _propTypes.default.string.isRequired,
  currentPage: _propTypes.default.number.isRequired,
  onPageNavigate: _propTypes.default.func.isRequired,
  rowsPerPage: _propTypes.default.number,
  labels: _propTypes.default.object
};
Pagination.defaultProps = {
  rowsPerPage: undefined,
  labels: {}
};
var _default = Pagination;
exports.default = _default;