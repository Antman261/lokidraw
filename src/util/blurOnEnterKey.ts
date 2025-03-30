import { JSX, RefObject } from "preact";

export const blurOnEnterKey =
  (ref: RefObject<HTMLInputElement>) =>
  (e: JSX.TargetedKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") ref.current?.blur();
  };
