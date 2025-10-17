import { check, is, describe, it } from 'testyx';

describe('>>', () => {
  it('should work', () => {
    check(
      is<true, true>()
        .and()
        .is<false, false>()
        .and()
        .isNot<true, false>()
        .and()
        .isNot<false, true>()
    );
  });
});
