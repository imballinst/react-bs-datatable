import React from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { FilterOnChange } from '../helpers/types';
import { useDatatableWrapper } from './DatatableWrapper';
import FontAwesome from './FontAwesome';

/**
 * This is an interface for customizing the classes for
 * the `Filter` component.
 */
export interface FilterClasses {
  /**
   * The class for the input group, which covers the
   * text input and the clear button.
   */
  inputGroup?: string;
  /** The class for the text input. */
  input?: string;
  /** The class for the clear button. */
  clearButton?: string;
}

/**
 * This is an interface for `Filter` component props.
 */
export interface FilterProps {
  /**
   * Customize the string for the text filter placeholder.
   * By default, the text is "Enter text...".
   */
  placeholder?: string;
  /** Custom classes for the component. */
  classes?: FilterClasses;
  /** Props to make the component controlled. */
  controlledProps?: {
    /** The text filter. */
    filter?: string;
    /** The function fired when the text filter changes. */
    onFilter?: FilterOnChange;
  };
}

/**
 * Renders a control for the text filtering. This component is
 * only rendered when at least one of the headers have `isFilterable`
 * prop. Otherwise, this component will return `null`.
 */
export function Filter({
  placeholder = 'Enter text...',
  classes,
  controlledProps
}: FilterProps) {
  const {
    filterState: filterStateContext,
    onFilterChange: onFilterChangeContext,
    isFilterable
  } = useDatatableWrapper();

  if (!isFilterable) {
    return null;
  }

  // Controlled has the bigger priority.
  const onFilterChange = controlledProps?.onFilter || onFilterChangeContext;
  const filterState = controlledProps?.filter || filterStateContext;

  return (
    <InputGroup className={classes?.inputGroup}>
      <Form.Control
        type="text"
        name="table-filter"
        value={filterState}
        placeholder={placeholder}
        onChange={(e) => onFilterChange(e.target.value)}
        className={classes?.input}
      />
      <Button
        onClick={() => onFilterChange('')}
        className={classes?.clearButton}
        aria-label="Clear filter"
      >
        <FontAwesome icon="times" className="fa-fw" />
      </Button>
    </InputGroup>
  );
}
