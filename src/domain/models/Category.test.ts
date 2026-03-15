import { Category } from './Category'
import { CategoryName } from '../valueObjects/CategoryName'
import { CategoryId, UserId } from '@/types'

describe('Category', () => {
  const userId = 'user-123' as UserId
  const parentCategoryId = 'category-parent-1' as CategoryId

  describe('create - 新規作成', () => {
    it('親カテゴリーを作成できる（parentCategoryId: null）', () => {
      const categoryName = CategoryName.create('調味料')
      const category = Category.create({
        name: categoryName,
        parentCategoryId: null,
        displayOrder: 1,
        userId,
      })

      expect(category.name.getValue()).toBe('調味料')
      expect(category.parentCategoryId).toBeNull()
      expect(category.displayOrder).toBe(1)
      expect(category.userId).toBe(userId)
      expect(category.categoryId).toBeDefined()
    })

    it('子カテゴリーを作成できる（parentCategoryId: あり）', () => {
      const categoryName = CategoryName.create('醤油')
      const category = Category.create({
        name: categoryName,
        parentCategoryId,
        displayOrder: 1,
        userId,
      })

      expect(category.name.getValue()).toBe('醤油')
      expect(category.parentCategoryId).toBe(parentCategoryId)
      expect(category.displayOrder).toBe(1)
      expect(category.userId).toBe(userId)
    })

    it('nameに不正な値を渡すとエラーをスローする', () => {
      expect(() => {
        CategoryName.create('')
      }).toThrow('カテゴリー名は1文字以上30文字以下で入力してください')
    })
  })

  describe('restore - DB復元', () => {
    it('既存のカテゴリーを復元できる', () => {
      const categoryId = 'category-123' as CategoryId
      const categoryName = CategoryName.create('調味料')
      const createdAt = new Date('2024-01-01')
      const updatedAt = new Date('2024-01-02')

      const category = Category.restore({
        categoryId,
        name: categoryName,
        parentCategoryId: null,
        displayOrder: 1,
        userId,
        createdAt,
        updatedAt,
      })

      expect(category.categoryId).toBe(categoryId)
      expect(category.name.getValue()).toBe('調味料')
      expect(category.createdAt).toBe(createdAt)
      expect(category.updatedAt).toBe(updatedAt)
    })
  })

  describe('isParent', () => {
    it('parentCategoryIdがnullの場合はtrueを返す', () => {
      const categoryName = CategoryName.create('調味料')
      const category = Category.create({
        name: categoryName,
        parentCategoryId: null,
        displayOrder: 1,
        userId,
      })

      expect(category.isParent()).toBe(true)
    })

    it('parentCategoryIdがある場合はfalseを返す', () => {
      const categoryName = CategoryName.create('醤油')
      const category = Category.create({
        name: categoryName,
        parentCategoryId,
        displayOrder: 1,
        userId,
      })

      expect(category.isParent()).toBe(false)
    })
  })
})
