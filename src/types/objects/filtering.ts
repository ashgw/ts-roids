import type { Keys } from './keys';
import type { IfEquals, If, Equals } from '../logic';
import type { NewType } from '../branding/newtype';

/**
 * `FilterBy<T, P>` filters keys from the object type `T` based on a specified predicate `P`.
 *
 * @remark
 * > This type performs a shallow filtering of keys within `T` and does not check deeply nested types
 * or complex structures within the object type.
 *
 * > It does not return the key as a whole object, it just returns the key itself
 * @example
 *
 * ```typescript
 * type T = {
 *   a: () => 1;
 *   x: string;
 *   s: {
 *     q: Nullable;
 *     s: {
 *       i: {
 *         x: {
 *           o: boolean;
 *           n: Falsy;
 *         };
 *         e: 'foo';
 *       };
 *     };
 *   };
 * };
 *
 * ```
 * ```typescript
 * type _ = FilterBy<T, 'a'>
 * ```
 * Results in the type `'a'`, which includes only the key `'a'` from `T`.
 * ```typescript
 * type _ = FilterBy<T, Falsy>
 * ```
 * Results in the type `never`, indicating that no keys in `T` match the type `Falsy`.
 *
 * ```typescript
 * type _ = FilterBy<T, string>
 * ```
 * Results in the type `'a' | 'x' | 's'`, which includes all top-level keys of `T`
 * that are of type `string`. It did not pick up on 'e' as it is nested down.
 */
export type FilterBy<T, P> = {
  [K in Keys<T>]: K extends P ? K : never;
}[Keys<T>];

/**
 * Get a set of properties from `T` whose type are not assignable to `P`.
 * @example
 * ````ts
 * type T = {
 *  foo: string,
 *  bar: bigint | boolean,
 *  baz: number,
 * }
 * OmitByType<T,true>; // Result: T
 * OmitByType<T,number>; // Result: { foo: string, bar: bigint | boolean }
 * ````
 */
export type OmitByType<T, P> = {
  [K in Keys<T> as T[K] extends P ? never : K]: T[K];
};

/**
 * From ``T``, pick a set of properties whose type are assignable to ``P``.
 * @example
 * ````ts
 * type T = {
 *  foo: string,
 *  bar: bigint | boolean,
 *  baz: number,
 * }
 * PickByType<T,true>; // Result: {}
 * PickByType<T,number>; // Result: { baz: number }
 * ````
 */
export type PickByType<T, P> = {
  [K in Keys<T> as T[K] extends P ? K : never]: T[K];
};

/**
 * From ``T``, pick a set of properties whose type excatly matches ``P``.
 * @example
 * ````ts
type OneLevelDeep = {
  foo: boolean;
  bar?: Numeric;
  baz: Nullable;
  fooBaz: bigint;
  bazFoo: string | boolean;
  seven: 7;
  aNum: number;
};
  type A = PickExactlyByType<OneLevelDeep, bigint>,
  // A results in:
    {
      fooBaz: bigint;
    },
  // Notice how it does not pick up seven
 type B = PickExactlyByType<OneLevelDeep, number>,
    {
      aNum: number;
    }
 * ````
 */
export type PickExactlyByType<T, P> = {
  [K in Keys<T> as If<Equals<T[K], P>, K, never>]: T[K];
};

/**
 * Get a set of properties from `T` whose type exactly matches `P`.
 * @example
 * ````ts
type deep = {
        isActive: boolean;
        count?: number;
        description: string | null;
        details: {
          id: bigint;
          name: string;
          nested: {
            title: string;
            subtitle: string;
            moreDetails: {
              numberId: bigint;
            };
          };
        };
        additionalInfo: string | boolean;
      }
type A = OmitExactlyByTypeDeep<deep, bigint>
// A results in:
 {
      isActive: boolean;
      count?: number;
      description: string | null;
      details: {
        name: string;
        nested: {
          title: string;
          subtitle: string;
          moreDetails: EmptyObject;
        };
      };
      additionalInfo: string | boolean;
    }
 * ````
 */
export type OmitExactlyByTypeDeep<T, P> = {
  [K in Keys<T> as IfEquals<T[K], P, never, K>]: OmitExactlyByTypeDeep<T[K], P>;
};

