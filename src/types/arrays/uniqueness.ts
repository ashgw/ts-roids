/**
 * Represents a unique array type that filters out duplicate elements.
 * If a duplicate is encountered, it returns a tuple with an error message and the duplicate element.
 *
 * @template T The type of the elements in the array, which must be a readonly array.
 * @returns A readonly array of unique elements or a tuple indicating a duplicate.
 *
 * @example
 * ```
 * type Result1 = UniqueArray<[1, 2, 3, 1]>; // Result: ['Encountered duplicate element', 1]
 * type Result2 = UniqueArray<[1, 2, 3]>; // Result: [1, 2, 3]
 * type Result3 = UniqueArray<[]>; // Result: []
 * ```
 */
export type UniqueArray<
  T extends readonly unknown[],
  Seen = never,
> = T extends readonly [infer Head, ...infer Tail]
  ? Head extends Seen
    ? ['Encountered duplicate element', Head]
    : readonly [Head, ...UniqueArray<Tail, Seen | Head>]
  : T;
