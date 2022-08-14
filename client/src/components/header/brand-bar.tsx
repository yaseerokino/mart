import { Icon, Flex } from '@chakra-ui/react';
import {
  SiNike,
  SiApple,
  SiAdidas,
  SiHp,
  SiNokia,
  SiHuawei,
  SiUnderarmour,
  SiUnilever,
} from 'react-icons/si';

const brand = [
  SiNike,
  SiAdidas,
  SiHp,
  SiApple,
  SiHuawei,
  SiUnderarmour,
  SiNokia,
  SiUnilever,
];

const BrandBar = () => (
  <Flex
    p={4}
    bg="purple.500"
    gap={{ base: 0, md: 8, lg: 16 }}
    align="center"
    justify={{ base: 'space-between', md: 'center' }}
  >
    {brand.map((item) => (
      <Icon as={item} fontSize={16} color="bg-header" />
    ))}
  </Flex>
);

export default BrandBar;
