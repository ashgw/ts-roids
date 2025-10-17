import type { UnionToIntersection } from './intersection';

export type LastOf<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? R
  : never;

/**
 * `KeysOfUnion` extracts the union of keys from a given union of object types.
 * This is useful in scenarios where you need to access all possible keys across
 * unioned object types within conditional or mapped types.
 *
 * @template T - The union of object types to extract keys from.
 *
 * @example
 * ```ts
 * type UnionKeys = KeysOfUnion<{ a: string } | { b: number }>; // Result: 'a' | 'b'
 * ```
 */
export type KeysOfUnion<T> = T extends T ? keyof T : never;
