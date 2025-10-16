import { Xor, And, Nand, Not, Or, Nor, Xand, Xnor, TestType } from 'src';
import { test, expect } from 'vitest';

test('Xnor', () => {
  type exprectedToBe = true;
  const result: TestType<Xnor<false, false>, exprectedToBe, true> = true;
  expect(result).toBe(true);
});

test('Xand', () => {
  type exprectedToBe = true;
  const result: TestType<Xand<false, false>, exprectedToBe, true> = true;
  expect(result).toBe(true);
});

test('Nor', () => {
  type exprectedToBe = true;
  const result: TestType<Nor<false, false>, exprectedToBe, true> = true;
  expect(result).toBe(true);
});

test('And', () => {
  type exprectedToBe = false;
  const result: TestType<And<true, false>, exprectedToBe, true> = true;
  expect(result).toBe(true);
});

test('And', () => {
  type exprectedToBe = true;
  const result: TestType<And<true, true>, exprectedToBe, true> = true;
  expect(result).toBe(true);
});

test('And', () => {
  type exprectedToBe = false;
  const result: TestType<And<false, false>, exprectedToBe, true> = true;
  expect(result).toBe(true);
});

test('Or', () => {
  type exprectedToBe = true;
  const result: TestType<Or<true, false>, exprectedToBe, true> = true;
  expect(result).toBe(true);
});

test('Or', () => {
  type exprectedToBe = false;
  const result: TestType<Or<false, false>, exprectedToBe, true> = true;
  expect(result).toBe(true);
});

test('Or', () => {
  type exprectedToBe = true;
  const result: TestType<Or<false, true>, exprectedToBe, true> = true;
  expect(result).toBe(true);
});

test('Xor', () => {
  type exprectedToBe = false;
  const result: TestType<Xor<false, false>, exprectedToBe, true> = true;
  expect(result).toBe(true);
});

test('Xor', () => {
  type exprectedToBe = true;
  const result: TestType<Xor<true, false>, exprectedToBe, true> = true;
  expect(result).toBe(true);
});

test('Xor', () => {
  type exprectedToBe = false;
  const result: TestType<Xor<false, false>, exprectedToBe, true> = true;
  expect(result).toBe(true);
});

test('Xor', () => {
  type exprectedToBe = false;
  const result: TestType<Xor<true, true>, exprectedToBe, true> = true;
  expect(result).toBe(true);
});

test('Nand', () => {
  type exprectedToBe = false;
  const result: TestType<Nand<true, true>, exprectedToBe, true> = true;
  expect(result).toBe(true);
});

test('Nand', () => {
  type exprectedToBe = true;
  const result: TestType<Nand<false, true>, exprectedToBe, true> = true;
  expect(result).toBe(true);
});

test('Nand', () => {
  type exprectedToBe = true;
  const result: TestType<Nand<false, false>, exprectedToBe, true> = true;
  expect(result).toBe(true);
});

test('Nand', () => {
  type exprectedToBe = false;
  const result: TestType<Nand<true, true>, exprectedToBe, true> = true;
  expect(result).toBe(true);
});

test('Not', () => {
  type exprectedToBe = false;
  const result: TestType<Not<true>, exprectedToBe, true> = true;
  expect(result).toBe(true);
});

test('Not', () => {
  type exprectedToBe = true;
  const result: TestType<Not<false>, exprectedToBe, true> = true;
  expect(result).toBe(true);
});
