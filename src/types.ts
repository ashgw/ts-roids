/**
 * Used to display an error message instead of never, for better readability
 * @export type {UnassignableTypeError}
 */

export type UnassignableTypeError<ErrType extends string> =
  `type is not assignable to type ${ErrType}`;
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
 * Represents an integer type.
 * This type is used to ensure that a numeric value is an integer.
 *
 * Example use case:
 *
 * ```ts
 * export function myFunc<T extends Numeric>(a: Integer<T>) {
 *   console.log(a);
 * }
 * const good = myFunc(4545); // This is valid as 4545 is an integer.
 * const bad = myFunc(4545.554); // This will throw an error as 4545.554 is not an integer.
 * ```
 */
export type Integer<N extends Numeric> = IfEquals<IsInteger<N>, true, N, never>;

/**
 * Type representing an integer that's in [0,+∞[
 */
export type PositiveInteger<N extends Numeric> = IfEquals<
  IsPositiveInteger<N>,
  true,
  Integer<N>,
  never
>;

/**
 * Represents a positive integer parsed from a string.
 * If the string does not represent a positive integer, it resolves to `never`, else
 * it resolves to its integer representation.
 * @example
 * ````ts
    PositiveIntegerString<'0'>; // works
    PositiveIntegerString<'82739283293237'>; // works
    PositiveIntegerString<'82739.283293237'>; // never
    PositiveIntegerString<'-82739.283293237'>; // never
    PositiveIntegerString<'-1'>; // never
 * ````
 */
export type PositiveIntegerString<S extends string> = IfEquals<
  IsPositiveInteger<Integer<NumerifyString<S>>>,
  true,
  Integer<NumerifyString<S>>,
  never
>;

/**
 * Type representing an integer that's in ]-∞, 0[
 */
export type NegativeInteger<N extends Numeric> = IfEquals<
  IsNegativeInteger<N>,
  true,
  Integer<N>,
  never
>;

/**
 * Represents a negative integer parsed from a string.
 * If the string does not represent a negative integer, it resolves to `never`, else
 * it resolves to its integer representation.
 * @example
 * ````ts
    NegativeIntegerString<'0'>; // never
    NegativeIntegerString<'82739283293237'>; // never
    NegativeIntegerString<'-82739.283293237'>; // works
    NegativeIntegerString<'-82739.283293237'>; // never
    NegativeIntegerString<'-1'>; // works
 * ````
 */
export type NegativeIntegerString<S extends string> = IfEquals<
  IsNegativeInteger<Integer<NumerifyString<S>>>,
  true,
  Integer<NumerifyString<S>>,
  never
>;

/**
 * Is it a negative integer ?
 * @return
 * `true` if it is, else `false`
 */
export type IsNegativeInteger<N extends Numeric> = IsNegative<Integer<N>>;

/**
 * Is it a positive integer ?
 * @return
 * `true` if it is, else `false`
 */
export type IsPositiveInteger<N extends Numeric> = IsPositive<Integer<N>>;
/**
 * Type representing a float
 */
export type Float<N extends Numeric> = IfExtends<IsFloat<N>, true, N, never>;

/**
 * Type representing a float that's in [0,+∞[
 */
export type PositiveFloat<N extends Numeric> = IfEquals<
  IsPositiveFloat<N>,
  true,
  Float<N>,
  never
>;

/**
 * Represents a positive float parsed from a string.
 * If the string does not represent a positive float, it resolves to `never`, else
 * it resolves to its float representation.
 * @example
 * ````ts
    PositiveFloatString<'0'>; // never
    PositiveFloatString<'82739283293237'>; // works
    PositiveFloatString<'-82739.283293237'>; // never
    PositiveFloatString<'-1'>; // never
    PositiveFloatString<'1.98'>; // works
    PositiveFloatString<'-1.98'>; // never
 * ````
 */
export type PositiveFloatString<S extends string> = IfEquals<
  IsPositiveFloat<Float<NumerifyString<S>>>,
  true,
  Float<NumerifyString<S>>,
  never
>;

/**
 * Type representing a float that's in ]-∞, 0[
 */
export type NegativeFloat<N extends Numeric> = IfEquals<
  IsNegativeFloat<N>,
  true,
  Float<N>,
  never
>;

/**
 * Represents a negative float parsed from a string.
 * If the string does not represent a negative float, it resolves to `never`, else
 * it resolves to its float representation.
 * @example
 * ````ts
    NegativeFloatString<'0'>; // never
    NegativeFloatString<'82739283293237'>; // never
    NegativeFloatString<'-82739.283293237'>; // works
    NegativeFloatString<'-1'>; // never
    NegativeFloatString<'-1.98'>; // works
 * ````
 */
export type NegativeFloatString<S extends string> = IfEquals<
  IsNegativeFloat<Float<NumerifyString<S>>>,
  true,
  Float<NumerifyString<S>>,
  never
>;

/**
 * Is it a negative float ?
 * @return
 * `true` if it is, else `false`
 */
export type IsNegativeFloat<N extends Numeric> = IsNegative<Float<N>>;

/**
 * Is it a positive float ?
 * @return
 * `true` if it is, else `false`
 */
export type IsPositiveFloat<N extends Numeric> = IsPositive<Float<N>>;

/**
 * Represents an odd numeric?
 * @example
 * ````ts
 * Odd<2587967>; // 2587967
 * Odd<215848141>; // 215848141
 * Odd<200000000000000>; // never
 * ````
 */
export type Odd<T extends Numeric> = IfExtends<
  StringifyPrimitive<T>,
  `${Numeric | ''}${1 | 3 | 5 | 7 | 9}`,
  T,
  never
>;

