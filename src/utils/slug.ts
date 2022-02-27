import { join } from 'path';
import postsDirectory from './postsDirectory';

const indexMdx = '/index.mdx';

export function splitSlug(slug = '') {
  return slug.split('/').filter((str) => str !== '');
}

export function joinSplitSlug(splitSlug: string[] = []) {
  return `/${splitSlug.join('/')}`;
}

export function filePathToSlug(filePath: string, postsDir = postsDirectory) {
  return filePath.substring(postsDir.length, filePath.length - indexMdx.length);
}

export function slugToFilePath(slug: string, postsDir = postsDirectory) {
  return join(postsDir, slug, indexMdx);
}
