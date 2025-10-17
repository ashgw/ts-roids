import type { IfExtends } from '../logic';

/**
 * Check if a string starts with another string
 * @example
 * ```ts
 * type Result = StringStartsWith<'hello world', 'hello'>; // Result: true
 * ```
 */
export type StringStartsWith<T extends string, U extends string> = IfExtends<
  T,
  `${U}${string}`,
  true,
  false
>;

/**
 * Check if a string ends with another string
 * @example
 * ```ts
 * type Result = StringEndsWith<'hello world', 'world'>; // Result: true
 * ```
 */
export type StringEndsWith<T extends string, U extends string> = IfExtends<
  T,
  `${string}${U}`,
  true,
  false
>;