/**
 * Represents an even numeric
 * @example
 * ````ts
 * Even<200000000000000>; // 258796
 * Even<258796>; // 258796
 * Even<2000000000000001>; // never
 * ````
 */
export type Even<T extends Numeric> = IfExtends<
  StringifyPrimitive<T>,
  `${Numeric | ''}${2 | 4 | 6 | 8 | 0}`,
  T,
  never
>;

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
 * Extracts truthy properties from an object type `T`.
 * @example 
 * ````ts
type T = {
  name: string;
  age: number;
  hasCar: boolean;
  address?: string | null;
}
type R = TruthyProperties<T>;
// Result: { name: string; age: number; hasCar: boolean; }
 * ````
 */
export type TruthyProperties<T> = Pick<
  T,
  { [K in Keys<T>]: IsTruthy<T[K]> extends true ? K : never }[Keys<T>]
>;

/**
 * Extracts falsy properties from an object type `T`.
 * @example
 * ````ts
type T = {
  a: string;
  b: number;
  c: boolean;
  d?: string | null;
  e: 0;
  f: null;
};
type az = FalsyProperties<T>;
// Result: {
    e: 0;
    f: null;
}
 * ````
 */
export type FalsyProperties<T> = Pick<
  T,
  { [K in Keys<T>]: IsFalsy<T[K]> extends true ? K : never }[Keys<T>]
>;

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
 * Represents a tuple of size `N`, where `N` is a Numeric type.
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
> = N extends Integer<infer M>
  ? Acc['length'] extends M
    ? Acc
    : SizedTuple<T, M, [T, ...Acc]>
  : never;

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
 * @returns `true` if `Arr` is an array that includes elements of type `T`, otherwise `false`.
 * An array of elements of type `T` is defined as `Arr` being a subtype of `T[]`.
 * @example
 * ```
 * IsArrayIncludeTypeof<Record<string, number>[], number> // false
 * IsArrayIncludeTypeof<string[], null | boolean> // false
 * ArrayIncludeTypeof<string[], string | boolean> // true
 * IsArrayIncludeTypeof<Record<string, number>[], Record<symbol, boolean>> // true,
 * ```
 */
export type IsArrayIncludesTypeof<Arr, T> = IfExtends<Arr, T[], true, false>;

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
 * @returns `true` if `T` is a `Newable`, otherwise `false`.
 */
export type IsNewable<T> = IfExtends<T, Newable, true, false>;

/**
 * Conditional type: if the condition `C` is `true`, return `Do`, otherwise return `Else`.
 * @example
 * ````ts
   If<IsNever<never>, true, false>; // true
   If<Not<IsNever<never>>, true, false>; // false
 * ````
*/
export type If<C extends boolean, Do, Else> = IfExtends<C, true, Do, Else>;

/**
 * Negates a boolean type `B`.
 * @example
   Not<true>; // false
   Not<false>; // true
*/
export type Not<B extends boolean> = B extends true ? false : true;

/**
 * Logical AND between two boolean types `B1` and `B2`.
 * @example
   And<true, false>; // false
   And<true, true>; // true
*/
export type And<B1 extends boolean, B2 extends boolean> = If<
  B1,
  If<B2, true, false>,
  false
>;

/**
 * Logical OR between two boolean types `B1` and `B2`.
 * @example
   Or<true, false>; // true
   Or<false, false>; // false
*/
export type Or<B1 extends boolean, B2 extends boolean> = If<
  B1,
  true,
  If<B2, true, false>
>;

/**
 * Exclusive OR (XOR) between two boolean types `B1` and `B2`.
 * @example
   Xor<true, false>; // true
   Xor<true, true>; // false
*/
export type Xor<B1 extends boolean, B2 extends boolean> = Or<
  And<B1, Not<B2>>,
  And<Not<B1>, B2>
>;

/**
 * Logical NAND between two boolean types `B1` and `B2`.
 * @example
   Nand<true, false>; // true
   Nand<true, true>; // false
*/
export type Nand<B1 extends boolean, B2 extends boolean> = Not<And<B1, B2>>;

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
 * Represents a  type that can be either a single value of  type `T` or an array of values of  type `T`.
 * @example
 * type T1 = EitherOneOrMany<number>; 10; // Valid
 * type T2 = EitherOneOrMany<number>;  [20, 30]; // Also valid
 */
export type EitherOneOrMany<T> = T | T[];

/**
 * Turns a given primitive value (except symbol) into its string representation
 * @example
 * ```ts
StringifyPrimitive<45> //  "45"
StringifyPrimitive<boolean> //  "false" | "true"
StringifyPrimitive<null> // "null"
StringifyPrimitive<undefined> // "undefined"
 * ```
 */
export type StringifyPrimitive<P extends Exclude<Primitive, symbol>> = `${P}`;

/**
 * Turn a given string literal to a numeric
 * @example
 * ````ts`
 NumerifyString<'54'>; // 54
 NumerifyString<'699620.000000001'>; // 699620.000000001
 IsNegativeFloat<NumerifyString<'-699620.000000001'>>; // true
 * ````
 */
export type NumerifyString<S extends string> = S extends `${infer N extends
  Numeric}`
  ? N
  : never;

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

/**
 * Get the length of a given string
 * @example
 * ```ts
 * Strlen<'foo'>; // Result: 3
 * ```
 *
 * Can be used to create type constraints on string lengths:
 * ```ts
 * // Only allow strings of length 8-10 characters
 * type ValidPassword<T extends string> = Strlen<T> extends 8 | 9 | 10 ? T : never;
 *
 * // Function that only accepts valid password strings
 * function checkValidPassword<T extends string>(val: T & ValidPassword<T>) {
 *   console.log(val);
 * }
 *
 * // Works with string literals
 * const validPass = checkValidPassword('password123' as const); // OK
 * const invalidPass = checkValidPassword('short' as const); // Type error
 * ```
 */
