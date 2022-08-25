import {
  Flex,
  Box,
  Heading,
  Button,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { BiCube, BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const AccountMenu = () => (
  <Menu>
    <MenuButton
      as={IconButton}
      aria-label="bag"
      icon={<BiUser />}
      fontSize="md"
    />
    <MenuList fontSize="sm" border="none" bg="white" boxShadow="none">
      <MenuItem>Logout</MenuItem>
    </MenuList>
  </Menu>
);
const AdminTopNav = () => (
  <Box as="header">
    <Flex
      px={{ base: 4, md: 8 }}
      py={4}
      gap={16}
      justify="space-between"
      align="center"
      bg="white"
    >
      <Box flex="1">
        <Button leftIcon={<BiCube />}>Back to Mart</Button>
      </Box>

      <Flex flex="1" justifyContent="end" width="full">
        <AccountMenu />
      </Flex>
    </Flex>
  </Box>
);

export default AdminTopNav;
