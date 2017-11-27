import React from 'react';
import PropTypes from 'prop-types';

import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';

import NavButton from './modules/NavButton';

const Pagination = ({ data, rowsPerPage, keyName, currentPage, onPageNavigate, labels }) => {
  let renderedElements = null;

  if (rowsPerPage !== undefined) {
    const dataLength = data.length;
    const numberOfPages = Math.ceil(dataLength / rowsPerPage);
    const buttons = [];

    const firstLabel = labels.first || 'First';
    const prevLabel = labels.prev || 'Prev';
    const nextLabel = labels.next || 'Next';
    const lastLabel = labels.last || 'Last';

    let startNumber;
    let i = 0;
    let hasPrev = true;
    let hasNext = true;

    if (currentPage === 1) {
      startNumber = 1;
      hasPrev = false;
      hasNext = (numberOfPages > 1);
    } else if (currentPage === numberOfPages && numberOfPages !== 1) {
      startNumber = (numberOfPages - 2 > 0) ? currentPage - 2 : 1;
      hasNext = false;
    } else {
      startNumber = currentPage - 1;
    }

    buttons.push(
      <NavButton
        key={`${keyName}-page-${firstLabel}`}
        pageNavNumber={1}
        disabled={!hasPrev}
        onPageNavigate={onPageNavigate}
        label={firstLabel}
      />,
      <NavButton
        key={`${keyName}-page-${prevLabel}`}
        pageNavNumber={currentPage - 1}
        disabled={!hasPrev}
        onPageNavigate={onPageNavigate}
        label={prevLabel}
      />,
    );

    while (i < 3 && startNumber <= numberOfPages) {
      const pageBtnProps = {
        key: `${keyName}-page-btn-${startNumber}`,
        onClick: onPageNavigate(startNumber),
        active: currentPage === startNumber,
      };

      buttons.push(
        <Button {...pageBtnProps}>
          {startNumber}
        </Button>,
      );

      i += 1;
      startNumber += 1;
    }

    buttons.push(
      <NavButton
        key={`${keyName}-page-${nextLabel}`}
        pageNavNumber={currentPage + 1}
        disabled={!hasNext}
        onPageNavigate={onPageNavigate}
        label={nextLabel}
      />,
      <NavButton
        key={`${keyName}-page-${lastLabel}`}
        pageNavNumber={numberOfPages}
        disabled={!hasNext}
        onPageNavigate={onPageNavigate}
        label={lastLabel}
      />,
    );

    renderedElements = (
      <ButtonGroup className="btn-group-page-nav">
        {buttons}
      </ButtonGroup>
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
  labels: PropTypes.object,
};

Pagination.defaultProps = {
  rowsPerPage: undefined,
  labels: {},
};

export default Pagination;
