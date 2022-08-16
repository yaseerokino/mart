import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Container,
} from '@chakra-ui/react';

import PasswordField from '../../components/password-field';

const SignInForm = () => (
  <Container maxW="lg" p={0}>
    <Box bg="bg-surface" borderRadius={{ base: 'md' }} p={8}>
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" />
          </FormControl>
          <PasswordField />
        </Stack>
        <HStack justify="space-between">
          <Checkbox defaultChecked>Remember me</Checkbox>
          <Button variant="link" colorScheme="purple" size="sm">
            Forgot password?
          </Button>
        </HStack>
        <Stack spacing="6">
          <Button variant="primary">Sign in</Button>
        </Stack>
      </Stack>
    </Box>
  </Container>
);

export default SignInForm;
