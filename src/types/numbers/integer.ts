import type { Numeric } from '../primitives';
import type { IfEquals } from '../logic';
import type { IsInteger, IsPositive, IsNegative } from '../numbers/math';

/**
 * Represents an integer type.
 * This type is used to ensure that a numeric value is an integer.
 *
 * Example use case:
 *
 * ```ts
 * export function myFunc<T extends Numeric>(a: Integer<T>) {
 *   console.log(a);
 * }
 * const good = myFunc(4545); // This is valid as 4545 is an integer.
 * const bad = myFunc(4545.554); // This will throw an error as 4545.554 is not an integer.
 * ```
 */
export type Integer<N extends Numeric> = IfEquals<IsInteger<N>, true, N, never>;

/**
 * Type representing an integer that's in [0,+∞[
 */
export type PositiveInteger<N extends Numeric> = IfEquals<
  IsPositiveInteger<N>,
  true,
  Integer<N>,
  never
>;

/**
 * Represents a positive integer parsed from a string.
 * If the string does not represent a positive integer, it resolves to `never`, else
 * it resolves to its integer representation.
 * @example
 * ````ts
    PositiveIntegerString<'0'>; // works
    PositiveIntegerString<'82739283293237'>; // works
    PositiveIntegerString<'82739.283293237'>; // never
    PositiveIntegerString<'-82739.283293237'>; // never
    PositiveIntegerString<'-1'>; // never
 * ````
 */
export type PositiveIntegerString<S extends string> = IfEquals<
  IsPositiveInteger<Integer<NumerifyString<S>>>,
  true,
  Integer<NumerifyString<S>>,
  never
>;

/**
 * Type representing an integer that's in ]-∞, 0[
 */
export type NegativeInteger<N extends Numeric> = IfEquals<
  IsNegativeInteger<N>,
  true,
  Integer<N>,
  never
>;

/**
 * Represents a negative integer parsed from a string.
 * If the string does not represent a negative integer, it resolves to `never`, else
 * it resolves to its integer representation.
 * @example
 * ````ts
    NegativeIntegerString<'0'>; // never
    NegativeIntegerString<'82739283293237'>; // never
    NegativeIntegerString<'-82739.283293237'>; // works
    NegativeIntegerString<'-82739.283293237'>; // never
    NegativeIntegerString<'-1'>; // works
 * ````
 */
export type NegativeIntegerString<S extends string> = IfEquals<
  IsNegativeInteger<Integer<NumerifyString<S>>>,
  true,
  Integer<NumerifyString<S>>,
  never
>;

/**
 * Is it a negative integer ?
 * @return
 * `true` if it is, else `false`
 */
export type IsNegativeInteger<N extends Numeric> = IsNegative<Integer<N>>;

/**
 * Is it a positive integer ?
 * @return
 * `true` if it is, else `false`
 */
export type IsPositiveInteger<N extends Numeric> = IsPositive<Integer<N>>;

// Import NumerifyString from strings module (will be created later)
type NumerifyString<S extends string> = S extends `${infer N extends Numeric}`
  ? N
  : never;
