import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/styles/useTheme';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { getLayout } from '../../../components/Layout';
import getAllPosts from '../../../utils/getAllPosts';
import getPost from '../../../utils/getPost';
import { joinSplitSlug, slugToFilePath, splitSlug } from '../../../utils/slug';
import BlogPostImage from 'components/BlogPostImage';
import PreBlock from 'components/mdx/PreBlock';
import dracula from 'prism-react-renderer/themes/dracula';
import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight';

import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { Theme } from '../../../theme';
import Blockquote from 'components/mdx/Blockquote';

interface PostProps {
  post: {
    title: string;
    content: MDXRemoteSerializeResult<Record<string, unknown>>;
    dateCreated: string;
  };
  slug: string;
}

const Post = (props: PostProps) => {
  const {
    post: { title, content, dateCreated },
    slug,
  } = props;

  const theme = useTheme<Theme>();
  const isViewportBelowMd = useMediaQuery(theme.breakpoints.down('md'));

  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div>
      <Box pb={isViewportBelowMd ? 2 : 4}>
        <Typography variant="h1" fontWeight={500}>
          {title}
        </Typography>
        <div>
          Created on:
          <span style={{ marginLeft: '4px' }}>
            {dateFormatter.format(new Date(dateCreated))}
          </span>
        </div>
      </Box>
      <MDXRemote
        {...content}
        components={{
          CurrentYear: () => {
            return <span>{new Date().getFullYear()}</span>;
          },
          Image: (props: any) => <BlogPostImage {...props} slug={slug} />,
          InfoBox: (props: any) => {
            return <div {...props} />;
          },
          Blockquote: (props) => {
            return <Blockquote {...props} />;
          },
          blockquote: (props) => {
            return <Blockquote {...props} />;
          },
          pre: (props) => {
            console.log('in pre component with props:', props);

            return (
              // @ts-ignore
              <PreBlock
                theme={theme.palette.mode === 'light' ? nightOwlLight : dracula}
                {...props}
              />
            );
          },
          h2: (props) => {
            // @ts-ignore
            return <Typography variant="h2" fontWeight={500} {...props} />;
          },
          h3: (props) => {
            // @ts-ignore
            return <Typography variant="h3" fontWeight={500} {...props} />;
          },
          h4: (props) => {
            // @ts-ignore
            return <Typography variant="h4" fontWeight={500} {...props} />;
          },
          h5: (props) => {
            // @ts-ignore
            return <Typography variant="h5" fontWeight={500} {...props} />;
          },
          h6: (props) => {
            // @ts-ignore
            return <Typography variant="h6" fontWeight={500} {...props} />;
          },
        }}
      />
    </div>
  );
};

export async function getStaticProps({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = joinSplitSlug(params.slug);
  const filePath = slugToFilePath(slug);

  const post = getPost(['title', 'dateCreated', 'content', 'draft'], filePath);

  // Overwrite the content:
  const mdxSource = await serialize(post.content, { scope: { slug } });
  post.content = mdxSource;

  return {
    props: { post, slug },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => ({
      params: {
        slug: splitSlug(post.slug),
      },
    })),
    fallback: false,
  };
}

Post.getLayout = getLayout;

export default Post;
