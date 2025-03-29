import { CapitalizeFirst, TestType } from 'src';
import { test, expect } from 'vitest';

test('capitalizes single word', () => {
  const result: TestType<CapitalizeFirst<'hello'>, 'Hello', true> = true;
  expect(result).toBe(true);
});

test('capitalizes union of strings', () => {
  type Category = 'software' | 'health' | 'philosophy';
  type Expected = 'Software' | 'Health' | 'Philosophy';

  const result: TestType<CapitalizeFirst<Category>, Expected, true> = true;
  expect(result).toBe(true);
});

test('handles empty string', () => {
  const result: TestType<CapitalizeFirst<''>, '', true> = true;
  expect(result).toBe(true);
});

test('handles single character', () => {
  const result: TestType<CapitalizeFirst<'a'>, 'A', true> = true;
  expect(result).toBe(true);
});

test('preserves rest of string', () => {
  const result: TestType<
    CapitalizeFirst<'helloWorld'>,
    'HelloWorld',
    true
  > = true;
  expect(result).toBe(true);
});
