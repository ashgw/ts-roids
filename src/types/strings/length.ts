import type { Message } from '../primitives';
import type { Equals } from '../logic';

type EmptyArray = [];

/**
 * Get the length of a given string
 * @example
 * ```ts
 * Strlen<'foo'>; // Result: 3
 * ```
 *
 * Can be used to create type constraints on string lengths:
 * ```ts
 * // Only allow strings of length 8-10 characters
 * type ValidPassword<T extends string> = Strlen<T> extends 8 | 9 | 10 ? T : never;
 *
 * // Function that only accepts valid password strings
 * function checkValidPassword<T extends string>(val: T & ValidPassword<T>) {
 *   console.log(val);
 * }
 *
 * // Works with string literals
 * const validPass = checkValidPassword('password123' as const); // OK
 * const invalidPass = checkValidPassword('short' as const); // Type error
 * ```
 */
export type Strlen<
  S extends string,
  Arr extends unknown[] = EmptyArray,
> = S extends `${infer L}${infer R}` ? Strlen<R, [...Arr, L]> : Arr['length'];

/**
 * Check if a string is non-empty
 * @example
 * ```ts
 * export function filledString<S extends string>(s: FilledString<S>) {
 *   return s;
 * }
 * console.log(filledString('hello')); // Ok
 * console.log(filledString('')); // Error
 * ```
 */
export type FilledString<T extends string = string> = Strlen<T> extends 0
  ? Message<'must be non-empty string'>
  : T;

/**
 * Check if two strings S1 and S2 have the same length
 * @returns
 * ``true`` if they do, else ``false``
 */
export type EqualStrlen<S1 extends string, S2 extends string> = Equals<
  Strlen<S1>,
  Strlen<S2>
>;

/**
 * internal numeric tuple builder
 * converts a number literal to a tuple of that length for type-level math.
 * this is not the same as your Tuple<T> or SizedTuple<T, N> types;
 * it exists solely for numeric reasoning (e.g. comparisons like A <= B)
 */
type BuildTupleFromNumber<
  N extends number,
  T extends unknown[] = [],
> = T['length'] extends N ? T : BuildTupleFromNumber<N, [...T, unknown]>;

/**
 * type-level numeric comparator
 * evaluates to true if A <= B, else false
 */
type Lte<A extends number, B extends number> = BuildTupleFromNumber<B> extends [
  ...BuildTupleFromNumber<A>,
  ...unknown[],
]
  ? true
  : false;

/**
 * Constrain string to have length <= Max
 */
export type StrMax<T extends string, Max extends number> = Lte<
  Strlen<T>,
  Max
> extends true
  ? T
  : Message<`must be at most ${Max} characters long`>;

/**
 * Constrain string to have length >= Min
 */
export type StrMin<T extends string, Min extends number> = Lte<
  Min,
  Strlen<T>
> extends true
  ? T
  : Message<`must be at least ${Min} characters long`>;

/**
 * Constrain string to have Min <= length <= Max
 */
export type StrBetween<
  T extends string,
  Min extends number,
  Max extends number,
> = Lte<Min, Strlen<T>> extends true
  ? Lte<Strlen<T>, Max> extends true
    ? T
    : Message<`must be at most ${Max} characters long`>
  : Message<`must be at least ${Min} characters long`>;
