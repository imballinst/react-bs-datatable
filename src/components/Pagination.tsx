import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

import { makeClasses } from '../helpers/object';
import { useDatatableWrapper } from './DatatableWrapper';

/** This is the labels related to the pagination. */
export interface PaginationLabels {
  /** Change the label of the button that if clicked, the paging will go to first page. */
  firstPage?: string;
  /** Change the label of the button that if clicked, the paging will go to last page. */
  lastPage?: string;
  /** Change the label of the button that if clicked, the paging will go to previous page. */
  prevPage?: string;
  /** Change the label of the button that if clicked, the paging will go to next page. */
  nextPage?: string;
}

export interface PaginationClasses {
  button?: string;
  buttonGroup?: string;
}

export interface PaginationProps {
  labels?: PaginationLabels;
  classes?: PaginationClasses;
  alwaysShowPagination?: boolean;
}

export default function Pagination({
  labels,
  classes,
  alwaysShowPagination = true
}: PaginationProps) {
  const { currentPageState, rowsPerPageState, maxPage, onPaginationChange } =
    useDatatableWrapper();

  if ((!alwaysShowPagination && maxPage === 1) || rowsPerPageState !== -1) {
    // Hide pagination if pagination is meant to not always be shown and the max page is 1,
    // or if rows per page is -1.
    return null;
  }

  const buttons = [];

  const firstLabel = labels?.firstPage || 'First';
  const prevLabel = labels?.prevPage || 'Prev';
  const nextLabel = labels?.nextPage || 'Next';
  const lastLabel = labels?.lastPage || 'Last';

  const isCurrentPageOutOfBounds = currentPageState > maxPage;
  let startNumber: number;
  let i = 0;
  let hasPrev = true;
  let hasNext = true;

  if (currentPageState === 1) {
    // Active button is the first one.
    startNumber = 1;
    hasPrev = false;
    hasNext = maxPage > 1;
  } else if (currentPageState === maxPage && maxPage !== 1) {
    // Active button is in the last.
    startNumber = maxPage - 2 > 0 ? currentPageState - 2 : 1;
    hasNext = false;
  } else {
    // Active button is in the middle.
    startNumber = currentPageState - 1;
  }

  buttons.push(
    <Button
      className={classes?.button}
      key={`page-${firstLabel}`}
      onClick={() => onPaginationChange(Number(1))}
      disabled={!hasPrev}
    >
      {firstLabel}
    </Button>,
    <Button
      className={classes?.button}
      key={`page-${prevLabel}`}
      // If out of bounds, prev button refers to the last page.
      onClick={() =>
        onPaginationChange(
          Number(isCurrentPageOutOfBounds ? maxPage : currentPageState - 1)
        )
      }
      disabled={!hasPrev}
    >
      {prevLabel}
    </Button>
  );

  if (!isCurrentPageOutOfBounds) {
    while (i < 3 && startNumber <= maxPage) {
      buttons.push(
        <Button
          key={`page-btn-${i}`}
          onClick={() => onPaginationChange(Number(startNumber))}
          disabled={currentPageState === startNumber}
          className={classes?.button}
        >
          {startNumber}
        </Button>
      );

      i += 1;
      startNumber += 1;
    }
  } else {
    // If current page is more than maxPage, we disable the button.
    // This is intentional so the user knows that no data in there.
    hasNext = false;
    buttons.push(
      <Button
        key={`page-btn-${startNumber}`}
        className={classes?.button}
        onClick={() => onPaginationChange(Number(currentPageState - 1))}
        disabled
      >
        {currentPageState}
      </Button>
    );
  }

  buttons.push(
    <Button
      className={classes?.button}
      key={`page-${nextLabel}`}
      onClick={() => onPaginationChange(Number(currentPageState + 1))}
      disabled={!hasNext}
    >
      {nextLabel}
    </Button>,
    <Button
      className={classes?.button}
      key={`page-${lastLabel}`}
      onClick={() => onPaginationChange(Number(maxPage))}
      disabled={!hasNext}
    >
      {lastLabel}
    </Button>
  );

  return (
    <ButtonGroup
      className={makeClasses('ButtonGroup__root', classes?.buttonGroup)}
    >
      {buttons}
    </ButtonGroup>
  );
}
