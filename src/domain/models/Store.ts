import { StoreId, UserId } from '@/types'
import { StoreName } from '../valueObjects/StoreName'
import { randomUUID } from 'crypto'

export interface StoreProps {
  name: StoreName
  location: string | null
  memo: string | null
  userId: UserId
}

export interface StoreRestoreProps extends StoreProps {
  storeId: StoreId
  createdAt: Date
  updatedAt: Date
}

export class Store {
  readonly storeId: StoreId
  readonly name: StoreName
  readonly location: string | null
  readonly memo: string | null
  readonly userId: UserId
  readonly createdAt: Date
  readonly updatedAt: Date

  private constructor(props: StoreRestoreProps) {
    this.storeId = props.storeId
    this.name = props.name
    this.location = props.location
    this.memo = props.memo
    this.userId = props.userId
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  static create(props: StoreProps): Store {
    const now = new Date()
    return new Store({
      storeId: randomUUID() as StoreId,
      name: props.name,
      location: props.location,
      memo: props.memo,
      userId: props.userId,
      createdAt: now,
      updatedAt: now,
    })
  }

  static restore(props: StoreRestoreProps): Store {
    return new Store(props)
  }
}
