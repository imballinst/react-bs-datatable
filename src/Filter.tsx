import React from 'react';

import { TableClasses, TableComponents } from './helpers/types';

type FilterProps = {
  filterable: boolean;
  filterText: string;
  onChangeFilter: any;
  placeholder?: string;
  classes: TableClasses;
  components: {
    InputGroup: TableComponents['InputGroup'];
    FormControl: TableComponents['FormControl'];
    Adornment: TableComponents['Adornment'];
    Button: TableComponents['Button'];
    ClearIcon: TableComponents['ClearIcon'];
  };
};

export default function Filter({
  filterable,
  filterText,
  placeholder = 'Enter text...',
  onChangeFilter,
  classes,
  components: { InputGroup, FormControl, Adornment, Button, ClearIcon }
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
      <InputGroup className={classes.filterInputGroup}>
        <FormControl
          type="text"
          value={filterText}
          placeholder={placeholder}
          onChange={onInputChange}
          className={classes.filterFormControl}
        />
        <Adornment>
          <Button onClick={onClearFilter} className={classes.filterClearButton}>
            <ClearIcon icon="times" additionalClass="fa-fw" />
          </Button>
        </Adornment>
      </InputGroup>
    );
  }

  return filterRender;
}
