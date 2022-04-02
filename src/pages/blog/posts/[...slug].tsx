import type { Theme } from '../../../theme';

import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/styles/useTheme';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/system/Box';
// import { MDXRemote } from 'next-mdx-remote';
// import { serialize } from 'next-mdx-remote/serialize';
import { getLayout } from '../../../components/Layout';
import getAllPosts from '../../../utils/getAllPosts';
import getPost from '../../../utils/getPost';
import { joinSplitSlug, slugToFilePath, splitSlug } from '../../../utils/slug';
import getMdComponents from '../../../utils/getMdComponents';
import MuiMarkdown from '../../../mui-markdown/src/MuiMarkdown';

interface PostProps {
  post: {
    title: string;
    content: string;
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
  // const isViewportBelowSm = useMediaQuery(theme.breakpoints.down('sm'));
  const components = getMdComponents();

  return (
    <div>
      <Box pb={isViewportBelowMd ? 2 : 4}>
        <Typography variant="smallerH1" component="h1">
          {title}
        </Typography>
        <div>
          Created on:<span style={{ marginLeft: '4px' }}>{dateCreated}</span>
        </div>
      </Box>
      {/* <MDXRemote {...content} components={components} /> */}
      <MuiMarkdown
        overrides={{
          ...components,
          Image: (props) => <components.Image {...props} slug={slug} />,
        }}
      >
        {content}
      </MuiMarkdown>
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
  // const mdxSource = await serialize(post.content, { scope: { slug } });
  // post.content = mdxSource;

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
