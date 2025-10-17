import { Primitive } from 'src';
import { assertType, expect, expectTypeOf, test } from 'vitest';

test.fails('fail test', () => {
  // @ts-expect-error, it cannot be this type, it should error out
  expect(assertType<Primitive>({ foo: true })).rejects.toBe(true);
});

const valuesToTest = [
  null,
  undefined,
  BigInt(-999),
  Number(0),
  true,
  false,
  Symbol('_'),
];

test('_', () => {
  valuesToTest.forEach((value) => {
    expectTypeOf(value).toMatchTypeOf<Primitive>();
  });
});
