import { CheckboxState } from './types';

/**
 * @internal
 *
 * This is an interface for the `getNextCheckboxState` function. Exported
 * for ease-of-use to get the matching type for the passed parameter.
 */
export interface GetNextCheckboxStateParams {
  checkboxState: Record<string, CheckboxState>;
  prop: string;
  data: any | any[];
  filteredDataLength: number;
  idProp: string;
  type: 'add' | 'remove';
}

/**
 * @internal
 *
 * This function is used to get the next checkbox state. This function is separated
 * because the checkbox state is used in both `TableHeader` and `TableBody` components.
 */
export function getNextCheckboxState({
  checkboxState,
  prop,
  data,
  filteredDataLength,
  idProp,
  type
}: GetNextCheckboxStateParams) {
  const nextCheckboxState = { ...checkboxState[prop] };

  // None selected.
  // This one is easy, just add all of them.
  if (checkboxState[prop].state === 'none-selected') {
    const newSet = new Set<string>();

    if (Array.isArray(data)) {
      for (const row of data) {
        newSet.add(row[idProp]);
      }
    } else {
      newSet.add(data[idProp]);
    }

    nextCheckboxState.selected = newSet;
    nextCheckboxState.state =
      newSet.size === filteredDataLength ? 'all-selected' : 'some-selected';

    return nextCheckboxState;
  }

  // Some, or all selected.
  // This is a bit tricky, because we need to consider whether we want to add or remove.
  const newSet = new Set<string>(checkboxState[prop].selected);

  if (Array.isArray(data)) {
    for (const row of data) {
      const value = row[idProp];
      addOrRemoveFromSet(newSet, value, type);
    }
  } else {
    addOrRemoveFromSet(newSet, data[idProp], type);
  }

  nextCheckboxState.selected = newSet;
  nextCheckboxState.state =
    newSet.size === 0
      ? 'none-selected'
      : newSet.size === filteredDataLength
      ? 'all-selected'
      : 'some-selected';

  return nextCheckboxState;
}

// Helper functions.
function addOrRemoveFromSet(
  set: Set<string>,
  value: any,
  type: GetNextCheckboxStateParams['type']
) {
  // Depending on the checkbox state, delete or add.
  if (type === 'remove') {
    set.delete(value);
  } else {
    set.add(value);
  }
}
