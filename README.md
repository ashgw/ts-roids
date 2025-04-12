<div align="center">

# ts-roids

100+  types and decorators to bullet proof TypeScript even more.

[![CI](https://github.com/AshGw/ts-roids/actions/workflows/ci.yml/badge.svg)](https://github.com/AshGw/ts-roids/actions/workflows/ci.yml)
[![@latest](https://img.shields.io/npm/v/ts-roids.svg)](https://www.npmjs.com/package/ts-roids)
[![npm downloads](https://img.shields.io/npm/dm/ts-utils.svg)](https://www.npmjs.com/package/ts-roids)
<hr/>
</div>

## Installation
**npm**
```bash
npm i ts-roids
```
**pnpm**
```bash
pnpm i ts-roids
```
If you're only using types, you can install it as a ``devDependency``.
And if you're using decorators, set this.
```json
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true
  }
}
```
Requires TypesScript `v5.0`+
## Documentation
Checkout the full [API reference](https://ts-roids.ashgw.me/) for all usage examples with details.

#### Types

- [`ExclusiveUnion<T>`](https://ts-roids.ashgw.me/types/ExclusiveUnion.html) - Creates a union type where each variant has its specific properties required, while other properties are optional.
- [`UniqueArray<T>`](https://ts-roids.ashgw.me/types/UniqueArray.html) - Create unique array type from a given array type `T`, a set perse.
- [`Prune<T,N = NotIncluded>`](https://ts-roids.ashgw.me/types/Prune.html) - Prune a type `T` by recursively omitting properties of type `N` (defaults to [`NotIncluded`](https://ts-roids.ashgw.me/types/NotIncluded.html)).
- [`PositiveRange<N,M>`](https://ts-roids.ashgw.me/types/PositiveRange.html) - Represents a range of positive integers from N to M (inclusive), useful for enforcing numeric bounds.
- [`UnionToTuple<T>`](https://ts-roids.ashgw.me/types/UnionToTuple.html) - Converts a union type `T` into a tuple type, allowing for ordered access to the union's members.
- [`DeepToPrimitive<Obj>`](https://ts-roids.ashgw.me/types/DeepToPrimitive.html) - Recursively transforms an object type T into a type where all properties are replaced with their corresponding primitive types.
- [`Assign<Obj,ObjArr>`](https://ts-roids.ashgw.me/types/Assign.html) - Copies all enumerable own properties from one target object to a source array of objects.
- [`CapitalizeFirst<T>`](https://ts-roids.ashgw.me/types/CapitalizeFirst.html) - Capitalizes the first character of a string literal type while preserving the rest.
- [`Flip<Obj>`](https://ts-roids.ashgw.me/types/Flip.html) - Flips keys with values of an object type `Obj`.
- [`DeepImmutable<Obj>`](https://ts-roids.ashgw.me/types/DeepImmutable.html) - Recursively turns the proprties within a given object type ``T`` immutable, as in have all the properties with the `readonly` modifier.
- [`Deepmutable<Obj>`](https://ts-roids.ashgw.me/types/DeepMutable.html) - Recursively mutates all the proprties within a given object type ``T``, as in have all the properties without the `readonly` modifier.
- [`DeepRequired<Obj>`](https://ts-roids.ashgw.me/types/DeepRequired.html) - Recursively make all object properties required.
- [`DeepNotRequired<Obj>`](https://ts-roids.ashgw.me/types/DeepNotRequired.html) - Recursively make all object properties not required.
- [`DeepOmit<Obj,P>`](https://ts-roids.ashgw.me/types/DeepOmit.html) - Recursively omits specified nested properties from an object, based on a given predicate `P`.
- [`DeepPick<Obj,P>`](https://ts-roids.ashgw.me/types/DeepPick.html) - Deeply pick properties from a nested object, based on a given predicate `P`.
- [`EmptyObject`](https://ts-roids.ashgw.me/types/EmptyObject.html) - Represents any non-nullish value, basically `{}`.
- [`EqualStrlen<S1, S2>`](https://ts-roids.ashgw.me/types/EqualStrlen.html) - Check if two strings ``S1`` and ``S2`` have the same length.
- [`PartialExcept<T, P>`](https://ts-roids.ashgw.me/types/PartialExcept.html) - Makes all properties in `T` optional except those in `K` which remain required.
- [`FilterBy<Obj, P>`](https://ts-roids.ashgw.me/types/FilterBy.html) -  Filters keys from the object type `Obj` based on a specified predicate ``P``.
- [`Float<N>`](https://ts-roids.ashgw.me/types/Float.html) - Type representing a float.
- [`If<C, Do, Else>`](https://ts-roids.ashgw.me/types/If.html) - If ``C`` evaluates ``true``, ``Do``, otherwise return ``Else``.
- [`IfEquals<T, P, Do, Else>`](https://ts-roids.ashgw.me/types/IfEquals.html) - Checks if type ``T`` is equal to type ``P``. If ``T`` is equal to ``P``, the type resolves to ``Do``, otherwise ``Else``.
- [`IfExtends<T, P, Do, Else>`](https://ts-roids.ashgw.me/types/IfExtends.html) -  Checks if type ``T`` extends type ``P``. if it does, the type resolves to ``Do``, otherwise ``Else``.
- [`ImmutableKeys<Obj>`](https://ts-roids.ashgw.me/types/ImmutableKeys.html) - Retrieves the keys that are immutable (``readonly``) from an object of type ``Obj``.
- [`Integer<N>`](https://ts-roids.ashgw.me/types/Integer.html) - Represents an integer.
- [`Abs<N>`](https://ts-roids.ashgw.me/types/Abs.html) - Get the absolute value of a [``Numeric``](https://ts-roids.ashgw.me/types/Numeric.html).
- [`And<B1,B2>`](https://ts-roids.ashgw.me/types/And.html) - Logical AND between two boolean types.
- [`EitherOneOrMany<T>`](https://ts-roids.ashgw.me/types/EitherOneOrMany.html) - Represents a type that can be either a single value of type ``T`` or an array of values of type ``T``.
- [`Nullable`](https://ts-roids.ashgw.me/types/Nullable.html) - Represents any non-nullish value, basically `{}`.
- [`Equals<X,Y>`](https://ts-roids.ashgw.me/types/Equals.html) - Checks if two types ``X`` and ``Y`` are exactly equal.
- [`EvenNumeric<T>`](https://ts-roids.ashgw.me/types/EvenNumeric.html) - Represents an even [`Numeric`](https://ts-roids.ashgw.me/types/Numeric.html).
- [`ExcludeNull<T>`](https://ts-roids.ashgw.me/types/ExcludeNull.html) - Excludes ``null`` from a type ``T``.
- [`ExcludeNullable<T>`](https://ts-roids.ashgw.me/types/ExcludeNullable.html) - Excludes [`Nullable`](https://ts-roids.ashgw.me/types/Nullable.html) from a type ``T``.
- [`ExcludeUndefined<T>`](https://ts-roids.ashgw.me/types/ExcludeUndefined.html) - Excludes `undefined` from a type ``T``.
- [`KeysOfUnion<T>`](https://ts-roids.ashgw.me/types/KeysOfUnion.html) - Extracts the union of keys from a given union of object types, useful for accessing all possible keys in unions.
- [`Simplify<T>`](https://ts-roids.ashgw.me/types/Simplify.html) - Flattens the structure of a type by resolving intersections and simplifying nested mapped types, enhancing readability.
- [`Extends<T,U>`](https://ts-roids.ashgw.me/types/Extends.html) - Evaluates whether one type ``T`` is assignable to another type ``U``.
- [`Falsy`](https://ts-roids.ashgw.me/types/Falsy.html) - Represents a type that is [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)  JavaScript.
- [`FalsyProperties<T>`](https://ts-roids.ashgw.me/types/FalsyProperties.html) - Extracts falsy properties from an object type ``T``.
- [`IsArrayIncludesTypeof<Arr, T>`](https://ts-roids.ashgw.me/types/IsArrayIncludesTypeof.html) - Checks if an array type `Arr` includes one or more of `T` type.
- [`IsBigInt<T>`](https://ts-roids.ashgw.me/types/IsBigInt.html) - Checks if `T` is a ``bigint``.
- [`IsBoolean<T>`](https://ts-roids.ashgw.me/types/IsBoolean.html) -  Checks if `T` is a ``boolean``.
- [`IsDeepImmutable<Obj>`](https://ts-roids.ashgw.me/types/IsDeepImmutable.html) - Checks if all the nested properties of a given object ``Obj`` are immutable.
- [`IsDeepMutable<Obj>`](https://ts-roids.ashgw.me/types/IsDeepMutable.html) - Checks if all the nested properties of a given object ``Obj`` are  mutable.
- [`IsDeepNotRequired<Obj>`](https://ts-roids.ashgw.me/types/IsDeepNotRequired.html) - Checks if all the properties of a given object (nested) are not required, as in, all properties have the `?` modifier.
- [`IsDeepRequired<Obj>`](https://ts-roids.ashgw.me/types/IsDeepRequired.html) - Checks if all the properties of a given object (nested) are required, as in, all properties do not have the `?` modifier.
- [`IsExactlyAny<T>`](https://ts-roids.ashgw.me/types/IsExactlyAny.html) - Checks if a type `T` is exactly `any`.
- [`IsExactlyBigInt<T>`](https://ts-roids.ashgw.me/types/IsExactlyBigInt.html) - Checks if a type `T` is exactly `bigint` not a subtype of it.
- [`IsExactlyNumber<T>`](https://ts-roids.ashgw.me/types/IsExactlyNumber.html) - Checks if a type `T` is exactly ``number`` not a subtype of it.
- [`IsExactlyString<T>`](https://ts-roids.ashgw.me/types/IsExactlyString.html) - Checks if a type `T` is exactly ``string`` not a subtype of it.
- [`IsExactlySymbol<T>`](https://ts-roids.ashgw.me/types/IsExactlySymbol.html) - Checks if a type `T` is exactly ``symbol`` not a subtype of it.
- [`IsExactlyUnknown<T>`](https://ts-roids.ashgw.me/types/IsExactlyUnknown.html) - Checks if a type `T` is exactly ``unknown`` not a subtype of it.
- [`IsFalsy<T>`](https://ts-roids.ashgw.me/types/IsFalsy.html) - Checks if a given type ``T`` is [``Falsy``](https://ts-roids.ashgw.me/types/Falsy.html).
- [`IsFloat<N>`](https://ts-roids.ashgw.me/types/IsFloat.html) - Checks if a given type ``T`` is a [``Float<N>``](https://ts-roids.ashgw.me/types/Float.html).
- [`IsFunction<T>`](https://ts-roids.ashgw.me/types/IsFunction.html) - Checks if a given type ``T`` is a function.
- [`IsInteger<N>`](https://ts-roids.ashgw.me/types/IsInteger.html) - Checks if a given [``Numeric``](https://ts-roids.ashgw.me/types/Numeric.html)  is an [``Integer<N>``](https://ts-roids.ashgw.me/types/Integer.html).
- [`IsNever<T>:`](https://ts-roids.ashgw.me/types/IsNever.html) - Checks if a type `T` does not resolve, so `never`.
- [`IsNewable<T>`](https://ts-roids.ashgw.me/types/IsNewable.html) -  Checks if a type `T` is [``Newable``](https://ts-roids.ashgw.me/types/Newable.html).
- [`IsNullable<T>`](https://ts-roids.ashgw.me/types/IsNullable.html) -  Checks if a type `T` is [``Nullable``](https://ts-roids.ashgw.me/types/Nullable.html).
- [`IsNumber<T>`](https://ts-roids.ashgw.me/types/IsNumber.html) - Checks if a type `T` is a `number`.
- [`IsNumeric<T>`](https://ts-roids.ashgw.me/types/IsNumeric.html) - Checks if a type `T` is [``Numeric``](https://ts-roids.ashgw.me/types/Numeric.html).
- [`IsObject<T>`](https://ts-roids.ashgw.me/types/IsObject.html) -  Checks if a given type `T` qualifies as an object.
- [`IsString<T>`](https://ts-roids.ashgw.me/types/IsString.html) - Check if a given type `T` is a ``string``.
- [`IsSymbol<T>`](https://ts-roids.ashgw.me/types/IsSymbol.html) - Check if a given type `T` is a ``symbol``.
- [`IsTruthy<T>`](https://ts-roids.ashgw.me/types/IsTruthy.html) - Check if a given type `T` resolves to a truthy value.
- [`Keys<T>`](https://ts-roids.ashgw.me/types/Keys.html) - Retrieves the union type of keys (property names) of a type ``T``.
- [`Maybe<T>`](https://ts-roids.ashgw.me/types/Maybe.html) - Type that might be [``Nullable``](https://ts-roids.ashgw.me/types/Nullable.html)
- [`MaybeUndefined<T>`](https://ts-roids.ashgw.me/types/MaybeUndefined.html) - Type that might ``undefined``.
- [`MutableKeys<Obj>`](https://ts-roids.ashgw.me/types/MutableKeys.html) - Retrieves the keys that are mutable from an object of type ``Obj``.
- [`Nand<B1, B2>`](https://ts-roids.ashgw.me/types/Nand.html) - Logical ``NAND`` between two boolean types ``B1`` and ``B2``.
- [`NegativeFloat<N>`](https://ts-roids.ashgw.me/types/NegativeFloat.html) - Represents a negative (\]-∞, 0\[) [``Float<N>``](https://ts-roids.ashgw.me/types/Float.html).
- [`NegativeFloatString<S>`](https://ts-roids.ashgw.me/types/NegativeFloatString.html) - Represents a negative [``Float<N>``](https://ts-roids.ashgw.me/types/Float.html) parsed from a ``string``.
- [`NegativeInteger<N>`](https://ts-roids.ashgw.me/types/NegativeInteger.html) -  Represents a negative (\]-∞, 0\[) [``Integer<N>``](https://ts-roids.ashgw.me/types/Integer.html).
- [`NegativeIntegerString<S>`](https://ts-roids.ashgw.me/types/NegativeIntegerString.html) - Represents a negative [``Integer<N>``](https://ts-roids.ashgw.me/types/Integer.html) parsed from a ``string``.
- [`NewType<New, Base>`](https://ts-roids.ashgw.me/types/NewType.html) -  Represents a new unique type derived from an existing base type. (branded type)
- [`Newable`](https://ts-roids.ashgw.me/types/Newable.html) - Represents constructor functions that can be invoked using the new keyword.
- [`NonRequiredKeys<Obj>`](https://ts-roids.ashgw.me/types/NonRequiredKeys.html) - Returns all non required keys of an object `Obj`, as in any property of an object that is marked with `?` operator.
- [`Not<B>`](https://ts-roids.ashgw.me/types/Not.html) - Negates a boolean type `B`.
- [`Nullable`](https://ts-roids.ashgw.me/types/Nullable.html) - Represents a type that can either be  ``null`` or ``undefined``.
- [`Numeric`](https://ts-roids.ashgw.me/types/Numeric.html) - Represents a type that can either be  ``number`` or ``bigint``.
- [`NumerifyString<S>`](https://ts-roids.ashgw.me/types/NumerifyString.html) - Turn a given string literal to a [``Numeric``](https://ts-roids.ashgw.me/types/Numeric.html), if possible.
- [`Methods<Obj>`](https://ts-roids.ashgw.me/types/Methods.html) - Get the literal names of keys that are methods in an object type `Obj`.
- [`Properties<Obj>`](https://ts-roids.ashgw.me/types/Properties.html) - Get the literal names of keys that are properties in an object type `Obj`.
- [`OddNumeric<T>`](https://ts-roids.ashgw.me/types/OmitByType.html) - Represents an odd [`Numeric`](https://ts-roids.ashgw.me/types/OddNumeric.html).
- [`OmitByType<Obj, T>`](https://ts-roids.ashgw.me/types/OmitByType.html) - Get a set of properties from `Obj` whose type are not assignable to ``T``.
- [`OmitCommonKeys<Obj1, Obj2>`](https://ts-roids.ashgw.me/types/OmitCommonKeys.html) - Omit any common key between the the two objects,.
- [`OmitExactlyByType<Obj, T>`](https://ts-roids.ashgw.me/types/OmitExactlyByType.html) - Omit properties from ``Obj`` whose type exactly matches ``T``.
- [`Optional<T>`](https://ts-roids.ashgw.me/types/Optional.html) - Represents a type that may be `null`, similar to Python's ``Optional`` type and Rust's ``Option`` enum.
- [`Or<B1, B2>`](https://ts-roids.ashgw.me/types/Or.html) - Logical ``OR`` between two boolean types ``B1`` and ``B2``.
- [`PickByType<Obj, T>`](https://ts-roids.ashgw.me/types/PickByType.html) - Pick from `Obj` a set of properties that match the type `T`.
- [`PickCommonKeys<Obj1, Obj2>`](https://ts-roids.ashgw.me/types/PickCommonKeys.html) - Get the common keys between two objects.
- [`PickExactlyByType<Obj, T>`](https://ts-roids.ashgw.me/types/PickExactlyByType.html) - Get a set of properties from ``Obj`` whose type exactly matches ``T``.
- [`PositiveFloat<N>`](https://ts-roids.ashgw.me/types/PositiveFloat.html) - Represents a positive (\[0, +∞\[) [``Float<N>``](https://ts-roids.ashgw.me/types/Float.html).
- [`PositiveFloatString<S>`](https://ts-roids.ashgw.me/types/PositiveFloatString.html) - Represents a positive [``Float<N>``](https://ts-roids.ashgw.me/types/Float.html) parsed from a ``string``.
- [`PositiveInteger<N>`](https://ts-roids.ashgw.me/types/PositiveInteger.html) - Represents a positive (\[0, +∞\[) [``Integer<N>``](https://ts-roids.ashgw.me/types/Integer.html).
- [`PositiveIntegerString<S>`](https://ts-roids.ashgw.me/types/PositiveIntegerString.html) - Represents a negative [``Integer<N>``](https://ts-roids.ashgw.me/types/Integer.html) parsed from a ``string``.
- [`Primitive`](https://ts-roids.ashgw.me/types/Primitive.html) - All [primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) types.
- [`ReplaceKeys<Obj1,P,Obj2>`](https://ts-roids.ashgw.me/types/ReplaceKeys.html) - Constructs a new type by replacing properties `P` of type ``Obj`` with object type ``Obj2``.
- [`RequiredKeys<Obj>`](https://ts-roids.ashgw.me/types/RequiredKeys.html) - Get the required keys of an object (shallow).
- [`SizedTuple<T,N>`](https://ts-roids.ashgw.me/types/SizedTuple.html) -  Creates a tuple with a specific length, where each element is of a given type.
- [`StringEndsWith<S,E>`](https://ts-roids.ashgw.me/types/StringEndsWith.html) - Checks if a string `S` ends with `E`
- [`StringStartsWith<S,St>`](https://ts-roids.ashgw.me/types/StringStartsWith.html) -  Checks if a string `S` starts with `St`
- [`StringifyPrimitive<P>`](https://ts-roids.ashgw.me/types/StringifyPrimitive.html) - Turns a given [``Primitive``](https://ts-roids.ashgw.me/types/Primitive.html) value (except ``symbol``) into its string representation.
- [`Strlen<S>`](https://ts-roids.ashgw.me/types/Strlen.html) - Get the length of a string `S`.
- [`TestType<T1, T2, Expected>`](https://ts-roids.ashgw.me/types/TestType.html) - Tests if type `T1` and `T2` are the same.
- [`TruthyProperties<T>`](https://ts-roids.ashgw.me/types/TruthyProperties.html) - Extracts truthy properties from an object type ``T``.
- [`UnionToIntersection<U>`](https://ts-roids.ashgw.me/types/UnionToIntersection.html) - As the name implies, it turns a union into an intersection.
- [`Vals<Obj>`](https://ts-roids.ashgw.me/types/Vals.html) - Get the set of type values in a given object.
- [`Xor<B1, B2>`](https://ts-roids.ashgw.me/types/Xor.html) - Exclusive ``OR`` between two boolean types ``B1`` and ``B2``.


The best way to understand how these types work is to check the [tests directory](/tests/). Each type has corresponding ~~edge~~ test cases that demonstrate its usage and expected behavior.


#### Decorators

- [`@Final`]() - Marks an object final, as in one cannot inherit from it.
- [`@Sealed`]() - [Seals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal) an object.
- [`@Frozen`]() - [Freezes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) an object.
- [`@Singleton`]() -  Ensures that only a single instance of the class can be created.

#### Basic Usage
Finalize and freeze objects

```ts
import type { Optional, NewType, MaybeUndefined } from 'ts-roids';
import { Final, Frozen, Singleton } from 'ts-roids';

type Bar = NewType<'Bar', string>;
type Baz = NewType<'Baz', string>;
type Secret = NewType<'Secret', string>;

abstract class BaseFoo<T> {
  public abstract requestFoo(secret: Secret, baz: Baz): Promise<Optional<T>>;
}

@Final
@Frozen
@Singleton
class Foo<T> extends BaseFoo<T> {
  private static readonly rnd = Math.random();
  private readonly foo: T;
  public bar: Optional<Bar>; // `Bar` then becomes readonly with the decorator

  public constructor(foo: T, bar?: MaybeUndefined<Bar>) {
    super();
    this.foo = foo;
    this.bar = bar ?? null;
  }

  public override async requestFoo(
    secret: Secret,
    baz: Baz
  ): Promise<Optional<T>> {
    if (
      Foo.rnd > 0.5 &&
      secret.concat().toLowerCase() === '123' &&
      baz.concat().toLowerCase() === 'baz' &&
      this.bar !== null
    ) {
      return await Promise.resolve(this.foo);
    }

    return null;
  }
}

class SubFoo extends Foo<string> {
  constructor(foo: string) {
    super(foo);
  }
}

// No problem with instantiation
const foo = new Foo('foo');

// The Singleton ensures the same instance is returned
const foo2 = new Foo('bar');
console.log(foo2 === foo); // True

// Since the object is final:
// The line below will cause a TypeError: Cannot inherit from the final class Foo
new SubFoo('subFoo');

// Since the object is frozen:
// The line below will cause a TypeError: Cannot add property 'requestFoo', object is not extensible
foo.requestFoo = async () => {
  return await Promise.resolve('not foo');
};

// The line below will cause a TypeError: Cannot assign to read only property 'bar'
foo.bar = 'not bar' as Bar;
```
 The TypeScript team has not yet introduced a built-in final modifier yet, check
[this](https://github.com/microsoft/TypeScript/issues/8306), [this](https://github.com/microsoft/TypeScript/issues/50532) and many other requests.
Although they introduced `override` in [`v4.3`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#override-and-the---noimplicitoverride-flag) .

Decorators like ``@Final`` provide a limited way to emulate final behavior, these are merely band-aids for now, until TS officially supports a true final modifier.

You can also seal an object btw.
```ts
@Sealed
class Person {
  constructor(name: string, age?: number) {}
}

const john = new Person('John', 30);

// Existing properties can still be modified
john.age = 31; // No Errors

// Existing properties cannot be re-configured nor deleted

(john as any).email = 'john@doe.com'; // TypeError: Cannot add property email,
// object is not extensible

delete john.age; // TypeError: Cannot delete property 'age'
```

## Changelog

See [releases](https://github.com/ashgw/ts-roids/releases).

## License
[GPL-3](/LICENSE)
