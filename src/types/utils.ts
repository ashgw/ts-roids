import type {
  Nullable,
  Falsy,
  EmptyObject,
  Numeric,
  AnyFunction,
  UnknownFunction,
  Newable,
} from './primitives';
import type { IfExtends, Equals, And, Not } from './logic';
import type { Keys } from './objects/keys';

/**
 * Represents a  type that can either be a single value of  type `T` or an array of values of  type `T`.
 * @example
 * type T1 = EitherOneOrMany<number>; 10; // Valid
 * type T2 = EitherOneOrMany<number>;  [20, 30]; // Also valid
 */
export type EitherOneOrMany<T> = T | T[];

/**
 * Checks if a given type `T` is `Falsy`.
 * @returns `true` if `T` is a subtype of `Falsy`, otherwise `false`.
 * @example
 * type Falsy = IsFalsy<''>; // TestFalsy is tru`
 * type Truthy = IsFalsy<10>; // TestTruthy is false
 */
export type IsFalsy<T> = IfExtends<T, Falsy, true, false>;

/**
 * Checks if a given  type `T` is a truthy value.
 * A truthy value is any value that is not a falsy value.
 * @returns `true` if `T` is not a subtype of `Falsy`, otherwise `false`.
 * @example
 *  type TruthyString = IsTruthy<string>; // => true
 *  type TruthyNumber = IsTruthy<10>; // => true
 *  type FalsyNull = IsTruthy<null>; // => false
 *  type FalsyEmptyString = IsTruthy<''>; => false
 */
export type IsTruthy<T> = IfExtends<T, Exclude<T, Falsy>, true, false>;

/**
 * Checks if a given  type `T` is `never`.
 * The `never`  type represents a value that never occurs,
 * for example a function that always errors out.
 * @returns `true` if `T` is `never`, otherwise `false`.
 * @example
 *  type Never = IsNever<never>; => true
 *  type NotNever = IsNever<string>; => false
 */
export type IsNever<T> = Equals<T, never>;

/**
 * A nullable type is a type that might be null, undefined or both
 * @returns
 * `true` if it is, else `false`
 */
export type IsNullable<T> = IfExtends<T, Nullable, true, false>;

/**
 * Checks if a given  type `T` is `unknown`.
 *
 * Values of  type `unknown` can hold any value, similar to `any`, but with stricter  type safety.
 * Unlike `any`, you cannot perform operations directly on values of  type `unknown`
 * without  type assertion or  type narrowing.
 * @returns `true` if `T` is `unknown`, otherwise `false`.
 * @example
 *  type IsUnknownValue = IsUnknown<unknown>; //  true
 *  type IsNotUnknownValue = IsUnknown<string>; // also true
 * @remarks
 * > If you want `unknown` to be exact, use `IsExactlyUnknown`
 */
export type IsUnknown<T> = IfExtends<T, unknown, true, false>;

/**
 * Checks if a given  type `T` is exactly `unknown`.
 * @example
 * ````ts
  IsExactlyUnknown<any | unknown>; // false, since the union evaluates to any
  IsExactlyAny<any | unknown>; // true
  IsExactlyUnknown<unknown | string> // true
  IsExactlyUnknown<string>; // flase
 * ````
 */
export type IsExactlyUnknown<T> = Equals<T, unknown>;

/**
 * @returns `true` if `T` is `string`, otherwise `false`.
 */
export type IsString<T> = IfExtends<T, string, true, false>;

/**
 * @returns `true` if `T` is excatly `string`, otherwise `false`.
 * @example
 * ````ts
  IsExactlyString<number>; //  false;
  IsExactlyString<any | string>; // false
  IsExactlyString<unknown | string>; //  false
 * ````
 */
export type IsExactlyString<T> = Equals<T, string>;

/**
 * @returns `true` if `T` is `boolean`, otherwise `false`.
 */
export type IsBoolean<T> = IfExtends<T, boolean, true, false>;

