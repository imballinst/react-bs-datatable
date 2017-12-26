import React from 'react';
import PropTypes from 'prop-types';

import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';

import NavButton from './modules/NavButton';

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

    buttons.push(React.createElement(NavButton, {
      key: keyName + '-page-' + firstLabel,
      pageNavNumber: 1,
      disabled: !hasPrev,
      onPageNavigate: onPageNavigate,
      label: firstLabel
    }), React.createElement(NavButton, {
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

      buttons.push(React.createElement(
        Button,
        pageBtnProps,
        startNumber
      ));

      i += 1;
      startNumber += 1;
    }

    buttons.push(React.createElement(NavButton, {
      key: keyName + '-page-' + nextLabel,
      pageNavNumber: currentPage + 1,
      disabled: !hasNext,
      onPageNavigate: onPageNavigate,
      label: nextLabel
    }), React.createElement(NavButton, {
      key: keyName + '-page-' + lastLabel,
      pageNavNumber: numberOfPages,
      disabled: !hasNext,
      onPageNavigate: onPageNavigate,
      label: lastLabel
    }));

    renderedElements = React.createElement(
      ButtonGroup,
      { className: 'btn-group-page-nav' },
      buttons
    );
  }

  return renderedElements;
};

Pagination.propTypes = {
  data: PropTypes.array.isRequired,
  keyName: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageNavigate: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number,
  labels: PropTypes.object
};

Pagination.defaultProps = {
  rowsPerPage: undefined,
  labels: {}
};

export default Pagination;