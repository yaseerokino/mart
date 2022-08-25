import { Flex, IconButton, Icon, Button, Text } from '@chakra-ui/react';
import { BiCube, BiChevronDown, BiCategory } from 'react-icons/bi';

const LeftNav = () => (
  <Flex align="center" gap={8}>
    <Flex align="center" gap={2}>
      <Icon as={BiCube} w={5} h={5} />
      <Text fontWeight="bold">MART</Text>
      <Text opacity={0.4}>|</Text>
      <Button
        display={{ base: 'none', md: 'unset' }}
        textTransform="uppercase"
        variant="link"
        fontSize="xs"
        size="sm"
        rightIcon={<BiChevronDown />}
      >
        categories
      </Button>
      <IconButton
        display={{ base: 'unset', md: 'none' }}
        aria-label="bag"
        icon={<BiCategory />}
        variant="ghost"
        fontSize="md"
      />
    </Flex>
  </Flex>
);

export default LeftNav;
