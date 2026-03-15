import { Store } from '../models/Store'
import { StoreId, UserId } from '@/types'

export interface IStoreRepository {
  findById(id: StoreId): Promise<Store | null>
  findAll(userId: UserId): Promise<Store[]>
  save(store: Store): Promise<void>
  delete(id: StoreId): Promise<void>
}
