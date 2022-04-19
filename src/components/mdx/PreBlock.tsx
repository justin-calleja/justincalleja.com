import { Box } from '@mui/material';
import HighlightSyntax from './HighlightSyntax';

import type { ReactNode } from 'react';
import type { PrismTheme } from 'prism-react-renderer';

export interface PreBlockProps {
  children: ReactNode | any;
  theme?: PrismTheme;
}

const PreBlock: React.FunctionComponent<PreBlockProps> = (props) => {
  const { children, theme } = props;

  if (children && children.type && children.type === 'code') {
    const lang = children.props.className
      ? children.props.className.replace('language-', '')
      : 'tsx';

    console.log('in here with lang:', lang);

    return (
      <HighlightSyntax
        code={children.props.children}
        language={lang}
        theme={theme && theme}
      />
    );
  }
  return (
    <Box component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
      {children}
    </Box>
  );
};

export default PreBlock;
