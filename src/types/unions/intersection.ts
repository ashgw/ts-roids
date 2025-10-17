/**
 * As the name implies, it turns a union into an intersection
 * @example
  type T = NewType<'T', string>;
  type Result = UnionToIntersection<
      (() => 'foo') | ((baz: 88) => Optional<NewType<'T', string>>)
    >
    // Result: (() => 'foo') & ((baz: 88) => Optional<T>)

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
