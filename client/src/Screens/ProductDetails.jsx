import {
  Button,
  Select,
  FormControl,
  Container,
  Heading,
  HStack,
  Image,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '../Components/Product/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../Actions/productAction';
import { useNavigate, generatePath } from 'react-router-dom';

const isAdmin = true;
const useNavigateParams = () => {
  const navigate = useNavigate();

  return (url, params) => {
    const path = generatePath(':url?:queryString', {
      url,
      queryString: params,
    });
    navigate(path);
  };
};

const ProductDetails = () => {
  const [qty, setQty] = useState(1);
  const navigate = useNavigateParams();

  const { id } = useParams();

  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(state => state.productDetail);

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}`, `qty=${qty}`);
  };

  return (
    <form action="submit">
      <Container
        py="3rem"
        display="flex"
        flexDirection={'row-reverse'}
        justifyContent="space-between"
        maxW="8xl"
      >
        <Button>Go Back</Button>
        <HStack>
          <Image src={product.image} alt={product.name} />
          <VStack alignItems="start" mx="1rem">
            <Heading>{product.name}</Heading>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <Text fontSize="xl"> Price - {product.price}</Text>
            <HStack spacing="1rem">
              <Tag>{product.brand}</Tag>
              <Tag>{product.isNew && 'new'}</Tag>
            </HStack>
            <Text border="1px solid" rounded={'md'} p="2">
              {product.countInStock > 0 ? (
                <>
                  <span>Qty</span>
                  {isAdmin ? (
                    <FormControl as="span" value={qty}>
                      <Select
                        placeholder={1}
                        onChange={e => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map(index => (
                          <option key={index} value={index + 2}>
                            {index + 2}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <Tag>{product.countInStock}</Tag>
                  )}
                </>
              ) : (
                'Out of stock'
              )}
            </Text>
            <Text>{product.description}</Text>
            <Button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </Button>
          </VStack>
        </HStack>
      </Container>
    </form>
  );
};

export default ProductDetails;
