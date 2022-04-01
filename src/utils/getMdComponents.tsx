import type { TypographyProps } from '@mui/material';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/system/Box';

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
    Image: ({ slug, path, alt }: any) => {
      return (
        <Paper
          variant="outlined"
          sx={{ display: 'flex', justifyContent: 'center', p: 2 }}
        >
          <a
            href={`/posts${slug}${path}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Box
              component="img"
              sx={{
                width: '100%',
                maxWidth: 590,
                height: 'auto',
              }}
              alt={alt}
              src={`/posts${slug}${path}`}
            />
          </a>
        </Paper>
      );
    },
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
