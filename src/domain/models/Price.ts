import { PriceId, ProductId, StoreId, UserId } from '@/types'
import { Money } from '../valueObjects/Money'
import { randomUUID } from 'crypto'

export interface PriceProps {
  productId: ProductId
  storeId: StoreId
  money: Money
  recordedAt: Date
  userId: UserId
}

export interface PriceRestoreProps extends PriceProps {
  priceId: PriceId
  createdAt: Date
  updatedAt: Date
}

export class Price {
  readonly priceId: PriceId
  readonly productId: ProductId
  readonly storeId: StoreId
  readonly money: Money
  readonly recordedAt: Date
  readonly userId: UserId
  readonly createdAt: Date
  readonly updatedAt: Date

  private constructor(props: PriceRestoreProps) {
    this.priceId = props.priceId
    this.productId = props.productId
    this.storeId = props.storeId
    this.money = props.money
    this.recordedAt = props.recordedAt
    this.userId = props.userId
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  static create(props: PriceProps): Price {
    const now = new Date()
    return new Price({
      priceId: randomUUID() as PriceId,
      productId: props.productId,
      storeId: props.storeId,
      money: props.money,
      recordedAt: props.recordedAt,
      userId: props.userId,
      createdAt: now,
      updatedAt: now,
    })
  }

  static restore(props: PriceRestoreProps): Price {
    return new Price(props)
  }
}
