import classNames from 'classnames';

export const makeClasses = classNames;
export function customJoin(
  array: string[],
  separator: string,
  lastSeparator: string = ''
) {
  return `${array.slice(0, -1).join(separator)}${lastSeparator ||
    separator}${array.slice(-1)}`;
}
