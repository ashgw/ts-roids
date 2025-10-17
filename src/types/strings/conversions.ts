import type { Primitive, Numeric } from '../primitives';

/**
 * Turns a given primitive value (except symbol) into its string representation
 * @example
 * ```ts
 * StringifyPrimitive<45> //  "45"
 * StringifyPrimitive<boolean> //  "false" | "true"
 * StringifyPrimitive<null> // "null"
 * StringifyPrimitive<undefined> // "undefined"
 * ```
 */
export type StringifyPrimitive<P extends Exclude<Primitive, symbol>> = `${P}`;

/**
 * Turn a given string literal to a numeric
 * @example
 * ````ts`
 * NumerifyString<'54'>; // 54
 * NumerifyString<'699620.000000001'>; // 699620.000000001
 * IsNegativeFloat<NumerifyString<'-699620.000000001'>>; // true
 * ````
 */
export type NumerifyString<S extends string> = S extends `${infer N extends
  Numeric}`
  ? N
  : never;
