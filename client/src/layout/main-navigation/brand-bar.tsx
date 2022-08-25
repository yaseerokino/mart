import { Icon, Flex } from '@chakra-ui/react';
import { IconType } from 'react-icons';
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

interface IHeaderBrands {
  name: string;
  icon: IconType;
}

const brand = [
  { name: 'nike', icon: SiNike },
  { name: 'adidas', icon: SiAdidas },
  { name: 'hp', icon: SiHp },
  { name: 'apple', icon: SiApple },
  { name: 'huawei', icon: SiHuawei },
  { name: 'under armour', icon: SiUnderarmour },
  { name: 'nokia', icon: SiNokia },
  { name: 'unilever', icon: SiUnilever },
];

const BrandBar = () => (
  <Flex
    p={4}
    bg="purple.500"
    gap={{ base: 0, md: 8, lg: 16 }}
    align="center"
    justify={{ base: 'space-between', md: 'center' }}
  >
    {brand.map((item: IHeaderBrands) => (
      <Icon key={item.name} as={item.icon} fontSize={16} color="bg-header" />
    ))}
  </Flex>
);

export default BrandBar;
