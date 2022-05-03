import React from 'react';
import { Form } from 'react-bootstrap';

import {
  CheckboxOnChange,
  CheckboxState,
  TableRowType
} from '../helpers/types';
import { makeClasses } from '../helpers/object';
import { useDatatableWrapper } from './DatatableWrapper';
import { getNextCheckboxState } from '../helpers/checkbox';

export interface TableBodyLabels {
  /**
   * The text shown when there is no result, which can be because of
   * no data (empty array), or no matching found for the filtered text.
   */
  noResults?: string;
}

export interface TableBodyClasses {
  /** The class for the `tbody` tag. */
  tbody?: string;
  /** The class for the `tr` tags inside `tbody`. */
  tr?: string;
  /** The class for the `td` tags inside each `tr` tag. */
  td?: string;
}

interface TableBodyControlledProps {
  /**
   * A record, which key is the column prop name and the value
   * is of type `CheckboxState`.
   */
  checkboxState?: Record<string, CheckboxState>;
  /** The function fired when any checkbox in the table changes. */
  onCheckboxChange?: CheckboxOnChange;
  /**
   * The filtered data length. When not using filter control,
   * then this should equal to the table body's length.
   */
  filteredDataLength?: number;
}

export type HtmlTrProps = Omit<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  >,
  'onClick'
>;

/**
 * This is an interface for `TableBody` component props.
 */
export interface TableBodyProps<TTableRowType extends TableRowType> {
  /** Customize the labels of the `TableBody` component. */
  labels?: TableBodyLabels;
  /** Customize the classes of the `TableBody` component. */
  classes?: TableBodyClasses;
  /** The props passed to the table rows under `tbody`. */
  rowProps?: HtmlTrProps | ((row: TTableRowType) => HtmlTrProps);
  /** The function fired when any of the rows is clicked. */
  onRowClick?: (row: TTableRowType) => void;
  /** Props to make the component controlled. */
  controlledProps?: TableBodyControlledProps;
  /** The function to customize the table rows. */
  children?:
    | ((rows: TTableRowType[]) => JSX.Element | JSX.Element[])
    | JSX.Element
    | JSX.Element[];
}

/**
 * Renders the table body, which is a `tbody` tag along with the rest of the elements,
 * such as `tr` and `td` tags.
 */
