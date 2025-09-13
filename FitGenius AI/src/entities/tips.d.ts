/**
 * Collection ID: tips
 * Interface for Tips
 */
export interface Tips {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  problemAddressed?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType image */
  thumbnailImage?: string;
  /** @wixFieldType text */
  targetAudience?: string;
}
