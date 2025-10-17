import type { EmptyObject } from '../primitives';
import type { IfExtends } from '../logic';

/**
 * Represents the keys of a given  type `T`.
 * This  type alias `Keys<T>` is equivalent to `keyof T`,
 * which retrieves the union  type of keys (property names) of  type `T`.
 * @returns Union  type of keys (property names) of  type `T`.
 * @example
 *  type Person = {
 *   name: string;
 *   age: number;
 *   email: string;
 * };
 *
 *  type PersonKeys = Keys<Person>; => "name" | "age" | "email"
 */
export type Keys<T> = keyof T;

/**
 * Represents the union  type of values of properties in a given  type `T`.
 * This  type alias `Vals<T>` retrieves the union  type of values corresponding
 * to the keys (property names) of  type `T`.
 * @example
 *  type Person = {
 *   name: string;
 *   age: number;
 *   email: string;
 * };
 *
 *  type PersonValues = Vals<Person>; => string | number
 */
export type Vals<T> = T[Keys<T>];

/**
 * Extracts keys from a type `T` that represent required properties.
 * Properties that are not marked with `?`.
 * @example
 * ```ts
 * type T = RequiredKeys<{ a: number; b?: string }> // Result:  'a'
 * ```
 */
export type RequiredKeys<T> = {
  [K in Keys<T>]-?: IfExtends<EmptyObject, Pick<T, K>, never, K>;
}[Keys<T>];

/**
 * Why not call it ``OptionalKeys``?
 * ``Optional<T>`` in this library represents a type ``T`` that can be either ``T`` or ``null``. So creating
 * ``OptionalKeys`` type would entail removing any type that can be null, which is not the intention here.
 *
 * ``NonRequiredKeys<T>`` simply removes non required keys, as in any property of an object that is
 * marked with `?` operator
 * @example
 * ```ts
 * type T = NonRequiredKeys<{ a: number; b?: string }> // Result:  'b'
 * ```
 */
export type NonRequiredKeys<T> = Exclude<Keys<T>, RequiredKeys<T>>;
