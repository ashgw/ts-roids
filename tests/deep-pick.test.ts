import { DeepPick, TestType } from '@/index';
import { test, expect } from 'vitest';

type Obj = {
  a: number;
  b: string;
  c: boolean;
  one: {
    d: number;
    e: string;
    f: boolean;
    two: {
      g: number;
      h: string;
      i: boolean;
    };
  };
  x: {
    j: number;
    k: string;
    l: boolean;
  };
};

test('_', () => {
  const result: TestType<
    DeepPick<Obj, 'one.e'>,
    { one: { e: string } },
    true
  > = true;
  expect(result).toBe(true);
});

test('_', () => {
  const result: TestType<
    DeepPick<Obj, 'one.two'>,
    {
      one: {
        two: {
          g: number;
          h: string;
          i: boolean;
        };
      };
    },
    true
  > = true;
  expect(result).toBe(true);
});

test('_', () => {
  const result: TestType<
    DeepPick<Obj, 'a' | 'one.e' | 'one.two.i'>,
    { a: number } & { one: { e: string } } & { one: { two: { i: boolean } } },
    true
  > = true;
  expect(result).toBe(true);
});

test('_', () => {
  const result: TestType<
    DeepPick<Obj, 'a' | 'one.e'>,
    { a: number } & { one: { e: string } },
    true
  > = true;
  expect(result).toBe(true);
});

test('_', () => {
  const result: TestType<DeepPick<Obj, ''>, unknown, true> = true;
  expect(result).toBe(true);
});

test('_', () => {
  const result: TestType<DeepPick<Obj, 'a'>, { a: number }, true> = true;
  expect(result).toBe(true);
});

test('_', () => {
  const result: TestType<
    DeepPick<Obj, 'x.j'>,
    { x: { j: number } },
    true
  > = true;
  expect(result).toBe(true);
});

test('_', () => {
  const result: TestType<
    DeepPick<Obj, 'one.two.i'>,
    {
      one: {
        two: {
          i: boolean;
        };
      };
    },
    true
  > = true;
  expect(result).toBe(true);
});
