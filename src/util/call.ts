import { Func } from "./Func";

export const call =
  <Fn extends Func>(fn: Fn) =>
  () =>
    fn();
