import { PositiveFloatString, TestType } from 'src';
import { test, expect } from 'vitest';

test(() => {
  const result: TestType<PositiveFloatString<'0'>, never, true> = true;
  expect(result).toBe(true);
});

test(() => {
  const result: TestType<
    PositiveFloatString<'-82739283293237'>,
    never,
    true
  > = true;
  expect(result).toBe(true);
});

test(() => {
  const result: TestType<
    PositiveFloatString<'82739.283293237'>,
    82739.283293237,
    true
  > = true;
  expect(result).toBe(true);
});

test(() => {
  const result: TestType<PositiveFloatString<'-0.54'>, never, true> = true;
  expect(result).toBe(true);
});

test(() => {
  const result: TestType<PositiveFloatString<'0.54'>, 0.54, true> = true;
  expect(result).toBe(true);
});
test(() => {
  const result: TestType<PositiveFloatString<'-1'>, never, true> = true;
  expect(result).toBe(true);
});
