import React, { useCallback } from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';

import NavButton from './modules/NavButton';
import { LabelType, RowsPerPageType, TableClasses } from './utils/types';

type PaginationProps = {
  rowsPerPage: RowsPerPageType;
  currentPage: number;
  maxPage: number;
  onPageNavigate: any;
  labels: LabelType;
  classes: TableClasses;
};

export default function Pagination({
  rowsPerPage,
  currentPage,
  onPageNavigate,
  labels,
  maxPage
}: PaginationProps) {
  const paginateHandler = useCallback(
    (pageNum: number) => {
      return () => onPageNavigate(pageNum);
    },
    [onPageNavigate]
  );

  let renderedElements = null;

  if (rowsPerPage !== undefined) {
    const buttons = [];

    const firstLabel = labels.first || 'First';
    const prevLabel = labels.prev || 'Prev';
    const nextLabel = labels.next || 'Next';
    const lastLabel = labels.last || 'Last';

    const isCurrentPageOutOfBounds = currentPage > maxPage;
    let startNumber;
    let i = 0;
    let hasPrev = true;
    let hasNext = true;

    if (currentPage === 1) {
      // Active button is the first one.
      startNumber = 1;
      hasPrev = false;
      hasNext = maxPage > 1;
    } else if (currentPage === maxPage && maxPage !== 1) {
      // Active button is in the last.
      startNumber = maxPage - 2 > 0 ? currentPage - 2 : 1;
      hasNext = false;
    } else {
      // Active button is in the middle.
      startNumber = currentPage - 1;
    }

    buttons.push(
      <NavButton
        key={`page-${firstLabel}`}
        pageNumber={1}
        disabled={!hasPrev}
        onPageNavigate={paginateHandler}
        label={firstLabel}
      />,
      <NavButton
        key={`page-${prevLabel}`}
        // If out of bounds, prev button refers to the last page.
        pageNumber={isCurrentPageOutOfBounds ? maxPage : currentPage - 1}
        disabled={!hasPrev}
        onPageNavigate={paginateHandler}
        label={prevLabel}
      />
    );

    if (!isCurrentPageOutOfBounds) {
      while (i < 3 && startNumber <= maxPage) {
        const pageBtnProps = {
          key: `page-btn-${i}`,
          pageNumber: startNumber,
          disabled: currentPage === startNumber,
          onPageNavigate: paginateHandler,
          label: startNumber
        };

        buttons.push(<NavButton {...pageBtnProps} />);

        i += 1;
        startNumber += 1;
      }
    } else {
      // If current page is more than maxPage, we disable the button.
      // This is intentional so the user knows that no data in there.
      hasNext = false;
      buttons.push(
        <NavButton
          key={`page-btn-${startNumber}`}
          pageNumber={currentPage - 1}
          disabled
          onPageNavigate={paginateHandler}
          label={currentPage}
        />
      );
    }

    buttons.push(
      <NavButton
        key={`page-${nextLabel}`}
        pageNumber={currentPage + 1}
        disabled={!hasNext}
        onPageNavigate={paginateHandler}
        label={nextLabel}
      />,
      <NavButton
        key={`page-${lastLabel}`}
        pageNumber={maxPage}
        disabled={!hasNext}
        onPageNavigate={paginateHandler}
        label={lastLabel}
      />
    );

    renderedElements = (
      <ButtonGroup className="btn-group-page-nav">{buttons}</ButtonGroup>
    );
  }

  return renderedElements;
}
