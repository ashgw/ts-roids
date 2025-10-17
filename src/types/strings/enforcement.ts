import type { Equals } from '../logic';

/**
 * EnforcedString
 *
 * Constructive constraint builder:
 *  - Prefix: must start with this
 *  - Contains: must contain this anywhere
 *  - Suffix: must end with this
 *
 * If a knob is the wide `string`, that knob imposes no constraint.
 * If all three are `string`, the result is plain `string`.
 *
 * @examples
 * type A = EnforcedString<'pk_'>;                 // `pk_${string}`
 * type B = EnforcedString<string, 'ABC'>;         // `${string}ABC${string}`
 * type C = EnforcedString<string, string, '.json'>; // `${string}.json`
 * type D = EnforcedString<'pk_', 'ABC', '.json'>; // `pk_${string}ABC${string}.json`
 * type E = EnforcedString<string, string, string>; // string
 */
export type EnforcedString<
  Prefix extends string = string,
  Contains extends string = string,
  Suffix extends string = string,
> =
  // all unconstrained -> string
  Equals<Prefix, string> extends true
    ? Equals<Contains, string> extends true
      ? Equals<Suffix, string> extends true
        ? string
        : `${string}${Suffix}` // only suffix constrained
      : Equals<Suffix, string> extends true
        ? `${string}${Contains}${string}` // only contains constrained
        : `${string}${Contains}${string}${Suffix}` // contains + suffix
    : Equals<Contains, string> extends true
      ? Equals<Suffix, string> extends true
        ? `${Prefix}${string}` // only prefix constrained
        : `${Prefix}${string}${Suffix}` // prefix + suffix
      : Equals<Suffix, string> extends true
        ? `${Prefix}${string}${Contains}${string}` // prefix + contains
        : `${Prefix}${string}${Contains}${string}${Suffix}`; // all three