export type Strlen<
  S extends string,
  Arr extends any[] = EmptyArray,
> = S extends `${infer L}${infer R}` ? Strlen<R, [...Arr, L]> : Arr['length'];

/**
 * Check if two strings S1 and S2 have the same length
 * @returns
 * ``true`` if they do, else ``false``
 */
export type EqualStrlen<S1 extends string, S2 extends string> = Equals<
  Strlen<S1>,
  Strlen<S2>
>;

type EmptyArray = [];

/**
 * Conditional  type that checks if  type `T` extends  type `P`.
 * If `T` extends `P`, the  type resolves to `Do`; otherwise `Else`.
 * @example
 *  type Result1 = IfExtends<string, string | number, true, false>; // is true
 *  type Result2 = IfExtends<number, string | number, true, false>; // is true
 *  type Result3 = IfExtends<boolean, string | number, true, false>; // is false
 *
 *  type IsString<T> = IfExtends<T, string, true, false>;
 *  type IsNumber<T> = IfExtends<T, number, true, false>;
 *
 *  type TestString = IsString<string>; // is true
 *  type TestNumber = IsNumber<number>; // is true
 *  type TestBoolean = IsNumber<boolean>; // is false
 */
export type IfExtends<T, P, Do, Else> = T extends P ? Do : Else;

/**
 * Conditional type that checks if type `T` is equal to type `P`.
 * If `T` is equal to `P`, the type resolves to `Do`, otherwise `Else`.
 * @example
 *  type Result1 = IfEquals<string, string, true, false>; // is true
 *  type Result2 = IfEquals<number, string, true, false>; // is false
 *  type Result3 = IfEquals<boolean, boolean, true, false>; // is true
 *
 *  type IsExactlyString<T> = IfEquals<T, string, true, false>;
 *  type IsExactlyNumber<T> = IfEquals<T, number, true, false>;
 *
 *  type TestString = IsExactlyString<string>; // is true
 *  type TestNumber = IsExactlyNumber<number>; // is false
 *  type TestBoolean = IsExactlyString<boolean>; // is false
 */
export type IfEquals<T, P, Do, Else> = Equals<T, P> extends true ? Do : Else;

/**
 * Conditional  type that checks if two types `X` and `Y` are exactly equal.
 * If `X` is equal to `Y`, the  type resolves to `true`; otherwise `false`.
 * @example
 *  type Result1 = Equals<string, string>; // is true
 *  type Result2 = Equals<number, string>; // is false
 *  type Result3 = Equals<boolean | string, string | boolean>; // is true
 */
export type Equals<X, Y> = (<T>() => T extends X ? true : false) extends <
  T,
>() => T extends Y ? true : false
  ? true
  : false;

/**
 A  type that excludes `null` and `undefined` from  type `T`.
 * @example
 Type Str = ExcludeNullable<string | null> //  string
 Type Str2 = ExcludeNullable<string | null | undefined> //  string
 Type Str3 = ExcludeNullable<string | undefined> //  string
 *
 */
export type ExcludeNullable<T> = Exclude<T, Nullable>;
/**
 A  type that excludes `undefined` from  type `T`.
 * @example
 Type Str = ExcludeNullable<string | undefined> // Result:  string
 */
export type ExcludeUndefined<T> = Exclude<T, undefined>;

/**
 * A  type that excludes `null` from  type `T`.
 * @example
 Type Str = ExcludeNullable<string | null> // Result:  string
 */
export type ExcludeNull<T> = Exclude<T, null>;

/**
 * Get the literal names of keys that are methods in object type `T`
 * @example
 * ````ts
 Methods<{
      foo: () => void;
      bar: (a: any) => string;
      barBaz: string;
      bazBar: Numeric;
    }> // Result: 'foo' | 'bar'
 * ````
 */
export type Methods<T extends object> = {
  [K in Keys<T>]-?: ExcludeNullable<T[K]> extends AnyFunction ? K : never;
}[Keys<T>];

/**
     * Get the literal names of keys that are propeties, basically anything that's not a method in object type `T`
     * @example
     * ````ts
     Properties<{
          barBaz: string;
          bazBar: Numeric;
          bar: () => number; 
        }> // Result: 'barBaz' | 'bazBar'
     * ````
     */
export type Properties<T extends object> = {
  [K in Keys<T>]-?: ExcludeNullable<T[K]> extends AnyFunction ? never : K;
}[Keys<T>];

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
 * @hidden
 */
type _FlippableRecord = Record<string, string | number | boolean>;

/**
 * Constructs a new type that takes an object type `T` and returns a new object type where the keys of `T` become
 * the values and the values become the keys.
 *
 * @example
 * ```typescript
 * type Object1 = { name: 'John'; age: 30; city: 'New York' };
 * type Flipped1 = Flip<Object1>; // {'John': 'name', 30: 'age', 'New York': 'city'}
 *
 * type Object2 = { fruit: 'Apple'; color: 'Red'; price: 1.25 };
 * type Flipped2 = Flip<Object2>; // {'Apple': 'fruit', 'Red': 'color', 1.25: 'price'}
 *
 * type Object3 = { optionA: true; optionB: false };
 * type Flipped3 = Flip<Object3>; // {true: 'optionA', false: 'optionB'}
 * ```
 */
export type Flip<T extends _FlippableRecord> = {
  [P in Keys<T> as StringifyPrimitive<T[P]>]: P;
};

