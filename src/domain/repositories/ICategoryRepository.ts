import { Category } from '../models/Category'
import { CategoryId, UserId } from '@/types'

export interface ICategoryRepository {
  findById(id: CategoryId): Promise<Category | null>
  findAll(userId: UserId): Promise<Category[]>
  findChildren(parentId: CategoryId, userId: UserId): Promise<Category[]>
  save(category: Category): Promise<void>
  delete(id: CategoryId): Promise<void>
}
