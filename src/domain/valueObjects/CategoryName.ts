export class CategoryName {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string): CategoryName {
    if (!value || typeof value !== 'string' || value.length < 1 || value.length > 30) {
      throw new Error('カテゴリー名は1文字以上30文字以下で入力してください')
    }
    return new CategoryName(value)
  }

  getValue(): string {
    return this.value
  }

  equals(other: CategoryName): boolean {
    return this.value === other.value
  }
}
