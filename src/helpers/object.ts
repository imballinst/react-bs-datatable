import { DatatableProps } from './types';

export function makeClasses(...args: any[]) {
  const classes = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (argType === 'object') {
      for (const key in arg) {
        if (arg[key]) {
          classes.push(key);
        }
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

const includedProps = [
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
  const checkedPropsLength = includedProps.length;
  let isSame = true;
  let index = 0;

  while (isSame && index < checkedPropsLength) {
    const prop = includedProps[index];

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
