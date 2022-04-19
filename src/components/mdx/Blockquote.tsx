import { Paper, useTheme } from '@mui/material';
import hexToRgb from 'utils/hexToRgb';

import type { FunctionComponent } from 'react';

export interface BlockquoteProps {
  borderColor?: string;
}

const Blockquote: FunctionComponent<BlockquoteProps> = (props) => {
  const { children, borderColor } = props;
  const {
    palette: { background, secondary },
  } = useTheme();

  const bgColor = hexToRgb(background.paper);
  const backgroundColor = bgColor
    ? `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, 0.5)`
    : background.paper;

  return (
    <Paper
      sx={{
        padding: '1rem',
        backgroundColor,
        borderLeft: `4px solid ${borderColor ? borderColor : secondary.main}`,
      }}
    >
      {children}
    </Paper>
  );
};

export default Blockquote;
