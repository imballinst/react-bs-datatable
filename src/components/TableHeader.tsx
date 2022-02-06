import React from 'react';
import { Form } from 'react-bootstrap';

import { useDatatableWrapper } from './DatatableWrapper';
import FontAwesome from './FontAwesome';
import { makeClasses } from '../helpers/object';
import {
  TableColumnType,
  SortType,
  TableRowType,
  CheckboxState,
  CheckboxOnChange
} from '../helpers/types';
import {
  getNextCheckboxState,
  GetNextCheckboxStateParams
} from '../helpers/checkbox';

export interface TableHeaderClasses {
  th?: string;
  thead?: string;
  tr?: string;
}

export interface TableHeaderProps<T> {
  tableHeaders: TableColumnType<T>[];
  classes?: TableHeaderClasses;
  controlledProps?: {
    onSortChange: (nextSort: SortType) => void;
    sortState: SortType;
    onCheckboxChange: CheckboxOnChange;
    filteredDataLength: number;
    checkboxState: Record<string, CheckboxState>;
  };
}

export function TableHeader<T extends TableRowType>({
  tableHeaders,
  classes,
  controlledProps
}: TableHeaderProps<T>) {
  const headings = [];
  const {
    onSortChange: onSortChangeContext,
    sortState: sortStateContext,
    onCheckboxChange: onCheckboxChangeContext,
    checkboxState: checkboxStateContext,
    checkboxRefs,
    filteredDataLength: filteredDataLengthContext,
    data
  } = useDatatableWrapper();

  const onSortChange = controlledProps?.onSortChange || onSortChangeContext;
  const sortState = controlledProps?.sortState || sortStateContext;
  const onCheckboxChange =
    controlledProps?.onCheckboxChange || onCheckboxChangeContext;
  const checkboxState = controlledProps?.checkboxState || checkboxStateContext;
  const filteredDataLength =
    controlledProps?.filteredDataLength || filteredDataLengthContext;

  for (let i = 0; i < tableHeaders.length; i += 1) {
    const {
      isSortable,
      prop: headerProp,
      title,
      headerCell,
      checkbox,
      alignment
    } = tableHeaders[i];
    const prop = headerProp.toString();

    const thClass = makeClasses({
      'thead-th': true,
      sortable: isSortable === true
    });
    const nextSort: SortType = { order: 'asc', prop };
    const isCurrentSort = sortState.prop === prop;
    const thProps: Record<string, any> = {
      key: `th-${i}`,
      className: makeClasses(
        thClass,
        classes?.th,
        // Alignment.
        {
          'text-start': alignment?.horizontal === 'left',
          'text-center': alignment?.horizontal === 'center',
          'text-end': alignment?.horizontal === 'right'
        }
      )
    };
    let sortIcon: 'sort' | 'sortUp' | 'sortDown' = 'sort';
    let sortIconRender = null;

    if (isSortable && !checkbox) {
      if (isCurrentSort) {
        // Depending on the sort order, add a `data-sort-order` attribute,
        // which is mostly for testing, as well as setting the icons and
        // the next sort type which will be used in the on click event.
        thProps['data-sort-order'] = sortState.order;

        if (sortState.order === 'asc') {
          sortIcon = 'sortUp';
          nextSort.order = 'desc';
        } else {
          sortIcon = 'sortDown';
        }
      }

      thProps.onClick = () => onSortChange(nextSort);
      thProps.role = 'button';

      sortIconRender = <FontAwesome icon={sortIcon} className="fa-fw" />;
    }

    let rendered;

    if (checkbox) {
      let numberOfSelectedRowsInCurrentPage = 0;
      let nextCheckboxType: GetNextCheckboxStateParams['type'];

      for (const row of data) {
        if (checkboxState[prop].selected.has(row[checkbox.idProp])) {
          numberOfSelectedRowsInCurrentPage += 1;
        }
      }

      if (numberOfSelectedRowsInCurrentPage === data.length) {
        nextCheckboxType = 'remove';
      } else {
        nextCheckboxType = 'add';
      }

      // Source for using visually hidden: https://www.w3.org/WAI/tutorials/forms/labels/#hiding-the-label-element.
      // TODO(imballinst): show the number of currently selected rows in the label.
      rendered = (
        <Form.Group controlId={`table-selection-all`}>
          <Form.Label className="visually-hidden">
            {nextCheckboxType === 'add'
              ? `Add ${
                  data.length - numberOfSelectedRowsInCurrentPage
                } rows to selection`
              : `Remove ${numberOfSelectedRowsInCurrentPage} rows from selection`}
          </Form.Label>
          <Form.Check
            type="checkbox"
            name="table-selection"
            value="all"
            className={checkbox.className}
            checked={checkboxState[prop].state === 'all-selected'}
            ref={(node: HTMLInputElement | null) => {
              if (node !== null) {
                checkboxRefs.current[prop] = node;
              }
            }}
            onChange={() => {
              onCheckboxChange({
                prop,
                idProp: checkbox.idProp,
                nextCheckboxState: getNextCheckboxState({
                  checkboxState,
                  data,
                  idProp: checkbox.idProp,
                  filteredDataLength,
                  prop,
                  type: nextCheckboxType
                }),
                checkboxRefs
              });
            }}
          />
        </Form.Group>
      );
    } else if (headerCell) {
      rendered = headerCell(sortIconRender, sortState);
    } else {
      rendered = (
        <>
          {title}
          <span>{sortIconRender}</span>
        </>
      );
    }

    headings.push(<th {...thProps}>{rendered}</th>);
  }

  return (
    <thead className={makeClasses('thead', classes?.thead)}>
      <tr className={makeClasses('thead-tr', classes?.tr)}>{headings}</tr>
    </thead>
  );
}