/**
 * Constructs a new type by replacing keys of type `T` in object type `U` with corresponding keys from object type `Y`.
 * @template U The original object type.
 * @template T The type of keys to replace.
 * @template Y The object type containing replacement keys.
 *
 * @example
 * ```typescript
 * type Original = {
 *   bar: string;
 *   foo: number;
 *   fooBar: string;
 * };
 *
 * type Replacement = ReplaceKeys<Original, 'bar', { bar: number }>;
 *
 * // Result: { bar: number; foo: number; fooBar: string; }
 *
 * type AnotherReplacement = ReplaceKeys<Original, 'foo', { foo: boolean }>;
 *
 * // Result: { bar: string; foo: boolean; fooBar: string; }
 * ```
 */
export type ReplaceKeys<U, T, Y> = {
  [K in Keys<U>]: IfExtends<K, T, K extends Keys<Y> ? Y[K] : never, U[K]>;
};
/**
 * A  type that recursively mutates all the proprties within a given object  type `T`.
 *
 * @example
 * ````ts
type Actual = {
  readonly a: () => 1;
  readonly x: string;
  readonly s: {
    readonly q: Nullable;
    readonly s: {
      readonly i: {
        readonly x: {
          readonly o: Maybe<Primitive>;
          readonly n: Falsy;
        };
        readonly e: 'foo';
      };
    };
  };
};

type Expected = {
  a: () => 1;
  x: string;
  s: {
    q: Nullable;
    s: {
      i: {
        x: {
          o: Maybe<Primitive>;
          n: Falsy;
        };
        e: 'foo';
      };
    };
  };
};
type T = DeepMutable<Actual>; // T Results in: Expected
 * ````
 */
export type DeepMutable<T> = T extends UnknownFunction
  ? T
  : {
      -readonly [K in Keys<T>]: T[K] extends unknown ? DeepMutable<T[K]> : T[K];
    };

/**
 * Checks if all the nested properties of a given object T are actually mutable.
 */
export type IsDeepMutable<T> = T extends DeepMutable<T> ? true : false;

/**
 * Checks if all the nested properties of a given object T are actually immutable.
 */
export type IsDeepImmutable<T> = T extends DeepImmutable<T> ? true : false;

/**
 * Check if all the properties of a given object (nested) are required
 * @returns
 * `true` if all the properties are, otherwise `false`
 */
export type IsDeepRequired<T> = IfExtends<T, DeepRequired<T>, true, false>;

/**
 * Check if all the properties of a given object (nested) are non required
 * @returns
 * `true` if all the properties are, otherwise `false`
 */
export type IsDeepNotRequired<T> = IfExtends<
  T,
  DeepNotRequired<T>,
  true,
  false
>;

/**
 * A  type that recursively turns the proprties within a given object  type `T` immutable.
 * @example
 * ````ts
type Actual = {
  a: () => 1;
  x: string;
  s: {
    q: Nullable;
    s: {
      i: {
        x: {
          o: Maybe<Primitive>;
          n: Falsy;
        };
        e: 'foo';
      };
    };
  };
};

type Expected = {
  readonly a: () => 1;
  readonly x: string;
  readonly s: {
    readonly q: Nullable;
    readonly s: {
      readonly i: {
        readonly x: {
          readonly o: Maybe<Primitive>;
          readonly n: Falsy;
        };
        readonly e: 'foo';
      };
    };
  };
};
type T = DeepImmutable<Actual>; // T Results in: Expected
 * ````
 * */
export type DeepImmutable<T> = T extends UnknownFunction
  ? T
  : {
      readonly [K in Keys<T>]: T[K] extends unknown
        ? DeepImmutable<T[K]>
        : T[K];
    };

declare const __s: unique symbol;

/**
 * This type represents a new unique type derived from an existing base type.
 * It defines a mechanism similar to Python's [`NewType`](https://docs.python.org/3/library/typing.html#newtype).
 * In TypeScript world it's refered to as 'Type Branding'.
 *
 * @template N The unique identifier for the new type.
 * @template T The base type of the new type.
 *
 * @example
 * type FooID = NewType<'FooID', string>;
 * type BarID = NewType<'BarID', string>;
 *
 * const fooId: FooID = 'foo123' as FooID;
 * const barId: BarID = 'bar456' as BarID;
 *
 * // Here's a potential bug:
 * const buggyFooBar = (foo: string, bar: string) => {};
 * buggyFooBar('bar456', 'foo123'); // this works but it's an undetected bug.
 *
 * // Bug mitigation:
 * const safeFooBar = (foo: FooID, bar: BarID) => {};
 * safeFooBar('bar456', 'foo123'); // TypeScript error: Argument of type 'string' is not assignable to parameter of type 'FooID'.
 */
export type NewType<N, T> = T & {
  /**
   * Property `__s` is not intended for direct access nor modification.
   * @internal
   */ [__s]: N;
};

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
 * As the name implies, it turns a union into an intersection
 * @example
  type ExpectedToBe = (() => 'foo') & ((baz: 88) => Optional<T>);

  type T = NewType<'T', string>;
  type Result = UnionToIntersection<
      (() => 'foo') | ((baz: 88) => Optional<NewType<'T', string>>)
    >
    // Result: ExpectedToBe

    type Result2 = UnionToIntersection<
      IsFalsy<0> | IsDeepImmutable<{ a: string; readonly b: string }>
    >
    // Result 2: IsFalsy<0> & IsDeepImmutable<{ a: string; readonly b: string }> => true & true => evaluates to true
 *
 */
export type UnionToIntersection<U> = (
  U extends unknown ? (arg: U) => unknown : never
) extends (arg: infer I) => void
  ? I
  : never;

/**
 * @hidden
 */
