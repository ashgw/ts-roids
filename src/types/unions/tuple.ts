import type { UnionToIntersection } from './intersection';

type LastOf<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? R
  : never;

/**
 * `UnionToTuple<T>` converts a union type `T` into a tuple type while preserving the order.
 * This type is useful for scenarios where you need to work with the individual members of a union as an ordered list.
 *
 * @template T - The union type to convert into a tuple.
 * @template L - The last member of the union, used for recursive extraction.
 * @template N - A boolean that checks if the union is empty.
 *
 * @example
 * type TestUnion = 'a' | 'b' | 'c';
 * type ResultTuple = UnionToTuple<TestUnion>; // Result: ['a', 'b', 'c']
 */

export type UnionToTuple<
  T,
  L = LastOf<T>,
  N = [T] extends [never] ? true : false,
> = N extends true ? [] : [...UnionToTuple<Exclude<T, L>>, L];
