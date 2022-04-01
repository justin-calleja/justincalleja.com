import Image from './Image';

export interface BlogPostImageProps {
  slug: string;
  path: string;
  alt: string;
}

export const BlogPostImage = ({ slug, path, alt }: BlogPostImageProps) => {
  return <Image imgSrc={`/posts${slug}${path}`} alt={alt} />;
};

export default BlogPostImage;
