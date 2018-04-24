'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ButtonGroup = require('react-bootstrap/lib/ButtonGroup');

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _NavButton = require('./modules/NavButton');

var _NavButton2 = _interopRequireDefault(_NavButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pagination = function Pagination(_ref) {
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

    var startNumber = void 0;
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

    buttons.push(_react2.default.createElement(_NavButton2.default, {
      key: keyName + '-page-' + firstLabel,
      pageNavNumber: 1,
      disabled: !hasPrev,
      onPageNavigate: onPageNavigate,
      label: firstLabel
    }), _react2.default.createElement(_NavButton2.default, {
      key: keyName + '-page-' + prevLabel,
      pageNavNumber: currentPage - 1,
      disabled: !hasPrev,
      onPageNavigate: onPageNavigate,
      label: prevLabel
    }));

    while (i < 3 && startNumber <= numberOfPages) {
      var pageBtnProps = {
        key: keyName + '-page-btn-' + startNumber,
        onClick: onPageNavigate(startNumber),
        active: currentPage === startNumber
      };

      buttons.push(_react2.default.createElement(
        _Button2.default,
        pageBtnProps,
        startNumber
      ));

      i += 1;
      startNumber += 1;
    }

    buttons.push(_react2.default.createElement(_NavButton2.default, {
      key: keyName + '-page-' + nextLabel,
      pageNavNumber: currentPage + 1,
      disabled: !hasNext,
      onPageNavigate: onPageNavigate,
      label: nextLabel
    }), _react2.default.createElement(_NavButton2.default, {
      key: keyName + '-page-' + lastLabel,
      pageNavNumber: numberOfPages,
      disabled: !hasNext,
      onPageNavigate: onPageNavigate,
      label: lastLabel
    }));

    renderedElements = _react2.default.createElement(
      _ButtonGroup2.default,
      { className: 'btn-group-page-nav' },
      buttons
    );
  }

  return renderedElements;
};

Pagination.propTypes = {
  data: _propTypes2.default.array.isRequired,
  keyName: _propTypes2.default.string.isRequired,
  currentPage: _propTypes2.default.number.isRequired,
  onPageNavigate: _propTypes2.default.func.isRequired,
  rowsPerPage: _propTypes2.default.number,
  labels: _propTypes2.default.object
};

Pagination.defaultProps = {
  rowsPerPage: undefined,
  labels: {}
};

exports.default = Pagination;