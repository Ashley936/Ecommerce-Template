import {
  Box,
  Center,
  Button,
  useToast,
  Text,
  Heading,
  FormControl,
  Alert,
  AlertIcon,
  AlertTitle,
  FormErrorMessage,
  VStack,
  Container,
  Tooltip,
  Input,
  InputGroup,
  Spinner,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register as userRegister } from '../Actions/userAction';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const newUser = useSelector(state => state.userRegister);
  const savedUser = localStorage.getItem('userInfo');
  const { loading, error, userInfo } = newUser;
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (savedUser) {
      console.log(redirect);
      navigate(redirect);
    }
  }, [navigate, redirect, savedUser]);
  const onSubmit = ({ name, email, password }) => {
    dispatch(userRegister(name, email, password));
  };

  return (
    <Container
      w="fit-content"
      py="4rem"
      minH={{ base: '80vh', lg: '82vh' }}
      display="flex"
      alignItems={'center'}
      justify="center"
    >
      <VStack
        my="auto"
        spacing={{ base: '1.2rem', md: '2rem' }}
        mx={{ base: '0.5rem', md: '2rem' }}
      >
        <Heading
          textAlign={'center'}
          alignItems={'center'}
          fontSize={{ base: '2xl', md: '4xl' }}
          mx="auto"
          w="fit-content"
          maxW={{ base: '15rem', md: '20rem' }}
        >
          Get Started with your account
        </Heading>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {loading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
        {errors.password && (
          <Alert status="error" m="10px 0px">
            {' '}
            <AlertIcon /> {errors.password.message}
          </Alert>
        )}
        {errors.email && (
          <Alert status="error" m="10px 0px">
            {' '}
            <AlertIcon /> {errors.email.message}
          </Alert>
        )}
        {errors.name && (
          <Alert status="error" m="10px 0px">
            {' '}
            <AlertIcon /> {errors.name.message}
          </Alert>
        )}

        <VStack w="full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl w="full" isRequired mb="1rem" isInvalid={errors.name}>
              <Input
                fontSize="xl"
                variant="custom"
                borderBottom={'1px solid gray'}
                type={'text'}
                px="0.5rem"
                h={{ base: '3rem', md: '3.6rem' }}
                size={{ base: 'sm', md: 'lg' }}
                placeholder="Full Name"
                {...register('name', {
                  required: 'Please enter Name',
                  minLength: { value: 4, message: 'Too Short' },
                })}
              />
            </FormControl>
            <FormControl w="full" isRequired isInvalid={errors.email}>
              <Input
                fontSize="xl"
                variant="custom"
                borderBottom={'1px solid gray'}
                type={'text'}
                px="0.5rem"
                h={{ base: '3rem', md: '3.6rem' }}
                size={{ base: 'sm', md: 'lg' }}
                placeholder="Email"
                _placeholder={{ color: 'gray.400' }}
                {...register('email', {
                  required: 'Please enter registered email',
                  pattern: {
                    value:
                      /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Enter a valid email',
                  },
                })}
              />
            </FormControl>
            <FormControl
              pt={'1rem'}
              w={{ base: 'full', md: '20rem' }}
              isRequired
              isInvalid={errors.password}
            >
              <Tooltip
                hasArrow
                w={{ base: '16rem', md: '16rem' }}
                label="Minimum 4 Characters, including Upper / lowercase and numbers"
                arrowSize={8}
                placement="top"
                closeOnClick={false}
                color="black"
                fontWeight={'200'}
                bg="gray.200"
              >
                <InputGroup>
                  <Input
                    fontSize="xl"
                    variant="custom"
                    borderBottom={'1px solid gray'}
                    px="0.5rem"
                    h={{ base: '3rem', md: '3.6rem' }}
                    size={{ base: 'sm', md: 'lg' }}
                    placeholder="Password"
                    _placeholder={{ color: 'gray.400' }}
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Please enter Password',
                      minLength: {
                        value: 4,
                        message: 'Minimum 4 Characters in password',
                      },
                      /* pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                        message: 'Use a strong password',
                      }, */
                    })}
                  />
                </InputGroup>
              </Tooltip>
            </FormControl>
            <Box
              cursor="pointer"
              flex={'1'}
              alignItems={'center'}
              justifyContent={'center'}
              h={{ base: '6', md: 'full' }}
              mt={{ base: '2', md: '4' }}
              mr="2"
              size={{ sm: 'md', md: 'lg' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Text>Hide</Text> : <Text>Show</Text>}
            </Box>
            <Link to="/login">
              <Text
                fontSize={'12px'}
                color={'blue.400'}
                _hover={{ color: 'blue.600', textDecoration: 'underline' }}
              >
                Already registered? Log in
              </Text>
            </Link>
            <Button
              my="2rem"
              width="fit-content"
              mx="auto"
              alignSelf={'center'}
              type="submit"
              _hover={{
                color: 'white',
                bgColor: 'black',
              }}
            >
              Register
            </Button>
          </form>
        </VStack>
      </VStack>
    </Container>
  );
};
export { Signup };
