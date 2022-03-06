import type { PostObj } from '../types';

import readMdFileSync from './readMdFileSync';

// e.g. reads `filePath` (mdx file) and returns frontmatter data based on supplied
// `fields`. `"content"` in `fields` means the mdx file ocntent (i.e. not frontmatter):
// const post = getPost(['title', 'dateCreated', 'content', 'draft'], filePath);
export function getPost(fields: string[] = [], filePath: string): PostObj {
  const { content, data } = readMdFileSync(filePath);

  const post = fields.reduce<{ [key: string]: any }>((acc, field) => {
    if (typeof data[field] !== 'undefined') {
      acc[field] = data[field];
    }
    return acc;
  }, {});

  if (fields.includes('content')) {
    post.content = content;
  }

  return post;
}

export default getPost;
