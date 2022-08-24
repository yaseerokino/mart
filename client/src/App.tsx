import { Box, Button } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import userAPI from './api/user-api';
import Header from './components/header';
import SignIn from './views/sign-in';
import SignUp from './views/sign-up';

const App = () => {
  const handleCurrentUser = (e: any) => {
    e.preventDefault();

    userAPI
      .currentUser()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header />
      <Box mt={16}>
        <Button onClick={handleCurrentUser}>Current user</Button>
        <Routes>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
