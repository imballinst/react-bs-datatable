import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { FilterSortPagination } from './00-Uncontrolled.stories';

describe('Filter, sort, pagination', () => {
  const DEFAULT_PROPS = {
    sortableFields: ['Name', 'Username', 'Last Update', 'Score'],
    filterableFields: ['Name', 'Username', 'Location'],
    // Test arbitrary numbers so that the last page has a different page number.
    rowsPerPage: 8,
    rowsPerPageOptions: [8, 16, 24, 32]
  };

  test('normal use case', () => {
    const {
      getByText,
      getByRole,
      getByLabelText,
      queryByText,
      getByPlaceholderText
    } = render(<FilterSortPagination {...DEFAULT_PROPS} />);
    let firstBtnElement = getByText('First');
    let lastBtnElement = getByText('Last');
    let tableElement = getByRole('table');

    expect(firstBtnElement).toBeDisabled();
    expect(lastBtnElement).toBeInTheDocument();

    // Test go to the last pagination.
    fireEvent.click(lastBtnElement);

    expect(firstBtnElement).not.toBeDisabled();
    expect(lastBtnElement).toBeDisabled();

    // With 8 rows per page, the last page should only have 4 rows.
    expect(
      tableElement.querySelector('tbody')?.querySelectorAll('tr').length
    ).toBe(4);

    // Try filtering. It should go back to the first page.
    let filterElement = getByPlaceholderText('Enter text...');
    fireEvent.change(filterElement, { target: { value: 'aaren' } });

    let firstNumButtonElement = queryByText('1');
    let secondNumButtonElement = queryByText('2');
    let thirdNumButtonElement = queryByText('3');
    firstBtnElement = getByText('First');
    lastBtnElement = getByText('Last');

    // All buttons should be disabled, and the "2" and "3" page button
    // should not exist in the table.
    expect(firstBtnElement).toBeDisabled();
    expect(lastBtnElement).toBeDisabled();
    expect(firstNumButtonElement).toBeDisabled();
    expect(secondNumButtonElement).not.toBeInTheDocument();
    expect(thirdNumButtonElement).not.toBeInTheDocument();

    expect(
      tableElement.querySelector('tbody')?.querySelectorAll('tr').length
    ).toBe(1);

    // Reset the filter first by clicking the "X" clear filter button.
    let clearFilterButton = getByLabelText('Clear filter');
    fireEvent.click(clearFilterButton);

    firstNumButtonElement = queryByText('1');
    secondNumButtonElement = queryByText('2');
    thirdNumButtonElement = queryByText('3');
    firstBtnElement = getByText('First');
    lastBtnElement = getByText('Last');

    expect(firstBtnElement).toBeDisabled();
    expect(lastBtnElement).not.toBeDisabled();
    expect(firstNumButtonElement).toBeDisabled();
    expect(secondNumButtonElement).not.toBeDisabled();
    expect(thirdNumButtonElement).not.toBeDisabled();

    expect(
      tableElement.querySelector('tbody')?.querySelectorAll('tr').length
    ).toBe(8);

    // Try sorting.
    // Sort descending the first column (since it's the initial state).
    let nameTh = getByText('Name', { selector: 'th' });
    fireEvent.click(nameTh);

    expect(nameTh.getAttribute('data-sort-order')).toBe('desc');

    // Try sorting the other columns.
    let usernameTh = getByText('Username', { selector: 'th' });
    fireEvent.click(usernameTh);

    // The clicked header should have its sort state.
    expect(usernameTh.getAttribute('data-sort-order')).toBe('asc');
    // Meanwhile, the "Name" header should reset to its default state.
    expect(nameTh.getAttribute('data-sort-order')).toBe(null);
  });

  test('filtering an unfilterable column: score', () => {
    const { getByLabelText, getByText, getByPlaceholderText } = render(
      <FilterSortPagination {...DEFAULT_PROPS} />
    );

    let filterElement = getByPlaceholderText('Enter text...');
    fireEvent.change(filterElement, { target: { value: '27' } });

    let noResultsShown = getByText('No results to be shown.');

    expect(noResultsShown).toBeInTheDocument();
  });

  test('setting `alwaysShowPagination` prop to `false`', () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <FilterSortPagination {...DEFAULT_PROPS} alwaysShowPagination={false} />
    );

    let filterElement = getByPlaceholderText('Enter text...');
    fireEvent.change(filterElement, { target: { value: 'aaren' } });

    let paginationButtonGroupElement = getByLabelText(
      'Pagination button group'
    );
    let paginationOptsElement = getByLabelText('Rows per page');

    expect(paginationButtonGroupElement).toHaveClass('invisible');
    expect(paginationOptsElement.parentElement).toHaveClass('invisible');
  });
});

