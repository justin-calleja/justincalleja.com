export function getNumOfPages({ total, postsOnFirstPage, postsPerPage }: any) {
  let remainingNumOfPosts = total - postsOnFirstPage;

  return remainingNumOfPosts <= 0
    ? 1
    : Math.ceil(remainingNumOfPosts / postsPerPage) + 1;
}

export default getNumOfPages;
