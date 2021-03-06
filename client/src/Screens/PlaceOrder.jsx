import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { CheckoutSteps } from '../Components/CheckoutSteps';
import { OrderSummary } from '../Components/Order/OrderSummary';
import { CartItem } from '../Components/CartItem/CartItem';
import { createOrder } from '../Actions/orderAction';

export const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { address, city, zipCode, country } = cart.shippingAddress;
  const { loading, success, order, error } = useSelector(
    state => state.orderCreate
  );

  const { cartItems } = cart;
  if (!cart.shippingAddress.address) {
    navigate('/shipping');
  } else if (!cart.paymentMethod) {
    navigate('/payment');
  }

  //   Calculate prices
  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(
    cart.itemsPrice > 100 || cartItems.length === 0 ? 0 : 100
  );
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  //   Place Order
  const placeOrderHandler = () => {
    let order = {
      orderItems: cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      taxPrice: cart.taxPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice,
    };
    dispatch(createOrder(order));
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
    //eslint-disable-next-line
  }, [navigate, success]);
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Box
        maxW={{ base: '3xl', lg: '7xl' }}
        mx="auto"
        px={{ base: '4', md: '8', lg: '12' }}
        py={{ base: '6', md: '8', lg: '12' }}
      >
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          align={{ lg: 'flex-start' }}
          spacing={{ base: '8', md: '16' }}
        >
          <Stack spacing={{ base: '8', md: '10' }} flex="2">
            <Heading fontSize="2xl" fontWeight="bold">
              SHOPPING CART
            </Heading>
            <Stack spacing="2" borderBottom={'1px solid gray'} pb={5}>
              <Heading
                fontSize="xl"
                fontWeight="bold"
                color={mode('gray.700', 'white')}
              >
                SHIPPING
              </Heading>
              <Text
                color={mode('gray.500', 'gray.400')}
                fontSize="16px"
              >{`${address}, ${city}(${zipCode}), ${country}`}</Text>
            </Stack>
            <Stack spacing="2" borderBottom={'1px solid gray'} pb={5}>
              <Heading
                fontSize="xl"
                fontWeight="bold"
                color={mode('gray.700', 'white')}
              >
                PAYMENT METHOD
              </Heading>
              <Text color={mode('gray.500', 'gray.400')} fontSize="16px">
                Payment Method : {cart.paymentMethod}
              </Text>
            </Stack>
            <Stack spacing="6">
              <Heading fontSize="xl" fontWeight="bold">
                ITEMS
              </Heading>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <CartItem key={index} item={item} />
                ))
              ) : (
                <Heading fontSize="xl" fontWeight={'400'}>
                  EMPTY CART
                </Heading>
              )}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            {error ? (
              <Alert status="error">
                <AlertIcon /> {error}
              </Alert>
            ) : (
              ''
            )}
            <OrderSummary
              itemsPrice={cart.itemsPrice}
              shippingPrice={cart.shippingPrice}
              taxPrice={cart.taxPrice}
              total={cart.totalPrice}
              totalItems={cartItems.length}
              placeOrderHandler={placeOrderHandler}
            />
            <HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <Link to="/">
                <Text
                  color={mode('blue.500', 'blue.200')}
                  textDecoration={'underline'}
                >
                  {' '}
                  Continue shopping{' '}
                </Text>
              </Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
    </>
  );
};
