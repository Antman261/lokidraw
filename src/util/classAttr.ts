import { isTruthy } from "./isTruthy";

export const classAttr = (staticClassText?: string) => {
  const classes: string[] = staticClassText?.split(" ") ?? [];
  const toString = (): string => classes.filter(isTruthy).join(" ");
  return Object.assign(toString, classes, {
    toString,
    valueOf(): { class: string } {
      return { class: toString() };
    },
    [Symbol.toPrimitive](): string {
      return toString();
    },
  });
};
