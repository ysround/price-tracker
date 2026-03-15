export class ProductName {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string): ProductName {
    if (!value || typeof value !== 'string' || value.length < 1 || value.length > 50) {
      throw new Error('商品名は1文字以上50文字以下で入力してください')
    }
    return new ProductName(value)
  }

  getValue(): string {
    return this.value
  }

  equals(other: ProductName): boolean {
    return this.value === other.value
  }
}
