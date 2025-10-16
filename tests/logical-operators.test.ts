import { Xor, And, Nand, Not, Or, Nor, Xand, Xnor, TestType } from 'src';
import { test, expect } from 'vitest';

//
// NOT
//
test('Not<true> -> false', () => {
  type expected = false;
  const result: TestType<Not<true>, expected, true> = true;
  expect(result).toBe(true);
});

test('Not<false> -> true', () => {
  type expected = true;
  const result: TestType<Not<false>, expected, true> = true;
  expect(result).toBe(true);
});

//
// AND
//
test('And<true, true> -> true', () => {
  type expected = true;
  const result: TestType<And<true, true>, expected, true> = true;
  expect(result).toBe(true);
});

test('And<true, false> -> false', () => {
  type expected = false;
  const result: TestType<And<true, false>, expected, true> = true;
  expect(result).toBe(true);
});

test('And<false, true> -> false', () => {
  type expected = false;
  const result: TestType<And<false, true>, expected, true> = true;
  expect(result).toBe(true);
});

test('And<false, false> -> false', () => {
  type expected = false;
  const result: TestType<And<false, false>, expected, true> = true;
  expect(result).toBe(true);
});

//
// OR
//
test('Or<true, true> -> true', () => {
  type expected = true;
  const result: TestType<Or<true, true>, expected, true> = true;
  expect(result).toBe(true);
});

test('Or<true, false> -> true', () => {
  type expected = true;
  const result: TestType<Or<true, false>, expected, true> = true;
  expect(result).toBe(true);
});

test('Or<false, true> -> true', () => {
  type expected = true;
  const result: TestType<Or<false, true>, expected, true> = true;
  expect(result).toBe(true);
});

test('Or<false, false> -> false', () => {
  type expected = false;
  const result: TestType<Or<false, false>, expected, true> = true;
  expect(result).toBe(true);
});

//
// XOR
//
test('Xor<true, true> -> false', () => {
  type expected = false;
  const result: TestType<Xor<true, true>, expected, true> = true;
  expect(result).toBe(true);
});

test('Xor<true, false> -> true', () => {
  type expected = true;
  const result: TestType<Xor<true, false>, expected, true> = true;
  expect(result).toBe(true);
});

test('Xor<false, true> -> true', () => {
  type expected = true;
  const result: TestType<Xor<false, true>, expected, true> = true;
  expect(result).toBe(true);
});

test('Xor<false, false> -> false', () => {
  type expected = false;
  const result: TestType<Xor<false, false>, expected, true> = true;
  expect(result).toBe(true);
});

//
// XNOR
//
test('Xnor<true, true> -> true', () => {
  type expected = true;
  const result: TestType<Xnor<true, true>, expected, true> = true;
  expect(result).toBe(true);
});

test('Xnor<true, false> -> false', () => {
  type expected = false;
  const result: TestType<Xnor<true, false>, expected, true> = true;
  expect(result).toBe(true);
});

test('Xnor<false, true> -> false', () => {
  type expected = false;
  const result: TestType<Xnor<false, true>, expected, true> = true;
  expect(result).toBe(true);
});

test('Xnor<false, false> -> true', () => {
  type expected = true;
  const result: TestType<Xnor<false, false>, expected, true> = true;
  expect(result).toBe(true);
});

//
// NAND
//
test('Nand<true, true> -> false', () => {
  type expected = false;
  const result: TestType<Nand<true, true>, expected, true> = true;
  expect(result).toBe(true);
});

test('Nand<true, false> -> true', () => {
  type expected = true;
  const result: TestType<Nand<true, false>, expected, true> = true;
  expect(result).toBe(true);
});

test('Nand<false, true> -> true', () => {
  type expected = true;
  const result: TestType<Nand<false, true>, expected, true> = true;
  expect(result).toBe(true);
});

test('Nand<false, false> -> true', () => {
  type expected = true;
  const result: TestType<Nand<false, false>, expected, true> = true;
  expect(result).toBe(true);
});

//
// NOR
//
test('Nor<true, true> -> false', () => {
  type expected = false;
  const result: TestType<Nor<true, true>, expected, true> = true;
  expect(result).toBe(true);
});

test('Nor<true, false> -> false', () => {
  type expected = false;
  const result: TestType<Nor<true, false>, expected, true> = true;
  expect(result).toBe(true);
});

test('Nor<false, true> -> false', () => {
  type expected = false;
  const result: TestType<Nor<false, true>, expected, true> = true;
  expect(result).toBe(true);
});

test('Nor<false, false> -> true', () => {
  type expected = true;
  const result: TestType<Nor<false, false>, expected, true> = true;
  expect(result).toBe(true);
});

//
// XAND (same as XNOR logically but keep separate for coverage)
//
test('Xand<true, true> -> true', () => {
  type expected = true;
  const result: TestType<Xand<true, true>, expected, true> = true;
  expect(result).toBe(true);
});

test('Xand<true, false> -> false', () => {
  type expected = false;
  const result: TestType<Xand<true, false>, expected, true> = true;
  expect(result).toBe(true);
});

test('Xand<false, true> -> false', () => {
  type expected = false;
  const result: TestType<Xand<false, true>, expected, true> = true;
  expect(result).toBe(true);
});

test('Xand<false, false> -> true', () => {
  type expected = true;
  const result: TestType<Xand<false, false>, expected, true> = true;
  expect(result).toBe(true);
});
