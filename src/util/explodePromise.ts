export const explodePromise = <T>() => {
  let resolver: (v: T) => void;
  let rejecter: <E extends Error>(e: E) => void;
  const promise = new Promise<T>((res, rej) => {
    resolver = res;
    rejecter = rej;
  });
  // @ts-expect-error values will definitely be defined, but ts doesn't know that
  return [promise, resolver, rejecter] as const;
};
