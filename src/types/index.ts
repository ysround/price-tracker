// Type definitions

// Branded Types for Entity IDs
export type UserId = string & { readonly _brand: 'UserId' }
export type CategoryId = string & { readonly _brand: 'CategoryId' }
export type StoreId = string & { readonly _brand: 'StoreId' }
export type ProductId = string & { readonly _brand: 'ProductId' }
export type PriceId = string & { readonly _brand: 'PriceId' }
