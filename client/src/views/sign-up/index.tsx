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

import SignUpForm from './signup-form';

export interface CreateUserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUp: React.FC = () => (
  <Stack spacing="8">
    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
      <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
        Create an account
      </Heading>
      <HStack spacing="1" justify="center">
        <Text color="muted">Already have an account?</Text>
        <Button as={Link} variant="link" colorScheme="purple" to="/sign-in">
          Sign in
        </Button>
      </HStack>
    </Stack>
    <Flex align="center">
      <SignUpForm />
    </Flex>
  </Stack>
);

export default SignUp;
