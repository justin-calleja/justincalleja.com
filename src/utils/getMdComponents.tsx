import BlogPostImage from '../components/BlogPostImage';

export const getMdComponents = ({
  isViewportBelowSm = false,
  isViewportBelowMd = false,
}: {
  isViewportBelowSm?: boolean;
  isViewportBelowMd?: boolean;
}) => {
  return {
    CurrentYear: () => {
      return <span>{new Date().getFullYear()}</span>;
    },
    Image: BlogPostImage,
    //     h2: {
    //       component: Typography,
    //       props: {
    //         variant: isViewportBelowSm ? 'h4' : isViewportBelowMd ? 'h3' : 'h2',
    //         component: 'h2',
    //         gutterBottom: true,
    //       } as TypographyProps,
    //     },
    //     h3: {
    //       component: Typography,
    //       props: {
    //         variant: isViewportBelowSm ? 'h5' : isViewportBelowMd ? 'h4' : 'h3',
    //         component: 'h3',
    //         gutterBottom: true,
    //       } as TypographyProps,
    //     },
    //     h4: {
    //       component: Typography,
    //       props: {
    //         variant: isViewportBelowSm ? 'h6' : isViewportBelowMd ? 'h5' : 'h4',
    //         component: 'h4',
    //         gutterBottom: true,
    //       } as TypographyProps,
    //     },
    //     h5: {
    //       component: Typography,
    //       props: {
    //         variant: isViewportBelowMd ? 'h6' : 'h5',
    //         component: 'h5',
    //         gutterBottom: true,
    //       } as TypographyProps,
    //     },
    //     h6: {
    //       component: Typography,
    //       props: {
    //         variant: 'h6',
    //         component: 'h6',
    //         gutterBottom: true,
    //       } as TypographyProps,
    //     },
  };
};

export default getMdComponents;
