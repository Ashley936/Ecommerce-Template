import { Container, Flex } from '@chakra-ui/react';
import { OrderHistory } from '../Components/Profile/OrderHistory';
import { Details } from '../Components/Profile/Details';

const UserProfile = () => {
  return (
    <Container maxW={'container.xl'} p={0}>
      <Flex
        h={{ base: 'auto', md: '100vh' }}
        py={[0, 10, 20]}
        direction={{ base: 'column-reverse', md: 'row' }}
      >
        <Details />
        <OrderHistory />
      </Flex>
    </Container>
  );
};
export default UserProfile;
