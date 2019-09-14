import React from 'react';
import { storiesOf } from '@storybook/react';

import { css } from 'emotion';

import { categoryName } from './_base';

import moment from 'moment';
// In your setup, replace "../../" with "react-bs-datatable".
import Datatable from '../../';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Grid,
  ButtonGroup
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { makeClasses } from '../../helpers/object';

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

function FilterGroup({ classes, filterText, onChangeFilter, onClearFilter }) {
  return (
    <TextField
      fullWidth
      id="outlined-filter"
      label="Search text"
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

const classes = {
  buttonGroup: css`
    height: 100%;
  `,
  paginationButton: css`
    .ButtonGroup__root & {
      padding: 8px 12px;
    }
  `
};

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
      Row(props) {
        return <Grid container spacing={2} {...props} />;
      },
      Col(props) {
        return <Grid item {...props} />;
      },
      Table,
      TableHead,
      TableBody,
      TableCell,
      TableRow,
      ButtonGroup(props) {
        return (
          <ButtonGroup
            {...props}
            className={makeClasses(props.className, classes.buttonGroup)}
            size="large"
            variant="outlined"
          />
        );
      },
      Button(props) {
        return (
          <Button
            {...props}
            className={makeClasses(props.className, classes.paginationButton)}
          />
        );
      },
      FilterGroup,
      PaginationOptsGroup({ onChange, options, value }) {
        const inputLabel = React.useRef(null);
        const [labelWidth, setLabelWidth] = React.useState(0);
        React.useEffect(() => {
          if (inputLabel.current !== null) {
            setLabelWidth(inputLabel.current.offsetWidth);
          }
        }, [inputLabel.current]);

        return (
          <FormControl variant="outlined" fullWidth>
            <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
              Number of rows
            </InputLabel>
            <Select
              value={value}
              onChange={onChange}
              margin="none"
              input={
                <OutlinedInput
                  labelWidth={labelWidth}
                  name="age"
                  id="outlined-age-simple"
                />
              }
            >
              {options.map(opt => (
                <MenuItem value={opt} key={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }
    }}
  />
));
