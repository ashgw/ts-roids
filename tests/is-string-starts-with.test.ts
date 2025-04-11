import { IsStringStartsWith, TestType } from 'src';
import { test, expect } from 'vitest';

test('_', () => {
  const result: TestType<IsStringStartsWith<'barBaz', 'ba'>, true, true> = true;
  expect(result).toBe(true);
});
test('_', () => {
  const result: TestType<
    IsStringStartsWith<'barBaz', 'bar'>,
    true,
    true
  > = true;
  expect(result).toBe(true);
});

test('_', () => {
  const result: TestType<
    IsStringStartsWith<'barBaz', 'barBaz'>,
    true,
    true
  > = true;
  expect(result).toBe(true);
});

test('_', () => {
  const result: TestType<
    IsStringStartsWith<'barBaz', 'barBazBar'>,
    false,
    true
  > = true;
  expect(result).toBe(true);
});

test('_', () => {
  const result: TestType<IsStringStartsWith<'', ''>, true, true> = true;
  expect(result).toBe(true);
});

test('_', () => {
  const result: TestType<IsStringStartsWith<'0', '0'>, true, true> = true;
  expect(result).toBe(true);
});
