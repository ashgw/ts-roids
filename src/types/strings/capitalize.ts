/**
 * Capitalizes the first character of a string literal type while preserving the rest.
 * This is particularly useful when you need to transform string literal unions into
 * their capitalized counterparts.
 *
 * @template T The string literal type to capitalize
 *
 * @example
 * ```ts
 * type Category = "software" | "health" | "philosophy";
 * type Result = CapitalizeFirst<Category>; // "Software" | "Health" | "Philosophy"
 *
 * type Single = CapitalizeFirst<"hello">; // "Hello"
 * ```
 */
export type CapitalizeFirst<T extends string> =
  T extends `${infer First}${infer Rest}` ? `${Capitalize<First>}${Rest}` : T;
