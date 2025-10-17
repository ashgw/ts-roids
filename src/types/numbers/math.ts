import type { Numeric } from '../primitives';
import type { StringifyPrimitive } from '../strings/conversions';

/**
 * Checks if a given numeric value is in ]-∞,0[
 * @returns
 * true if it is, otherwise false
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
export type IsNegative<N extends Numeric> =
  StringifyPrimitive<N> extends `-${infer U}` ? true : false;

/**
 * Checks if a given numeric value is in [0,+∞[
 * @returns
 * true if it is, otherwise false
 */
export type IsPositive<N extends Numeric> = N extends N
  ? Numeric extends N
    ? boolean
    : `${N}` extends `-${Numeric}`
      ? false
      : true
  : never;

/**
 * Check if a given numeric value is an integer
 * @returns
 * true if it is, else false
 */
export type IsInteger<N extends Numeric> = number extends N
  ? false | true
  : N extends N
    ? `${N}` extends `${string}.${string}`
      ? false
      : true
    : never;

/**
 * Check if a given numeric value is an float
 * @returns
 * true if it is, else false
 */
export type IsFloat<N extends Numeric> = number extends N
  ? false | true
  : N extends N
    ? `${N}` extends `${string}.${string}`
      ? true
      : false
    : never;

/**
 * Get the absolute value of a numeric N
 * @example
 * ```ts
 * Abs<-54>; // Result: 54
 * Abs<54>; // Result: 54
 * ```
 * @returns
 * |N|
 */
export type Abs<N extends Numeric> = `${N}` extends `-${infer M extends
  Numeric}`
  ? M
  : N;
