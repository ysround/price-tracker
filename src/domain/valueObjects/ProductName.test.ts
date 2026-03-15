import { ProductName } from './ProductName'

describe('ProductName', () => {
  describe('正常系', () => {
    it('1文字の商品名を作成できる', () => {
      const productName = ProductName.create('a')
      expect(productName.getValue()).toBe('a')
    })

    it('50文字の商品名を作成できる', () => {
      const name = 'a'.repeat(50)
      const productName = ProductName.create(name)
      expect(productName.getValue()).toBe(name)
    })

    it('通常の文字列で商品名を作成できる', () => {
      const productName = ProductName.create('キッコーマン 特選丸大豆醤油')
      expect(productName.getValue()).toBe('キッコーマン 特選丸大豆醤油')
    })
  })

  describe('異常系', () => {
    it('空文字の場合はエラーをスローする', () => {
      expect(() => ProductName.create('')).toThrow('商品名は1文字以上50文字以下で入力してください')
    })

    it('51文字以上の場合はエラーをスローする', () => {
      const name = 'a'.repeat(51)
      expect(() => ProductName.create(name)).toThrow('商品名は1文字以上50文字以下で入力してください')
    })

    it('nullの場合はエラーをスローする', () => {
      expect(() => ProductName.create(null as any)).toThrow('商品名は1文字以上50文字以下で入力してください')
    })

    it('undefinedの場合はエラーをスローする', () => {
      expect(() => ProductName.create(undefined as any)).toThrow('商品名は1文字以上50文字以下で入力してください')
    })
  })

  describe('equals', () => {
    it('同じ値の場合はtrueを返す', () => {
      const productName1 = ProductName.create('醤油')
      const productName2 = ProductName.create('醤油')
      expect(productName1.equals(productName2)).toBe(true)
    })

    it('異なる値の場合はfalseを返す', () => {
      const productName1 = ProductName.create('醤油')
      const productName2 = ProductName.create('味噌')
      expect(productName1.equals(productName2)).toBe(false)
    })
  })
})
