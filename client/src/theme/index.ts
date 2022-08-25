import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

// import 'focus-visible/dist/focus-visible';
import * as components from './components';
import * as foundations from './foundations';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme: Record<string, any> = extendTheme({
  ...foundations,
  components: { ...components },
  colors: { ...baseTheme.colors, brand: baseTheme.colors.purple },
  space: {
    '4.5': '1.125rem',
  },
  config,
});

export default theme;
