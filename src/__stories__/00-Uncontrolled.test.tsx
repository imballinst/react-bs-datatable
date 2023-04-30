import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import {
  FilterSortPagination,
  CustomLabels,
  CustomCellRender,
  CustomTableRowProps,
  RowOnClick,
  UncontrolledWithRefEvents,
  RaisedTableContext,
  CustomThProps,
  ComposedTableRow
} from './00-Uncontrolled.stories';
import { StoryColumnType } from './resources/types';
import { CheckboxState } from '../helpers/types';

describe('Basic use cases', () => {
  test('thProps', () => {
    const { getByRole } = render(<CustomThProps thClassName="th--score" />);

    let tableElement = getByRole('table');

    expect(
      tableElement
        .querySelector('thead')
        ?.querySelectorAll('tr')
        .item(0)
        .querySelectorAll('th')
        .item(4).className
    ).toBe('thead-th th--score');
  });
});

describe('Filter, sort, pagination', () => {
  const DEFAULT_PROPS = {
    sortableFields: ['Name', 'Username', 'Last Update', 'Score'],
    filterableFields: ['Name', 'Username', 'Location'],
    // Test arbitrary numbers so that the last page has a different page number.
    rowsPerPage: 8,
    rowsPerPageOptions: [8, 16, 24, 32]
  };

  describe('initial states', () => {
    test('initial sort', () => {
      const { getByRole } = render(
        <FilterSortPagination
          {...DEFAULT_PROPS}
          sortProps={{
            initialState: {
              prop: 'score',
              order: 'desc'
            }
          }}
        />
      );

      let tableElement = getByRole('table');

      expect(
        tableElement
          .querySelector('tbody')
          ?.querySelectorAll('tr')
          .item(0)
          .querySelectorAll('td')
          .item(0).innerHTML
      ).toBe('Suzette');
    });
  });

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

    let tableRows = tableElement.querySelector('tbody')?.querySelectorAll('tr');
    expect(tableRows).toBeDefined();
    expect(tableRows?.[0].querySelector('td')?.textContent).toBe('Wileen');
    expect(nameTh.getAttribute('data-sort-order')).toBe('desc');

    // Try sorting the other columns.
    let usernameTh = getByText('Username', { selector: 'th' });
    fireEvent.click(usernameTh);

    // The clicked header should have its sort state.
    tableRows = tableElement.querySelector('tbody')?.querySelectorAll('tr');
    expect(tableRows).toBeDefined();
    expect(tableRows?.[0].querySelector('td')?.textContent).toBe('Aaren');
    expect(usernameTh.getAttribute('data-sort-order')).toBe('asc');
    // Meanwhile, the "Name" header should reset to its default state.
    expect(nameTh.getAttribute('data-sort-order')).toBe(null);
  });

  describe('custom pagination range', () => {
    test('odd', () => {
      const { getByText, queryByLabelText } = render(
        <FilterSortPagination {...DEFAULT_PROPS} paginationRange={5} />
      );
      let firstBtnElement = getByText('First');
      let lastBtnElement = getByText('Last');
      let firstNumButtonElement = queryByLabelText('Go to page 1');
      let secondNumButtonElement = queryByLabelText('Go to page 2');
      let thirdNumButtonElement = queryByLabelText('Go to page 3');
      let fourthNumButtonElement = queryByLabelText('Go to page 4');
      let fifthNumButtonElement = queryByLabelText('Go to page 5');
      let sixthNumButtonElement = queryByLabelText('Go to page 6');

      expect(firstBtnElement).toBeDisabled();
      expect(lastBtnElement).not.toBeDisabled();
      expect(firstNumButtonElement).toBeDisabled();
      expect(secondNumButtonElement).not.toBeDisabled();
      expect(thirdNumButtonElement).not.toBeDisabled();
      expect(fourthNumButtonElement).not.toBeDisabled();
      expect(fifthNumButtonElement).not.toBeDisabled();
      expect(sixthNumButtonElement).not.toBeInTheDocument();

      // Test click the second page.
      secondNumButtonElement?.click();

      expect(firstBtnElement).not.toBeDisabled();
      expect(lastBtnElement).not.toBeDisabled();
      expect(firstNumButtonElement).not.toBeDisabled();
      expect(secondNumButtonElement).toBeDisabled();
      expect(thirdNumButtonElement).not.toBeDisabled();
      expect(fourthNumButtonElement).not.toBeDisabled();
      expect(fifthNumButtonElement).not.toBeDisabled();

      // Test click the third page.
      thirdNumButtonElement?.click();

      expect(firstBtnElement).not.toBeDisabled();
      expect(lastBtnElement).not.toBeDisabled();
      expect(firstNumButtonElement).not.toBeDisabled();
      expect(secondNumButtonElement).not.toBeDisabled();
      expect(thirdNumButtonElement).toBeDisabled();
      expect(fourthNumButtonElement).not.toBeDisabled();
      expect(fifthNumButtonElement).not.toBeDisabled();
      expect(sixthNumButtonElement).not.toBeInTheDocument();

      // Test click the fourth page.
      fourthNumButtonElement?.click();

      expect(firstBtnElement).not.toBeDisabled();
      expect(lastBtnElement).not.toBeDisabled();
      expect(firstNumButtonElement).not.toBeDisabled();
      expect(secondNumButtonElement).not.toBeDisabled();
      expect(thirdNumButtonElement).not.toBeDisabled();
      expect(fourthNumButtonElement).toBeDisabled();
      expect(fifthNumButtonElement).not.toBeDisabled();
      expect(sixthNumButtonElement).not.toBeInTheDocument();

      // Test click the fifth page.
      // The pagination should "shift".
      fifthNumButtonElement?.click();

      firstNumButtonElement = queryByLabelText('Go to page 1');
      secondNumButtonElement = queryByLabelText('Go to page 2');
      thirdNumButtonElement = queryByLabelText('Go to page 3');
      fourthNumButtonElement = queryByLabelText('Go to page 4');
      fifthNumButtonElement = queryByLabelText('Go to page 5');
      sixthNumButtonElement = queryByLabelText('Go to page 6');
      let seventhNumButtonElement = queryByLabelText('Go to page 7');
      let eighthNumButtonElement = queryByLabelText('Go to page 8');

      expect(firstBtnElement).not.toBeDisabled();
      expect(lastBtnElement).not.toBeDisabled();
      expect(firstNumButtonElement).not.toBeInTheDocument();
      expect(secondNumButtonElement).not.toBeInTheDocument();
      expect(thirdNumButtonElement).not.toBeDisabled();
      expect(fourthNumButtonElement).not.toBeDisabled();
      expect(fifthNumButtonElement).toBeDisabled();
      expect(sixthNumButtonElement).not.toBeDisabled();
      expect(seventhNumButtonElement).not.toBeDisabled();
      expect(eighthNumButtonElement).not.toBeInTheDocument();

      // Test click the fourth page.
      // The pagination should "shift" back.
      fourthNumButtonElement?.click();

      firstNumButtonElement = queryByLabelText('Go to page 1');
      secondNumButtonElement = queryByLabelText('Go to page 2');
      thirdNumButtonElement = queryByLabelText('Go to page 3');
      fourthNumButtonElement = queryByLabelText('Go to page 4');
      fifthNumButtonElement = queryByLabelText('Go to page 5');
      sixthNumButtonElement = queryByLabelText('Go to page 6');
      seventhNumButtonElement = queryByLabelText('Go to page 7');
      eighthNumButtonElement = queryByLabelText('Go to page 8');

      expect(firstBtnElement).not.toBeDisabled();
      expect(lastBtnElement).not.toBeDisabled();
      expect(firstNumButtonElement).not.toBeInTheDocument();
      expect(secondNumButtonElement).not.toBeDisabled();
      expect(thirdNumButtonElement).not.toBeDisabled();
      expect(fourthNumButtonElement).toBeDisabled();
      expect(fifthNumButtonElement).not.toBeDisabled();
      expect(sixthNumButtonElement).not.toBeDisabled();
      expect(seventhNumButtonElement).not.toBeInTheDocument();
      expect(eighthNumButtonElement).not.toBeInTheDocument();
    });

    test('even', () => {
      const { getByText, queryByLabelText } = render(
        <FilterSortPagination {...DEFAULT_PROPS} paginationRange={6} />
      );
      let firstBtnElement = getByText('First');
      let lastBtnElement = getByText('Last');
      let firstNumButtonElement = queryByLabelText('Go to page 1');
      let secondNumButtonElement = queryByLabelText('Go to page 2');
      let thirdNumButtonElement = queryByLabelText('Go to page 3');
      let fourthNumButtonElement = queryByLabelText('Go to page 4');
      let fifthNumButtonElement = queryByLabelText('Go to page 5');
      let sixthNumButtonElement = queryByLabelText('Go to page 6');
      let seventhNumButtonElement = queryByLabelText('Go to page 7');

      expect(firstBtnElement).toBeDisabled();
      expect(lastBtnElement).not.toBeDisabled();
      expect(firstNumButtonElement).toBeDisabled();
      expect(secondNumButtonElement).not.toBeDisabled();
      expect(thirdNumButtonElement).not.toBeDisabled();
      expect(fourthNumButtonElement).not.toBeDisabled();
      expect(fifthNumButtonElement).not.toBeDisabled();
      expect(sixthNumButtonElement).not.toBeDisabled();
      expect(seventhNumButtonElement).not.toBeInTheDocument();

      // Test click the second page.
      secondNumButtonElement?.click();

      expect(firstBtnElement).not.toBeDisabled();
      expect(lastBtnElement).not.toBeDisabled();
      expect(firstNumButtonElement).not.toBeDisabled();
      expect(secondNumButtonElement).toBeDisabled();
      expect(thirdNumButtonElement).not.toBeDisabled();
      expect(fourthNumButtonElement).not.toBeDisabled();
      expect(fifthNumButtonElement).not.toBeDisabled();
      expect(sixthNumButtonElement).not.toBeDisabled();
      expect(seventhNumButtonElement).not.toBeInTheDocument();

      // Test click the third page.
      thirdNumButtonElement?.click();

      expect(firstBtnElement).not.toBeDisabled();
      expect(lastBtnElement).not.toBeDisabled();
      expect(firstNumButtonElement).not.toBeDisabled();
      expect(secondNumButtonElement).not.toBeDisabled();
      expect(thirdNumButtonElement).toBeDisabled();
      expect(fourthNumButtonElement).not.toBeDisabled();
      expect(fifthNumButtonElement).not.toBeDisabled();
      expect(sixthNumButtonElement).not.toBeDisabled();
      expect(seventhNumButtonElement).not.toBeInTheDocument();

      // Test click the fourth page.
      fourthNumButtonElement?.click();

      expect(firstBtnElement).not.toBeDisabled();
      expect(lastBtnElement).not.toBeDisabled();
      expect(firstNumButtonElement).not.toBeDisabled();
      expect(secondNumButtonElement).not.toBeDisabled();
      expect(thirdNumButtonElement).not.toBeDisabled();
      expect(fourthNumButtonElement).toBeDisabled();
      expect(fifthNumButtonElement).not.toBeDisabled();
      expect(sixthNumButtonElement).not.toBeDisabled();
      expect(seventhNumButtonElement).not.toBeInTheDocument();

      // Test click the fifth page.
      // The pagination should "shift".
      fifthNumButtonElement?.click();

      firstNumButtonElement = queryByLabelText('Go to page 1');
      secondNumButtonElement = queryByLabelText('Go to page 2');
      thirdNumButtonElement = queryByLabelText('Go to page 3');
      fourthNumButtonElement = queryByLabelText('Go to page 4');
      fifthNumButtonElement = queryByLabelText('Go to page 5');
      sixthNumButtonElement = queryByLabelText('Go to page 6');
      seventhNumButtonElement = queryByLabelText('Go to page 7');
      let eighthNumButtonElement = queryByLabelText('Go to page 8');
      let ninthNumButtonElement = queryByLabelText('Go to page 9');

      expect(firstBtnElement).not.toBeDisabled();
      expect(lastBtnElement).not.toBeDisabled();
      expect(firstNumButtonElement).not.toBeInTheDocument();
      expect(secondNumButtonElement).not.toBeDisabled();
      expect(thirdNumButtonElement).not.toBeDisabled();
      expect(fourthNumButtonElement).not.toBeDisabled();
      expect(fifthNumButtonElement).toBeDisabled();
      expect(sixthNumButtonElement).not.toBeDisabled();
      expect(seventhNumButtonElement).not.toBeDisabled();
      expect(eighthNumButtonElement).not.toBeInTheDocument();
      expect(ninthNumButtonElement).not.toBeInTheDocument();

      // Test click the fourth page.
      // The pagination should "stay".
      fourthNumButtonElement?.click();

      firstNumButtonElement = queryByLabelText('Go to page 1');
      secondNumButtonElement = queryByLabelText('Go to page 2');
      thirdNumButtonElement = queryByLabelText('Go to page 3');
      fourthNumButtonElement = queryByLabelText('Go to page 4');
      fifthNumButtonElement = queryByLabelText('Go to page 5');
      sixthNumButtonElement = queryByLabelText('Go to page 6');
      seventhNumButtonElement = queryByLabelText('Go to page 7');
      eighthNumButtonElement = queryByLabelText('Go to page 8');
      ninthNumButtonElement = queryByLabelText('Go to page 9');

      expect(firstBtnElement).not.toBeDisabled();
      expect(lastBtnElement).not.toBeDisabled();
      expect(firstNumButtonElement).not.toBeInTheDocument();
      expect(secondNumButtonElement).not.toBeDisabled();
      expect(thirdNumButtonElement).not.toBeDisabled();
      expect(fourthNumButtonElement).toBeDisabled();
      expect(fifthNumButtonElement).not.toBeDisabled();
      expect(sixthNumButtonElement).not.toBeDisabled();
      expect(seventhNumButtonElement).not.toBeDisabled();
      expect(eighthNumButtonElement).not.toBeInTheDocument();
      expect(ninthNumButtonElement).not.toBeInTheDocument();

      // Test click the second page.
      // The pagination should "shift left" by 2 values.
      secondNumButtonElement?.click();

      firstNumButtonElement = queryByLabelText('Go to page 1');
      secondNumButtonElement = queryByLabelText('Go to page 2');
      thirdNumButtonElement = queryByLabelText('Go to page 3');
      fourthNumButtonElement = queryByLabelText('Go to page 4');
      fifthNumButtonElement = queryByLabelText('Go to page 5');
      sixthNumButtonElement = queryByLabelText('Go to page 6');
      seventhNumButtonElement = queryByLabelText('Go to page 7');
      eighthNumButtonElement = queryByLabelText('Go to page 8');
      ninthNumButtonElement = queryByLabelText('Go to page 9');

      expect(firstBtnElement).not.toBeDisabled();
      expect(lastBtnElement).not.toBeDisabled();
      expect(firstNumButtonElement).not.toBeDisabled();
      expect(secondNumButtonElement).toBeDisabled();
      expect(thirdNumButtonElement).not.toBeDisabled();
      expect(fourthNumButtonElement).not.toBeDisabled();
      expect(fifthNumButtonElement).not.toBeDisabled();
      expect(sixthNumButtonElement).not.toBeDisabled();
      expect(seventhNumButtonElement).not.toBeInTheDocument();
      expect(ninthNumButtonElement).not.toBeInTheDocument();
    });
  });

  test('filtering an unfilterable column: score', () => {
    const { getByText, getByPlaceholderText } = render(
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

  test('checkbox states: none selected, some selected, all selected', () => {
    const { getByText, getByLabelText } = render(
      <FilterSortPagination {...DEFAULT_PROPS} hasCheckbox />
    );

    let tableHeaderCheckbox = getByLabelText('Add 8 rows to selection');
    fireEvent.click(tableHeaderCheckbox);

    let bulkControlElement = getByText(/8 rows selected\./);
    let buttonBulkControlElement = getByText(/Select all rows/, {
      selector: 'button'
    });

    expect(bulkControlElement).toContainElement(buttonBulkControlElement);
    expect(tableHeaderCheckbox).not.toBeChecked();

    // De-select one row.
    let aarenCheckbox = getByLabelText(/Remove Aaren from selection/);
    fireEvent.click(aarenCheckbox);

    bulkControlElement = getByText(/7 rows selected\./);
    buttonBulkControlElement = getByText(/Select all rows/, {
      selector: 'button'
    });

    expect(bulkControlElement).toContainElement(buttonBulkControlElement);

    // Select all rows.
    fireEvent.click(buttonBulkControlElement);

    bulkControlElement = getByText(/All 60 rows selected\./);
    buttonBulkControlElement = getByText(/Deselect all rows/, {
      selector: 'button'
    });

    expect(bulkControlElement).toContainElement(buttonBulkControlElement);
    expect(tableHeaderCheckbox).toBeChecked();

    // Deselect one row.
    aarenCheckbox = getByLabelText(/Remove Aaren from selection/);
    fireEvent.click(aarenCheckbox);

    bulkControlElement = getByText(/59 rows selected\./);
    buttonBulkControlElement = getByText(/Select all rows/, {
      selector: 'button'
    });

    expect(bulkControlElement).toContainElement(buttonBulkControlElement);
    expect(tableHeaderCheckbox).not.toBeChecked();

    // Select Aaren again.
    aarenCheckbox = getByLabelText(/Add Aaren to selection/);
    fireEvent.click(aarenCheckbox);

    bulkControlElement = getByText(/All 60 rows selected\./);
    buttonBulkControlElement = getByText(/Deselect all rows/, {
      selector: 'button'
    });

    expect(bulkControlElement).toContainElement(buttonBulkControlElement);
    expect(tableHeaderCheckbox).toBeChecked();
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
      <CustomLabels
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
      <CustomCellRender {...DEFAULT_PROPS} scoreCellColumnColor={BGCOLOR} />
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

describe('Custom table row props', () => {
  const DEFAULT_PROPS = {
    sortableFields: ['Name', 'Username', 'Last Update', 'Score'],
    filterableFields: ['Name', 'Username', 'Location'],
    // Test arbitrary numbers so that the last page has a different page number.
    rowsPerPage: 8,
    rowsPerPageOptions: [8, 16, 24, 32]
  };

  test('custom row color depending on number', () => {
    const { getByRole } = render(
      <CustomTableRowProps
        {...DEFAULT_PROPS}
        rowProps={(row: StoryColumnType) => ({
          style: { background: `rgba(128, 0, 0, ${row.score / 200})` }
        })}
      />
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

    allTableRows?.forEach((row) => {
      const tds = row.querySelectorAll('td');

      tds.forEach((el, idx) => {
        if (idx === scoreColumnIdx) {
          expect(row.style.background).toBe(
            `rgba(128, 0, 0, ${Number(el.innerHTML) / 200})`
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
  const clickFn = jest.fn();

  test('custom score cell color when number is below 50', () => {
    const { getByRole } = render(
      <RowOnClick {...DEFAULT_PROPS} rowOnClickFn={clickFn} />
    );

    const tableElement = getByRole('table');
    const allTableRows = tableElement
      .querySelector('tbody')
      ?.querySelectorAll('tr');

    // Test click the row.
    const firstRowFirstColumn = allTableRows
      ?.item(0)
      .children.item(0) as HTMLElement;
    firstRowFirstColumn.click();
    expect(clickFn).toBeCalledTimes(1);
    expect(clickFn.mock.calls[0][0]).toBe('Aaren');
    expect(clickFn.mock.calls[0][1].target.tagName).toBe('TD');
  });
});

describe('Trigger events from outside: sort', () => {
  const DEFAULT_PROPS = {
    sortableFields: ['Name', 'Username', 'Last Update', 'Score'],
    filterableFields: ['Name', 'Username', 'Location'],
    // Test arbitrary numbers so that the last page has a different page number.
    rowsPerPage: 8,
    rowsPerPageOptions: [8, 16, 24, 32]
  };

  test('sort name and username using external buttons', () => {
    const { getByText, getByRole } = render(
      <RaisedTableContext {...DEFAULT_PROPS} />
    );

    let tableElement = getByRole('table');
    // We are doing the same sort scenario like the normal use case,
    // but we are doing it using the refs instead.
    // Sort descending the first column (since it's the initial state).
    let externalSortNameBtn = getByText('External sort by name', {
      selector: 'button'
    });
    let nameTh = getByText('Name', { selector: 'th' });
    fireEvent.click(externalSortNameBtn);

    let tableRows = tableElement.querySelector('tbody')?.querySelectorAll('tr');
    expect(tableRows).toBeDefined();
    expect(tableRows?.[0].querySelector('td')?.textContent).toBe('Wileen');
    expect(nameTh.getAttribute('data-sort-order')).toBe('desc');

    // Try sorting the other columns.
    let externalSortUsernameBtn = getByText('External sort by username', {
      selector: 'button'
    });
    let usernameTh = getByText('Username', { selector: 'th' });
    fireEvent.click(externalSortUsernameBtn);

    // The clicked header should have its sort state.
    tableRows = tableElement.querySelector('tbody')?.querySelectorAll('tr');
    expect(tableRows).toBeDefined();
    expect(tableRows?.[0].querySelector('td')?.textContent).toBe('Aaren');
    expect(usernameTh.getAttribute('data-sort-order')).toBe('asc');
    // Meanwhile, the "Name" header should reset to its default state.
    expect(nameTh.getAttribute('data-sort-order')).toBe(null);
  });

  test('sort name and username using external buttons (deprecated)', () => {
    const { getByText, getByRole } = render(
      <UncontrolledWithRefEvents {...DEFAULT_PROPS} />
    );

    let tableElement = getByRole('table');
    // We are doing the same sort scenario like the normal use case,
    // but we are doing it using the refs instead.
    // Sort descending the first column (since it's the initial state).
    let externalSortNameBtn = getByText('External sort by name', {
      selector: 'button'
    });
    let nameTh = getByText('Name', { selector: 'th' });
    fireEvent.click(externalSortNameBtn);

    let tableRows = tableElement.querySelector('tbody')?.querySelectorAll('tr');
    expect(tableRows).toBeDefined();
    expect(tableRows?.[0].querySelector('td')?.textContent).toBe('Wileen');
    expect(nameTh.getAttribute('data-sort-order')).toBe('desc');

    // Try sorting the other columns.
    let externalSortUsernameBtn = getByText('External sort by username', {
      selector: 'button'
    });
    let usernameTh = getByText('Username', { selector: 'th' });
    fireEvent.click(externalSortUsernameBtn);

    // The clicked header should have its sort state.
    tableRows = tableElement.querySelector('tbody')?.querySelectorAll('tr');
    expect(tableRows).toBeDefined();
    expect(tableRows?.[0].querySelector('td')?.textContent).toBe('Aaren');
    expect(usernameTh.getAttribute('data-sort-order')).toBe('asc');
    // Meanwhile, the "Name" header should reset to its default state.
    expect(nameTh.getAttribute('data-sort-order')).toBe(null);
  });
});

describe('composed table rows', () => {
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
      } = render(<ComposedTableRow {...DEFAULT_PROPS} />);
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

      let tableRows = tableElement
        .querySelector('tbody')
        ?.querySelectorAll('tr');
      expect(tableRows).toBeDefined();
      expect(tableRows?.[0].querySelector('td')?.textContent).toBe('Wileen');
      expect(nameTh.getAttribute('data-sort-order')).toBe('desc');

      // Try sorting the other columns.
      let usernameTh = getByText('Username', { selector: 'th' });
      fireEvent.click(usernameTh);

      // The clicked header should have its sort state.
      tableRows = tableElement.querySelector('tbody')?.querySelectorAll('tr');
      expect(tableRows).toBeDefined();
      expect(tableRows?.[3].querySelector('td')?.textContent).toBe(
        'Row status unknown'
      );
      expect(usernameTh.getAttribute('data-sort-order')).toBe('asc');
      // Meanwhile, the "Name" header should reset to its default state.
      expect(nameTh.getAttribute('data-sort-order')).toBe(null);
    });

    test('filtering an unfilterable column: score', () => {
      const { getByText, getByPlaceholderText } = render(
        <ComposedTableRow {...DEFAULT_PROPS} />
      );

      let filterElement = getByPlaceholderText('Enter text...');
      fireEvent.change(filterElement, { target: { value: '27' } });

      let noResultsShown = getByText('No results to be shown.');

      expect(noResultsShown).toBeInTheDocument();
    });

    test('setting `alwaysShowPagination` prop to `false`', () => {
      const { getByLabelText, getByPlaceholderText } = render(
        <ComposedTableRow {...DEFAULT_PROPS} alwaysShowPagination={false} />
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

    test('checkbox states: none selected, some selected, all selected', () => {
      const onCheckboxChange = jest.fn();

      const { getByText, getByLabelText } = render(
        <ComposedTableRow
          {...DEFAULT_PROPS}
          hasCheckbox
          onCheckboxChange={onCheckboxChange}
        />
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
      aarenCheckbox = getByLabelText(/Remove Aaren from selection/);
      fireEvent.click(aarenCheckbox);

      bulkControlElement = getByText(/59 rows selected\./);
      buttonBulkControlElement = getByText(/Select all rows/, {
        selector: 'button'
      });

      expect(bulkControlElement).toContainElement(buttonBulkControlElement);
      expect(tableHeaderCheckbox).not.toBeChecked();

      expect(onCheckboxChange.mock.calls[3][0].checkboxProp).toBe('checkbox');
      expect(onCheckboxChange.mock.calls[3][1].checkbox).toBeDefined();
      expect(onCheckboxChange.mock.calls[3][1].others).not.toBeDefined();

      // Select Aaren again.
      aarenCheckbox = getByLabelText(/Add Aaren to selection/);
      fireEvent.click(aarenCheckbox);

      bulkControlElement = getByText(/All 60 rows selected\./);
      buttonBulkControlElement = getByText(/Deselect all rows/, {
        selector: 'button'
      });

      expect(bulkControlElement).toContainElement(buttonBulkControlElement);
      expect(tableHeaderCheckbox).toBeChecked();

      expect(onCheckboxChange.mock.calls[4][0].checkboxProp).toBe('checkbox');
      expect(onCheckboxChange.mock.calls[4][1].checkbox).toBeDefined();
      expect(onCheckboxChange.mock.calls[4][1].others).not.toBeDefined();
    });

    test('checkbox states: override result', () => {
      const onCheckboxChange = jest.fn((result, event) => {
        // "Adriana" is always selected no matter what happens.
        const effectiveResult = result as {
          checkboxProp: string;
          nextCheckboxState: CheckboxState;
        };
        effectiveResult.nextCheckboxState.selected = new Set(['Adriana']);
        effectiveResult.nextCheckboxState.state = 'some-selected';

        return [effectiveResult, event];
      });

      const { getByText, getByLabelText } = render(
        <ComposedTableRow
          {...DEFAULT_PROPS}
          hasCheckbox
          onCheckboxChange={onCheckboxChange}
        />
      );

      let tableHeaderCheckbox = getByLabelText('Add 8 rows to selection');
      fireEvent.click(tableHeaderCheckbox);

      let bulkControlElement = getByText(/1 row selected\./);
      let buttonBulkControlElement = getByText(/Select all rows/, {
        selector: 'button'
      });

      expect(bulkControlElement).toContainElement(buttonBulkControlElement);
      expect(tableHeaderCheckbox).not.toBeChecked();

      expect(onCheckboxChange.mock.calls[0][0].checkboxProp).toBe('checkbox');
      expect(onCheckboxChange.mock.calls[0][1].checkbox).toBeDefined();
      expect(onCheckboxChange.mock.calls[0][1].others).not.toBeDefined();

      // De-select one row.
      let adrianaCheckbox = getByLabelText(/Remove Adriana from selection/);
      fireEvent.click(adrianaCheckbox);

      bulkControlElement = getByText(/1 row selected\./);
      buttonBulkControlElement = getByText(/Select all rows/, {
        selector: 'button'
      });

      expect(bulkControlElement).toContainElement(buttonBulkControlElement);
      expect(onCheckboxChange.mock.calls[1][0].checkboxProp).toBe('checkbox');
      expect(onCheckboxChange.mock.calls[1][1].checkbox).toBeDefined();
      expect(onCheckboxChange.mock.calls[1][1].others).not.toBeDefined();
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
        <ComposedTableRow {...DEFAULT_PROPS} rowOnClickFn={clickFn} />
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
});
