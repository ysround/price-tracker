export class Money {
  private readonly amount: number
  private readonly currency: string

  private constructor(amount: number, currency: string) {
    this.amount = amount
    this.currency = currency
  }

  static create(amount: number, currency: string = 'JPY'): Money {
    if (
      typeof amount !== 'number' ||
      amount < 0 ||
      !Number.isInteger(amount) ||
      amount == null
    ) {
      throw new Error('金額は0以上の整数で入力してください')
    }
    return new Money(amount, currency)
  }

  getAmount(): number {
    return this.amount
  }

  getCurrency(): string {
    return this.currency
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('通貨が異なるため加算できません')
    }
    return new Money(this.amount + other.amount, this.currency)
  }

  toString(): string {
    const formattedAmount = this.amount.toLocaleString('en-US')

    switch (this.currency) {
      case 'JPY':
        return `¥${formattedAmount}`
      case 'USD':
        return `$${formattedAmount}`
      default:
        return `${formattedAmount} ${this.currency}`
    }
  }
}
