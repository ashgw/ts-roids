import { IsStringEndsWith, TestType } from 'src';
import { test, expect } from 'vitest';

test('_', () => {
  const result: TestType<IsStringEndsWith<'barBaz', 'az'>, true, true> = true;
  expect(result).toBe(true);
});
test('_', () => {
  const result: TestType<IsStringEndsWith<'barBaz', 'Baz'>, true, true> = true;
  expect(result).toBe(true);
});

test('_', () => {
  const result: TestType<
    IsStringEndsWith<'barBaz', 'barBaz'>,
    true,
    true
  > = true;
  expect(result).toBe(true);
});

test('_', () => {
  const result: TestType<
    IsStringEndsWith<'barBaz', 'FoobarBaz'>,
    false,
    true
  > = true;
  expect(result).toBe(true);
});

test('_', () => {
  const result: TestType<IsStringEndsWith<'', ''>, true, true> = true;
  expect(result).toBe(true);
});

test('_', () => {
  const result: TestType<IsStringEndsWith<'0', '0'>, true, true> = true;
  expect(result).toBe(true);
});
