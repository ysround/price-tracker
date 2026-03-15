import { Product } from '../models/Product'
import { ProductId, CategoryId, UserId } from '@/types'

export interface IProductRepository {
  findById(id: ProductId): Promise<Product | null>
  findByCategoryId(categoryId: CategoryId, userId: UserId): Promise<Product[]>
  findAll(userId: UserId): Promise<Product[]>
  save(product: Product): Promise<void>
  delete(id: ProductId): Promise<void>
}
