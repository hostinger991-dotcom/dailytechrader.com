/**
 * Utility to reliably resolve image URLs across development, Vite bundler, and production environments.
 */

// Dynamically import all images from src/assets/images via Vite's glob import
const localAssetImages = import.meta.glob<string>('/src/assets/images/*.jpg', {
  eager: true,
  import: 'default'
});

export function resolveImageUrl(rawPath: string): string {
  if (!rawPath) return '';

  // Extract the filename (e.g. best_flagship_deals_1792653575769.jpg)
  const filename = rawPath.split('/').pop() || '';

  // 1. Check if Vite bundled asset is available
  const globKey = `/src/assets/images/${filename}`;
  if (localAssetImages[globKey]) {
    return localAssetImages[globKey];
  }

  // 2. Fall back to standard public static folder path: /images/filename.jpg
  return `/images/${filename}`;
}
