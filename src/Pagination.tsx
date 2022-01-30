import React, { useCallback } from 'react';

import { makeClasses } from './helpers/object';
import { Button, ButtonGroup } from 'react-bootstrap';

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
  rowsPerPage?: number;
  currentPage: number;
  maxPage?: number;
  onClick: (nextPage: number) => void;
  labels?: PaginationLabels;
  classes?: PaginationClasses;
}

export default function Pagination({
  rowsPerPage,
  currentPage,
  onClick,
  labels,
  maxPage,
  classes
}: PaginationProps) {
  let renderedElements = null;

  if (rowsPerPage !== undefined && maxPage !== undefined) {
    const buttons = [];

    const firstLabel = labels?.firstPage || 'First';
    const prevLabel = labels?.prevPage || 'Prev';
    const nextLabel = labels?.nextPage || 'Next';
    const lastLabel = labels?.lastPage || 'Last';

    const isCurrentPageOutOfBounds = currentPage > maxPage;
    let startNumber: number;
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
      <Button
        className={classes?.button}
        key={`page-${firstLabel}`}
        onClick={() => onClick(Number(1))}
        disabled={!hasPrev}
      >
        {firstLabel}
      </Button>,
      <Button
        className={classes?.button}
        key={`page-${prevLabel}`}
        // If out of bounds, prev button refers to the last page.
        onClick={() =>
          onClick(Number(isCurrentPageOutOfBounds ? maxPage : currentPage - 1))
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
            onClick={() => onClick(Number(startNumber))}
            disabled={currentPage === startNumber}
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
          onClick={() => onClick(Number(currentPage - 1))}
          disabled
        >
          {currentPage}
        </Button>
      );
    }

    buttons.push(
      <Button
        className={classes?.button}
        key={`page-${nextLabel}`}
        onClick={() => onClick(Number(currentPage + 1))}
        disabled={!hasNext}
      >
        {nextLabel}
      </Button>,
      <Button
        className={classes?.button}
        key={`page-${lastLabel}`}
        onClick={() => onClick(Number(maxPage))}
        disabled={!hasNext}
      >
        {lastLabel}
      </Button>
    );

    renderedElements = (
      <ButtonGroup
        className={makeClasses('ButtonGroup__root', classes?.buttonGroup)}
      >
        {buttons}
      </ButtonGroup>
    );
  }

  return renderedElements;
}
