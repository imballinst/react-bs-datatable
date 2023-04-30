import React, { useEffect, useMemo, useRef } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useControlledStateSetter } from '../helpers/hooks';

import { makeClasses } from '../helpers/object';
import { PaginationOnChange } from '../helpers/types';
import { useDatatableWrapper } from './DatatableWrapper';
import { getPageNumbers } from '../helpers/pagination';

const DEFAULT_PAGINATION_RANGE = 3;

/** This is an interface to customize the pagination labels. */
export interface PaginationLabels {
  /** The "First" button label. Defaults to "First". */
  firstPage?: string;
  /** The "Last" button label. Defaults to "Last". */
  lastPage?: string;
  /** The "Prev" button label. Defaults to "Prev". */
  prevPage?: string;
  /** The "Next" button label. Defaults to "Next". */
  nextPage?: string;
}

/**
 * This is an interface for customizing the classes for
 * the `Pagination` component.
 */
export interface PaginationClasses {
  /** The class for each of the pagination button. */
  button?: string;
  /** The class for the pagination button group. */
  buttonGroup?: string;
}

/**
 * This is an interface for `Pagination` component props.
 */
export interface PaginationProps {
  /** Customize the labels of the `Pagination` component. */
  labels?: PaginationLabels;
  /** Customize the classes of the `Pagination` component. */
  classes?: PaginationClasses;
  /**
   * Determine whether the pagination button group should be always visible or not.
   * When set to `false`, the pagination will be hidden when there is only 1 page.
   * To prevent layout shifts, `visibility: hidden` will be applied instead of
   * `display: none` style. Defaults to `true`.
   */
  alwaysShowPagination?: boolean;
  /**
   * The pagination range that shows between the "First"/"Prev" and "Next"/"Last" buttons.
   * Defaults to 3, for example: First, Prev, 1, 2, 3, Next, Last.
   * When set to 5, for example: First, Prev, 1, 2, 3, 4, 5 Next, Last.
   **/
  paginationRange?: number;
  /** Props to make the component controlled. */
  controlledProps?: {
    /** The currently active page. */
    currentPage?: number;
    /**
     * This is used to determine * the last numbered button in the
     * pagination button group. This also determines the next page number
     * when the "Last" button is clicked.
     */
    maxPage?: number;
    /** The function fired when any of the pagination buttons is clicked. */
    onPaginationChange?: PaginationOnChange;
  };
}

/**
 * Renders a control for the pagination. It consists of "First", "Prev",
 * "Next", and "Last" buttons. Additionally, between the "Prev" and "Next" buttons,
 * there will be at maximum 3 numbered buttons, indicating the pages to navigate.
 *
 * The currently active page will always be disabled, as well as the "First" or "Last"
 * buttons if the `currentPage` represents the first page and last page, respectively.
 *
 * When `alwaysShowPagination` is set to `false`, then this component will be visually hidden.
 */
export function Pagination({
  labels,
  classes,
  paginationRange = DEFAULT_PAGINATION_RANGE,
  alwaysShowPagination = true,
  controlledProps
}: PaginationProps) {
  const {
    currentPageState: currentPageStateContext,
    maxPage: maxPageContext,
    onPaginationChange: onPaginationChangeContext
  } = useDatatableWrapper();
  useControlledStateSetter(controlledProps);

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

  const prevPageNumbers = useRef<number[] | undefined>(undefined);
  const pageNumbers = useMemo(() => {
    return getPageNumbers({
      currentPageState,
      maxPage,
      paginationRange,
      prevPageNumbers: prevPageNumbers.current
    });
  }, [currentPageState, maxPage, paginationRange]);

  useEffect(() => {
    prevPageNumbers.current = pageNumbers;
  }, [pageNumbers]);

  const hasPrev = currentPageState !== 1;
  const hasNext = currentPageState !== maxPage;

  buttons.push(
    <Button
      className={classes?.button}
      key={`page-${firstLabel}`}
      onClick={() => onPaginationChange(1)}
      aria-label="Go to first page"
      disabled={!hasPrev}
    >
      {firstLabel}
    </Button>,
    <Button
      className={classes?.button}
      key={`page-${prevLabel}`}
      aria-label="Go to previous page"
      // If out of bounds, prev button refers to the last page.
      onClick={() => onPaginationChange(currentPageState - 1)}
      disabled={!hasPrev}
    >
      {prevLabel}
    </Button>,
    ...pageNumbers.map((pageNumber) => (
      <Button
        key={`page-btn-${pageNumber}`}
        onClick={() => onPaginationChange(pageNumber)}
        disabled={currentPageState === pageNumber}
        aria-label={`Go to page ${pageNumber}`}
        className={classes?.button}
      >
        {pageNumber}
      </Button>
    )),
    <Button
      className={classes?.button}
      key={`page-${nextLabel}`}
      onClick={() => onPaginationChange(currentPageState + 1)}
      aria-label="Go to next page"
      disabled={!hasNext}
    >
      {nextLabel}
    </Button>,
    <Button
      className={classes?.button}
      key={`page-${lastLabel}`}
      onClick={() => onPaginationChange(maxPage)}
      aria-label="Go to last page"
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
