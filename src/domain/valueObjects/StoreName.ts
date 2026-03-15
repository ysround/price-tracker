export class StoreName {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string): StoreName {
    if (!value || typeof value !== 'string' || value.length < 1 || value.length > 50) {
      throw new Error('店舗名は1文字以上50文字以下で入力してください')
    }
    return new StoreName(value)
  }

  getValue(): string {
    return this.value
  }

  equals(other: StoreName): boolean {
    return this.value === other.value
  }
}
