import { IStorageService } from './IStorageService'

export class CloudinaryStorage implements IStorageService {
  private readonly cloudName: string
  private readonly uploadPreset: string

  constructor() {
    this.cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''
    this.uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''

    if (!this.cloudName || !this.uploadPreset) {
      throw new Error('Cloudinary configuration is missing')
    }
  }

  async upload(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', this.uploadPreset)

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const data = await response.json()
      return data.secure_url
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to upload image: ${error.message}`)
      }
      throw new Error('Failed to upload image')
    }
  }

  async delete(url: string): Promise<void> {
    // Cloudinary delete requires authentication (signed request)
    // For now, we'll just log a warning
    // In production, you would need a backend endpoint to handle deletion
    console.warn('Cloudinary delete not implemented (requires backend endpoint)')
  }
}
