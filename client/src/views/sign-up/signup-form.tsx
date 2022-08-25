import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Container,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ErrorBox from '../../components/error-box';
import PasswordField from '../../components/password-field';
import { ICreateUser } from '../../interfaces';
import { AppDispatch } from '../../store';
import { createUser } from '../../store/user/user-action';

const SignUpForm: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const { loading } = useSelector((state: any) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUser>({ mode: 'onBlur' });
  const navigate = useNavigate();
  const toast = useToast();
  const handleRegistration = async (data: ICreateUser) => {
    dispatch(createUser(data)).then((res: any) => {
      console.log('some res', res);
      if (res.payload.success) {
        toast({
          title: res.payload.message || 'Something went wrong',
          status: 'success',
          isClosable: true,
        });
        navigate('/login');
      } else {
        setErrorMsg(res.payload.error || res.payload.message);
      }
    });
  };
  return (
    <Container maxW="lg" p={0}>
      <Box
        bg="bg-surface"
        borderRadius={{ base: 'md' }}
        p={8}
        as="form"
        onSubmit={handleSubmit(handleRegistration)}
      >
        <Stack spacing="6">
          {errorMsg && <ErrorBox error={errorMsg} />}
          <Stack spacing="5">
            <Flex gap={4}>
              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  id="firstName"
                  type="text"
                  {...register('firstName', {
                    required: 'First name is required',
                  })}
                  onChange={() => setErrorMsg(null)}
                />
                <FormErrorMessage>
                  {errors.firstName && (errors.firstName.message as any)}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  id="lastName"
                  type="text"
                  {...register('lastName', {
                    required: 'Last name is required',
                  })}
                  onChange={() => setErrorMsg(null)}
                />
                <FormErrorMessage>
                  {errors.lastName && (errors.lastName.message as any)}
                </FormErrorMessage>
              </FormControl>
            </Flex>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                {...register('email', { required: 'Email is required' })}
                onChange={() => setErrorMsg(null)}
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
                onChange={() => setErrorMsg(null)}
              />
              <FormErrorMessage>
                {errors.password && (errors.password.message as any)}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="passwordConfirmation">
                Password Confirmation
              </FormLabel>
              <Input
                id="passwordConfirmation"
                type="password"
                {...register('passwordConfirmation', {
                  required: 'Kindly confirm your password',
                })}
                onChange={() => setErrorMsg(null)}
              />
              <FormErrorMessage>
                {errors.passwordConfirmation &&
                  (errors.passwordConfirmation.message as any)}
              </FormErrorMessage>
            </FormControl>
          </Stack>

          <Stack spacing="6">
            <Button type="submit" variant="primary" isLoading={loading}>
              Sign up
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default SignUpForm;
