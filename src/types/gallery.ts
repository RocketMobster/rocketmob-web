
export type GalleryMediaType = "image" | "video";

export interface GalleryImage {
  title: string;
  type: GalleryMediaType;
  imageUrl?: string; // For images
  videoUrl?: string; // For videos
  thumbnailUrl?: string; // For video poster/preview
  category: string;
  tags: string[];
  description: string;
  artist: string;
  date: string; // ISO string
}
