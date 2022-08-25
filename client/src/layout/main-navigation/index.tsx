import { Flex, Box } from '@chakra-ui/react';

import BrandBar from './brand-bar';
import LeftNav from './left-nav';
import RightNav from './right-nav';

const Header = () => (
  <Box as="header">
    <Flex
      px={{ base: 4, md: 8 }}
      py={4}
      gap={16}
      justify="space-between"
      align="center"
      bg="bg-header"
    >
      <LeftNav />
      <RightNav />
    </Flex>
    <BrandBar />
  </Box>
);

export default Header;
