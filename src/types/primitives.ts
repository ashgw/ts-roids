/**
 * Used to display an error message instead of never, for better readability
 * @export type {Message}
 */
export type Message<T extends string> = T;

/**
 *
 * Represents a type that can either be  ``null`` or ``undefined``.
 * @export type {Nullable}
 */
export type Nullable = null | undefined;

/**
 * Represents a  type that can hold any numeric value: number or a bigint.
 * @export type {Numeric}
 */
export type Numeric = number | bigint;

/**
 * Represents all the primitive types in JavaScript.
 * - `Nullable`: A value that can be either null or undefined.
 * - `Numeric`: A value that can be either a number or a bigint.
 * - `string`: Represents textual data.
 * - `boolean`: Represents a logical value (true or false).
 * - `symbol`: Represents a unique and immutable value.
 */
export type Primitive = string | boolean | symbol | Nullable | Numeric;

/**
 * Represents a type that includes falsy values in JavaScript.
 * Falsy values are those that coerce to false when used in a boolean context.
 * This includes `false`, an empty string (`''`), numeric zero (`0`), `null`,
 * and `undefined`.
 */
export type Falsy = false | '' | 0 | Nullable;

/**
 * This type is used to describe constructor functions or classes
 * that can be invoked using the `new` keyword.
 */
export type Newable = { new (...args: any[]): any };

/**
 * Describes any function accepting any arguments
 *  and returning any value.
 */
export type AnyFunction = (...args: any[]) => any;

/**
 * Describes any function accepting and retruning `unknown`s
 */
export type UnknownFunction = (...args: unknown[]) => unknown;

/**
 * `Optional<T>` is similar to Python's `Optional` and Rust's `Option` types.
 * It promotes more predictable code,
 * by enforcing explicit handling of optional scenarios, e.g: requiring functions
 * to return `null` specifically when a value is absent.
 */
export type Optional<T> = T | null;

/**
 Represnets a type that might be nullable, as in it might be `null` or `undefined`.
*/
export type Maybe<T> = T | Nullable;
export type MaybeUnknown<T> = T | unknown;
export type MaybeUndefined<T> = T | undefined;

/**
 * Presents any non-nullish value
 */
export type EmptyObject = NonNullable<unknown>;

/**
 * Represents a type that is not assignable to `V`.
 * @example
 */
export type NotAssignableTo<U, V> = U extends V ? never : U;
