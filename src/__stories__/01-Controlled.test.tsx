import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  act
} from '@testing-library/react';

import { Async } from './01-Controlled.stories';
import {
  CONTROLLED_HEADERS,
  fetchControlledMockData
} from './resources/shared-controlled';
import { TableColumnType } from '../helpers/types';

// TODO(imballinst): probably better if we use MSW
// instead of the `setTimeout` with `new Promise`.
describe('Controlled', () => {
  test('normal use case', async () => {
    const {
      getByText,
      getByRole,
      getByLabelText,
      queryByText,
      getByPlaceholderText
    } = render(
      <Async
        fetchFn={fetchControlledMockData}
        // Not sure why this is marked as `unknown`.
        headers={CONTROLLED_HEADERS as TableColumnType<unknown>[]}
        rowsPerPage={8}
        rowsPerPageOptions={[8, 16, 24, 32]}
      />
    );

    await waitForElementToBeRemoved(() =>
      queryByText('No results to be shown.')
    );

    let firstBtnElement = getByText('First');
    let lastBtnElement = getByText('Last');
    let tableElement = getByRole('table');

    expect(firstBtnElement).toBeDisabled();
    expect(lastBtnElement).toBeInTheDocument();

    // Test go to the last pagination.
    fireEvent.click(lastBtnElement);
    await act(async () => await sleep(200));

    await waitFor(() => expect(firstBtnElement).not.toBeDisabled());
    await waitFor(() => expect(lastBtnElement).toBeDisabled());

    // With 8 rows per page, the last page should only have 4 rows.
    expect(
      tableElement.querySelector('tbody')?.querySelectorAll('tr').length
    ).toBe(4);

    // Try filtering. It should go back to the first page.
    let filterElement = getByPlaceholderText('Enter text...');
    fireEvent.change(filterElement, { target: { value: 'aaren' } });
    await act(async () => await sleep(200));

    await waitFor(() => expect(firstBtnElement).toBeDisabled());

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
    await act(async () => await sleep(200));

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
    await act(async () => await sleep(200));

    expect(nameTh.getAttribute('data-sort-order')).toBe('desc');

    // Try sorting the other columns.
    let usernameTh = getByText('Username', { selector: 'th' });
    fireEvent.click(usernameTh);
    await act(async () => await sleep(200));

    // The clicked header should have its sort state.
    expect(usernameTh.getAttribute('data-sort-order')).toBe('asc');
    // Meanwhile, the "Name" header should reset to its default state.
    expect(nameTh.getAttribute('data-sort-order')).toBe(null);
  });
});

function sleep(period: number) {
  return new Promise((resolve) => setTimeout(resolve, period));
}
