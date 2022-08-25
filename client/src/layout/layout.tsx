import { Box } from '@chakra-ui/react';
import { useOutlet } from 'react-router-dom';

import Header from './main-navigation';

const Layout = () => {
  const outlet = useOutlet();
  return (
    <>
      <Header />

      <Box mt={16}>{outlet}</Box>
    </>
  );
};

export default Layout;
