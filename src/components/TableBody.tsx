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

/** This is an interface to customize the pagination options labels. */
export interface TableBodyLabels {
  /**
   * The text shown when there is no result, which can be because of
   * no data (empty array), or no matching found for the filtered text.
   */
  noResults?: string;
}

/**
 * This is an interface for customizing the classes for
 * the `TableBody` component.
 */
export interface TableBodyClasses {
  /** The class for the `tbody` tag. */
  tbody?: string;
  /** The class for the `tr` tags inside `tbody`. */
  tr?: string;
  /** The class for the `td` tags inside each `tr` tag. */
  td?: string;
}

export type TableRowProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
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
  rowProps?: TableRowProps | ((row: TTableRowType) => TableRowProps);
  /** The function fired when any of the rows is clicked. */
  onRowClick?: (row: TTableRowType) => void;
  /** Props to make the component controlled. */
  controlledProps?: {
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
  };
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
  controlledProps
}: TableBodyProps<TTableRowType>) {
  const {
    data,
    headers,
    onCheckboxChange: onCheckboxChangeContext,
    checkboxState: checkboxStateContext,
    filteredDataLength: filteredDataLengthContext,
    checkboxRefs
  } = useDatatableWrapper();
  const body = [];
  const dataLength = data.length;
  const headersLength = headers.length;

  function onRowClick(rowIdx: number) {
    if (typeof onRowClickProp === 'function') {
      onRowClickProp(data[rowIdx]);
    }
  }

  const onCheckboxChange =
    controlledProps?.onCheckboxChange || onCheckboxChangeContext;
  const checkboxState = controlledProps?.checkboxState || checkboxStateContext;
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

      const { className: rowCustomClassName, ...restProps } =
        typeof rowProps === 'function'
          ? rowProps(data[rowIdx])
          : rowProps || {};

      body.push(
        <tr
          key={rowIdx}
          {...restProps}
          className={makeClasses('tbody-tr', classes?.tr, rowCustomClassName)}
          onClick={() => onRowClick(rowIdx)}
        >
          {row}
        </tr>
      );
    }
  } else {
    body.push(
      <tr key={`row-zero-length`} className="tbody-tr">
        <td className="tbody-td" colSpan={headers.length}>
          {labels?.noResults || 'No results to be shown.'}
        </td>
      </tr>
    );
  }

  return <tbody className={makeClasses('tbody', classes?.tbody)}>{body}</tbody>;
}
