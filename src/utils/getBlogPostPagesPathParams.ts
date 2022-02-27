import type { BlogPostPagePathParams } from '../types';

export function getBlogPostPagesPathParams({
  numOfBlogPosts,
  maxPostsOnBlogHomePage,
  maxPostsPerPage,
}: {
  numOfBlogPosts: number;
  maxPostsOnBlogHomePage: number;
  maxPostsPerPage: number;
}): BlogPostPagePathParams[] {
  const result: BlogPostPagePathParams[] = [{ params: { pageNum: [] } }];
  let postsLeft = numOfBlogPosts - maxPostsOnBlogHomePage;

  if (postsLeft <= 0) return result;

  let pageNum = 0;

  do {
    pageNum++;
    postsLeft -= maxPostsPerPage;
    result.push({ params: { pageNum: [pageNum.toString()] } });
  } while (postsLeft > 0);

  return result;
}

export default getBlogPostPagesPathParams;
