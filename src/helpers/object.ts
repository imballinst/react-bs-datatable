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
