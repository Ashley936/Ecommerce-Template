import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import * as React from 'react';
import { FaArrowRight } from 'react-icons/fa';
const OrderSummaryItem = props => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">$ {value}</Text> : children}
    </Flex>
  );
};

export const OrderSummary = ({
  itemsPrice,
  shippingPrice,
  taxPrice,
  total,
  totalItems,
  placeOrderHandler,
  orderConfirm,
}) => {
  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">ORDER SUMMARY</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Total Price" value={itemsPrice} />
        <OrderSummaryItem
          label="Shipping"
          value={shippingPrice}
        ></OrderSummaryItem>
        <OrderSummaryItem label="Tax" value={taxPrice}></OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            ${total}
          </Text>
        </Flex>
      </Stack>
      {!orderConfirm ? (
        <Button
          bg={'gray.600'}
          color={'white'}
          _hover={{ bg: 'gray.700' }}
          size="lg"
          fontSize="md"
          rightIcon={<FaArrowRight />}
          isDisabled={!totalItems}
          onClick={placeOrderHandler}
        >
          Checkout
        </Button>
      ) : (
        ''
      )}
    </Stack>
  );
};
