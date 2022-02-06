import { getNextCheckboxState } from './checkbox';
import { CheckboxState } from './types';

test('getNextCheckboxState', () => {
  const filteredDataLength = 5;
  const checkboxState: Record<string, CheckboxState> = {
    checkbox: {
      selected: new Set(),
      state: 'none-selected'
    }
  };

  // Test check 2 boxes.
  let result = getNextCheckboxState({
    filteredDataLength,
    checkboxState,
    idProp: 'id',
    prop: 'checkbox',
    data: [{ id: 'hello' }, { id: 'world' }],
    type: 'add'
  });

  expect(result.selected.size).toBe(2);
  expect(result.selected.has('hello')).toBe(true);
  expect(result.selected.has('world')).toBe(true);
  expect(result.state).toBe('some-selected');

  // Test uncheck the same boxes.
  result = getNextCheckboxState({
    filteredDataLength,
    checkboxState: { checkbox: result },
    idProp: 'id',
    prop: 'checkbox',
    data: [{ id: 'hello' }, { id: 'world' }],
    type: 'remove'
  });

  expect(result.selected.size).toBe(0);
  expect(result.selected.has('hello')).toBe(false);
  expect(result.selected.has('world')).toBe(false);
  expect(result.state).toBe('none-selected');

  // Test check all boxes.
  result = getNextCheckboxState({
    filteredDataLength,
    checkboxState: { checkbox: result },
    idProp: 'id',
    prop: 'checkbox',
    data: [
      { id: 'hello' },
      { id: 'world' },
      { id: 'this' },
      { id: 'is' },
      { id: 'javascript' }
    ],
    type: 'add'
  });

  expect(result.selected.size).toBe(5);
  expect(result.selected.has('hello')).toBe(true);
  expect(result.selected.has('world')).toBe(true);
  expect(result.selected.has('this')).toBe(true);
  expect(result.selected.has('is')).toBe(true);
  expect(result.selected.has('javascript')).toBe(true);
  expect(result.state).toBe('all-selected');

  // Test uncheck 1 box. It should go to "some-selected".
  // This is also a good moment to test out the non-array version of `data` field.
  result = getNextCheckboxState({
    filteredDataLength,
    checkboxState: { checkbox: result },
    idProp: 'id',
    prop: 'checkbox',
    data: { id: 'javascript' },
    type: 'remove'
  });

  expect(result.selected.size).toBe(4);
  expect(result.selected.has('hello')).toBe(true);
  expect(result.selected.has('world')).toBe(true);
  expect(result.selected.has('this')).toBe(true);
  expect(result.selected.has('is')).toBe(true);
  expect(result.selected.has('javascript')).toBe(false);
  expect(result.state).toBe('some-selected');

  // Reset to initial state.
  result = getNextCheckboxState({
    filteredDataLength,
    checkboxState: { checkbox: result },
    idProp: 'id',
    prop: 'checkbox',
    data: [{ id: 'hello' }, { id: 'world' }, { id: 'this' }, { id: 'is' }],
    type: 'remove'
  });

  expect(result.selected.size).toBe(0);
  expect(result.selected.has('hello')).toBe(false);
  expect(result.selected.has('world')).toBe(false);
  expect(result.selected.has('this')).toBe(false);
  expect(result.selected.has('is')).toBe(false);
  expect(result.selected.has('javascript')).toBe(false);
  expect(result.state).toBe('none-selected');
});
