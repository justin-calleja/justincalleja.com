import { useContext } from 'react';
import { ColorModeContext } from '../components/ThemeProvider';

export const useColorMode = () => {
  return useContext(ColorModeContext);
};

export default useColorMode;
