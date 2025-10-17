import type { Numeric } from '../primitives';
import type { IfExtends } from '../logic';
import type { Integer } from './integer';
import type { StringifyPrimitive } from '../strings/conversions';

/**
 * Represents an odd numeric?
 * @example
 * ````ts
 * Odd<2587967>; // 2587967
 * Odd<215848141>; // 215848141
 * Odd<200000000000000>; // never
 * Odd<200000000000000.55>; // never
 * Odd<200000000000001.53>; // never
 * ````
 */
export type Odd<T extends Numeric> = IfExtends<
  StringifyPrimitive<Integer<T>>,
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
  StringifyPrimitive<Integer<T>>,
  `${Numeric | ''}${2 | 4 | 6 | 8 | 0}`,
  T,
  never
>;
