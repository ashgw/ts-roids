import { EnforcedString, TestType } from 'src';
import { test, expect } from 'vitest';

/**
 * Enforces a string to start with a specific prefix and end with a specific suffix.
 * Defaults for both prefix and suffix are empty strings.
 *
 * @example
 * ```ts
 * type Result = EnforcedString<'pk_123'>; // Result: 'pk_123'
 * type ResultWithPrefix = EnforcedString<'pk_123', 'pk_'>; // Result: 'pk_123'
 * type ResultWithSuffix = EnforcedString<'123', '', '123'>; // Result: '123'
 * type InvalidResult = EnforcedString<'123_pk', 'pk_', '123'>; // Error: Type '123_pk' does not satisfy the constraint
 * ```
 */
test('valid string with default prefix and suffix', () => {
  const result: TestType<EnforcedString<'pk_123'>, 'pk_123', true> = true;
  expect(result).toBe(true);
});

test('valid string with specified prefix', () => {
  const result: TestType<
    EnforcedString<'pk_123', 'pk_'>,
    'pk_123',
    true
  > = true;
  expect(result).toBe(true);
});

test('valid string with specified suffix', () => {
  const result: TestType<EnforcedString<'123', '', '123'>, '123', true> = true;
  expect(result).toBe(true);
});

test('valid string with both prefix and suffix', () => {
  const result: TestType<
    EnforcedString<'pk_123', 'pk_', '123'>,
    'pk_123',
    true
  > = true;
  expect(result).toBe(true);
});

test('invalid string with incorrect prefix', () => {
  const result: TestType<
    EnforcedString<'123_pk', 'pk_', '123'>,
    never,
    true
  > = true;
  expect(result).toBe(true);
});

test('invalid string with incorrect suffix', () => {
  const result: TestType<
    EnforcedString<'pk_123', 'pk_', '456'>,
    never,
    true
  > = true;
  expect(result).toBe(true);
});

test('invalid string with both incorrect prefix and suffix', () => {
  const result: TestType<
    EnforcedString<'123_pk', 'pk_', '456'>,
    never,
    true
  > = true;
  expect(result).toBe(true);
});
