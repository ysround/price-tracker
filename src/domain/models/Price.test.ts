import { Price } from './Price'
import { Money } from '../valueObjects/Money'
import { PriceId, ProductId, StoreId, UserId } from '@/types'

describe('Price', () => {
  const userId = 'user-123' as UserId
  const productId = 'product-123' as ProductId
  const storeId = 'store-123' as StoreId

  describe('create - 新規作成', () => {
    it('価格情報を作成できる', () => {
      const money = Money.create(298)
      const recordedAt = new Date('2024-01-15')
      const price = Price.create({
        productId,
        storeId,
        money,
        recordedAt,
        userId,
      })

      expect(price.productId).toBe(productId)
      expect(price.storeId).toBe(storeId)
      expect(price.money.getAmount()).toBe(298)
      expect(price.recordedAt).toBe(recordedAt)
      expect(price.userId).toBe(userId)
      expect(price.priceId).toBeDefined()
    })

    it('moneyに負数を渡すとエラーをスローする', () => {
      expect(() => {
        Money.create(-100)
      }).toThrow('金額は0以上の整数で入力してください')
    })

    it('0円の価格情報を作成できる', () => {
      const money = Money.create(0)
      const recordedAt = new Date()
      const price = Price.create({
        productId,
        storeId,
        money,
        recordedAt,
        userId,
      })

      expect(price.money.getAmount()).toBe(0)
    })
  })

  describe('restore - DB復元', () => {
    it('既存の価格情報を復元できる', () => {
      const priceId = 'price-123' as PriceId
      const money = Money.create(298)
      const recordedAt = new Date('2024-01-15')
      const createdAt = new Date('2024-01-01')
      const updatedAt = new Date('2024-01-02')

      const price = Price.restore({
        priceId,
        productId,
        storeId,
        money,
        recordedAt,
        userId,
        createdAt,
        updatedAt,
      })

      expect(price.priceId).toBe(priceId)
      expect(price.money.getAmount()).toBe(298)
      expect(price.recordedAt).toBe(recordedAt)
      expect(price.createdAt).toBe(createdAt)
      expect(price.updatedAt).toBe(updatedAt)
    })
  })
})
