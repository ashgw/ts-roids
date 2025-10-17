import { NegativeFloatString, TestType } from 'src';
import { test, expect } from 'vitest';

test(() => {
  const result: TestType<NegativeFloatString<'0'>, never, true> = true;
  expect(result).toBe(true);
});

test(() => {
  const result: TestType<
    NegativeFloatString<'-82739283293237'>,
    never,
    true
  > = true;
  expect(result).toBe(true);
});

test(() => {
  const result: TestType<
    NegativeFloatString<'-82739.283293237'>,
    -82739.283293237,
    true
  > = true;
  expect(result).toBe(true);
});

test(() => {
  const result: TestType<NegativeFloatString<'-0.54'>, -0.54, true> = true;
  expect(result).toBe(true);
});

test(() => {
  const result: TestType<NegativeFloatString<'-1'>, never, true> = true;
  expect(result).toBe(true);
});
