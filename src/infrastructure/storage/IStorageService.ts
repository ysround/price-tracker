export interface IStorageService {
  upload(file: File): Promise<string> // Returns URL
  delete(url: string): Promise<void>
}
