import { CategoryName } from './CategoryName'

describe('CategoryName', () => {
  describe('正常系', () => {
    it('1文字のカテゴリー名を作成できる', () => {
      const categoryName = CategoryName.create('a')
      expect(categoryName.getValue()).toBe('a')
    })

    it('30文字のカテゴリー名を作成できる', () => {
      const name = 'a'.repeat(30)
      const categoryName = CategoryName.create(name)
      expect(categoryName.getValue()).toBe(name)
    })

    it('通常の文字列でカテゴリー名を作成できる', () => {
      const categoryName = CategoryName.create('調味料')
      expect(categoryName.getValue()).toBe('調味料')
    })
  })

  describe('異常系', () => {
    it('空文字の場合はエラーをスローする', () => {
      expect(() => CategoryName.create('')).toThrow('カテゴリー名は1文字以上30文字以下で入力してください')
    })

    it('31文字以上の場合はエラーをスローする', () => {
      const name = 'a'.repeat(31)
      expect(() => CategoryName.create(name)).toThrow('カテゴリー名は1文字以上30文字以下で入力してください')
    })

    it('nullの場合はエラーをスローする', () => {
      expect(() => CategoryName.create(null as any)).toThrow('カテゴリー名は1文字以上30文字以下で入力してください')
    })

    it('undefinedの場合はエラーをスローする', () => {
      expect(() => CategoryName.create(undefined as any)).toThrow('カテゴリー名は1文字以上30文字以下で入力してください')
    })
  })

  describe('equals', () => {
    it('同じ値の場合はtrueを返す', () => {
      const categoryName1 = CategoryName.create('調味料')
      const categoryName2 = CategoryName.create('調味料')
      expect(categoryName1.equals(categoryName2)).toBe(true)
    })

    it('異なる値の場合はfalseを返す', () => {
      const categoryName1 = CategoryName.create('調味料')
      const categoryName2 = CategoryName.create('飲料')
      expect(categoryName1.equals(categoryName2)).toBe(false)
    })
  })
})
