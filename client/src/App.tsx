import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/header';
import SignIn from './views/sign-in';
import SignUp from './views/sign-up';

const App = () => (
  <>
    <Header />
    <Box mt={16}>
      <Routes>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </Box>
  </>
);

export default App;
