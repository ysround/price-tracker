import { Price } from '../models/Price'
import { PriceId, ProductId, StoreId, UserId } from '@/types'

export interface IPriceRepository {
  findById(id: PriceId): Promise<Price | null>
  findByProductId(productId: ProductId, userId: UserId): Promise<Price[]>
  findByProductAndStore(
    productId: ProductId,
    storeId: StoreId,
    userId: UserId
  ): Promise<Price | null>
  save(price: Price): Promise<void>
  delete(id: PriceId): Promise<void>
}
