import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  HStack,
  Select,
  Tag,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../Actions/cartAction';
import { CartItem } from '../Components/CartItem/CartItem';

const Cart = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const qty = search ? Number(search.split('=')[1]) : 1;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = id => {
    navigate('/login?redirect=shipping');
  };

  return (
    <Container maxW="8xl" p={[3, 3, 9, 9]}>
      <Heading mx="auto">Shoping Cart</Heading>
      {cartItems.length === 0 ? (
        <Text>Your card is empty</Text>
      ) : (
        cartItems.map((item, key) => <CartItem key={item.id} item={item} />)
      )}
      <HStack w="20rem" justify={'space-between'} my={7}>
        <Text>
          Total <Tag>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</Tag>
        </Text>
        <Text>
          Subtotal{' '}
          <Tag>
            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
          </Tag>
        </Text>
        <Button isDisabled={cartItems.length === 0} onClick={checkoutHandler}>
          Proceed to checkout
        </Button>
      </HStack>
    </Container>
  );
};

export default Cart;
