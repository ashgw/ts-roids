import { TestType, UnionToTuple } from 'src';
import { test, expect } from 'vitest';

type TestUnion = 'a' | 'b' | 'c';
type ResultTuple = UnionToTuple<TestUnion>;

test('UnionToTuple should convert union to tuple', () => {
  const result: TestType<ResultTuple, ['a', 'b', 'c'], true> = true;
  expect(result).toBe(true);
});

type EmptyUnion = never;
type EmptyResultTuple = UnionToTuple<EmptyUnion>;

test('UnionToTuple should return empty tuple for empty union', () => {
  const result: TestType<EmptyResultTuple, [], true> = true;
  expect(result).toBe(true);
});
