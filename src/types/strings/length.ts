import type { Message, EmptyObject } from '../primitives';
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
  Arr extends any[] = EmptyArray,
> = S extends `${infer L}${infer R}` ? Strlen<R, [...Arr, L]> : Arr['length'];

/**
 * Check if a string is non-empty
 * @example
 * ```ts
 * export function filledString<S extends string>(s: FilledString<S>) {
 *   return s;
 * }
 * console.log(filledString('hello')); // Ok
 * console.log(filledString('')); // Error: argument of type 
 is not assignable to parameter of type 
 * ```
 */
export type FilledString<T extends string = string> = Strlen<T> extends 0
  ? Message<`must be non-empty string`>
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
