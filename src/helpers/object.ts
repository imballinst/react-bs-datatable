import { DatatableProps, Dictionary } from './types';

export function makeClasses(
  ...args: (string | Dictionary<boolean> | undefined)[]
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

export function customJoin(
  array: string[],
  separator: string,
  lastSeparator: string = ''
) {
  const lastSep =
    array.length === 2 ? lastSeparator : `${separator}${lastSeparator}`;

  return `${array.slice(0, -1).join(separator)}${lastSep}${array.slice(-1)}`;
}

const INCLUDED_PROPS = [
  'classes',
  'async',
  'rowsPerPage',
  'rowsPerPageOption',
  'tableBody'
];

export function shouldTableUpdate(
  prevProps: DatatableProps,
  nextProps: DatatableProps
) {
  const checkedPropsLength = INCLUDED_PROPS.length;
  let isSame = true;
  let index = 0;

  while (isSame && index < checkedPropsLength) {
    const prop = INCLUDED_PROPS[index] as keyof DatatableProps;

    if (prevProps[prop] !== nextProps[prop]) {
      if (prop === 'rowsPerPageOption') {
        // First, check if defined -- defaults to empty array.
        const prevOptions = prevProps[prop] || [];
        const nextOptions = nextProps[prop] || [];

        // Then, check if they have same length.
        isSame = prevOptions.length === nextOptions.length;
      } else {
        isSame = false;
      }
    }

    index += 1;
  }

  return isSame;
}
