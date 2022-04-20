import {
  Heading,
  VStack,
  TableContainer,
  useColorModeValue,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Tfoot,
  Button,
  Spinner,
  AlertIcon,
  Alert,
  Box,
  Flex,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { listMyOrders } from '../../Actions/orderAction';

export const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, orders } = useSelector(state => state.orderMyList);

  const bgColor = useColorModeValue('gray.50', 'whiteAlpha.50');

  useEffect(() => {
    if (!orders) {
      dispatch(listMyOrders());
    }
  }, [orders, dispatch]);
  return (
    <VStack w="full" h="full" p={5} alignItems="flex-start" bg={bgColor}>
      <VStack alignItems="flex-start" spacing={5}>
        <Heading size="2xl">ORDER HISTORY</Heading>
        <TableContainer>
          <Table colorScheme="blue" size={'sm'} maxW={'300px'}>
            <Thead fontSize={['12px', '14px', '16px', '18px']}>
              <Tr>
                <Th>ID</Th>
                <Th>DATE</Th>
                <Th>TOTAL</Th>
                <Th>PAID</Th>
                <Th>DELIVERED</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody fontSize={['10px', '12px']} py={2}>
              {orders ? (
                orders.map((order, index) => (
                  <Tr key={index}>
                    <Td>{order._id}</Td>
                    <Td>{order.createdAt.split('T')[0]}</Td>
                    <Td>{order.totalPrice}</Td>
                    <Td>
                      {order.paidAt ? order.paidAt.split('T')[0] : 'NOT PAID'}
                    </Td>
                    <Td>{order.deliveredAt || 'NOT DELIVERED'}</Td>
                    <Td>
                      <Link to={`/order/${order._id}`}>
                        <Button>Details</Button>
                      </Link>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td>Loading...</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
        {!orders && error ? (
          <Alert status="error">
            <AlertIcon />
            {error.message}
          </Alert>
        ) : !orders ? (
          <Flex w={'full'} justify={'center'}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Flex>
        ) : (
          ''
        )}
      </VStack>
    </VStack>
  );
};
