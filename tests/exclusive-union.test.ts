import { describe, it, expect } from 'vitest';
import type { ExclusiveUnion, TestType } from '../src/types';

describe('ExclusiveUnion', () => {
  it('should make non-present properties undefined', () => {
    type Config = ExclusiveUnion<
      | { dbConnectionString: string; maxConnections: number }
      | { apiEndpoint: string; apiKey: string }
      | { storageBucket: string; accessKeyId: string; secretAccessKey: string }
    >;

    type Expected =
      | {
          dbConnectionString: string;
          maxConnections: number;
          apiEndpoint?: undefined;
          apiKey?: undefined;
          storageBucket?: undefined;
          accessKeyId?: undefined;
          secretAccessKey?: undefined;
        }
      | {
          dbConnectionString?: undefined;
          maxConnections?: undefined;
          apiEndpoint: string;
          apiKey: string;
          storageBucket?: undefined;
          accessKeyId?: undefined;
          secretAccessKey?: undefined;
        }
      | {
          dbConnectionString?: undefined;
          maxConnections?: undefined;
          apiEndpoint?: undefined;
          apiKey?: undefined;
          storageBucket: string;
          accessKeyId: string;
          secretAccessKey: string;
        };

    type ShouldPass = TestType<Config, Expected, true>;
    expect<ShouldPass>(true).toBe(true);
  });

  it('should work with single property unions', () => {
    type SinglePropUnion = ExclusiveUnion<
      { type: 'a'; value: number } | { type: 'b'; value: string }
    >;

    type Expected =
      | {
          type: 'a';
          value: number;
        }
      | {
          type: 'b';
          value: string;
        };

    type ShouldPass = TestType<SinglePropUnion, Expected, true>;
    expect<ShouldPass>(true).toBe(true);
  });

  it('should handle empty objects', () => {
    type EmptyUnion = ExclusiveUnion<NonNullable<unknown>>;
    //  but this test case work, just eslint doesn't allow empty objects, so re-write it as NonNullable<unknown>
    // eslint-disable-next-line @typescript-eslint/ban-types
    type Expected = {};

    type ShouldPass = TestType<EmptyUnion, Expected, true>;
    expect<ShouldPass>(true).toBe(true);
  });

  it('should handle nested objects', () => {
    type NestedUnion = ExclusiveUnion<
      | {
          type: 'user';
          data: { id: number; name: string };
        }
      | {
          type: 'post';
          data: { title: string; content: string };
        }
    >;

    type Expected =
      | {
          type: 'user';
          data: {
            id: number;
            name: string;
          };
        }
      | {
          type: 'post';
          data: {
            title: string;
            content: string;
          };
        };

    type ShouldPass = TestType<NestedUnion, Expected, true>;
    expect<ShouldPass>(true).toBe(true);
  });
});
