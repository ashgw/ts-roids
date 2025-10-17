import type { Keys } from './keys';
import type { UnionToIntersection } from '../unions/intersection';

/**
 * Type that recursively omits specified nested properties from an object type.
 * @template T The input object type.
 * @template P A **string** literal representing the path of properties to omit (e.g., 'person.name.value').
 * @example
 * ```typescript
 * type T =
 *   a: {
 *     b: string;
 *     b2: {
 *       c: {
 *         d: number;
 *       };
 *     };
 *   };
 * }
 *
 * DeepOmit<T, 'a.b2.c'> // Results in: { a: { b: string; b2: {} } }
 * ```
 */
export type DeepOmit<T, P extends string> = P extends `${infer K}.${infer R}`
  ? {
      [KT in Keys<T>]: KT extends K ? DeepOmit<T[KT], R> : T[KT];
    }
  : Omit<T, P>;

/**
 * Deeply pick properties from a nested object type.
 * @template T The target object.
 * @template P A dot-separated string literal representing the path of properties to pick.
 * @example
 * type T = {
  one: string;
  two: {
    a: boolean;
    b: null;
    c: 'c' | 'C';
  };
  thee: number;
};
 * DeepPick<T, 'two.c'> // Results in:
{
    two: {
      c: 'c' | 'C';
    };
  }
 *
 */
export type DeepPick<
  T extends Record<string, any>, // need to use `any` here for `T[K1]` inference
  P extends string,
> = UnionToIntersection<
  P extends `${infer K}.${infer R}`
    ? {
        [K1 in K]: DeepPick<T[K1], R>;
      }
    : P extends Keys<T>
      ? Pick<T, P>
      : never
>;

/**
 * Generates all possible dot-separated key paths from a nested object type.
 * Returns a union of all valid key paths as string literals.
 *
 * @template T The object to extract paths from
 * @template Prev The accumulated path (used for recursion)
 *
 * @example
 * type Obj = {
 *   user: {
 *     profile: {
 *       name: string;
 *     };
 *   };
 *   age: number;
 * };
 *
 * type P = Paths<Obj>;
 * // Result:
 * // 'user'
 * // 'user.profile'
 * // 'user.profile.name'
 * // 'age'
 */
export type Paths<T, Prev extends string = ''> = {
  [K in keyof T & string]:
    | `${Prev}${K}`
    | (T[K] extends object ? Paths<T[K], `${Prev}${K}.`> : never);
}[keyof T & string];
