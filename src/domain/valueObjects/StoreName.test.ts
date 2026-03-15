import { StoreName } from './StoreName'

describe('StoreName', () => {
  describe('正常系', () => {
    it('1文字の店舗名を作成できる', () => {
      const storeName = StoreName.create('a')
      expect(storeName.getValue()).toBe('a')
    })

    it('50文字の店舗名を作成できる', () => {
      const name = 'a'.repeat(50)
      const storeName = StoreName.create(name)
      expect(storeName.getValue()).toBe(name)
    })

    it('通常の文字列で店舗名を作成できる', () => {
      const storeName = StoreName.create('イオン 幕張店')
      expect(storeName.getValue()).toBe('イオン 幕張店')
    })
  })

  describe('異常系', () => {
    it('空文字の場合はエラーをスローする', () => {
      expect(() => StoreName.create('')).toThrow('店舗名は1文字以上50文字以下で入力してください')
    })

    it('51文字以上の場合はエラーをスローする', () => {
      const name = 'a'.repeat(51)
      expect(() => StoreName.create(name)).toThrow('店舗名は1文字以上50文字以下で入力してください')
    })

    it('nullの場合はエラーをスローする', () => {
      expect(() => StoreName.create(null as any)).toThrow('店舗名は1文字以上50文字以下で入力してください')
    })

    it('undefinedの場合はエラーをスローする', () => {
      expect(() => StoreName.create(undefined as any)).toThrow('店舗名は1文字以上50文字以下で入力してください')
    })
  })

  describe('equals', () => {
    it('同じ値の場合はtrueを返す', () => {
      const storeName1 = StoreName.create('イオン 幕張店')
      const storeName2 = StoreName.create('イオン 幕張店')
      expect(storeName1.equals(storeName2)).toBe(true)
    })

    it('異なる値の場合はfalseを返す', () => {
      const storeName1 = StoreName.create('イオン 幕張店')
      const storeName2 = StoreName.create('イトーヨーカドー 津田沼店')
      expect(storeName1.equals(storeName2)).toBe(false)
    })
  })
})