export function TableBody<TTableRowType extends TableRowType>({
  labels,
  classes,
  rowProps,
  onRowClick: onRowClickProp,
  controlledProps,
  children
}: TableBodyProps<TTableRowType>) {
  const {
    data,
    headers,
    onCheckboxChange: onCheckboxChangeContext,
    checkboxState: checkboxStateContext,
    filteredDataLength: filteredDataLengthContext,
    checkboxRefs
  } = useDatatableWrapper();
  let bodyContent: JSX.Element | JSX.Element[];

  if (children) {
    if (typeof children === 'function') {
      bodyContent = children(data);
    } else {
      bodyContent = children;
    }
  } else {
    const body = [];
    const dataLength = data.length;
    const headersLength = headers.length;

    const onCheckboxChange =
      controlledProps?.onCheckboxChange || onCheckboxChangeContext;
    const checkboxState =
      controlledProps?.checkboxState || checkboxStateContext;
    const filteredDataLength =
      controlledProps?.filteredDataLength || filteredDataLengthContext;

    if (dataLength > 0) {
      for (let rowIdx = 0; rowIdx < dataLength; rowIdx++) {
        const row = [];

        for (let colIdx = 0; colIdx < headersLength; colIdx++) {
          const {
            cell,
            cellProps = {},
            prop: rawProp,
            checkbox,
            alignment
          } = headers[colIdx];
          const prop = rawProp.toString();
          let value: React.ReactNode = '';

          if (checkbox) {
            // Render checkbox.
            const idValue = data[rowIdx][checkbox.idProp];
            const isSelected = checkboxState[prop].selected.has(idValue);

            // Source for using visually hidden: https://www.w3.org/WAI/tutorials/forms/labels/#hiding-the-label-element.
            value = (
              <Form.Group
                controlId={`table-selection-${data[rowIdx][checkbox.idProp]}`}
              >
                <Form.Label className="visually-hidden">
                  {isSelected
                    ? `Remove ${idValue} from selection`
                    : `Add ${idValue} to selection`}
                </Form.Label>
                <Form.Check
                  type="checkbox"
                  name="table-selection"
                  value={data[rowIdx][checkbox.idProp]}
                  className={checkbox.className}
                  checked={checkboxState[prop].selected.has(idValue)}
                  onChange={() => {
                    onCheckboxChange({
                      prop,
                      idProp: checkbox.idProp,
                      nextCheckboxState: getNextCheckboxState({
                        checkboxState,
                        data: data[rowIdx],
                        idProp: checkbox.idProp,
                        filteredDataLength,
                        prop,
                        type: isSelected ? 'remove' : 'add'
                      }),
                      checkboxRefs
                    });
                  }}
                />
              </Form.Group>
            );
          } else {
            // Render normally.
            if (cell === undefined) {
              value = data[rowIdx][prop];
            } else {
              value = cell(data[rowIdx]);
            }
          }

          row.push(
            <td
              key={`col-${rowIdx}${colIdx}`}
              className={makeClasses(
                'tbody-td',
                classes?.td,
                // Alignment.
                {
                  'text-start': alignment?.horizontal === 'left',
                  'text-center': alignment?.horizontal === 'center',
                  'text-end': alignment?.horizontal === 'right'
                },
                typeof cellProps.className === 'function'
                  ? cellProps.className(data[rowIdx])
                  : cellProps.className
              )}
              style={
                typeof cellProps.style === 'function'
                  ? cellProps.style(data[rowIdx])
                  : cellProps.style
              }
            >
              {value}
            </td>
          );
        }

        body.push(
          <TableRow
            key={rowIdx}
            rowData={data[rowIdx]}
            rowProps={rowProps}
            classes={{ td: classes?.td, tr: classes?.tr }}
            controlledProps={controlledProps}
            onRowClick={onRowClickProp}
          />
        );
      }
    } else {
      body.push(
        <EmptyTablePlaceholder
          key="row-zero-length"
          noResultsLabel={labels?.noResults}
        />
      );
    }

    bodyContent = body;
  }

  return (
    <tbody className={makeClasses('tbody', classes?.tbody)}>
      {bodyContent}
    </tbody>
  );
}

// Composing functions.

/**
 * The props for the `TableRow` component.
 */
export interface TableRowProps<TTableRowType extends TableRowType> {
  /** The row data. */
  rowData: TTableRowType;
  /** Optional row on click event. */
  onRowClick?: (row: TTableRowType) => void;
  /** Classes for the rows and columns. */
  classes?: Omit<TableBodyClasses, 'tbody'>;
  /** Props to make the component controlled. */
  controlledProps?: TableBodyProps<TTableRowType>['controlledProps'];
  /** Props to the `tr` element. */
  rowProps?: TableBodyProps<TTableRowType>['rowProps'];
}

/**
 * `TableRow` component, as its name suggests, is a component to render a row of a table.
 * This component is exported so it is possible to compose the rows further. For example:
 *
 * ```
 * <TableBody>
 *   {
 *     data.map(row => (
 *       row.isLoading ? (
 *         <tr><td colSpan={headers.length}><Loading /></td></tr>
 *       ) : (
 *         <TableRow rowData={row} />
 *       )
 *     ))
 *   }
 * </TableBody>
 * ```
 *
 * The above snippet will render loading indicator for rows that don't have sufficient data to store yet.
 *
 * @param param0
 * @returns
 */
