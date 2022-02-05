import React from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { useDatatableWrapper } from './DatatableWrapper';
import FontAwesome from './FontAwesome';

export interface FilterClasses {
  inputGroup?: string;
  formControl?: string;
  clearButton?: string;
}

export interface FilterProps {
  placeholder?: string;
  classes?: FilterClasses;
  // Controlled props.
  controlledProps?: {
    filter: string;
    onFilter: (nextFilter: string) => void;
  };
}

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
        className={classes?.formControl}
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
