import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { FilterSortPagination } from './00-Uncontrolled.stories';

test('Filter, sort, pagination', async () => {
  const props = {
    sortableFields: ['Name', 'Username', 'Last Update', 'Score'],
    filterableFields: ['Name', 'Username', 'Location'],
    // Test arbitrary numbers so that the last page has a different page number.
    rowsPerPage: 8,
    rowsPerPageOptions: [8, 16, 24, 32]
  };

  const { getByText, getByRole, getByLabelText, queryByText, debug } = render(
    <FilterSortPagination {...props} />
  );
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
  let filterElement = getByLabelText('Filter table columns');
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

  // TODO(imballinst): test sorting.
});
