import { describe } from 'node:test';
import {
  IsExactlyAny,
  Nullable,
  TestType,
  IsExactlySymbol,
  IsBigInt,
  IsExactlyNumber,
  IsExactlyString,
  IsExactlyUnknown,
} from 'src';
import { test, expect } from 'vitest';

describe('test IsExactlyAny', () => {
  test('_', () => {
    const result: TestType<IsExactlyAny<undefined>, false, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<IsExactlyAny<unknown>, false, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<IsExactlyAny<any>, true, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<IsExactlyAny<string>, false, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<IsExactlyAny<unknown>, false, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<IsExactlyAny<any | unknown>, true, true> = true;
    expect(result).toBe(true);
  });

  test('any union anything is still any, if some is type unsafe its all unsafe', () => {
    const result: TestType<IsExactlyAny<any | Nullable>, true, true> = true;
    expect(result).toBe(true);
  });
});

describe('test IsExactlySymbol', () => {
  test('_', () => {
    const result: TestType<IsExactlySymbol<undefined>, false, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<IsExactlySymbol<string>, false, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<IsExactlySymbol<symbol>, true, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<IsExactlySymbol<any | symbol>, false, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<
      IsExactlySymbol<symbol | Nullable>,
      false,
      true
    > = true;
    expect(result).toBe(true);
  });
});

describe('test IsExactlyBigInt', () => {
  test('_', () => {
    const result: TestType<IsBigInt<undefined>, false, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<IsBigInt<string>, false, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<IsBigInt<bigint>, true, true> = true;
    expect(result).toBe(true);
  });

  test('one limitation though is that it returns a base boolean with any', () => {
    const result: TestType<IsBigInt<any | bigint>, boolean, true> = true;
    expect(result).toBe(true);
  });

  test('does not have the same effect with unknown', () => {
    const result: TestType<IsBigInt<unknown | bigint>, false, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<IsBigInt<symbol | Nullable>, false, true> = true;
    expect(result).toBe(true);
  });
});

describe('test IsExactlyNumber', () => {
  test('_', () => {
    const result: TestType<IsExactlyNumber<undefined>, false, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<IsExactlyNumber<string>, false, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<IsExactlyNumber<number>, true, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<IsExactlyNumber<any | number>, false, true> = true;
    expect(result).toBe(true);
  });

  test('does not have the same effect with unknown', () => {
    const result: TestType<
      IsExactlyNumber<unknown | number>,
      false,
      true
    > = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<
      IsExactlyNumber<number | Nullable>,
      false,
      true
    > = true;
    expect(result).toBe(true);
  });
});

describe('test IsExactlyUnknown', () => {
  test('_', () => {
    const result: TestType<IsExactlyUnknown<undefined>, false, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<IsExactlyUnknown<number>, false, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<IsExactlyUnknown<unknown>, true, true> = true;
    expect(result).toBe(true);
  });

  test('any is over unknown', () => {
    const result: TestType<IsExactlyUnknown<any | unknown>, false, true> = true;
    expect(result).toBe(true);
  });

  test('any is over unknown', () => {
    const result: TestType<IsExactlyAny<any | unknown>, true, true> = true;
    expect(result).toBe(true);
  });

  test('once unknown, always unknown', () => {
    const result: TestType<
      IsExactlyUnknown<unknown | string>,
      true,
      true
    > = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<
      IsExactlyUnknown<number | Nullable>,
      false,
      true
    > = true;
    expect(result).toBe(true);
  });
});

describe('test IsExactlyString', () => {
  test('_', () => {
    const result: TestType<IsExactlyString<undefined>, false, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<IsExactlyString<number>, false, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<IsExactlyString<string>, true, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<IsExactlyString<any | string>, false, true> = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<
      IsExactlyString<unknown | string>,
      false,
      true
    > = true;
    expect(result).toBe(true);
  });

  test('_', () => {
    const result: TestType<
      IsExactlyString<number | Nullable>,
      false,
      true
    > = true;
    expect(result).toBe(true);
  });
});
