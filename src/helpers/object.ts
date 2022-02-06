import { TableRowType } from './types';

/**
 * @internal
 *
 * This is a function to create a `className` string prop given
 * a list of arguments. Inspired by the `classnames` library.
 */
export function makeClasses(
  ...args: (string | Record<string, boolean> | undefined)[]
) {
  const classes = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;

    // String.
    if (typeof arg === 'string') {
      classes.push(arg);
      continue;
    }

    // Dictionary.
    for (const key in arg) {
      if (arg[key]) {
        classes.push(key);
      }
    }
  }

  return classes.join(' ');
}

/**
 * @internal
 *
 * This function converts an array to record, just for utility purposes.
 */
export function convertArrayToRecord<ElementType extends TableRowType>(
  array: ElementType[],
  propId: keyof ElementType
) {
  const record: Record<string, ElementType> = {};

  for (const element of array) {
    record[element[propId]] = element;
  }

  return record;
}
