import Paper from '@mui/material/Paper';
import Image from './Image';

export interface BlogPostImageProps {
  slug: string;
  path: string;
  alt: string;
}

export const BlogPostImage = ({ slug, path, alt }: BlogPostImageProps) => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Image imgSrc={`/posts${slug}${path}`} alt={alt} />
    </Paper>
  );
};

export default BlogPostImage;
