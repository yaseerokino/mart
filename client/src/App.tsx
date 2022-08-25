import { Box, Button } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import userAPI from './api/user-api';
import AdminLayout from './layout/admin-layout';
import Layout from './layout/layout';
import AdminCategories from './views/admin/categories';
import CreateCategory from './views/admin/categories/create-category';
import UpdateCategory from './views/admin/categories/update-category';
import SignIn from './views/sign-in';
import SignUp from './views/sign-up';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
    </Route>
    <Route path="/admin" element={<AdminLayout />}>
      <Route path="categories" element={<AdminCategories />}>
        <Route path="create" element={<CreateCategory />} />
        <Route path="update" element={<UpdateCategory />} />
      </Route>
    </Route>
  </Routes>
);

export default App;
