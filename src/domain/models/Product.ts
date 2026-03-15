import { ProductId, CategoryId, UserId } from '@/types'
import { ProductName } from '../valueObjects/ProductName'
import { randomUUID } from 'crypto'

export interface ProductProps {
  name: ProductName
  categoryId: CategoryId
  photoURL: string | null
  memo: string | null
  userId: UserId
}

export interface ProductRestoreProps extends ProductProps {
  productId: ProductId
  createdAt: Date
  updatedAt: Date
}

export class Product {
  readonly productId: ProductId
  readonly name: ProductName
  readonly categoryId: CategoryId
  readonly photoURL: string | null
  readonly memo: string | null
  readonly userId: UserId
  readonly createdAt: Date
  readonly updatedAt: Date

  private constructor(props: ProductRestoreProps) {
    this.productId = props.productId
    this.name = props.name
    this.categoryId = props.categoryId
    this.photoURL = props.photoURL
    this.memo = props.memo
    this.userId = props.userId
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  static create(props: ProductProps): Product {
    const now = new Date()
    return new Product({
      productId: randomUUID() as ProductId,
      name: props.name,
      categoryId: props.categoryId,
      photoURL: props.photoURL,
      memo: props.memo,
      userId: props.userId,
      createdAt: now,
      updatedAt: now,
    })
  }

  static restore(props: ProductRestoreProps): Product {
    return new Product(props)
  }
}
