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

export const OrderPay = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    orderItems,
    shippingAddress,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
  } = useSelector(state => state.orderCreate.order);
  const { address, city, country, zipCode } = shippingAddress;

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
                Payment Method : {paymentMethod}
              </Text>
            </Stack>
            <Stack spacing="6">
              <Heading fontSize="xl" fontWeight="bold">
                ITEMS
              </Heading>
              {orderItems.length > 0 ? (
                orderItems.map((item, index) => (
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
            <OrderSummary
              itemsPrice={itemsPrice}
              shippingPrice={shippingPrice}
              taxPrice={taxPrice}
              total={totalPrice}
              totalItems={orderItems.length}
              placeOrderHandler={() => {}}
              orderConfirm={true}
            />
          </Flex>
        </Stack>
      </Box>
    </>
  );
};
