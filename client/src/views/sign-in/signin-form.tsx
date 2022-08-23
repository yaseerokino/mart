import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  Input,
  Stack,
  Container,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ErrorBox from '../../components/error-box';
import PasswordField from '../../components/password-field';
import { ICreateUserSession } from '../../interfaces';
import { AppDispatch } from '../../store';
import { createUserSession } from '../../store/user/user-action';

const SignInForm: React.FC = () => {
  const { loading, error } = useSelector((state: any) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUserSession>({ mode: 'onBlur' });
  const navigate = useNavigate();
  const toast = useToast();
  const handleLogin = async (data: ICreateUserSession) => {
    dispatch(createUserSession(data)).then((res: any) => {
      console.log(res);
      if (res.payload.success) {
        toast({
          title: res.payload.message || 'Something went wrong',
          status: 'success',
          isClosable: true,
        });
        navigate('/dashboard');
      }
    });
  };
  return (
    <Container maxW="lg" p={0}>
      <Box
        as="form"
        bg="bg-surface"
        borderRadius={{ base: 'md' }}
        p={8}
        onSubmit={handleSubmit(handleLogin)}
      >
        <Stack spacing="6">
          {error && <ErrorBox error={error} />}
          <Stack spacing="5">
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                {...register('email', { required: 'Email is required' })}
              />
              <FormErrorMessage>
                {errors.email && (errors.email.message as any)}{' '}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <PasswordField
                {...register('password', {
                  required: 'Password is required',
                })}
              />
              <FormErrorMessage>
                {errors.password && (errors.password.message as any)}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <HStack justify="space-between">
            <Checkbox defaultChecked>Remember me</Checkbox>
            <Button variant="link" colorScheme="purple" size="sm">
              Forgot password?
            </Button>
          </HStack>
          <Stack spacing="6">
            <Button type="submit" variant="primary" isLoading={loading}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default SignInForm;
