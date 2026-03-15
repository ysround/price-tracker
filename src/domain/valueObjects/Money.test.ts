import { Money } from './Money'

describe('Money', () => {
  describe('正常系', () => {
    it('金額と通貨を指定して作成できる', () => {
      const money = Money.create(1000, 'JPY')
      expect(money.getAmount()).toBe(1000)
      expect(money.getCurrency()).toBe('JPY')
    })

    it('通貨を省略するとJPYになる', () => {
      const money = Money.create(1000)
      expect(money.getAmount()).toBe(1000)
      expect(money.getCurrency()).toBe('JPY')
    })

    it('0円を作成できる', () => {
      const money = Money.create(0)
      expect(money.getAmount()).toBe(0)
    })

    it('大きな金額を作成できる', () => {
      const money = Money.create(999999999)
      expect(money.getAmount()).toBe(999999999)
    })
  })

  describe('異常系', () => {
    it('負の金額の場合はエラーをスローする', () => {
      expect(() => Money.create(-1)).toThrow('金額は0以上の整数で入力してください')
    })

    it('小数の場合はエラーをスローする', () => {
      expect(() => Money.create(100.5)).toThrow('金額は0以上の整数で入力してください')
    })

    it('数値以外の場合はエラーをスローする', () => {
      expect(() => Money.create('1000' as any)).toThrow('金額は0以上の整数で入力してください')
    })

    it('nullの場合はエラーをスローする', () => {
      expect(() => Money.create(null as any)).toThrow('金額は0以上の整数で入力してください')
    })

    it('undefinedの場合はエラーをスローする', () => {
      expect(() => Money.create(undefined as any)).toThrow('金額は0以上の整数で入力してください')
    })
  })

  describe('equals', () => {
    it('同じ金額と通貨の場合はtrueを返す', () => {
      const money1 = Money.create(1000, 'JPY')
      const money2 = Money.create(1000, 'JPY')
      expect(money1.equals(money2)).toBe(true)
    })

    it('金額が異なる場合はfalseを返す', () => {
      const money1 = Money.create(1000, 'JPY')
      const money2 = Money.create(2000, 'JPY')
      expect(money1.equals(money2)).toBe(false)
    })

    it('通貨が異なる場合はfalseを返す', () => {
      const money1 = Money.create(1000, 'JPY')
      const money2 = Money.create(1000, 'USD')
      expect(money1.equals(money2)).toBe(false)
    })
  })

  describe('add', () => {
    it('同じ通貨の金額を加算できる', () => {
      const money1 = Money.create(1000, 'JPY')
      const money2 = Money.create(500, 'JPY')
      const result = money1.add(money2)
      expect(result.getAmount()).toBe(1500)
      expect(result.getCurrency()).toBe('JPY')
    })

    it('異なる通貨の場合はエラーをスローする', () => {
      const money1 = Money.create(1000, 'JPY')
      const money2 = Money.create(10, 'USD')
      expect(() => money1.add(money2)).toThrow('通貨が異なるため加算できません')
    })

    it('元のオブジェクトは変更されない（イミュータブル）', () => {
      const money1 = Money.create(1000, 'JPY')
      const money2 = Money.create(500, 'JPY')
      money1.add(money2)
      expect(money1.getAmount()).toBe(1000)
    })
  })

  describe('toString', () => {
    it('JPYの場合は¥記号付きのカンマ区切りで表示される', () => {
      const money = Money.create(1000, 'JPY')
      expect(money.toString()).toBe('¥1,000')
    })

    it('3桁ごとにカンマが入る', () => {
      const money = Money.create(1234567, 'JPY')
      expect(money.toString()).toBe('¥1,234,567')
    })

    it('0円の場合も正しく表示される', () => {
      const money = Money.create(0, 'JPY')
      expect(money.toString()).toBe('¥0')
    })

    it('USD通貨の場合は$記号で表示される', () => {
      const money = Money.create(1000, 'USD')
      expect(money.toString()).toBe('$1,000')
    })

    it('その他の通貨の場合は通貨コード付きで表示される', () => {
      const money = Money.create(1000, 'EUR')
      expect(money.toString()).toBe('1,000 EUR')
    })
  })
})
