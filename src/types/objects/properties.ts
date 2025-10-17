import type { Keys } from './keys';
import type { AnyFunction, Nullable } from '../primitives';
import type { IsTruthy, IsFalsy } from '../utils';
import type { ExcludeNullable } from '../utils';

/**
 * Extracts truthy properties from an object type `T`.
 * @example
 * ````ts
type T = {
  name: string;
  age: number;
  hasCar: boolean;
  address?: string | null;
}
type R = TruthyProperties<T>;
// Result: { name: string; age: number; hasCar: boolean; }
 * ````
 */
export type TruthyProperties<T> = Pick<
  T,
  { [K in Keys<T>]: IsTruthy<T[K]> extends true ? K : never }[Keys<T>]
>;

/**
 * Extracts falsy properties from an object type `T`.
 * @example
 * ````ts
type T = {
  a: string;
  b: number;
  c: boolean;
  d?: string | null;
  e: 0;
  f: null;
};
type az = FalsyProperties<T>;
// Result: {
    e: 0;
    f: null;
}
 * ````
 */
export type FalsyProperties<T> = Pick<
  T,
  { [K in Keys<T>]: IsFalsy<T[K]> extends true ? K : never }[Keys<T>]
>;

/**
 * Get the literal names of keys that are methods in object type `T`
 * @example
 * ````ts
 Methods<{
      foo: () => void;
      bar: (a: any) => string;
      barBaz: string;
      bazBar: Numeric;
    }> // Result: 'foo' | 'bar'
 * ````
 */
export type Methods<T extends object> = {
  [K in Keys<T>]-?: ExcludeNullable<T[K]> extends AnyFunction ? K : never;
}[Keys<T>];

/**
     * Get the literal names of keys that are propeties, basically anything that's not a method in object type `T`
     * @example
     * ````ts
     Properties<{
          barBaz: string;
          bazBar: Numeric;
          bar: () => number;
        }> // Result: 'barBaz' | 'bazBar'
     * ````
     */
export type Properties<T extends object> = {
  [K in Keys<T>]-?: ExcludeNullable<T[K]> extends AnyFunction ? never : K;
}[Keys<T>];
