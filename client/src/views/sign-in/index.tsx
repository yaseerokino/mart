import {
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  Flex,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import SignInForm from './signin-form';

const SignIn = () => (
  <Stack spacing="8">
    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
      <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
        Log in to your account
      </Heading>
      <HStack spacing="1" justify="center">
        <Text color="muted">Don&apos;t have an account?</Text>
        <Button as={Link} variant="link" colorScheme="purple" to="/sign-up">
          Sign up
        </Button>
      </HStack>
    </Stack>
    <Flex align="center">
      <SignInForm />
    </Flex>
  </Stack>
);

export default SignIn;