type _FindPrimitive<T> = T extends string
  ? string
  : T extends symbol
    ? symbol
    : T extends boolean
      ? boolean
      : T extends null
        ? null
        : T extends number
          ? number
          : T extends bigint
            ? bigint
            : T extends undefined
              ? undefined
              : never;
/**
* @example
* Recursively transforms an object type `T` into a type where all properties
* are replaced with their corresponding primitive types.
* ````ts
type Actual = {
  a: 'a';
  b: 85;
  c: true;
  d: {
    e: 'xxxxxxxxxxx';
    f: 'eeeeeeeeeeeeeeeeee';
    g: {
      h: 1000000000000000;
      i: undefined;
      j: null;
    };
  };
};
type Expected = {
  a: string;
  b: number;
  c: boolean;
  d: {
    e: string;
    f: string;
    g: {
      h: number;
      i: undefined;
      j: null;
    };
  };
};
type Result = DeepToPrimitive<Actual>; // Expected
* ````
*/
export type DeepToPrimitive<T> = {
  [K in Keys<T>]: T[K] extends object
    ? DeepToPrimitive<T[K]>
    : _FindPrimitive<T[K]>;
};

/**
 * @hidden
 */
type __Merge<T, S> = {
  [K in Keys<T> | Keys<S>]: K extends Keys<S> ? S[K] : T[K & Keys<T>];
};

/**
 * Copies all enumerable own properties from one target object
 * to a source array of objects.
 * @example
 * ````ts
 type T = Assign<{ a: 'd'; d: 'd' }, [{ a: 'a' }, { b: 'b' }, { c: 'c' }]>
 // Result:
 {
      a: 'a';
      b: 'b';
      c: 'c';
      d: 'd';
    }
 * ````
 */
export type Assign<
  T extends Record<string, unknown>,
  Arr extends unknown[],
> = Arr extends [infer S, ...infer E]
  ? Assign<S extends object ? __Merge<T, S> : T, E>
  : T;

/**
 * Get the common keys between two objects, if a key is found to be shared between both,
 * then the type of that key will take the first object's key type
 * @returns
 * An object that consist of what's common in both, else never
 * @example
 * ````ts
 CommonKeys<
      { d: 'first objects d'; x: 'also first objects x' },
      { d: 'd'; p: { b: 'b' }; x: { c: 'c' } }
    >
    // Results in { d: 'first objects d'; x: 'also first objects x' }
 * ````
 */
export type PickCommonKeys<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>,
> = Pick<T, Extract<Keys<T>, Keys<U>> & Extract<Keys<U>, Keys<T>>>;

/**
 * Omit the common keys between the the two objects,
 * @returns
 * An object that consist of what's unique in both, else never
 * @example
 * ````ts
 OmitCommonKeys<{ d: { d: 'a' }; p: { b: 'b' }; x: { c: 'c' } }, { d: 'd' }>
 // Result:
 {
      p: {
        b: 'b';
      };
      x: {
        c: 'c';
      };
    }

 OmitCommonKeys<
      { d: 'd'; k: 'k' },
      { d: 'd'; p: { b: 'b' }; x: { c: 'c' } }
    >
  // Result:
  { k: 'k' }
 * ````
 */
export type OmitCommonKeys<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>,
> = Pick<T, Exclude<Keys<T>, Keys<U>>>;

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
  T extends Record<string, any>,
  P extends string,
> = UnionToIntersection<
  P extends P
    ? P extends `${infer K}.${infer R}`
      ? {
          [K1 in K]: DeepPick<T[K1], R>;
        }
      : P extends Keys<T>
        ? Pick<T, P>
        : never
    : never
>;

/**
 * Retrieves the keys that are mutable from an object of  type T.
 * @example
 * ```typescript
 *  type ExampleType = {
 *   a: number;
 *   readonly b: string;
 *   c: {
 *     a: string;
 *     d: { readonly x: Nullable; v: Maybe<Newable> };
 *   };
 * };
 *
 *  type MutableKeysOfExampleType = MutableKeys<ExampleType>;
 * // Result: 'a' | 'c'
 * ```
 */
export type MutableKeys<T> = {
  [P in Keys<T>]: Equals<Pick<T, P>, Readonly<Pick<T, P>>> extends true
    ? never
    : P;
}[Keys<T>];

/**
 * Retrieves the keys that are immutable (readonly) from an object of  type T.
 * @example
 * ```typescript
 *  type ExampleType = {
 *   a: number;
 *   readonly b: string;
 *   c: {
 *     a: string;
 *     d: { readonly x: Nullable; v: Maybe<Newable> };
 *   };
 * };
 *
 *  type ImmutableKeysOfExampleType = ImmutableKeys<ExampleType>;
 * // Result: 'b'
 * ```
 */
export type ImmutableKeys<T> = {
  [P in Keys<T>]: Equals<Pick<T, P>, Readonly<Pick<T, P>>> extends true
    ? P
    : never;
}[Keys<T>];

/**
 * A function to determines if two types match.
 * @template T1 The first  type to compare.
 * @template T2 The second  type to compare.
 * @template Expected A boolean literal indicating whether `T1` should match `T2`.
 * If you expect the types to match, set this to true; if not, set it to false.
 * @returns
 * Boolean that is true, if your expectation was correct, otherwise false.
 * @hidden
 */
declare function testType<T1, T2, E extends boolean>(): Equals<
  Equals<T1, T2>,
  E
