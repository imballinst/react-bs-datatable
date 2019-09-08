import React from 'react'; // Import React
import { storiesOf } from '@storybook/react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { categoryName } from './_base';

import moment from 'moment'; // Example for onSort prop
import Datatable from '../../Table'; // Import this package
import {
  Button,
  TextField,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

const header = [
  {
    title: 'Username (filterable)',
    prop: 'username',
    sortable: true,
    filterable: true
  },
  { title: 'Name', prop: 'realname', sortable: true },
  { title: 'Location', prop: 'location' },
  { title: 'Last Updated', prop: 'date', sortable: true }
];

const body = Array.from(new Array(57), () => {
  const rd = (Math.random() * 10).toFixed(1);

  if (rd > 0.5) {
    return {
      username: 'i-am-billy',
      realname: `Billy ${rd}`,
      location: 'Mars',
      date: moment()
        .subtract(1, 'days')
        .format('Do MMMM YYYY')
    };
  }

  return {
    username: 'john-nhoj',
    realname: `John ${rd}`,
    location: 'Saturn',
    date: moment()
      .subtract(2, 'days')
      .format('Do MMMM YYYY')
  };
});

const onSortFunction = {
  date(columnValue) {
    // Convert the string date format to UTC timestamp
    // So the table could sort it by number instead of by string
    return moment(columnValue, 'Do MMMM YYYY').valueOf();
  }
};

function FilterGroup({
  classes,
  filterText,
  onChangeFilter,
  onClearFilter,
  placeholder
}) {
  return (
    <TextField
      fullWidth
      id="outlined-filter"
      label={placeholder}
      className={classes.textField}
      value={filterText}
      onChange={onChangeFilter}
      margin="none"
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              aria-label="toggle password visibility"
              onClick={onClearFilter}
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
}

storiesOf(categoryName, module).add('Using Material UI Table', () => (
  <Datatable
    tableHeaders={header}
    tableBody={body}
    tableClass="striped hover responsive"
    rowsPerPage={5}
    rowsPerPageOption={[5, 10, 15, 20]}
    initialSort={{ prop: 'username', isAscending: true }}
    onSort={onSortFunction}
    Components={{
      Table,
      TableHead,
      TableBody,
      TableCell,
      TableRow,
      Button,
      FilterGroup
    }}
  />
));
