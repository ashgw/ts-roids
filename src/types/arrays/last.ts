/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Get the last element of an array
 * @example
 * ```ts
 * type Result1 = LastElement<[1, 2, 3]>; // Result: 3
 * type Result2 = LastElement<[]>; // Result: never
 * ```
 */
export type LastElement<Arr extends unknown[]> = Arr extends [
  ...infer _Rest,
  infer Last,
]
  ? Last
  : never;