>;
/**
 * Determines if two types match.
 * @template T1 The first  type to compare.
 * @template T2 The second  type to compare.
 * @template Expected A boolean literal indicating whether `T1` should match `T2`.
 * If you expect the types to match, set this to ``true``; if not, set it to false.
 * This utility will return a boolean that is ``true`` if your expectation was correct, otherwise false.
 * @example
```typescript
type ResultType = TestType<Type1, Type2, true>;
```
``TestType`` accepts three arguments: the types you're comparing (``Type1`` and ``Type2``) and a boolean (``true`` if you expected them to match, ``false`` otherwise). The resulting type will tell if your expectation is correct, ``true`` if it is, else ``false``.

You can use it however you want, maybe to test a type on the go, or,
test using a testing framework. Here's an example with [`vitest`](https://vitest.dev)

````ts
import type { Abs, TestType } from 'ts-roids';
import { test, expect , expectTypeOf} from 'vitest';

test('|-54| should be 54',() => {
  type ShouldPass = true;
  expectTypeOf<TestType<Abs<-54>, 54, true>>().toEqualTypeOf<ShouldPass>();
});
 * ````
 * */
export type TestType<T1, T2, Expected extends boolean> = ReturnType<
  typeof testType<T1, T2, Expected>
>;

/**
 * Infers a mapping from values to their corresponding keys within a given object type `T`.
 * The resulting type provides a reverse lookup, which allows to to retrieve the keys based on specific values.
 * @remarks
 * > This type only works with simple object types without nested structures or complex types.
 * It may not behave as expected with objects containing nested properties, union types, intersections, or other
 * advanced constructs.
 *
 * For example, given a simple object type `T`:
 *
 * ```typescript
 * type SimpleObjectType = {
 *   name: 'Zee';
 *   age: 29;
 *   city: 'Zion';
 * };
 *
 * type T =  KeysToValues<SimpleObjectType> // results in:
 *
 * {
 *   Zee : 'name';
 *   29: 'age';
 *   'Zion': 'city';
 * }
 * ```
 */
export type KeysToValues<T extends Record<Keys<T>, Keys<any>>> = {
  [K in T[Keys<T>]]: {
    [K1 in Keys<T>]: T[K1] extends K ? K1 : never;
  }[Keys<T>];
};

/**
 * `FilterBy<T, P>` filters keys from the object type `T` based on a specified predicate `P`.
 *
 * @remark
 * > This type performs a shallow filtering of keys within `T` and does not check deeply nested types
 * or complex structures within the object type.
 *
 * > It does not return the key as a whole object, it just returns the key itself
 * @example
 *
 * ```typescript
 * type T = {
 *   a: () => 1;
 *   x: string;
 *   s: {
 *     q: Nullable;
 *     s: {
 *       i: {
 *         x: {
 *           o: boolean;
 *           n: Falsy;
 *         };
 *         e: 'foo';
 *       };
 *     };
 *   };
 * };
 *
 * ```
 * ```typescript
 * type _ = FilterBy<T, 'a'>
 * ```
 * Results in the type `'a'`, which includes only the key `'a'` from `T`.
 * ```typescript
 * type _ = FilterBy<T, Falsy>
 * ```
 * Results in the type `never`, indicating that no keys in `T` match the type `Falsy`.
 *
 * ```typescript
 * type _ = FilterBy<T, string>
 * ```
 * Results in the type `'a' | 'x' | 's'`, which includes all top-level keys of `T`
 * that are of type `string`. It did not pick up on 'e' as it is nested down.
 */
export type FilterBy<T, P> = {
  [K in Keys<T>]: K extends P ? K : never;
}[Keys<T>];

/**
 * Get a set of properties from `T` whose type are not assignable to `P`.
 * @example
 * ````ts
 * type T = {
 *  foo: string,
 *  bar: bigint | boolean,
 *  baz: number,
 * }
 * OmitByType<T,true>; // Result: T
 * OmitByType<T,number>; // Result: { foo: string, bar: bigint | boolean }
 * ````
 */
export type OmitByType<T, P> = {
  [K in Keys<T> as T[K] extends P ? never : K]: T[K];
};

/**
 * Get a set of properties from `T` whose type exactly matches `P`.
 * @example
 * ````ts
type deep = {
        isActive: boolean;
        count?: number;
        description: string | null;
        details: {
          id: bigint;
          name: string;
          nested: {
            title: string;
            subtitle: string;
            moreDetails: {
              numberId: bigint;
            };
          };
        };
        additionalInfo: string | boolean;
      }
type A = OmitExactlyByTypeDeep<deep, bigint>
// A results in:
 {
      isActive: boolean;
      count?: number;
      description: string | null;
      details: {
        name: string;
        nested: {
          title: string;
          subtitle: string;
          moreDetails: EmptyObject;
        };
      };
      additionalInfo: string | boolean;
    }
 * ````
 */
export type OmitExactlyByTypeDeep<T, P> = {
  [K in Keys<T> as IfEquals<T[K], P, never, K>]: OmitExactlyByTypeDeep<T[K], P>;
};

/**
 * From ``T``, pick a set of properties whose type are assignable to ``P``.
 * @example
 * ````ts
 * type T = {
 *  foo: string,
 *  bar: bigint | boolean,
 *  baz: number,
 * }
 * PickByType<T,true>; // Result: {}
 * PickByType<T,number>; // Result: { baz: number }
 * ````
 */
export type PickByType<T, P> = {
  [K in Keys<T> as T[K] extends P ? K : never]: T[K];
};

/**
 * From ``T``, pick a set of properties whose type excatly matches ``P``.
 * @example
 * ````ts
type OneLevelDeep = {
  foo: boolean;
  bar?: Numeric;
  baz: Nullable;
  fooBaz: bigint;
  bazFoo: string | boolean;
  seven: 7;
  aNum: number;
};
  type A = PickExactlyByType<OneLevelDeep, bigint>,
  // A results in:
    {
      fooBaz: bigint;
    },
  // Notice how it does not pick up seven
 type B = PickExactlyByType<OneLevelDeep, number>,
    {
      aNum: number;
    }
 * ````
 */
