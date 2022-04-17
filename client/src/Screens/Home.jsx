import React, { useEffect } from 'react';
import {
  Container,
  Wrap,
  Box,
  Stack,
  Skeleton,
  SkeletonText,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import ProductCard from '../Components/Product/ProductCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../Actions/productAction';
import ProductLoader from '../Components/Loader/ProductLoader';

const Home = () => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Container maxW={'9xl'}>
      {loading ? (
        <Stack maxW="8xl" mx="auto">
          <ProductLoader />
          <ProductLoader />
          <ProductLoader />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>{error}</AlertTitle>
          <AlertDescription>Please Try refreshing the Browser</AlertDescription>
        </Alert>
      ) : (
        <Wrap
          align={'center'}
          justify="center"
          maxW={'9xl'}
          spacing="30px"
          m="30px 0"
        >
          {products?.map((item, key) => (
            <Box m="30px" key={key}>
              <Link to={`/product/${item._id}`}>
                <ProductCard item={item} />
              </Link>
            </Box>
          ))}
        </Wrap>
      )}
    </Container>
  );
};

export default Home;
