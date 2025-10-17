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
