/* eslint-disable no-underscore-dangle */
import { Flex, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useOutlet } from 'react-router-dom';

import userAPI from '../api/user-api';
import AdminSideNav from './admin-navigation/admin-side-nav';
import AdminTopNav from './admin-navigation/admin-top-nav';
import Redirect from './redirect';

const AdminLayout = () => {
  const { user, session } = useSelector((state: any) => state.user);
  const [isAdmin, setIsAdmin] = useState(false);
  const outlet = useOutlet();
  useEffect(() => {
    if (user._id && session.accessToken) {
      userAPI
        .currentAdmin()
        .then(() => {
          setIsAdmin(true);
        })
        .catch(() => {
          setIsAdmin(false);
        });
    }
  }, [user]);

  return isAdmin ? (
    <>
      <AdminTopNav />
      <Flex
        py={16}
        px={8}
        direction={{ base: 'column', md: 'row' }}
        gap={4}
        height="full"
      >
        <Box width={{ base: 'full', md: '30%', lg: '20%' }}>
          <AdminSideNav />
        </Box>

        <Flex flex={1}>{outlet}</Flex>
      </Flex>
    </>
  ) : (
    <Redirect />
  );
};

export default AdminLayout;
