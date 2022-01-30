import React from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import FontAwesome from './FontAwesome';

export interface FilterClasses {
  inputGroup?: string;
  formControl?: string;
  clearButton?: string;
}

export interface FilterProps {
  filterText: string;
  onChangeFilter: (nextFilterText: string) => void;
  placeholder?: string;
  classes?: FilterClasses;
}

export function Filter({
  filterText,
  placeholder = 'Enter text...',
  onChangeFilter,
  classes
}: FilterProps) {
  return (
    <InputGroup className={classes?.inputGroup}>
      <Form.Control
        type="text"
        value={filterText}
        placeholder={placeholder}
        onChange={(e) => onChangeFilter(e.target.value)}
        className={classes?.formControl}
      />
      <Button
        onClick={() => onChangeFilter('')}
        className={classes?.clearButton}
      >
        <FontAwesome icon="times" className="fa-fw" />
      </Button>
    </InputGroup>
  );
}
