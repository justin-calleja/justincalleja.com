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
    <Box display="flex" justifyContent="center">
      <a href={linkHref || imgSrc} target={target} rel="noreferrer noopener">
        <Box
          component="img"
          sx={{ width, maxWidth, height }}
          alt={alt}
          src={imgSrc}
        />
      </a>
    </Box>
  );
};

export default Image;
