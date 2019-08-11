import React from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import NavButton from './modules/NavButton';
import { LabelType, RowsPerPageType, TableClasses } from './utils/types';

type PaginationProps = {
  data: any[];
  rowsPerPage: RowsPerPageType;
  currentPage: number;
  onPageNavigate: any;
  labels: LabelType;
  classes: TableClasses;
};

export default function Pagination({
  data,
  rowsPerPage,
  currentPage,
  onPageNavigate,
  labels
}: PaginationProps) {
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
      hasNext = numberOfPages > 1;
    } else if (currentPage === numberOfPages && numberOfPages !== 1) {
      startNumber = numberOfPages - 2 > 0 ? currentPage - 2 : 1;
      hasNext = false;
    } else {
      startNumber = currentPage - 1;
    }

    buttons.push(
      <NavButton
        key={`page-${firstLabel}`}
        pageNumber={1}
        disabled={!hasPrev}
        onPageNavigate={onPageNavigate}
        label={firstLabel}
      />,
      <NavButton
        key={`page-${prevLabel}`}
        pageNumber={currentPage - 1}
        disabled={!hasPrev}
        onPageNavigate={onPageNavigate}
        label={prevLabel}
      />
    );

    while (i < 3 && startNumber <= numberOfPages) {
      const pageBtnProps = {
        key: `page-btn-${startNumber}`,
        onClick: onPageNavigate(startNumber),
        active: currentPage === startNumber
      };

      buttons.push(<Button {...pageBtnProps}>{startNumber}</Button>);

      i += 1;
      startNumber += 1;
    }

    buttons.push(
      <NavButton
        key={`page-${nextLabel}`}
        pageNumber={currentPage + 1}
        disabled={!hasNext}
        onPageNavigate={onPageNavigate}
        label={nextLabel}
      />,
      <NavButton
        key={`page-${lastLabel}`}
        pageNumber={numberOfPages}
        disabled={!hasNext}
        onPageNavigate={onPageNavigate}
        label={lastLabel}
      />
    );

    renderedElements = (
      <ButtonGroup className="btn-group-page-nav">{buttons}</ButtonGroup>
    );
  }

  return renderedElements;
}
