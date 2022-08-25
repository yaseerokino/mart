import {
  MenuList,
  MenuItem,
  Menu,
  MenuButton,
  Button,
  MenuDivider,
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const adminLinks = [
  {
    name: 'categories',
    path: '/admin/categories',
  },
  {
    name: 'Sub-Categories',
    path: '/admin/sub-categories',
  },
  {
    name: 'products',
    path: '/admin/products',
  },
  {
    name: 'brands',
    path: '/admin/brands',
  },
];
const AdminSideNav = () => (
  <Menu defaultIsOpen matchWidth gutter={16}>
    <MenuButton
      colorScheme="purple"
      rightIcon={<BiChevronDown />}
      width="full"
      as={Button}
      textAlign="left"
      fontWeight="bold"
      py={8}
    >
      MART ADMIN
    </MenuButton>

    <MenuList border="none" bg="white" boxShadow="none" borderRadius="md">
      {adminLinks.map(({ name, path }) => (
        <MenuItem
          key={name}
          as={Link}
          to={path}
          py={4}
          textTransform="capitalize"
        >
          {name}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);

export default AdminSideNav;
