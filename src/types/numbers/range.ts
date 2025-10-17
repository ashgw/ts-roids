import type { NumberMap } from '../../number-map';
import type { IsPositiveInteger } from './integer';

/**
 * Represents a range of positive integers from N to M (inclusive).
 * Both bounds must be positive integers.
 *
 * @template N Lower bound (must be positive integer)
 * @template M Upper bound (must be positive integer)
 *
 * @example
 * ```typescript
 * // Pagination example with a maximum of 100 items per page
 * interface PaginationParams {
 *   page: number;
 *   itemsPerPage: PositiveRange<1, 100>;
 * }
 *
 * async function fetchUsers({ page, itemsPerPage }: PaginationParams) {
 *   const offset = (page - 1) * itemsPerPage;
 *   return await db.users.findMany({
 *     skip: offset,
 *     take: itemsPerPage,
 *   });
 * }
 *
 * // Valid usage:
 * fetchUsers({ page: 1, itemsPerPage: 50 });  // ✅ OK
 *
 * // Type errors:
 * fetchUsers({ page: 1, itemsPerPage: 200 }); // ❌ Error: 200 exceeds maximum of 100
 * fetchUsers({ page: 1, itemsPerPage: 0 });   // ❌ Error: 0 is not in range
 * ```
 */
export type PositiveRange<N extends number, M extends number> = [
  IsPositiveInteger<N>,
  IsPositiveInteger<M>,
] extends [true, true]
  ? N extends M
    ? N
    : M extends N
      ? M // handles the case where M equals N
      : number extends N | M
        ? number
        : _BuildRange<N, M, []>
  : never;

/**
 * @hidden
 * @Internal helper to build range union recursively
 */
type _BuildRange<
  N extends number,
  M extends number,
  Acc extends number[],
  Current extends number = N,
> = Current extends M
  ? Current | Acc[number]
  : _BuildRange<N, M, [...Acc, Current], AddOne<Current>>;

/**
 * @hidden
 * @internal
 */
type AddOne<N extends number> = N extends keyof NumberMap
  ? NumberMap[N]
  : never;
