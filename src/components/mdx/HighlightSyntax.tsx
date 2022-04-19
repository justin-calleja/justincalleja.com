import * as React from 'react';
import { Box, BoxProps, styled } from '@mui/material';
import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
} from 'prism-react-renderer';

interface HighlightSyntaxProps {
  code?: string;
  language?: Language;
  theme?: PrismTheme;
}

const PreContainer = styled(Box, { name: 'PreContainer' })<BoxProps>(
  ({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    padding: '1rem',
    fontSize: '1.4rem',
  }),
);

const Pre = styled('pre')<React.HTMLAttributes<HTMLPreElement>>({
  overflowX: 'auto',
});

const HighlightSyntax: React.FunctionComponent<HighlightSyntaxProps> = (
  props,
) => {
  const { code = '', language = 'tsx', theme } = props;

  return (
    <Highlight {...defaultProps} theme={theme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <PreContainer className={className} style={style}>
          <Pre>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Pre>
        </PreContainer>
      )}
    </Highlight>
  );
};

export default HighlightSyntax;
