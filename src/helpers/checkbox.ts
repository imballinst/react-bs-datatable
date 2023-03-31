import { CheckboxState } from './types';

/**
 * @internal
 *
 * This is an interface for the `getNextCheckboxState` function. Exported
 * for ease-of-use to get the matching type for the passed parameter.
 */
export interface GetNextCheckboxStateParams {
  checkboxState: Record<string, CheckboxState>;
  checkboxProp: string;
  data: Record<string, any> | Record<string, any>[];
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
  checkboxProp,
  data,
  filteredDataLength,
  idProp,
  type
}: GetNextCheckboxStateParams) {
  const nextCheckboxState = { ...checkboxState[checkboxProp] };
  const newSet = new Set<string>(checkboxState[checkboxProp].selected);

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
