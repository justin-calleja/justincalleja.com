import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { getAllPosts, getPost } from '../../../api';
import { joinSplitSlug, slugToFilePath, splitSlug } from '../../../utils/slug';

const components = {
  CurrentYear: () => {
    return <span>{new Date().getFullYear()}</span>;
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
  const mdxSource = await serialize(post.content);
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

export default Post;
