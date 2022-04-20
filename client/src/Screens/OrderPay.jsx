import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Heading,
  HStack,
  VStack,
  Image,
  Stack,
  Text,
  Spinner,
  useColorModeValue as mode,
  Link,
} from '@chakra-ui/react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { OrderSummary } from '../Components/Order/OrderSummary';
import { getOrderDetails, payOrder } from '../Actions/orderAction';
import axios from 'axios';
import { ORDER_PAY_RESET } from '../Constants/orderContants';

const orderItem = (item, index) => {
  const { name, image, qty, price } = item;
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align="center"
      py={'2'}
      borderBottom={'1px solid gray'}
      key={index}
    >
      <Stack direction="row" spacing="5" width="full">
        <Image
          rounded="xs"
          width="60px"
          height="60px"
          fit="cover"
          src={image}
          alt={name}
          draggable="false"
          loading="lazy"
        />
        <Box pt="4">
          <Stack spacing="0.5">
            <Text fontWeight="medium">{name}</Text>
            <Text color={'gray.600'} fontSize="sm">
              Lorem, ipsum dolor sit amet consectetur
            </Text>
          </Stack>
        </Box>
      </Stack>
      {/* Desktop */}
      <Flex
        width="full"
        alignSelf={'stretch'}
        justify="space-evenly"
        py={4}
        display={'flex'}
      >
        <VStack spacing={5}>
          <Heading size="sm">Quantity</Heading>
          <Text>{qty}</Text>
        </VStack>
        <VStack spacing={5}>
          <Heading size="sm">Total Price</Heading>
          <Text>
            {qty} &#215; ${price} = ${qty * price}
          </Text>
        </VStack>
      </Flex>
    </Flex>
  );
};

export const OrderPay = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order, loading, error } = useSelector(state => state.orderDetails);
  const { userInfo } = useSelector(state => state.userLogin);
  const { loading: loadingPay, success: successPay } = useSelector(
    state => state.orderPay
  );
  const color = mode('gray.700', 'white');
  const textColor = mode('gray.600', 'gray.400');
  const successHandler = paymentResult => {
    console.log(paymentResult);
    dispatch(payOrder(order._id, paymentResult));
  };
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(
        'http://localhost:5000/api/config/paypal'
      );
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?currency=USD&client-id=${clientId}`;
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
      console.log('added');
    };

    if (!order || successPay || order._id !== id) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        console.log('add');
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [id, dispatch, order, loading, navigate, userInfo, successPay]);
  console.log(sdkReady);
  return loading || !order._id ? (
    <Flex w="full" justify={'center'} minH={'80vh'} align={'center'}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  ) : error ? (
    <Alert status="error">
      <AlertIcon />
      {error.message}
    </Alert>
  ) : (
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
            ORDER {order._id}
          </Heading>
          <Stack spacing="2" borderBottom={'1px solid gray'} pb={5}>
            <Heading fontSize="xl" fontWeight="bold" color={color}>
              SHIPPING
            </Heading>
            <Text color={textColor} fontSize="16px">
              Name: {order.user.name}
            </Text>
            <Text color={textColor} fontSize="16px">
              Email:{' '}
              <Link
                href={`mailto:${order.user.email}`}
                textDecoration={'underline'}
              >
                {order.user.email}
              </Link>
            </Text>
            <Text color={textColor} fontSize="16px">
              Address:{' '}
              {`${order.shippingAddress.address}, ${order.shippingAddress.city}(${order.shippingAddress.zipCode}), ${order.shippingAddress.country}`}
            </Text>
            {order.isDelivered ? (
              <Alert status="success">
                <AlertIcon />
                Order is delivered
              </Alert>
            ) : (
              <Alert status="error">
                <AlertIcon />
                Order is not delivered
              </Alert>
            )}
          </Stack>
          <Stack spacing="2" borderBottom={'1px solid gray'} pb={5}>
            <Heading fontSize="xl" fontWeight="bold" color={color}>
              PAYMENT METHOD
            </Heading>
            <Text color={textColor} fontSize="16px">
              Method : {order.paymentMethod}
            </Text>
            {order.isPaid ? (
              <Alert status="success">
                <AlertIcon />
                Payment done
              </Alert>
            ) : (
              <Alert status="error">
                <AlertIcon />
                Not paid
              </Alert>
            )}
          </Stack>
          <Stack spacing="6">
            <Heading fontSize="xl" fontWeight="bold">
              ITEMS
            </Heading>
            {order.orderItems.length > 0 ? (
              order.orderItems.map((item, index) => orderItem(item, index))
            ) : (
              <Heading fontSize="xl" fontWeight={'400'}>
                EMPTY CART
              </Heading>
            )}
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          <OrderSummary
            itemsPrice={order.itemsPrice}
            shippingPrice={order.shippingPrice}
            taxPrice={order.taxPrice}
            total={order.totalPrice}
            totalItems={order.orderItems.length}
            placeOrderHandler={() => {}}
            orderConfirm={true}
          />
          {loadingPay ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            ''
          )}
          {!order.isPaid ? (
            !sdkReady ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            ) : (
              <Box my={4}>
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={successHandler}
                  currency="USD"
                />
              </Box>
            )
          ) : (
            ''
          )}
        </Flex>
      </Stack>
    </Box>
  );
};
