import { describe, it, expect } from 'vitest';
import { Is, IsNot } from '../src';

describe('Is', () => {
  it('should resolve to true for identical types', () => {
    const test: Is<string, string> = true;
    expect(test).toBe(true);
  });

  it('should resolve to false for different types', () => {
    const test: Is<string, number> = false;
    expect(test).toBe(false);
  });

  it('should work with complex objects', () => {
    type A = { name: string; age: number };
    type B = { name: string; age: number };
    const test: Is<A, B> = true;
    expect(test).toBe(true);
  });

  it('should detect differences in object keys', () => {
    type A = { name: string; age: number };
    type B = { name: string; age: number; city: string };
    const test: Is<A, B> = false;
    expect(test).toBe(false);
  });

  it('should differentiate union vs literal', () => {
    const test: Is<'a', 'a' | 'b'> = false;
    expect(test).toBe(false);
  });
});

describe('IsNot', () => {
  it('should resolve to true for different types', () => {
    const test: IsNot<string, number> = true;
    expect(test).toBe(true);
  });

  it('should resolve to false for identical types', () => {
    const test: IsNot<string, string> = false;
    expect(test).toBe(false);
  });

  it('should handle object differences correctly', () => {
    type A = { id: number };
    type B = { id: number; name: string };
    const test: IsNot<A, B> = true;
    expect(test).toBe(true);
  });

  it('should detect difference in array item types', () => {
    const test: IsNot<string[], number[]> = true;
    expect(test).toBe(true);
  });

  it('should treat exact same unions as equal', () => {
    const test: IsNot<'a' | 'b', 'b' | 'a'> = false;
    expect(test).toBe(false);
  });
});
