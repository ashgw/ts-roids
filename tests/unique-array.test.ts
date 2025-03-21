import type { UniqueArray, TestType } from '../src/types';
import { test, expect } from 'vitest';

test('UniqueArray should return unique elements', () => {
  const result: TestType<
    UniqueArray<[1, 2, 3, 1, 2]>,
    readonly [1, 2, 3, 'Encountered duplicate element', 1],
    true
  > = true;
  expect(result).toEqual(true);
});

test('UniqueArray should return the same array for unique elements', () => {
  const result: TestType<
    UniqueArray<[4, 5, 6]>,
    readonly [4, 5, 6],
    true
  > = true;
  expect(result).toEqual(true);
});

test('UniqueArray should return an error for all duplicates', () => {
  const result: TestType<
    UniqueArray<[7, 7, 7]>,
    readonly [7, 'Encountered duplicate element', 7],
    true
  > = true;
  expect(result).toEqual(true);
});
