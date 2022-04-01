import Paper from '@mui/material/Paper';
import Box from '@mui/system/Box';

export interface ImageProps {
  linkHref?: string;
  imgSrc: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  maxWidth?: string | number;
  target?: string;
}

export const Image = ({
  linkHref,
  imgSrc,
  alt,
  width = '100%',
  height = 'auto',
  maxWidth = 590,
  target,
}: ImageProps) => {
  return (
    <Paper
      variant="outlined"
      sx={{ display: 'flex', justifyContent: 'center', p: 2 }}
    >
      <a href={linkHref || imgSrc} target={target} rel="noreferrer noopener">
        <Box
          component="img"
          sx={{ width, maxWidth, height }}
          alt={alt}
          src={imgSrc}
        />
      </a>
    </Paper>
  );
};

export default Image;
