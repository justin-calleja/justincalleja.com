import type { TypographyProps } from '@mui/material';

import Typography from '@mui/material/Typography';
import BlogPostImage from '../components/BlogPostImage';

export const getMdComponents = () => {
  return {
    CurrentYear: () => {
      return <span>{new Date().getFullYear()}</span>;
    },
    Image: BlogPostImage,
    h2: {
      component: Typography,
      props: {
        variant: 'h2',
        component: 'h2',
        gutterBottom: true,
        fontWeight: '500',
      } as TypographyProps,
    },
    h3: {
      component: Typography,
      props: {
        variant: 'h3',
        component: 'h3',
        gutterBottom: true,
        fontWeight: '500',
      } as TypographyProps,
    },
    h4: {
      component: Typography,
      props: {
        variant: 'h4',
        component: 'h4',
        gutterBottom: true,
        fontWeight: '500',
      } as TypographyProps,
    },
    h5: {
      component: Typography,
      props: {
        variant: 'h5',
        component: 'h5',
        gutterBottom: true,
        fontWeight: '500',
      } as TypographyProps,
    },
    h6: {
      component: Typography,
      props: {
        variant: 'h6',
        component: 'h6',
        gutterBottom: true,
        fontWeight: '500',
      } as TypographyProps,
    },
  };
};

export default getMdComponents;
