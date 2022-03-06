import type { Theme } from '../../theme';
import type { PostObj, BlogPostPagePathParams } from '../../types';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/styles/useTheme';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import getAllPosts from '../../utils/getAllPosts';
import config from '../../config';
import blogPostsFilter from '../../utils/blogPostsFilter';
import getBlogPostPagesPathParams from '../../utils/getBlogPostPagesPathParams';
import getNumOfPages from '../../utils/getNumOfPages';
import sortStringDates from '../../utils/sortStringDates';
import toNumber from '../../utils/toNumber';
import { getLayout } from '../../components/AppBarLayout';
import { getRouteByAbsPath } from '../../routes';
import { BlogIntro } from '../../components/BlogIntro';

import cardScene from '../../mdx/posts/2021/godot-card-flipping/res/card-scene.png';

const blogRoute = getRouteByAbsPath('/blog');
const blogPostsRoute = getRouteByAbsPath('/blog/posts');

interface PostsListProps {
  numOfPages: number;
  pageIndex: number;
  posts: PostObj[];
}

const PostsList = (props: PostsListProps) => {
  const router = useRouter();
  const theme = useTheme<Theme>();
  const isViewportBelowSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { numOfPages, pageIndex, posts } = props;

  const postEls = posts.map(
    ({ title, coverImage, excerpt, draft, slug }, i) => (
      <article key={title}>
        {coverImage && (
          <Image
            src={`${slug}/${coverImage}`}
            alt="Blog post image"
            width={500}
            height={500}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        )}
        <Link
          href={`/${blogRoute.path}/${blogPostsRoute.path}${slug}`}
          passHref
        >
          <Typography variant="h5" component="a">
            {title}
          </Typography>
        </Link>
        {draft && (
          <Typography variant="body2" style={{ color: 'red' }}>
            This is still a draft.
          </Typography>
        )}
        {excerpt && <Typography variant="body1">{excerpt}</Typography>}
      </article>
    ),
  );

  // At pageIndex === 1, previous page is the blog home page (no page number in URL)
  const prevHref =
    pageIndex === 0
      ? null
      : pageIndex === 1
      ? '/blog'
      : `/blog/${pageIndex - 1}`;
  const nextHref = pageIndex + 1 < numOfPages ? `/blog/${pageIndex + 1}` : null;

  return (
    <Grid container spacing={4} pt={2}>
      {pageIndex === 0 && (
        <Grid item xs={12}>
          <BlogIntro />
        </Grid>
      )}
      {postEls.map((postEl, i) => (
        <Grid item xs={12} md={6} key={i}>
          {postEl}
        </Grid>
      ))}
      <Grid item container pb={4}>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent={isViewportBelowSm ? 'center' : 'flex-start'}
          >
            {prevHref && (
              <Button
                variant="outlined"
                startIcon={<ChevronLeftIcon />}
                onClick={() => router.push(prevHref)}
                sx={{
                  mr: 2,
                }}
              >
                {`newer${isViewportBelowSm ? '' : ' posts'}`}
              </Button>
            )}
            {nextHref && (
              <Button
                variant="outlined"
                endIcon={<ChevronRightIcon />}
                onClick={() => router.push(nextHref)}
              >
                {`older${isViewportBelowSm ? '' : ' posts'}`}
              </Button>
            )}
            {isViewportBelowSm || numOfPages <= 1 ? null : (
              <Box
                sx={{
                  flexGrow: 1,
                  alignSelf: 'center',
                  textAlign: 'right',
                  pr: 2,
                }}
              >
                <Typography>{`Page ${
                  pageIndex + 1
                } of ${numOfPages}`}</Typography>
              </Box>
            )}
          </Box>
        </Grid>
        {isViewportBelowSm && numOfPages > 1 ? (
          <Grid item xs={12} pt={2}>
            <Typography textAlign="center">{`Page ${
              pageIndex + 1
            } of ${numOfPages}`}</Typography>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
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
    'coverImage',
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

PostsList.getLayout = getLayout;

export default PostsList;
