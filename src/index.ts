// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Nullable = null | undefined;
export type Numeric = number | bigint;
export type Primitive = Nullable | Numeric | string | boolean | symbol;
export type Falsy = false | '' | 0 | Nullable;

