import { Store } from './Store'
import { StoreName } from '../valueObjects/StoreName'
import { StoreId, UserId } from '@/types'

describe('Store', () => {
  const userId = 'user-123' as UserId

  describe('create - 新規作成', () => {
    it('店舗を作成できる', () => {
      const storeName = StoreName.create('イオン 幕張店')
      const store = Store.create({
        name: storeName,
        location: '千葉県千葉市美浜区',
        memo: '駐車場あり',
        userId,
      })

      expect(store.name.getValue()).toBe('イオン 幕張店')
      expect(store.location).toBe('千葉県千葉市美浜区')
      expect(store.memo).toBe('駐車場あり')
      expect(store.userId).toBe(userId)
      expect(store.storeId).toBeDefined()
    })

    it('location, memoがnullでも作成できる', () => {
      const storeName = StoreName.create('イトーヨーカドー')
      const store = Store.create({
        name: storeName,
        location: null,
        memo: null,
        userId,
      })

      expect(store.name.getValue()).toBe('イトーヨーカドー')
      expect(store.location).toBeNull()
      expect(store.memo).toBeNull()
    })

    it('nameに不正な値を渡すとエラーをスローする', () => {
      expect(() => {
        StoreName.create('')
      }).toThrow('店舗名は1文字以上50文字以下で入力してください')
    })
  })

  describe('restore - DB復元', () => {
    it('既存の店舗を復元できる', () => {
      const storeId = 'store-123' as StoreId
      const storeName = StoreName.create('イオン 幕張店')
      const createdAt = new Date('2024-01-01')
      const updatedAt = new Date('2024-01-02')

      const store = Store.restore({
        storeId,
        name: storeName,
        location: '千葉県千葉市美浜区',
        memo: null,
        userId,
        createdAt,
        updatedAt,
      })

      expect(store.storeId).toBe(storeId)
      expect(store.name.getValue()).toBe('イオン 幕張店')
      expect(store.createdAt).toBe(createdAt)
      expect(store.updatedAt).toBe(updatedAt)
    })
  })
})
