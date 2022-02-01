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
}

export function Filter({
  placeholder = 'Enter text...',
  classes
}: FilterProps) {
  const { filterState, onFilterChange, isFilterable } = useDatatableWrapper();

  if (!isFilterable) {
    return null;
  }

  return (
    <InputGroup className={classes?.inputGroup}>
      <Form.Control
        type="text"
        value={filterState}
        placeholder={placeholder}
        onChange={(e) => onFilterChange(e.target.value)}
        className={classes?.formControl}
      />
      <Button
        onClick={() => onFilterChange('')}
        className={classes?.clearButton}
      >
        <FontAwesome icon="times" className="fa-fw" />
      </Button>
    </InputGroup>
  );
}
