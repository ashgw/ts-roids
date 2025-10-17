import type { Numeric } from '../primitives';
import type { IfExtends } from '../logic';
import type { PositiveInteger } from '../numbers/integer';

/**
 * Represents a tuple.
 * @example
 * ````ts
 * Tuple<['a', 'b']>; // Result: ['a', 'b']
 * Tuple<string[]>; // Result: never
 */
export type Tuple<T> = T extends readonly unknown[]
  ? number extends T['length']
    ? never
    : T
  : never;

/**
 * Represents a tuple of size `N`, where `N` is a positive integer.
 * The tuple's length is exactly `N`, with each element of the tuple being of type `T`.
 *
 * @template T The type of the elements in the tuple.
 * @template N The desired length of the tuple.
 * @template Acc Accumulator type for recursive construction.
 *
 * @example
 * ```
 * SizedTuple<string, 3>; // Result: [string, string, string]
 * SizedTuple<number, 2>; // Result: [number, number]
 * SizedTuple<number, 0>; // Result: []
 * ```
 *
 * @see Tuple
 */
export type SizedTuple<
  T,
  N extends Numeric,
  Acc extends T[] = [],
> = N extends PositiveInteger<infer M>
  ? Acc['length'] extends M
    ? Acc
    : SizedTuple<T, M, [T, ...Acc]>
  : never;

/**
 * Represents a non-empty array of elements of type `T`.
 * Ensures that the array has at least one item.
 *
 * @example
 * const valid: NonEmptyArray<number> = [1]; // ✅
 * const invalid: NonEmptyArray<number> = []; // ❌ Type error
 */
export type NonEmptyArray<T> = [T, ...T[]];