/**
 * `NotIncluded` is a utility type that represents a value that should not be included
 * in the final type. It is primarily used within the `Prune` type to exclude certain
 * properties from the resulting object type.
 *
 * @remarks
 * The `NotIncluded` type is typically used in conditional types to exclude specific
 * branches of the type structure. When a condition matches, `NotIncluded` is applied
 * to those properties that should be omitted from the final type structure.
 *
 * @example
 * ```ts
 * type MyType = IfEquals<'foo', 'bar', string, NotIncluded>; // Result: NotIncluded
 * ```
 *
 * In the context of the `Prune` type, `NotIncluded` helps in filtering out properties
 * from deeply nested structures where certain conditions do not hold.
 */
export type NotIncluded = NewType<'NotIncluded', string>;

/**
 * `Prune<T, N = NotIncluded>` is a utility type that recursively removes properties of
 * type `N` (defaulting to `NotIncluded`) from the object type `T`. Useful
 * for filtering out unwanted or excluded properties in complex, deeply nested object
 * structures, where  you need to clean up or transform types where certain properties should be excluded based
 * on specific generic type conditions.
 * @example
 * Consider the following example where `Prune` is used to exclude properties marked as `NotIncluded`:
 * ```ts
 * type OrderData = Prune<
 *    UserOrderDetails<
 *      OrderStatus.DELIVERED,
 *      UserActionType.PLACE_ORDER,
 *      ProductType.PHYSICAL,
 *      PaymentMethod.PAYPAL
 *    >
 *  >;
 * ```
 * Where `UserOrderDetails` is defined as:
 * ```ts
 *
 * export enum OrderStatus {
 *   PENDING = 'PENDING',
 *   SHIPPED = 'SHIPPED',
 *   DELIVERED = 'DELIVERED',
 *   CANCELLED = 'CANCELLED',
 *   RETURNED = 'RETURNED',
 * }
 *
 * export enum PaymentMethod {
 *   CREDIT_CARD = 'CREDIT_CARD',
 *   PAYPAL = 'PAYPAL',
 *   BANK_TRANSFER = 'BANK_TRANSFER',
 *   CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
 *   CREDITS = 'CREDITS',
 * }
 *
 * export enum UserActionType {
 *   PLACE_ORDER = 'PLACE_ORDER',
 *   CANCEL_ORDER = 'CANCEL_ORDER',
 *   RETURN_ORDER = 'RETURN_ORDER',
 *   RATE_PRODUCT = 'RATE_PRODUCT',
 *   WRITE_REVIEW = 'WRITE_REVIEW',
 * }
 *
 * export enum ProductType {
 *   DIGITAL = 'DIGITAL',
 *   PHYSICAL = 'PHYSICAL',
 * }
 *
 * interface ShippingDetails {
 *   address: string;
 *   city: string;
 *   postalCode: string;
 *   country: string;
 *   deliveryDate: Maybe<string>;
 * }
 *
 * type ProductPricing<T extends ProductType> = {
 *   basePrice: number;
 *   discount: number;
 *   finalPrice: number;
 *   inCountryDiscount: IfEquals<T, ProductType.PHYSICAL, number, NotIncluded>;
 * };
 *
 * type ProductDetails<T extends ProductType> = {
 *   type: T;
 *   productId: string;
 *   productName: string;
 *   quantity: number;
 *   pricing: ProductPricing<T>;
 *   physicalDescription: IfEquals<
 *     T,
 *     ProductType.DIGITAL,
 *     {
 *       color: string;
 *       size: string;
 *     },
 *     NotIncluded
 *   >;
 * };
 *
 * type PaymentBreakdown = {
 *   baseAmount: number;
 *   tax: number;
 *   discount: number;
 *   finalAmount: number;
 * };
 *
 * interface PaymentDetails<PM extends PaymentMethod> {
 *   method: PM;
 *   transactionId: Maybe<string>;
 *   amountPaid: number;
 *   breakdown: IfEquals<PM, PaymentMethod.CREDITS, string, PaymentBreakdown>;
 * }
 *
 * type UserOrderDetails<
 *   OS extends OrderStatus,
 *   UAT extends UserActionType,
 *   PT extends ProductType,
 *   PM extends PaymentMethod,
 * > = {
 *   orderId: string;
 *   userId: string;
 *   products: ProductDetails<PT>[];
 *   orderStatus: OS;
 *   shipping: IfEquals<
 *     PT,
 *     ProductType.PHYSICAL,
 *     {
 *       details: IfEquals<
 *         OS,
 *         OrderStatus.SHIPPED | OrderStatus.DELIVERED,
 *         ShippingDetails,
 *         NotIncluded
 *       >;
 *       deliveredOn: IfEquals<OS, OrderStatus.DELIVERED, Date, NotIncluded>;
 *       returnedOn: IfEquals<OS, OrderStatus.RETURNED, Date, NotIncluded>;
 *     },
 *     NotIncluded
 *   >;
 *   payment: PaymentDetails<PM>;
 *   actions: {
 *     type: UAT;
 *     timestamp: number;
 *     metadata: IfEquals<
 *       UAT,
 *       | UserActionType.PLACE_ORDER
 *       | UserActionType.CANCEL_ORDER
 *       | UserActionType.RETURN_ORDER,
 *       {
 *         ipAddress: string;
 *         deviceType: string;
 *       },
 *       NotIncluded
 *     >;
 *   }[];
 * };
 * ```
 * Any property marked as `NotIncluded` will be excluded from the resulting `OrderData` type, not as `undefined` or `null`, but completely excluded as if it never existed on the type
 *
 * ```ts
 *  const testOrderData: OrderData = {
 *    orderStatus: OrderStatus.DELIVERED,
 *    actions: [
 *      {
 *        timestamp: 1663725600000,
 *        // Type 'UserActionType.RATE_PRODUCT' is not assignable to type 'UserActionType.PLACE_ORDER'.ts(2322)
 *        type: UserActionType.PLACE_ORDER,
 *        // Object literal may only specify known properties, and 'metadata' does not exist in type 'OmitExactlyByTypeDeep<{ type: UserActionType.PLACE_ORDER; timestamp: number; metadata: NotIncluded; }, NotIncluded>'.ts(2353)
 *        // metadata: {
 *        //   ipAddress: '127.0.0.1',
 *        //   deviceType: 'desktop',
 *        // },
 *      },
 *    ],
 *    orderId: '123',
 *    userId: 'abc',
 *    products: [
 *      {
 *        // Type 'ProdcutType.DIGITAL' is not assignable to type 'ProdcutType.PHYSICAL'.ts(2322)
 *        type: ProductType.PHYSICAL,
 *        productId: 'abc',
 *        productName: 'Test Product',
 *        quantity: 1,
 *        pricing: {
 *          basePrice: 10,
 *          discount: 0,
 *          finalPrice: 10,
 *          // If the product type is digital, the 'physicalDescription' property should be omitted
 *          // Object literal may only specify known properties, and 'inCountryDiscount' does not exist in type 'OmitExactlyByTypeDeep<ProductPricing<ProductType.DIGITAL>, NotIncluded>'.ts(2353)
 *          // physicalDescription: {
 *          //   color: 'Red',
 *          //   size: 'Large',
 *          // },
 *          inCountryDiscount: 87,
 *        },
 *      },
 *    ],
 *    payment: {
 *      amountPaid: 10,
 *      // If the PaymentMethod is CREDITS, the 'breakdown' property should be a string, no Breakdown object should exist
 *      // Type '{ baseAmount: number; tax: number; discount: number; finalAmount: number; }' is not assignable to type 'string'.
 *      breakdown: {
 *        baseAmount: 10,
 *        tax: 2,
 *        discount: 0,
 *        finalAmount: 12,
 *      },
 *      // Type 'PaymentMethod.BANK_TRANSFER' is not assignable to type 'PaymentMethod.PAYPAL'.ts(2322)
 *      // method: PaymentMethod.BANK_TRANSFER,
 *      method: PaymentMethod.PAYPAL,
 *      transactionId: '1234567890',
 *    },
 *    shipping: {
 *      deliveredOn: new Date(),
 *    },
 *  };
 * ```
 *
 * In this example, `Prune`  removes all properties within `UserOrderDetails`
 * that are marked with `NotIncluded`, resulting in a cleaned-up type structure.
 */
export type Prune<T, N = NotIncluded> = OmitExactlyByTypeDeep<T, N>;
