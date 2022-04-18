import {
  CloseButton,
  Flex,
  Link,
  Select,
  Stack,
  Box,
  Image,
  Text,
  useColorModeValue,
  Heading,
  VStack,
} from '@chakra-ui/react';
import * as React from 'react';
import { PriceTag } from '../Order/PriceTag';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../Actions/cartAction';

const QuantitySelect = props => {
  return (
    <VStack spacing={5}>
      <Heading size={'sm'}>Quantity</Heading>
      <Select
        maxW="64px"
        aria-label="Select quantity"
        focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
        {...props}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </Select>
    </VStack>
  );
};

export const CartItem = ({ item }) => {
  const { name, image, price, qty, countInStock } = item;
  const dispatch = useDispatch();
  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align="center"
      py={'4'}
      borderBottom={'1px solid gray'}
    >
      <Stack direction="row" spacing="5" width="full">
        <Image
          rounded="lg"
          width="120px"
          height="120px"
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
        justify="space-between"
        display={{ base: 'none', md: 'flex' }}
      >
        <QuantitySelect
          value={qty}
          onChange={e =>
            dispatch(addToCart(item.product, Number(e.target.value)))
          }
        />
        <VStack spacing={5}>
          <Heading size="sm">Price</Heading>
          <PriceTag price={price} currency={'USD'} />
        </VStack>
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={() => removeFromCartHandler(item.product)}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: 'flex', md: 'none' }}
      >
        <Link
          fontSize="sm"
          textDecor="underline"
          onClick={() => removeFromCartHandler(item.product)}
        >
          Delete
        </Link>
        <QuantitySelect
          value={qty}
          onChange={e =>
            dispatch(addToCart(item.product, Number(e.target.value)))
          }
        />
        <PriceTag price={price} currency={'USD'} />
      </Flex>
    </Flex>
  );
};
