import React from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import FontAwesome from './modules/FontAwesome';
import { TableClasses } from './utils/types';

type FilterProps = {
  filterable: boolean;
  filterText: string;
  onChangeFilter: any;
  placeholder?: string;
  classes: TableClasses;
};

export default function Filter({
  filterable,
  filterText,
  placeholder = 'Enter text...',
  onChangeFilter
}: FilterProps) {
  // Event handlers.
  function onInputChange(e: any) {
    onChangeFilter(e.target.value);
  }

  function onClearFilter() {
    onChangeFilter('');
  }

  let filterRender = null;

  if (filterable) {
    filterRender = (
      <InputGroup>
        <FormControl
          type="text"
          value={filterText}
          placeholder={placeholder}
          onChange={onInputChange}
        />
        <InputGroup.Append>
          <Button onClick={onClearFilter}>
            <FontAwesome icon="times" additionalClass="fa-fw" />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }

  return filterRender;
}