export function TableRow<TTableRowType extends TableRowType>({
  rowData,
  onRowClick: onRowClickProp,
  classes,
  controlledProps,
  rowProps
}: TableRowProps<TTableRowType>) {
  const {
    headers,
    onCheckboxChange: onCheckboxChangeContext,
    checkboxState: checkboxStateContext,
    filteredDataLength: filteredDataLengthContext,
    checkboxRefs
  } = useDatatableWrapper();
  const headersLength = headers.length;

  function onRowClick() {
    if (typeof onRowClickProp === 'function') {
      onRowClickProp(rowData);
    }
  }

  const onCheckboxChange =
    controlledProps?.onCheckboxChange || onCheckboxChangeContext;
  const checkboxState = controlledProps?.checkboxState || checkboxStateContext;
  const filteredDataLength =
    controlledProps?.filteredDataLength || filteredDataLengthContext;

  const row: JSX.Element[] = [];

  for (let colIdx = 0; colIdx < headersLength; colIdx++) {
    const {
      cell,
      cellProps = {},
      prop: rawProp,
      checkbox,
      alignment
    } = headers[colIdx];
    const prop = rawProp.toString();
    let value: React.ReactNode = '';

    if (checkbox && checkboxState && onCheckboxChange) {
      // Render checkbox.
      const idValue = rowData[checkbox.idProp];
      const isSelected = checkboxState[prop].selected.has(idValue);

      // Source for using visually hidden: https://www.w3.org/WAI/tutorials/forms/labels/#hiding-the-label-element.
      value = (
        <Form.Group controlId={`table-selection-${rowData[checkbox.idProp]}`}>
          <Form.Label className="visually-hidden">
            {isSelected
              ? `Remove ${idValue} from selection`
              : `Add ${idValue} to selection`}
          </Form.Label>
          <Form.Check
            type="checkbox"
            name="table-selection"
            value={rowData[checkbox.idProp]}
            className={checkbox.className}
            checked={checkboxState[prop].selected.has(idValue)}
            onChange={() => {
              onCheckboxChange({
                prop,
                idProp: checkbox.idProp,
                nextCheckboxState: getNextCheckboxState({
                  checkboxState,
                  data: rowData,
                  idProp: checkbox.idProp,
                  filteredDataLength,
                  prop,
                  type: isSelected ? 'remove' : 'add'
                }),
                checkboxRefs
              });
            }}
          />
        </Form.Group>
      );
    } else {
      // Render normally.
      if (cell === undefined) {
        value = rowData[prop];
      } else {
        value = cell(rowData);
      }
    }

    row.push(
      <td
        key={`col-${colIdx}`}
        className={makeClasses(
          'tbody-td',
          classes?.td,
          // Alignment.
          {
            'text-start': alignment?.horizontal === 'left',
            'text-center': alignment?.horizontal === 'center',
            'text-end': alignment?.horizontal === 'right'
          },
          typeof cellProps.className === 'function'
            ? cellProps.className(rowData)
            : cellProps.className
        )}
        style={
          typeof cellProps.style === 'function'
            ? cellProps.style(rowData)
            : cellProps.style
        }
      >
        {value}
      </td>
    );
  }

  let passedRowProps: HtmlTrProps = {};

  if (typeof rowProps === 'function') {
    passedRowProps = rowProps(rowData);
  } else if (rowProps !== undefined) {
    passedRowProps = rowProps;
  }

  return (
    <tr
      {...passedRowProps}
      className={makeClasses(
        'tbody-tr',
        classes?.tr,
        passedRowProps?.className
      )}
      onClick={onRowClick}
    >
      {row}
    </tr>
  );
}

/**
 * This is the props for the `EmptyTablePlaceholder` component.
 */
export interface EmptyTablePlaceholderProps {
  /** The className to pass to the component. */
  className?: string;
  /** The label that will show up when the table is empty. */
  noResultsLabel?: string;
}

/**
 * `EmptyTablePlaceholder` is a component used to indicate that a table is empty, or doesn't
 * have matching search results.
 *
 * @param param0
 * @returns
 */
export function EmptyTablePlaceholder({
  className,
  noResultsLabel
}: EmptyTablePlaceholderProps) {
  const { headers } = useDatatableWrapper();

  return (
    <tr className={makeClasses('tbody-tr', className)}>
      <td className="tbody-td" colSpan={headers.length}>
        {noResultsLabel || 'No results to be shown.'}
      </td>
    </tr>
  );
}
