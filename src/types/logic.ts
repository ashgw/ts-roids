/**
 * Conditional type: if the condition `C` is `true`, return `Do`, otherwise return `Else`.
 * @example
 * ````ts
   If<IsNever<never>, true, false>; // true
   If<Not<IsNever<never>>, true, false>; // false
 * ````
*/
export type If<C extends boolean, Do, Else> = C extends true ? Do : Else;

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
 * Logical NOR between two boolean types `B1` and `B2`.
 * Evaluates to `true` only if both `B1` and `B2` are `false`.
 * @example
   Nor<false, false>; // true
   Nor<true, false>; // false
   Nor<false, true>; // false
   Nor<true, true>; // false
*/
export type Nor<A extends boolean, B extends boolean> = Not<Or<A, B>>;

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
 * Logical XNOR between two boolean types `A` and `B`.
 * @example
   Xnor<true, false>; // false
   Xnor<true, true>; // true
*/
export type Xnor<A extends boolean, B extends boolean> = Not<Xor<A, B>>;

/**
 * Logical XAND between two boolean types `A` and `B`. (basically NOR)
 * @example
   Xand<false, false>; // true
   Xand<true, false>; // false
   Xand<false, true>; // false
   Xand<true, true>; // false
 */
export type Xand<A extends boolean, B extends boolean> = Not<Xor<A, B>>; // same as XNOR

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
