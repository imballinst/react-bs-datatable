import { CheckboxState } from './types';

export function getNextCheckboxState({
  checkboxState,
  prop,
  data,
  filteredDataLength,
  idProp
}: {
  checkboxState: Record<string, CheckboxState>;
  prop: string;
  data: any | any[];
  filteredDataLength: number;
  idProp: string;
}) {
  const nextCheckboxState = { ...checkboxState[prop] };

  // None selected.
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
  const newSet = new Set<string>(checkboxState[prop].selected);

  if (Array.isArray(data)) {
    for (const row of data) {
      const value = row[idProp];
      addOrRemoveFromSet(newSet, value);
    }
  } else {
    addOrRemoveFromSet(newSet, data[idProp]);
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
function addOrRemoveFromSet(set: Set<string>, value: any) {
  // Depending on the checkbox state, delete or add.
  if (set.has(value)) {
    set.delete(value);
  } else {
    set.add(value);
  }
}