export type PickExactlyByType<T, P> = {
  [K in Keys<T> as If<Equals<T[K], P>, K, never>]: T[K];
};

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

/**
 * Make all object properties required
 * @example
 * ```ts
type Expected = {
  a: () => 1;
  x: string;
  s: {
    q: Nullable;
    s: {
      i: {
        x: {
          o: Maybe<Primitive>;
          n: Falsy;
        };
        e: 'foo';
      };
    };
  };
};

type Actual = {
  a?: () => 1;
  x?: string;
  s?: {
    q?: Nullable;
    s?: {
      i?: {
        x?: {
          o?: Maybe<Primitive>;
          n?: Falsy;
        };
        e?: 'foo';
      };
    };
  };
};
type T = DeepRequired<Actual>; // Result: Expected
 * ```
 */
export type DeepRequired<T> = T extends UnknownFunction
  ? T
  : {
      [K in Keys<T>]-?: IfExtends<T[K], unknown, DeepRequired<T[K]>, T[K]>;
    };

/**
 * Why not call it ``DeepOptional``?
 * ``Optional<T>`` in this library `Optional` represents a type ``T`` that can be either ``T`` or ``null``. So creating
 * ``DeepOptional`` type would entail adding null to every property, which is not the intention here.
 *
 * ``DeepNotRequired<T>`` turns all required keys in a given object (nested) to non required one.
 * non required as in: marked with `?` operator
 * @example
 * ```ts
type Actual = {
  a: () => 1;
  x: string;
  s: {
    q: Nullable;
    s: {
      i: {
        x: {
          o: Maybe<Primitive>;
          n: Falsy;
        };
        e: 'foo';
      };
    };
  };
};

type Expected = {
  a?: () => 1;
  x?: string;
  s?: {
    q?: Nullable;
    s?: {
      i?: {
        x?: {
          o?: Maybe<Primitive>;
          n?: Falsy;
        };
        e?: 'foo';
      };
    };
  };
};
type T = DeepNotRequired<Actual>; // Result: Expected
 * ```
 */
export type DeepNotRequired<T> = T extends UnknownFunction
  ? T
  : {
      [K in Keys<T>]+?: IfExtends<T[K], unknown, DeepNotRequired<T[K]>, T[K]>;
    };

/**
 * `NotIncluded` is a utility type that represents a value that should not be included
 * in the final type. It is primarily used within the `Prune` type to exclude certain
 * properties from the resulting object type.
 *
 * @remarks
 * The `NotIncluded` type is typically used in conditional types to exclude specific
 * branches of the type structure. When a condition matches, `NotIncluded` is applied
 * to those properties that should be omitted from the final type structure.
 *
 * @example
 * ```ts
 * type MyType = IfEquals<'foo', 'bar', string, NotIncluded>; // Result: NotIncluded
 * ```
 *
 * In the context of the `Prune` type, `NotIncluded` helps in filtering out properties
 * from deeply nested structures where certain conditions do not hold.
 */
export type NotIncluded = NewType<'NotIncluded', string>;

