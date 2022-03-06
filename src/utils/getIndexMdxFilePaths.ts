import getFilePaths from './getFilePaths';
import postsDirectory from './postsDirectory';

export function getIndexMdxFilePaths(postsDir = postsDirectory): string[] {
  return getFilePaths(postsDir, ['.mdx']).filter((path) =>
    path.endsWith('index.mdx'),
  );
}

export default getIndexMdxFilePaths;
