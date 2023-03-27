import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  act
} from '@testing-library/react';

import { Async, ControlledComposedTableRow } from './01-Controlled.stories';
import {
  CONTROLLED_HEADERS,
  fetchControlledMockData
} from './resources/shared-controlled';
import { TableColumnType } from '../helpers/types';

// TODO(imballinst): probably better if we use MSW
// instead of the `setTimeout` with `new Promise`.
test('Normal use case', async () => {
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
      rowOnClickFn={() => {}}
    />
  );

  await waitForElementToBeRemoved(() => queryByText('No results to be shown.'));

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

  let tableRows = tableElement.querySelector('tbody')?.querySelectorAll('tr');
  expect(tableRows).toBeDefined();
  expect(tableRows?.[0].querySelector('td')?.textContent).toBe('Wileen');
  expect(nameTh.getAttribute('data-sort-order')).toBe('desc');

  // Try sorting the other columns.
  let usernameTh = getByText('Username', { selector: 'th' });
  fireEvent.click(usernameTh);
  await act(async () => await sleep(200));

  // The clicked header should have its sort state.
  tableRows = tableElement.querySelector('tbody')?.querySelectorAll('tr');
  expect(tableRows).toBeDefined();
  expect(tableRows?.[0].querySelector('td')?.textContent).toBe('Aaren');
  expect(usernameTh.getAttribute('data-sort-order')).toBe('asc');
  // Meanwhile, the "Name" header should reset to its default state.
  expect(nameTh.getAttribute('data-sort-order')).toBe(null);
});

describe('Composed table row', () => {
  test('filter, sort, pagination', async () => {
    const {
      getByText,
      getByRole,
      getByLabelText,
      queryByText,
      getByPlaceholderText
    } = render(
      <ControlledComposedTableRow fetchFn={fetchControlledMockData} />
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

    let tableRows = tableElement.querySelector('tbody')?.querySelectorAll('tr');
    expect(tableRows).toBeDefined();
    expect(tableRows?.[0].querySelector('td')?.textContent).toBe('Wileen');
    expect(nameTh.getAttribute('data-sort-order')).toBe('desc');

    // Try sorting the other columns.
    let usernameTh = getByText('Username', { selector: 'th' });
    fireEvent.click(usernameTh);
    await act(async () => await sleep(200));

    // The clicked header should have its sort state.
    tableRows = tableElement.querySelector('tbody')?.querySelectorAll('tr');
    expect(tableRows).toBeDefined();
    expect(tableRows?.[0].querySelector('td')?.textContent).toBe('Aaren');
    expect(usernameTh.getAttribute('data-sort-order')).toBe('asc');
    // Meanwhile, the "Name" header should reset to its default state.
    expect(nameTh.getAttribute('data-sort-order')).toBe(null);
  });

  test('Custom row on click', async () => {
    const clickFn = jest.fn((name) => name);

    const { getByRole, queryByText } = render(
      <ControlledComposedTableRow
        fetchFn={fetchControlledMockData}
        rowOnClickFn={clickFn}
      />
    );

    await waitForElementToBeRemoved(() =>
      queryByText('No results to be shown.')
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

  test('checkbox states: none selected, some selected, all selected', async () => {
    const onCheckboxChange = jest.fn();

    const { getByText, getByLabelText, queryByText } = render(
      <ControlledComposedTableRow
        fetchFn={fetchControlledMockData}
        onCheckboxChange={onCheckboxChange}
      />
    );

    await waitForElementToBeRemoved(() =>
      queryByText('No results to be shown.')
    );

    let tableHeaderCheckbox = getByLabelText('Add 8 rows to selection');
    fireEvent.click(tableHeaderCheckbox);

    let bulkControlElement = getByText(/8 rows selected\./);
    let buttonBulkControlElement = getByText(/Select all rows/, {
      selector: 'button'
    });

    expect(bulkControlElement).toContainElement(buttonBulkControlElement);
    expect(tableHeaderCheckbox).not.toBeChecked();

    expect(onCheckboxChange.mock.calls[0][0].checkboxProp).toBe('checkbox');
    expect(onCheckboxChange.mock.calls[0][1].checkbox).toBeDefined();
    expect(onCheckboxChange.mock.calls[0][1].others).not.toBeDefined();

    // De-select one row.
    let aarenCheckbox = getByLabelText(/Remove Aaren from selection/);
    fireEvent.click(aarenCheckbox);

    bulkControlElement = getByText(/7 rows selected\./);
    buttonBulkControlElement = getByText(/Select all rows/, {
      selector: 'button'
    });

    expect(bulkControlElement).toContainElement(buttonBulkControlElement);
    expect(onCheckboxChange.mock.calls[1][0].checkboxProp).toBe('checkbox');
    expect(onCheckboxChange.mock.calls[1][1].checkbox).toBeDefined();
    expect(onCheckboxChange.mock.calls[1][1].others).not.toBeDefined();

    // Select all rows.
    fireEvent.click(buttonBulkControlElement);

    bulkControlElement = getByText(/All 60 rows selected\./);
    buttonBulkControlElement = getByText(/Deselect all rows/, {
      selector: 'button'
    });

    expect(bulkControlElement).toContainElement(buttonBulkControlElement);
    expect(tableHeaderCheckbox).toBeChecked();

    expect(onCheckboxChange.mock.calls[2][0].checkboxProp).toBe('checkbox');
    expect(onCheckboxChange.mock.calls[2][1].others).toBeDefined();
    expect(onCheckboxChange.mock.calls[2][1].checkbox).not.toBeDefined();

    // Deselect one row.
    // Although perhaps, the "Aaren" checkbox isn't going to be selected from the select all,
    // so this should result in only 8 rows selected.
    aarenCheckbox = getByLabelText(/Add Aaren to selection/);
    fireEvent.click(aarenCheckbox);

    bulkControlElement = getByText(/8 rows selected\./);
    buttonBulkControlElement = getByText(/Select all rows/, {
      selector: 'button'
    });

    expect(bulkControlElement).toContainElement(buttonBulkControlElement);
    expect(tableHeaderCheckbox).not.toBeChecked();

    expect(onCheckboxChange.mock.calls[3][0].checkboxProp).toBe('checkbox');
    expect(onCheckboxChange.mock.calls[3][1].checkbox).toBeDefined();
    expect(onCheckboxChange.mock.calls[3][1].others).not.toBeDefined();

    // Remove Aaren again.
    aarenCheckbox = getByLabelText(/Remove Aaren from selection/);
    fireEvent.click(aarenCheckbox);

    bulkControlElement = getByText(/7 rows selected\./);
    buttonBulkControlElement = getByText(/Select all rows/, {
      selector: 'button'
    });

    expect(bulkControlElement).toContainElement(buttonBulkControlElement);
    expect(tableHeaderCheckbox).not.toBeChecked();

    expect(onCheckboxChange.mock.calls[4][0].checkboxProp).toBe('checkbox');
    expect(onCheckboxChange.mock.calls[4][1].checkbox).toBeDefined();
    expect(onCheckboxChange.mock.calls[4][1].others).not.toBeDefined();
  });
});

function sleep(period: number) {
  return new Promise((resolve) => setTimeout(resolve, period));
}
