import { PositiveRange, TestType } from 'src';
import { test, expect } from 'vitest';

test('handles basic positive ranges', () => {
  type Case1 = TestType<PositiveRange<1, 5>, 1 | 2 | 3 | 4 | 5, true>;
  type Case2 = TestType<PositiveRange<3, 6>, 3 | 4 | 5 | 6, true>;

  const result1: Case1 = true;
  const result2: Case2 = true;

  expect(result1).toBe(true);
  expect(result2).toBe(true);
});

test('handles single number ranges', () => {
  type Case1 = TestType<PositiveRange<1, 1>, 1, true>;
  type Case2 = TestType<PositiveRange<5, 5>, 5, true>;

  const result1: Case1 = true;
  const result2: Case2 = true;

  expect(result1).toBe(true);
  expect(result2).toBe(true);
});

test('handles larger ranges', () => {
  type Case1 = TestType<
    PositiveRange<1, 10>,
    1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    true
  >;

  const result: Case1 = true;
  expect(result).toBe(true);
});

test('rejects invalid inputs & accept valid inputs', () => {
  type Case1 = TestType<PositiveRange<-1, 5>, never, true>;

  type Case2 = TestType<PositiveRange<0, 5>, 0 | 1 | 2 | 3 | 4 | 5, true>;

  type Case3 = TestType<PositiveRange<1.5, 5>, never, true>;

  const result1: Case1 = true;
  const result2: Case2 = true;
  const result3: Case3 = true;

  expect(result1).toBe(true);
  expect(result2).toBe(true);
  expect(result3).toBe(true);
});

test('works with pagination example', () => {
  interface PaginationParams {
    page: number;
    itemsPerPage: PositiveRange<1, 10>;
  }
  const validParams: PaginationParams = {
    page: 1,
    // linting should allow this ts error modifier
    // @ts-expect-error: Type '50' is not assignable to type '2 | 1 | 5 | 3 | 4 | 6 | 7 | 8 | 9 | 10'
    itemsPerPage: 50,
  };
  expect(validParams).toBeFalsy();
});
