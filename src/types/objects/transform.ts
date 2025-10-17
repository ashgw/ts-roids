import type { Keys } from './keys';
import type { StringifyPrimitive } from '../strings/conversions';
import type { IfExtends } from '../logic';

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
 * Recursively transforms an object type T into a type where all properties are replaced with their corresponding primitive types.
 * @template T The object type to transform.
 * @returns A new object type with primitive types.
 *
 * @example
 * ```ts
 * type Actual = {
 *   a: 'a';
 *   b: 85;
 *   c: true;
 *   d: {
 *     e: 'xxxxxxxxxxx';
 *     f: 'eeeeeeeeeeeeeeeeee';
 *     g: {
 *       h: 1000000000000000;
 *       i: undefined;
 *       j: null;
 *     };
 *   };
 * };
 *
 * type Expected = {
 *   a: string;
 *   b: number;
 *   c: boolean;
 *   d: {
 *     e: string;
 *     f: string;
 *     g: {
 *       h: number;
 *       i: undefined;
 *       j: null;
 *     };
 *   };
 * };
 *
 * type Result = DeepToPrimitive<Actual>; // Result: Expected
 * ```
 */
export type DeepToPrimitive<T> = {
  [K in Keys<T>]: T[K] extends object
    ? DeepToPrimitive<T[K]>
    : _FindPrimitive<T[K]>;
};

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
