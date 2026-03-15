import { CategoryId, UserId } from '@/types'
import { CategoryName } from '../valueObjects/CategoryName'
import { randomUUID } from 'crypto'

export interface CategoryProps {
  name: CategoryName
  parentCategoryId: CategoryId | null
  displayOrder: number
  userId: UserId
}

export interface CategoryRestoreProps extends CategoryProps {
  categoryId: CategoryId
  createdAt: Date
  updatedAt: Date
}

export class Category {
  readonly categoryId: CategoryId
  readonly name: CategoryName
  readonly parentCategoryId: CategoryId | null
  readonly displayOrder: number
  readonly userId: UserId
  readonly createdAt: Date
  readonly updatedAt: Date

  private constructor(props: CategoryRestoreProps) {
    this.categoryId = props.categoryId
    this.name = props.name
    this.parentCategoryId = props.parentCategoryId
    this.displayOrder = props.displayOrder
    this.userId = props.userId
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  static create(props: CategoryProps): Category {
    const now = new Date()
    return new Category({
      categoryId: randomUUID() as CategoryId,
      name: props.name,
      parentCategoryId: props.parentCategoryId,
      displayOrder: props.displayOrder,
      userId: props.userId,
      createdAt: now,
      updatedAt: now,
    })
  }

  static restore(props: CategoryRestoreProps): Category {
    return new Category(props)
  }

  isParent(): boolean {
    return this.parentCategoryId === null
  }
}
