import type { MouseEventHandler } from 'react';
import type { SxProps } from '@mui/system';
import type { Theme } from '../theme';

import useTheme from '@mui/styles/useTheme';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';

export type ToggleColorModeBtnProps = {
  sx?: SxProps<Theme>;
  onClick?: MouseEventHandler<Element>;
};

export const ToggleColorModeBtn = ({
  onClick,
  sx,
}: ToggleColorModeBtnProps) => {
  const theme = useTheme<Theme>();
  return (
    <IconButton sx={sx} onClick={onClick} color="inherit">
      {theme.palette.mode === 'dark' ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
};

export default ToggleColorModeBtn;
