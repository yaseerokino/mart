import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';
import { BiShoppingBag, BiHeart, BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const AccountMenu = () => (
  <Menu>
    <MenuButton
      as={IconButton}
      aria-label="bag"
      icon={<BiUser />}
      variant="ghost"
      fontSize="md"
    />
    <MenuList fontSize="sm" border="none" bg="white" boxShadow="none">
      <MenuItem as={Link} to="/sign-in">
        Sign in
      </MenuItem>
      <MenuItem as={Link} to="/sign-up">
        Create account
      </MenuItem>
    </MenuList>
  </Menu>
);

const RightNav = () => (
  <Flex gap={{ base: 2, md: 4 }}>
    <IconButton
      aria-label="bag"
      icon={<BiHeart />}
      variant="ghost"
      fontSize="md"
      display={{ base: 'none', md: 'unset' }}
    />
    <IconButton
      aria-label="bag"
      icon={<BiShoppingBag />}
      variant="ghost"
      fontSize="md"
    />
    <AccountMenu />
  </Flex>
);

export default RightNav;