/**
 * A numeric type iincludes `number` and `bigint`.
 * @returns `true` if `T` is a numeric type, otherwise `false`.
 */
export type IsNumeric<T> = IfExtends<T, Numeric, true, false>;

/**
 * Is a given type `T` an array?
 * @returns `true` if `T` it is, otherwise `false`.
 * @example
 * ```
 * IsArray<number[]>; // true
 * IsArray<string>; // false
 * ```
 */
export type IsArray<T> = IfExtends<T, unknown[], true, false>;

/**
 * Type utility that checks if a given type `T` is an `AnyFunction` (any function type).
 * @template T The type to check.
 * @returns `true` if `T` is an `AnyFunction`, otherwise `false`.
 * An `AnyFunction` is defined as a function type that accepts any arguments and returns any value.
 * @example
 * ```
 * IsAnyFunction<() => void>; // true (matches AnyFunction)
 * IsAnyFunction<(x: number) => string>; // true (matches AnyFunction)
 * IsAnyFunction<string>; // false (string is not a function type)
 * ```
 */
export type IsAnyFunction<T> = IfExtends<T, AnyFunction, true, false>;

/**
 * Type utility that checks if a given type `T` is a `Function` (function type accepting `unknown` arguments and returning `unknown`).
 * @template T The type to check.
 * @returns `true` if `T` is a `Function`, otherwise `false`.
 * A `Function` is defined as a function type that accepts arguments of type `unknown` and returns a value of type `unknown`.
 * @example
 * ```
 * IsFunction<() => void>; // true (matches Function)
 * IsFunction<(x: number) => string>; // true (matches Function)
 * IsFunction<string>; // false (string is not a function type)
 * ```
 */
export type IsFunction<T> = IfExtends<T, UnknownFunction, true, false>;

/**
 * Checks if a given type `T` qualifies as an object.
 * @returns `true` if it is, otherwise `false`.
 * An object in this context is defined as a non-null object (excluding functions and arrays).
 * @example
 * ```
  IsObject<object>; // true
  IsObject<{ name: string }>; // true
  IsObject<string>; // false
  IsObject<Function>; // true, yes, the built-in Function type is an interface with a bunch of methods, so yes it's an object.
  // if you want to use the function type use this:
  IsObject<UnknownFunction>; // false
  // or this
  IsObject<AnyFunction>; // false
  IsObject<any[]>; // false
  IsObject<null>; // false
 * ```
 */
export type IsObject<T> = And<
  IfExtends<T, object, true, false>,
  And<Not<IsFunction<T>>, Not<IsArray<T>>>
>;

/**
 * @returns `true` if `T` is `number`, otherwise `false`.
 */
export type IsNumber<T> = IfExtends<T, number, true, false>;

/**
 * @returns `true` if `T` is exactly of type `number`, otherwise `false`.
 * @example
 * ````ts
  IsExactlyNumber<any | number>; // false
  IsExactlyNumber<unknown | number> // false
  IsExactlyNumber<number> // true
  IsExactlyNumber<87> // false
 * ````
 */
export type IsExactlyNumber<T> = Equals<T, number>;

/**
 * @returns `true` if `T` is `bigint`, otherwise `false`.
 */
export type IsBigInt<T> = IfExtends<T, bigint, true, false>;

/**
 * @returns `true` if `T` is exactly `bigint`, otherwise `false`.
 * @example
 * ````ts
  IsBigInt<unknown | bigint>; // false
  IsBigInt<symbol | Nullable>; // false
  IsBigInt<bigint>; // true
 * ````
 */
export type IsExactlyBigInt<T> = Equals<T, bigint>;

/**
 * @returns `true` if `T` is `symbol`, otherwise `false`.
 */
export type IsSymbol<T> = T extends symbol ? true : false;

/**
 * @returns `true` if `T` is exactly `symbol`, otherwise `false`.
 * @example
 * ````ts
  IsExactlySymbol<symbol>; // true
  IsExactlySymbol<any | symbol>; // false
  IsExactlySymbol<Integer<2>>; // false
 * ````
 */
