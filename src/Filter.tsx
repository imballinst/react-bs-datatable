import React from 'react';

import { TableClasses } from './helpers/types';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FontAwesome from './modules/FontAwesome';

type FilterGroupProps = {
  filterText: string;
  onChangeFilter: (event: any) => void;
  onClearFilter?: () => void;
  placeholder?: string;
  classes: TableClasses;
};

export type FilterGroupFunctionComponent = (
  props: FilterGroupProps
) => JSX.Element;

interface FilterProps extends FilterGroupProps {
  filterable: boolean;
  CustomFilterGroup?: FilterGroupFunctionComponent;
}

export function FilterGroup({
  classes,
  filterText,
  placeholder,
  onChangeFilter,
  onClearFilter
}: FilterGroupProps) {
  return (
    <InputGroup className={classes.filterInputGroup}>
      <Form.Control
        type="text"
        value={filterText}
        placeholder={placeholder}
        onChange={onChangeFilter}
        className={classes.filterFormControl}
      />
      <InputGroup.Append>
        <Button onClick={onClearFilter} className={classes.filterClearButton}>
          <FontAwesome icon="times" additionalClass="fa-fw" />
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

function Filter({
  filterable,
  filterText,
  placeholder = 'Enter text...',
  onChangeFilter,
  classes,
  CustomFilterGroup
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
    const UsedFilterGroup = CustomFilterGroup || FilterGroup;

    filterRender = (
      <UsedFilterGroup
        classes={classes}
        filterText={filterText}
        placeholder={placeholder}
        onChangeFilter={onInputChange}
        onClearFilter={onClearFilter}
      />
    );
  }

  return filterRender;
}

export default React.memo(Filter);
