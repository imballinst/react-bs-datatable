import classNames from 'classnames';

export const makeClasses = classNames;
export function customJoin(
  array: string[],
  separator: string,
  lastSeparator: string = ''
) {
  const lastSep =
    array.length === 2 ? lastSeparator : `${separator}${lastSeparator}`;

  return `${array.slice(0, -1).join(separator)}${lastSep}${array.slice(-1)}`;
}