export type IsExactlySymbol<T> = Equals<T, symbol>;

/**
 * If ``T`` is exactly``any``, return ``true``, otherwise, return ``false``.
 * @example
 * ````ts
  IsExactlyAny<any | Nullable>; // true, once unsafe, always unsafe
  IsExactlyAny<Numeric | Nullable>; // false
  IsExactlyAny<unknown>; // false
  IsExactlyAny<any>, true
 * ````
 */
export type IsExactlyAny<T> = Equals<T, any>;

/**
 * @returns `true` if `T` is a `Newable`, otherwise `false`.
 */
export type IsNewable<T> = IfExtends<T, Newable, true, false>;

/**
 * A  type that excludes `null` and `undefined` from  type `T`.
 * @example
 * Type Str = ExcludeNullable<string | null> //  string
 * Type Str2 = ExcludeNullable<string | null | undefined> //  string
 * Type Str3 = ExcludeNullable<string | undefined> //  string
 *
 */
export type ExcludeNullable<T> = Exclude<T, Nullable>;

/**
 * A  type that excludes `undefined` from  type `T`.
 * @example
 * Type Str = ExcludeNullable<string | undefined> // Result:  string
 */
export type ExcludeUndefined<T> = Exclude<T, undefined>;

/**
 * A  type that excludes `null` from  type `T`.
 * @example
 * Type Str = ExcludeNullable<string | null> // Result:  string
 */
export type ExcludeNull<T> = Exclude<T, null>;

/**
 * Evaluates whether one type `T` is assignable to another type `U`.
 * @returns `true` if `T` is assignable to `U`, `false` otherwise.
 *
 * @example
 * ```typescript
 * type A = { x: number };
 * type B = { x: number; y: string };
 * type C = { x: number; y?: string };
 *
 * type Check1 = Extends<A, B>; // false, A does not extend B
 * type Check2 = Extends<B, A>; // true, B extends A
 * type Check3 = Extends<C, B>; // true, C extends B
 * ```
 */
export type Extends<T, U> = T extends never
  ? false
  : T extends U
    ? true
    : false;

/**
 * `Simplify<T>` flattens the structure of a given type by resolving intersections
 * and reducing redundant wrapping, making complex types easier to work with.
 * This type is particularly helpful for deeply nested mapped types, where
 * readability and simplicity of the resulting type is crucial.
 *
 * @template T - The type to simplify.
 *
 * @example
 * ```ts
 * type Flattened = Simplify<{ a: string } & { b: number }>; // Result: { a: string; b: number }
 * ```
 */
export type Simplify<T> = { [KeyType in Keys<T>]: T[KeyType] } & EmptyObject;

/**
 * `PartialExcept<T, K extends keyof T>` is a utility type that makes all properties of `T` optional
 * except for the properties specified in `K`, which are required. This is useful for scenarios
 * where you want to enforce that certain fields must be present while allowing others to be omitted.
 *
 * @template T - The original type from which to derive the new type.
 * @template K - A subset of keys from `T` that should remain required in the resulting type.
 *
 * @example
 * ```ts
 * type User = {
 *   id: number;
 *   name: string;
 *   email: string;
 * };
 *
 * type UserUpdate = PartialExcept<User, 'email'>; // Result: { id?: number; name?: string; email: string; }
 * ```
 */
export type PartialExcept<T, K extends keyof T> = {
  [P in K]: T[P];
} & Partial<Omit<T, K>>;

/**
 * Recursively resolves all nested `Promise` types to their underlying value.
 * Useful when dealing with complex, deeply nested promise chains.
 *
 * @example
 * type A = Promise<Promise<Promise<string>>>;
 * type B = DeepAwaited<A>; // Result: string
 */
export type DeepAwaited<T> = T extends Promise<infer U> ? DeepAwaited<U> : T;
