import type { Numeric } from '../primitives';
import type { IfEquals, IfExtends } from '../logic';
import type { IsFloat, IsPositive, IsNegative } from '../numbers/math';

/**
 * Type representing a float
 */
export type Float<N extends Numeric> = IfExtends<IsFloat<N>, true, N, never>;

/**
 * Type representing a float that's in [0,+∞[
 */
export type PositiveFloat<N extends Numeric> = IfEquals<
  IsPositiveFloat<N>,
  true,
  Float<N>,
  never
>;

/**
 * Represents a positive float parsed from a string.
 * If the string does not represent a positive float, it resolves to `never`, else
 * it resolves to its float representation.
 * @example
 * ````ts
    PositiveFloatString<'0'>; // never
    PositiveFloatString<'82739283293237'>; // works
    PositiveFloatString<'-82739.283293237'>; // never
    PositiveFloatString<'-1'>; // never
    PositiveFloatString<'1.98'>; // works
    PositiveFloatString<'-1.98'>; // never
 * ````
 */
export type PositiveFloatString<S extends string> = IfEquals<
  IsPositiveFloat<Float<NumerifyString<S>>>,
  true,
  Float<NumerifyString<S>>,
  never
>;

/**
 * Type representing a float that's in ]-∞, 0[
 */
export type NegativeFloat<N extends Numeric> = IfEquals<
  IsNegativeFloat<N>,
  true,
  Float<N>,
  never
>;

/**
 * Represents a negative float parsed from a string.
 * If the string does not represent a negative float, it resolves to `never`, else
 * it resolves to its float representation.
 * @example
 * ````ts
    NegativeFloatString<'0'>; // never
    NegativeFloatString<'82739283293237'>; // never
    NegativeFloatString<'-82739.283293237'>; // works
    NegativeFloatString<'-1'>; // never
    NegativeFloatString<'-1.98'>; // works
 * ````
 */
export type NegativeFloatString<S extends string> = IfEquals<
  IsNegativeFloat<Float<NumerifyString<S>>>,
  true,
  Float<NumerifyString<S>>,
  never
>;

/**
 * Is it a negative float ?
 * @return
 * `true` if it is, else `false`
 */
export type IsNegativeFloat<N extends Numeric> = IsNegative<Float<N>>;

/**
 * Is it a positive float ?
 * @return
 * `true` if it is, else `false`
 */
export type IsPositiveFloat<N extends Numeric> = IsPositive<Float<N>>;

// Import NumerifyString from strings module (will be created later)
type NumerifyString<S extends string> = S extends `${infer N extends Numeric}`
  ? N
  : never;
