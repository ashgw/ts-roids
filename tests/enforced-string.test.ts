import { test, expect } from 'vitest';
import { EnforcedString, TestType } from 'src';

test('prefix only', () => {
  type Got = EnforcedString<'pk_'>;
  type Expected = `pk_${string}`;
  const ok: TestType<Got, Expected, true> = true;
  expect(ok).toBe(true);
});

test('contains only', () => {
  type Got = EnforcedString<string, 'ABC'>;
  type Expected = `${string}ABC${string}`;
  const ok: TestType<Got, Expected, true> = true;
  expect(ok).toBe(true);
});

test('suffix only', () => {
  type Got = EnforcedString<string, string, '.json'>;
  type Expected = `${string}.json`;
  const ok: TestType<Got, Expected, true> = true;
  expect(ok).toBe(true);
});

test('prefix + suffix', () => {
  type Got = EnforcedString<'pk_', string, '.json'>;
  type Expected = `pk_${string}.json`;
  const ok: TestType<Got, Expected, true> = true;
  expect(ok).toBe(true);
});

test('prefix + contains', () => {
  type Got = EnforcedString<'pk_', 'ABC'>;
  type Expected = `pk_${string}ABC${string}`;
  const ok: TestType<Got, Expected, true> = true;
  expect(ok).toBe(true);
});

test('contains + suffix', () => {
  type Got = EnforcedString<string, 'ABC', '.json'>;
  type Expected = `${string}ABC${string}.json`;
  const ok: TestType<Got, Expected, true> = true;
  expect(ok).toBe(true);
});

test('all three', () => {
  type Got = EnforcedString<'pk_', 'ABC', '.json'>;
  type Expected = `pk_${string}ABC${string}.json`;
  const ok: TestType<Got, Expected, true> = true;
  expect(ok).toBe(true);
});

test('fully unconstrained collapses to string', () => {
  type Got = EnforcedString<string, string, string>;
  const ok: TestType<Got, string, true> = true;
  expect(ok).toBe(true);
});
