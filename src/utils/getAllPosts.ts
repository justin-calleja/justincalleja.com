import type { PostObj } from '../types';

import getIndexMdxFilePaths from './getIndexMdxFilePaths';
import getPost from './getPost';
import postsDirectory from './postsDirectory';
import { filePathToSlug } from './slug';

/**
 * Reads all the index.mdx files under the given `postsDir` directory,
 * and for each such file found, returns an Object with that file's meta data
 * (frontmatter), and content.
 *
 * At a bare minimum, each Object will have a `slug` property.
 * The file system path from given `postsDir` up to, but not including, index.mdx will be
 * used as the slug.
 *
 * e.g. <path-to-project>/src/mdx/posts/2021/some-post/index.mdx
 * will get a slug property of '/2021/some-post'.
 *
 * Any meta-data matching entries in the given fields (optional: string[]) will
 * be picked up and returned in the given Object corresponding to each post.
 *
 * NOTE: including 'content' in `fields` param returns each post's content.
 *
 * Returns and array of Objects.
 */
export function getAllPosts(
  fields: string[] = [],
  postsDir: string = postsDirectory,
): PostObj[] {
  const mdxFilePaths = getIndexMdxFilePaths(postsDir);

  return mdxFilePaths.map((filePath) => {
    const post = getPost(fields, filePath);
    post.slug = filePathToSlug(filePath, postsDir);
    return post;
  });
}

export default getAllPosts;
