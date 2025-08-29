import { Func } from './Func';

export const callArg = <Fn extends Func>(fn: Fn) => fn();
export const call =
  <Fn extends Func>(fn: Fn) =>
  () =>
    fn();
export const callWith =
  <Fn extends Func>(fn: Fn, ...args: Parameters<Fn>) =>
  () =>
    fn(...args);