describe('Custom labels', () => {
  const DEFAULT_PROPS = {
    sortableFields: ['Name', 'Username', 'Last Update', 'Score'],
    filterableFields: ['Name', 'Username', 'Location'],
    // Test arbitrary numbers so that the last page has a different page number.
    rowsPerPage: 8,
    rowsPerPageOptions: [8, 16, 24, 32]
  };

  test('change labels for filter placeholder, pagination opts, and pagination', () => {
    const { getByText, getByPlaceholderText } = render(
      <FilterSortPagination
        {...DEFAULT_PROPS}
        filterPlaceholder="Filter text..."
        beforeSelect="Show"
        afterSelect="Rows per page"
        firstPage="<<"
        lastPage=">>"
        nextPage=">"
        prevPage="<"
      />
    );

    expect(getByPlaceholderText('Filter text...')).toBeInTheDocument();
    expect(getByText('Show')).toBeInTheDocument();
    expect(getByText('Rows per page')).toBeInTheDocument();
    expect(getByText('<<')).toBeInTheDocument();
    expect(getByText('>>')).toBeInTheDocument();
    expect(getByText('>')).toBeInTheDocument();
    expect(getByText('<')).toBeInTheDocument();
  });
});

describe('Custom cell render', () => {
  const DEFAULT_PROPS = {
    sortableFields: ['Name', 'Username', 'Last Update', 'Score'],
    filterableFields: ['Name', 'Username', 'Location'],
    // Test arbitrary numbers so that the last page has a different page number.
    rowsPerPage: 8,
    rowsPerPageOptions: [8, 16, 24, 32]
  };
  // Can't use HEX here because it'll be converted to RGB.
  const BGCOLOR = 'rgb(207, 138, 138)';

  test('custom score cell color when number is below 50', () => {
    const { getByRole } = render(
      <FilterSortPagination {...DEFAULT_PROPS} scoreCellColumnColor={BGCOLOR} />
    );

    const tableElement = getByRole('table');
    const allTableHeaders = tableElement
      .querySelector('thead')
      ?.querySelectorAll('th');

    let scoreColumnIdx = 0;

    allTableHeaders?.forEach((el, idx) => {
      if (el.innerHTML.includes('Score')) {
        scoreColumnIdx = idx;
      }
    });

    const allTableRows = tableElement
      .querySelector('tbody')
      ?.querySelectorAll('tr');

    allTableRows?.forEach((el) => {
      const tds = el.querySelectorAll('td');

      tds.forEach((el, idx) => {
        if (idx === scoreColumnIdx) {
          // When bigger than 50, then it has no background.
          expect(el.style.background).toBe(
            Number(el.innerHTML) >= 50 ? '' : BGCOLOR
          );
        }
      });
    });
  });
});

describe('Custom row on click', () => {
  const DEFAULT_PROPS = {
    sortableFields: ['Name', 'Username', 'Last Update', 'Score'],
    filterableFields: ['Name', 'Username', 'Location'],
    // Test arbitrary numbers so that the last page has a different page number.
    rowsPerPage: 8,
    rowsPerPageOptions: [8, 16, 24, 32]
  };
  const clickFn = jest.fn((name) => name);

  test('custom score cell color when number is below 50', () => {
    const { getByRole } = render(
      <FilterSortPagination {...DEFAULT_PROPS} rowOnClickFn={clickFn} />
    );

    const tableElement = getByRole('table');
    const allTableRows = tableElement
      .querySelector('tbody')
      ?.querySelectorAll('tr');

    // Test click the row.
    allTableRows?.item(0).click();
    expect(clickFn).toBeCalledTimes(1);
    expect(clickFn.mock.calls[0][0]).toBe('Aaren');
  });
});
