import { NegativeIntegerString, TestType } from 'src';
import { test, expect } from 'vitest';

test('0 is considered +, so should not resolve', () => {
  const result: TestType<NegativeIntegerString<'0'>, never, true> = true;
  expect(result).toBe(true);
});

test(() => {
  const result: TestType<
    NegativeIntegerString<'-82739283293237'>,
    -82739283293237,
    true
  > = true;
  expect(result).toBe(true);
});

test('floats should not reslove', () => {
  const result: TestType<
    NegativeIntegerString<'82739.283293237'>,
    never,
    true
  > = true;
  expect(result).toBe(true);
});

test('Negative floats also should not resolve', () => {
  const result: TestType<
    NegativeIntegerString<'-82739.283293237'>,
    never,
    true
  > = true;
  expect(result).toBe(true);
});

test('Negative integer string types should not resolve', () => {
  const result: TestType<NegativeIntegerString<'-1'>, -1, true> = true;
  expect(result).toBe(true);
});
