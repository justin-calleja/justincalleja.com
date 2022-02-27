import type { PostObj } from '../../types';
import type { BlogPostPagePathParams } from '../../types';

import Link from 'next/link';
import { getAllPosts } from '../../api';
import config from '../../config';
import blogPostsFilter from '../../utils/blogPostsFilter';
import getBlogPostPagesPathParams from '../../utils/getBlogPostPagesPathParams';
import getNumOfPages from '../../utils/getNumOfPages';
import sortStringDates from '../../utils/sortStringDates';
import toNumber from '../../utils/toNumber';

interface PostsListProps {
  numOfPages: number;
  pageIndex: number;
  posts: PostObj[];
}

const PostsList = (props: PostsListProps) => {
  const { numOfPages, pageIndex, posts } = props;

  const postEls = posts.map(({ title, excerpt, content, draft, slug }, i) => (
    <Link key={i} href={`/blog/posts${slug}`}>
      <a className="post-item">
        <h3>{title}</h3>
        {draft && <p style={{ color: 'red' }}>This is still a draft.</p>}
        <p>{excerpt ? excerpt : `${content.substring(0, 55)}...`}</p>
      </a>
    </Link>
  ));

  const prevHref = pageIndex === 1 ? '/blog' : `/blog/${pageIndex - 1}`;
  const nextHref = pageIndex + 1 < numOfPages ? `/blog/${pageIndex + 1}` : null;

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {postEls}
      <div style={{ marginTop: '16px' }}>
        {pageIndex > 0 && (
          <Link href={prevHref}>
            <a style={{ color: 'blue', textDecoration: 'underline' }}>
              Previous
            </a>
          </Link>
        )}
        <span style={{ margin: '0 16px', fontSize: '1.2rem' }}>
          Page {pageIndex}
        </span>
        {nextHref && (
          <Link href={nextHref}>
            <a style={{ color: 'blue', textDecoration: 'underline' }}>Next</a>
          </Link>
        )}
      </div>
    </div>
  );
};

export async function getStaticProps(context: BlogPostPagePathParams) {
  const {
    params: { pageNum },
  } = context;

  const pageIndex = toNumber(pageNum);
  if (pageIndex < 0) {
    throw new Error('Cannot work with a negative pageIndex.');
  }

  const blogPosts = getAllPosts([
    'dateCreated',
    'draft',
    'archive',
    'excerpt',
    'title',
    // if 'excerpt' is missing, 'content' can be used instead:
    'content',
  ])
    .filter(blogPostsFilter)
    .sort((postA, postB) =>
      sortStringDates(postA.dateCreated, postB.dateCreated),
    );

  const { maxPostsOnBlogHomePage, maxPostsPerPage } = config;
  const numOfPages = getNumOfPages({
    postsOnFirstPage: maxPostsOnBlogHomePage,
    postsPerPage: maxPostsPerPage,
    total: blogPosts.length,
  });

  if (pageIndex === 0) {
    return {
      props: {
        numOfPages,
        pageIndex,
        posts: blogPosts.slice(0, maxPostsOnBlogHomePage),
      },
    };
  }

  const remainingBlogPosts = blogPosts.slice(maxPostsOnBlogHomePage);

  return {
    props: {
      numOfPages,
      pageIndex,
      posts: remainingBlogPosts.slice(
        (pageIndex - 1) * maxPostsPerPage,
        pageIndex * maxPostsPerPage,
      ),
    },
  };
}

export async function getStaticPaths() {
  const blogPosts = getAllPosts(['draft', 'archive']).filter(blogPostsFilter);

  const { maxPostsOnBlogHomePage, maxPostsPerPage } = config;

  return {
    paths: getBlogPostPagesPathParams({
      numOfBlogPosts: blogPosts.length,
      maxPostsOnBlogHomePage,
      maxPostsPerPage,
    }),
    fallback: false,
  };
}

export default PostsList;
