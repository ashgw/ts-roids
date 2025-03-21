import { Newable } from './types';

/**
 * @hidden
 */
export class FinalTypeError extends TypeError {}
/**
 * Marks a class as final, preventing inheritance from this class.
 * When applied, any attempt to extend this class will result in a TypeError at runtime.
 * @remarks
 * This decorator does not prevent instantiation of the final class itself.
 * @example
 * ```ts
 * @Final
 * class Foo<T> {
 *   foo: T;
 *   bar: string;
 *
 *   constructor(foo: T) {
 *     this.foo = foo;
 *     this.bar = 'bar';
 *   }
 *
 *   someFoo(): T {
 *     return this.foo;
 *   }
 * }
 *
 * // No problem with instantiation
 * const foo = new Foo<string>('foo');

 * // The line below will cause a TypeError: Cannot inherit from the final class Foo
 * const sub = new SubFoo('subFoo');
 * ```
 * @see {@link https://github.com/microsoft/TypeScript/issues/1534| Issue #1}
 * @see {@link https://github.com/microsoft/TypeScript/issues/8306| Issue #2}
 * @see {@link https://github.com/microsoft/TypeScript/issues/50532| Issue #3}
 */
export const Final = <CST extends Newable>(cst: CST): CST => {
  class F extends cst {
    constructor(...args: any[]) {
      super(...args);
      const newTarget = new.target as unknown as typeof F;
      if (newTarget !== F) {
        throw new FinalTypeError(`Cannot inherit from the final class: `);
      }
    }
  }

  Reflect.defineProperty(F, 'name', {
    // eslint-disable-next-line
    value: (cst as any).name || 'Final',
  });

  return F as CST;
};

const _freeze = (obj: object) => {
  Object.freeze(obj);
};
/**
 * When applied to a class it creates a [frozen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) instance of it,
 * thus preventing modifications to instance properties after instantiation.
 *
 * @example
 * ```ts
@Frozen
class Foo<T> {
  foo: T;
  bar?: MaybeUndefined<string>;

  constructor(foo: T) {
    this.foo = foo;
    this.bar = 'bar';
  }

  someFoo(): T {
    return this.foo;
  }
}

const foo = new Foo('foo');
// The line below will cause a TypeError: Cannot assign to read only property 'bar'
foo.bar = 'altered bar';
// The line below will cause a TypeError: Cannot delete property 'bar'
delete foo.bar;
 * ```
 */
export function Frozen<T extends Newable>(cst: T): T & Newable {
  return class Locked extends cst {
    constructor(...args: any[]) {
      super(...args);
      _freeze(this);
    }
  };
}

const _seal = (obj: object) => {
  Object.seal(obj);
};
/**
 * When applied to a class, it creates a [sealed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal) instance of it,
 * preventing extensions and making existing properties non-configurable.
 *
 * @example
 * ```ts
 * @Sealed
 * class Person {
 *   constructor(public name: string, public age?: number) {}
 * }
 *
 * const john = new Person('John', 30);
 * // Trying to add a new property will throw an error
 * (john as any).email = 'john@example.com'; // TypeError: Cannot add property email, object is not extensible
 *
 * // Existing properties can still be modified
 * john.age = 31; // Allowed
 *
 * // Existing properties cannot be re-configured or deleted
 * delete john.age; // TypeError: Cannot delete property 'age'
 * }
 * ```
 * */
export function Sealed<T extends Newable>(cst: T): T & Newable {
  return class Locked extends cst {
    constructor(...args: any[]) {
      super(...args);
      _seal(this);
    }
  };
}

/**
 * When applied to a class, it ensures that only a single instance of the class can be created.
 * If an attempt is made to create another instance, the existing instance will be returned.
 *
 * @remarks
 * The `Singleton` pattern is often used for cases where a global state or resource needs to be shared across the entire application.
 * It is common in cases like configuration settings or managing connections to a shared resource (e.g., a database or API).
 *
 * @example
 * ```ts
 * @Singleton
 * class Database {
 *   constructor(public host: string, public port: number) {}
 * }
 *
 * const db1 = new Database('localhost', 5432);
 * const db2 = new Database('localhost', 5432);
 *
 * console.log(db1 === db2); // true, both db1 and db2 refer to the same instance
 * ```
 * @see
 * https://en.wikipedia.org/wiki/Singleton_pattern
 */

export function Singleton<T extends Newable>(cst: T): T {
  let instance: T;

  return class Singleton extends cst {
    constructor(...args: any[]) {
      if (instance) {
        return instance;
      }
      super(...args);
      instance = new cst(...args) as T;
      return instance;
    }
  };
}
