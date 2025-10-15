import { test, expect } from 'vitest';
import { FilledString, Is, IsNot } from '../src/types';

test('NonEmptyString', () => {
  const NotResult: IsNot<FilledString<''>, 'hello'> = true;
  const Result: Is<FilledString<'hello'>, 'hello'> = true;
  function filledString<S extends string>(s: FilledString<S>) {
    return s;
  }
  filledString('hello'); // passes
  // @ts-expect-error empty string should not pass
  filledString('');
  expect(Result).toBe(true);
  expect(NotResult).toBe(true);
});
