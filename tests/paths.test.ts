import { Paths } from 'src';
import { test, expectTypeOf } from 'vitest';

test('Paths with flat object', () => {
  type Obj = {
    a: number;
    b: string;
    c: boolean;
  };
  type Result = Paths<Obj>;
  expectTypeOf<Result>().toEqualTypeOf<'a' | 'b' | 'c'>();
});

test('Paths with nested object', () => {
  type Obj = {
    user: {
      profile: {
        name: string;
      };
    };
    age: number;
  };
  type Result = Paths<Obj>;
  expectTypeOf<Result>().toEqualTypeOf<
    'user' | 'user.profile' | 'user.profile.name' | 'age'
  >();
});

test('Paths with deeper nesting', () => {
  type Obj = {
    a: {
      b: {
        c: {
          d: number;
        };
      };
    };
    x: string;
  };
  type Result = Paths<Obj>;
  expectTypeOf<Result>().toEqualTypeOf<
    'a' | 'a.b' | 'a.b.c' | 'a.b.c.d' | 'x'
  >();
});