/**
 * `Prune<T, N = NotIncluded>` is a utility type that recursively removes properties of
 * type `N` (defaulting to `NotIncluded`) from the object type `T`. Useful
 * for filtering out unwanted or excluded properties in complex, deeply nested object
 * structures, where  you need to clean up or transform types where certain properties should be excluded based
 * on specific generic type conditions.
 * @example
 * Consider the following example where `Prune` is used to exclude properties marked as `NotIncluded`:
 * ```ts
 * type OrderData = Prune<
    UserOrderDetails<
      OrderStatus.DELIVERED,
      UserActionType.PLACE_ORDER,
      ProductType.PHYSICAL,
      PaymentMethod.PAYPAL
    >
  >;
 * ```
 * Where `UserOrderDetails` is defined as: 
 * ```ts
 
export enum OrderStatus {
  PENDING = 'PENDING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  PAYPAL = 'PAYPAL',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  CREDITS = 'CREDITS',
}

export enum UserActionType {
  PLACE_ORDER = 'PLACE_ORDER',
  CANCEL_ORDER = 'CANCEL_ORDER',
  RETURN_ORDER = 'RETURN_ORDER',
  RATE_PRODUCT = 'RATE_PRODUCT',
  WRITE_REVIEW = 'WRITE_REVIEW',
}

export enum ProductType {
  DIGITAL = 'DIGITAL',
  PHYSICAL = 'PHYSICAL',
}

interface ShippingDetails {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  deliveryDate: Maybe<string>;
}

type ProductPricing<T extends ProductType> = {
  basePrice: number;
  discount: number;
  finalPrice: number;
  inCountryDiscount: IfEquals<T, ProductType.PHYSICAL, number, NotIncluded>;
};

type ProductDetails<T extends ProductType> = {
  type: T;
  productId: string;
  productName: string;
  quantity: number;
  pricing: ProductPricing<T>;
  physicalDescription: IfEquals<
    T,
    ProductType.DIGITAL,
    {
      color: string;
      size: string;
    },
    NotIncluded
  >;
};

type PaymentBreakdown = {
  baseAmount: number;
  tax: number;
  discount: number;
  finalAmount: number;
};

interface PaymentDetails<PM extends PaymentMethod> {
  method: PM;
  transactionId: Maybe<string>;
  amountPaid: number;
  breakdown: IfEquals<PM, PaymentMethod.CREDITS, string, PaymentBreakdown>;
}

type UserOrderDetails<
  OS extends OrderStatus,
  UAT extends UserActionType,
  PT extends ProductType,
  PM extends PaymentMethod,
> = {
  orderId: string;
  userId: string;
  products: ProductDetails<PT>[];
  orderStatus: OS;
  shipping: IfEquals<
    PT,
    ProductType.PHYSICAL,
    {
      details: IfEquals<
        OS,
        OrderStatus.SHIPPED | OrderStatus.DELIVERED,
        ShippingDetails,
        NotIncluded
      >;
      deliveredOn: IfEquals<OS, OrderStatus.DELIVERED, Date, NotIncluded>;
      returnedOn: IfEquals<OS, OrderStatus.RETURNED, Date, NotIncluded>;
    },
    NotIncluded
  >;
  payment: PaymentDetails<PM>;
  actions: {
    type: UAT;
    timestamp: number;
    metadata: IfEquals<
      UAT,
      | UserActionType.PLACE_ORDER
      | UserActionType.CANCEL_ORDER
      | UserActionType.RETURN_ORDER,
      {
        ipAddress: string;
        deviceType: string;
      },
      NotIncluded
    >;
  }[];
};
 * ```
Any property marked as `NotIncluded` will be excluded from the resulting `OrderData` type, not as `undefined` or `null`, but completely excluded as if it never existed on the type 

 * ```ts
  const testOrderData: OrderData = {
    orderStatus: OrderStatus.DELIVERED,
    actions: [
      {
        timestamp: 1663725600000,
        // Type 'UserActionType.RATE_PRODUCT' is not assignable to type 'UserActionType.PLACE_ORDER'.ts(2322)
        type: UserActionType.PLACE_ORDER,
        // Object literal may only specify known properties, and 'metadata' does not exist in type 'OmitExactlyByTypeDeep<{ type: UserActionType.PLACE_ORDER; timestamp: number; metadata: NotIncluded; }, NotIncluded>'.ts(2353)
        // metadata: {
        //   ipAddress: '127.0.0.1',
        //   deviceType: 'desktop',
        // },
      },
    ],
    orderId: '123',
    userId: 'abc',
    products: [
      {
        // Type 'ProdcutType.DIGITAL' is not assignable to type 'ProdcutType.PHYSICAL'.ts(2322)
        type: ProductType.PHYSICAL,
        productId: 'abc',
        productName: 'Test Product',
        quantity: 1,
        pricing: {
          basePrice: 10,
          discount: 0,
          finalPrice: 10,
          // If the product type is digital, the 'physicalDescription' property should be omitted
          // Object literal may only specify known properties, and 'inCountryDiscount' does not exist in type 'OmitExactlyByTypeDeep<ProductPricing<ProductType.DIGITAL>, NotIncluded>'.ts(2353)
          // physicalDescription: {
          //   color: 'Red',
          //   size: 'Large',
          // },
          inCountryDiscount: 87,
        },
      },
    ],
    payment: {
      amountPaid: 10,
      // If the PaymentMethod is CREDITS, the 'breakdown' property should be a string, no Breakdown object should exist
      // Type '{ baseAmount: number; tax: number; discount: number; finalAmount: number; }' is not assignable to type 'string'.
      breakdown: {
        baseAmount: 10,
        tax: 2,
        discount: 0,
        finalAmount: 12,
      },
      // Type 'PaymentMethod.BANK_TRANSFER' is not assignable to type 'PaymentMethod.PAYPAL'.ts(2322)
      // method: PaymentMethod.BANK_TRANSFER,
      method: PaymentMethod.PAYPAL,
      transactionId: '1234567890',
    },
    shipping: {
      deliveredOn: new Date(),
    },
  };
 * ```
 *
 * In this example, `Prune`  removes all properties within `UserOrderDetails`
 * that are marked with `NotIncluded`, resulting in a cleaned-up type structure.
 */
export type Prune<T, N = NotIncluded> = OmitExactlyByTypeDeep<T, N>;

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

type KeysOfUnion<T> = T extends T ? keyof T : never;
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
 * `PartializedUnion<T>` creates a union type where each member has its own properties as required,
 * while properties from other members of the union are made optional and set to `undefined`.
 * This is useful for cases where different configurations or variants in a union require only their specific fields.
 *
 * @template T - The union of object types for which partially optionalized variants should be created.
 * @template AllKeys - The union of all possible keys across the union's types, derived from `KeysOfUnion`.
 *
 * @example
 * ```ts
 * type Config = PartializedUnion<
 *   | { dbConnectionString: string; maxConnections: number }
 *   | { apiEndpoint: string; apiKey: string }
 *   | { storageBucket: string; accessKeyId: string; secretAccessKey: string }
 * >;
 *
 * // Example usage:
 * function configureService(config: Config) {
 *   if (config.dbConnectionString) {
 *     console.log(`Configuring database with connection string ${config.dbConnectionString}`);
 *   } else if (config.apiEndpoint) {
 *     console.log(`Configuring API with endpoint ${config.apiEndpoint}`);
 *   } else if (config.storageBucket && config.accessKeyId && config.secretAccessKey) {
 *     console.log(`Configuring storage bucket ${config.storageBucket}`);
 *   } else {
 *     console.log('Invalid configuration');
 *   }
 * }
 *
 * configureService({ dbConnectionString: 'postgres://...', maxConnections: 100 });
 * configureService({ apiEndpoint: 'https://api.example.com', apiKey: '1234' });
 * configureService({ storageBucket: 'my-bucket', accessKeyId: 'AKIA...', secretAccessKey: 'abcd' });
 * ```
 */
export type PartializedUnion<
  T extends object,
  AllKeys extends KeysOfUnion<T> = KeysOfUnion<T>,
> = Simplify<
  T extends unknown
    ? T & Partial<Record<Exclude<AllKeys, Keys<T>>, undefined>>
    : never
>;
