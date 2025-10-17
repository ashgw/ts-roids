import { PositiveIntegerString, TestType } from 'src';
import { test, expect } from 'vitest';

test(() => {
  const result: TestType<PositiveIntegerString<'0'>, 0, true> = true;
  expect(result).toBe(true);
});

test(() => {
  const result: TestType<
    PositiveIntegerString<'82739283293237'>,
    82739283293237,
    true
  > = true;
  expect(result).toBe(true);
});

test('floats should not reslove', () => {
  const result: TestType<
    PositiveIntegerString<'82739.283293237'>,
    never,
    true
  > = true;
  expect(result).toBe(true);
});

test('Negative floats also should not resolve', () => {
  const result: TestType<
    PositiveIntegerString<'-82739.283293237'>,
    never,
    true
  > = true;
  expect(result).toBe(true);
});

test('Negative integer string types should not resolve', () => {
  const result: TestType<PositiveIntegerString<'-1'>, never, true> = true;
  expect(result).toBe(true);
});
