import { PositiveRange, TestType } from 'src';
import { test, expect } from 'vitest';

test('handles basic positive ranges', () => {
  const result: TestType<PositiveRange<1, 5>, 1 | 2 | 3 | 4 | 5, true> = true;
  expect(result).toBe(true);
});
