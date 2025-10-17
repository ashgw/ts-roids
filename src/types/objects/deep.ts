import type { UnknownFunction } from '../primitives';
import type { Keys } from './keys';
import type { IfExtends } from '../logic';

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
