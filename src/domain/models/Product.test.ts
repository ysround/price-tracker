import { Product } from './Product'
import { ProductName } from '../valueObjects/ProductName'
import { ProductId, CategoryId, UserId } from '@/types'

describe('Product', () => {
  const userId = 'user-123' as UserId
  const categoryId = 'category-123' as CategoryId

  describe('create - 新規作成', () => {
    it('商品を作成できる', () => {
      const productName = ProductName.create('キッコーマン 特選丸大豆醤油')
      const product = Product.create({
        name: productName,
        categoryId,
        photoURL: 'https://example.com/photo.jpg',
        memo: '1L サイズ',
        userId,
      })

      expect(product.name.getValue()).toBe('キッコーマン 特選丸大豆醤油')
      expect(product.categoryId).toBe(categoryId)
      expect(product.photoURL).toBe('https://example.com/photo.jpg')
      expect(product.memo).toBe('1L サイズ')
      expect(product.userId).toBe(userId)
      expect(product.productId).toBeDefined()
    })

    it('photoURL, memoがnullでも作成できる', () => {
      const productName = ProductName.create('醤油')
      const product = Product.create({
        name: productName,
        categoryId,
        photoURL: null,
        memo: null,
        userId,
      })

      expect(product.name.getValue()).toBe('醤油')
      expect(product.photoURL).toBeNull()
      expect(product.memo).toBeNull()
    })

    it('nameに不正な値を渡すとエラーをスローする', () => {
      expect(() => {
        ProductName.create('')
      }).toThrow('商品名は1文字以上50文字以下で入力してください')
    })
  })

  describe('restore - DB復元', () => {
    it('既存の商品を復元できる', () => {
      const productId = 'product-123' as ProductId
      const productName = ProductName.create('キッコーマン 特選丸大豆醤油')
      const createdAt = new Date('2024-01-01')
      const updatedAt = new Date('2024-01-02')

      const product = Product.restore({
        productId,
        name: productName,
        categoryId,
        photoURL: 'https://example.com/photo.jpg',
        memo: '1L サイズ',
        userId,
        createdAt,
        updatedAt,
      })

      expect(product.productId).toBe(productId)
      expect(product.name.getValue()).toBe('キッコーマン 特選丸大豆醤油')
      expect(product.createdAt).toBe(createdAt)
      expect(product.updatedAt).toBe(updatedAt)
    })
  })
})
