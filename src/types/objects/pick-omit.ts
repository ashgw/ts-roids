import type { Keys } from './keys';
import type { If } from '../logic';
import type { Equals } from '../logic';

/**
 * Get a set of properties from `T` whose type are not assignable to `P`.
 * @example
 * ````ts
 * type T = {
 *  foo: string,
 *  bar: bigint | boolean,
 *  baz: number,
 * }
 * OmitByType<T,true>; // Result: T
 * OmitByType<T,number>; // Result: { foo: string, bar: bigint | boolean }
 * ````
 */
export type OmitByType<T, P> = {
  [K in Keys<T> as T[K] extends P ? never : K]: T[K];
};

/**
 * From ``T``, pick a set of properties whose type are assignable to ``P``.
 * @example
 * ````ts
 * type T = {
 *  foo: string,
 *  bar: bigint | boolean,
 *  baz: number,
 * }
 * PickByType<T,true>; // Result: {}
 * PickByType<T,number>; // Result: { baz: number }
 * ````
 */
export type PickByType<T, P> = {
  [K in Keys<T> as T[K] extends P ? K : never]: T[K];
};

/**
 * From ``T``, pick a set of properties whose type excatly matches ``P``.
 * @example
 * ````ts
type OneLevelDeep = {
  foo: boolean;
  bar?: Numeric;
  baz: Nullable;
  fooBaz: bigint;
  bazFoo: string | boolean;
  seven: 7;
  aNum: number;
};
  type A = PickExactlyByType<OneLevelDeep, bigint>,
  // A results in:
    {
      fooBaz: bigint;
    },
  // Notice how it does not pick up seven
 type B = PickExactlyByType<OneLevelDeep, number>,
    {
      aNum: number;
    }
 * ````
 */
export type PickExactlyByType<T, P> = {
  [K in Keys<T> as If<Equals<T[K], P>, K, never>]: T[K];
};
