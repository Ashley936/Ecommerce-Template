import {
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  VStack,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  getUserDetails,
  logout,
  updateUserProfile,
} from '../../Actions/userAction';

export const Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const userDetails = useSelector(state => state.userDetails);
  const { success } = useSelector(state => state.userUpdateProfile);
  const { user, loading: detailsLoading, error: detailsError } = userDetails;
  const { error, userInfo, loading } = userLogin;
  const toast = useToast();
  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async data => {
    let newPassword =
      data.password === data['confirm-password'] ? data.password : null;
    let updatedUser = {
      name: data.name,
      email: data.email,
      password: newPassword,
    };
    if (!newPassword && data.password) {
      toast({
        title: 'Update Failed',
        description: 'Confirm new password',
        status: 'error',
        duration: 2000,
      });
    } else {
      await dispatch(updateUserProfile(updatedUser));
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else if ((!user || !user.name) && !detailsError) {
      dispatch(getUserDetails('profile'));
    } else if (detailsError === 'Token expired') {
      dispatch(logout());
    }
    reset(user);
  }, [navigate, reset, dispatch, user, detailsError, userInfo]);

  return (
    <VStack
      w="full"
      h="full"
      p={10}
      spacing={10}
      alignItems="flex-start"
      borderRight={{ md: '2px solid black' }}
    >
      {success ? (
        <Alert status="success">
          <AlertIcon />
          Profile successfully updated
        </Alert>
      ) : (
        ''
      )}
      <Heading size="2xl">Your Details</Heading>
      <VStack m="10px 0">
        {Object.keys(errors).map(error => (
          <Alert status="error" key={error} m={0}>
            <AlertIcon />
            {errors[error].message}
          </Alert>
        ))}
      </VStack>
      <form onSubmit={handleSubmit(onSubmit)} style={{ alignSelf: 'stretch' }}>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w={'full'}>
          <GridItem colSpan={[2, 1, 1, 1]}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="John Smith"
                {...register('name', {
                  required: 'Please enter First Name',
                })}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={[2, 1, 1, 1]}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type={'email'}
                placeholder="example@ex.com"
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
          </GridItem>
          <GridItem colSpan={[2, 1, 1, 1]}>
            <FormControl>
              <FormLabel>New Password</FormLabel>
              <Input
                placeholder="new password"
                {...register('password', {
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
            </FormControl>
          </GridItem>
          <GridItem colSpan={[2, 1, 1, 1]}>
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                placeholder="confirm password"
                {...register('confirm-password', {
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
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                placeholder="23rd Lane, Bolsville, NZ(170056)"
                {...register('address', {})}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <Button w="full" type="submit">
              Edit User
            </Button>
          </GridItem>
        </SimpleGrid>
      </form>
    </VStack>
  );
};
