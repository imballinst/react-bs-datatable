import { CheckboxState } from './types';

export function getNextCheckboxState({
  checkboxState,
  prop,
  data,
  idProp
}: {
  checkboxState: Record<string, CheckboxState>;
  prop: string;
  data: any | any[];
  idProp: string;
}) {
  const nextCheckboxState = { ...checkboxState[prop] };

  if (checkboxState[prop].state === 'none-selected') {
    const newSet = new Set<string>();

    if (Array.isArray(data)) {
      for (const row of data) {
        newSet.add(row[idProp]);
      }
    } else {
      newSet.add(idProp);
    }

    nextCheckboxState.selected = newSet;
    nextCheckboxState.state =
      newSet.size === data.length ? 'all-selected' : 'some-selected';
  } else {
    const newSet = new Set<string>(checkboxState[prop].selected);

    if (Array.isArray(data)) {
      for (const row of data) {
        const value = row[idProp];
        addOrRemoveFromSet(newSet, value);
      }
    } else {
      addOrRemoveFromSet(newSet, data);
    }

    nextCheckboxState.selected = newSet;
    nextCheckboxState.state =
      newSet.size === 0 ? 'none-selected' : 'some-selected';
  }

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
