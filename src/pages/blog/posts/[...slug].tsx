import Paper from '@mui/material/Paper';
import Box from '@mui/system/Box';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { getLayout } from '../../../components/AppBarLayout';
import getAllPosts from '../../../utils/getAllPosts';
import getPost from '../../../utils/getPost';
import { joinSplitSlug, slugToFilePath, splitSlug } from '../../../utils/slug';

const components = {
  CurrentYear: () => {
    return <span>{new Date().getFullYear()}</span>;
  },
  Image: ({ slug, path, alt }: any) => {
    return (
      <Paper
        variant="outlined"
        sx={{ display: 'flex', justifyContent: 'center', p: 2 }}
      >
        <Box
          component="img"
          sx={{
            width: '100%',
            height: 'auto',
          }}
          alt={alt}
          src={`/posts${slug}${path}`}
        />
      </Paper>
    );
  },
};

interface PostProps {
  post: {
    title: string;
    content: string;
    dateCreated: string;
  };
}

const Post = (props: PostProps) => {
  const {
    post: { title, content, dateCreated },
  } = props;

  return (
    <div>
      <div>
        Title is:<span style={{ marginLeft: '4px' }}>{title}</span>
      </div>
      <div>
        Created on:<span style={{ marginLeft: '4px' }}>{dateCreated}</span>
      </div>
      {/* @ts-ignore */}
      <MDXRemote {...content} components={components} />
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
    props: { post },
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
