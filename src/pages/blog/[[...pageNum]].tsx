import type { Theme } from '../../theme';
import type { PostObj, BlogPostPagePathParams } from '../../types';

import Link from 'next/link';
// import Image from '../../components/Image';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/styles/useTheme';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
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
import { getLayout } from '../../components/Layout';
import { getRouteByAbsPath } from '../../routes';
import { BlogIntro } from '../../components/BlogIntro';

const blogRoute = getRouteByAbsPath('/blog');
const blogPostsRoute = getRouteByAbsPath('/blog/posts');

// // Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
// const keyStr =
//   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

// const triplet = (e1, e2, e3) =>
//   keyStr.charAt(e1 >> 2) +
//   keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
//   keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
//   keyStr.charAt(e3 & 63);

// const rgbDataURL = (r, g, b) =>
//   `data:image/gif;base64,R0lGODlhAQABAPAA${
//     triplet(0, r, g) + triplet(b, 255, 255)
//   }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

interface PostsListProps {
  numOfPages: number;
  pageIndex: number;
  posts: PostObj[];
}

const PostsList = ({ numOfPages, pageIndex, posts }: PostsListProps) => {
  const router = useRouter();
  const theme = useTheme<Theme>();
  const isViewportBelowSm = useMediaQuery(theme.breakpoints.down('sm'));

  const postEls = posts.map(({ title, coverImage, excerpt, draft, slug }) => {
    return (
      <Link
        key={title}
        href={`/${blogRoute.path}/${blogPostsRoute.path}${slug}`}
        passHref
      >
        <ButtonBase
          component="div"
          sx={{
            width: '100%',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          <article>
            <Box display="flex" justifyContent="center" component="article">
              <Image
                src={
                  coverImage
                    ? `/posts${slug}/${coverImage}`
                    : '/images/react.png'
                }
                alt="Cover image"
                // placeholder="blur"
                // blurDataURL={rgbDataURL(237, 181, 6)}
                width={340}
                height={180}
              />
            </Box>

            {/* <Image
                imgSrc={
                  coverImage
                    ? `/posts${slug}/${coverImage}`
                    : '/images/react.png'
                }
                linkHref={`/public/posts/${slug}`}
                alt="Cover image"
                width={340}
                height={180}
              /> */}
            <Typography
              variant="h3"
              pt={2}
              pb={1}
              fontWeight={500}
              textAlign="center"
            >
              {title}
            </Typography>
            {draft && (
              <Typography variant="body1" style={{ color: 'red' }}>
                This is still a draft.
              </Typography>
            )}
            {excerpt && (
              <Typography variant="body1" textAlign="center">
                {excerpt}
              </Typography>
            )}
          </article>
        </ButtonBase>
      </Link>
    );
  });

  // At pageIndex === 1, previous page is the blog home page (no page number in URL)
  const prevHref =
    pageIndex === 0
      ? null
      : pageIndex === 1
      ? '/blog'
      : `/blog/${pageIndex - 1}`;
  const nextHref = pageIndex + 1 < numOfPages ? `/blog/${pageIndex + 1}` : null;

  const buttonVariant = 'body1';

  return (
    <Grid container spacing={4} pt={2}>
      {pageIndex === 0 && (
        <Grid item xs={12}>
          <BlogIntro />
        </Grid>
      )}
      {postEls.map((postEl, i) => (
        <Grid item sm={12} md={12} lg={6} key={i} sx={{ width: '100%' }}>
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
                <Typography variant={buttonVariant}>
                  {`newer${isViewportBelowSm ? '' : ' posts'}`}
                </Typography>
              </Button>
            )}
            {nextHref && (
              <Button
                variant="outlined"
                endIcon={<ChevronRightIcon />}
                onClick={() => router.push(nextHref)}
              >
                <Typography variant={buttonVariant}>
                  {`older${isViewportBelowSm ? '' : ' posts'}`}
                </Typography>
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
            <Typography variant="body1" textAlign="center">{`Page ${
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
