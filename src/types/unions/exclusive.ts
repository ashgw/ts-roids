import type { Keys } from '../objects/keys';
import type { Simplify } from '../utils';

type KeysOfUnion<T> = T extends T ? keyof T : never;

/**
 * `ExclusiveUnion<T>` creates a union type where each member has its own properties as required,
 * while properties from other members of the union are made optional and set to `undefined`.
 * This is useful for cases where different configurations or variants in a union require only their specific fields.
 *
 * @template T - The union of object types for which partially optionalized variants should be created.
 * @template AllKeys - The union of all possible keys across the union's types, derived from `KeysOfUnion`.
 *
 * @example
 * ```ts
 * type Config = ExclusiveUnion<
 *   | { dbConnectionString: string; maxConnections: number }
 *   | { apiEndpoint: string; apiKey: string }
 *   | { storageBucket: string; accessKeyId: string; secretAccessKey: string }
 * >;
 *
 * // Example usage:
 * function configureService(config: Config) {
 *   if (config.dbConnectionString) {
 *     console.log(`Configuring database with connection string ${config.dbConnectionString}`);
 *   } else if (config.apiEndpoint) {
 *     console.log(`Configuring API with endpoint ${config.apiEndpoint}`);
 *   } else if (config.storageBucket && config.accessKeyId && config.secretAccessKey) {
 *     console.log(`Configuring storage bucket ${config.storageBucket}`);
 *   } else {
 *     console.log('Invalid configuration');
 *   }
 * }
 *
 * configureService({ dbConnectionString: 'postgres://...', maxConnections: 100 });
 * configureService({ apiEndpoint: 'https://api.example.com', apiKey: '1234' });
 * configureService({ storageBucket: 'my-bucket', accessKeyId: 'AKIA...', secretAccessKey: 'abcd' });
 * ```
 */
export type ExclusiveUnion<
  T extends object,
  AllKeys extends KeysOfUnion<T> = KeysOfUnion<T>,
> = Simplify<
  T extends unknown
    ? T & Partial<Record<Exclude<AllKeys, Keys<T>>, undefined>>
    : never
>;
