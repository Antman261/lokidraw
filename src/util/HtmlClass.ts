export const classAttr = (staticClassText?: string) => {
  const classes: string[] = staticClassText?.split(' ') ?? [];
  const toString = (): string => classes.join(' ');
  const _ = Object.assign(toString, {
    toString,
    push: (...args: string[]) => classes.push(...args),
    add: (...args: string[]) => {
      classes.push(...args);
      return _;
    },
    at: (index: number) => classes.at(index),
    includes: (needle: string, from?: number) => classes.includes(needle, from),
    valueOf(): string {
      return toString();
    },
    [Symbol.toPrimitive](_: 'string' | 'number' | 'default'): string {
      return toString();
    },
  });
  return _;
};
