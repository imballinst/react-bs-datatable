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
  controlledProps?: {
    currentPage?: number;
    maxPage?: number;
    onPaginationChange?: (nextPage: number) => void;
  };
}

export function Pagination({
  labels,
  classes,
  alwaysShowPagination = true,
  controlledProps
}: PaginationProps) {
  const {
    currentPageState: currentPageStateContext,
    maxPage: maxPageContext,
    onPaginationChange: onPaginationChangeContext
  } = useDatatableWrapper();

  // Controlled has the bigger priority.
  const currentPageState =
    controlledProps?.currentPage || currentPageStateContext;
  const maxPage = controlledProps?.maxPage || maxPageContext;
  const onPaginationChange =
    controlledProps?.onPaginationChange || onPaginationChangeContext;

  // Hide pagination if pagination is meant to not always be shown and the max page is 1,
  // or if rows per page is -1.
  const hidePagination = !alwaysShowPagination && maxPage === 1;

  const buttons = [];
  const firstLabel = labels?.firstPage || 'First';
  const prevLabel = labels?.prevPage || 'Prev';
  const nextLabel = labels?.nextPage || 'Next';
  const lastLabel = labels?.lastPage || 'Last';

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
      onClick={() => onPaginationChange(1)}
      disabled={!hasPrev}
    >
      {firstLabel}
    </Button>,
    <Button
      className={classes?.button}
      key={`page-${prevLabel}`}
      // If out of bounds, prev button refers to the last page.
      onClick={() => onPaginationChange(currentPageState - 1)}
      disabled={!hasPrev}
    >
      {prevLabel}
    </Button>
  );

  const pageNumbers: number[] = [];

  while (i < 3 && startNumber <= maxPage) {
    pageNumbers.push(startNumber);
    // Increment all.
    i += 1;
    startNumber += 1;
  }

  buttons.push(
    ...pageNumbers.map((pageNumber) => (
      <Button
        key={`page-btn-${pageNumber}`}
        onClick={() => onPaginationChange(pageNumber)}
        disabled={currentPageState === pageNumber}
        className={classes?.button}
      >
        {pageNumber}
      </Button>
    )),
    <Button
      className={classes?.button}
      key={`page-${nextLabel}`}
      onClick={() => onPaginationChange(currentPageState + 1)}
      disabled={!hasNext}
    >
      {nextLabel}
    </Button>,
    <Button
      className={classes?.button}
      key={`page-${lastLabel}`}
      onClick={() => onPaginationChange(maxPage)}
      disabled={!hasNext}
    >
      {lastLabel}
    </Button>
  );

  return (
    <ButtonGroup
      aria-label="Pagination button group"
      className={makeClasses('ButtonGroup__root', classes?.buttonGroup, {
        invisible: hidePagination
      })}
    >
      {buttons}
    </ButtonGroup>
  );
}
