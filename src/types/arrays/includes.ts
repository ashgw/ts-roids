import type { IfExtends } from '../logic';

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
