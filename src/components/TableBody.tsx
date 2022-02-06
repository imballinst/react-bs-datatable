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

interface TableBodyClasses {
  tbody?: string;
  td?: string;
  tr?: string;
}

export interface TableBodyProps<TTableRowType extends TableRowType> {
  /** Labels/placeholders of the table components. */
  labels?: {
    noResults?: string;
  };
  classes?: TableBodyClasses;
  /** On row click event. */
  onRowClick?: (row: TTableRowType) => void;
  controlledProps?: {
    checkboxState: Record<string, CheckboxState>;
    onCheckboxChange: CheckboxOnChange;
    filteredDataLength: number;
  };
}

export function TableBody<TTableRowType extends TableRowType>({
  labels,
  classes,
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
                {isSelected ? 'Remove' : 'Add'} {idValue} from selection
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
        <tr
          key={rowIdx}
          className={makeClasses('tbody-tr', classes?.tr)}
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
