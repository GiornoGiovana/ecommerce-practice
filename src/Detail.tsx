import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useBasket } from "./BasketContext";
import { Product } from "./types";

export const Detail: React.FC<{}> = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [count, setCount] = useState(1);
  const { id } = useParams<any>();

  const history = useHistory();

  const { dispatch } = useBasket();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`).then(async (res) => {
      const data = await res.json();
      setProduct(data);
    });
  }, [id]);

  const addToCart = () => {
    if (product && count === 1) {
      dispatch({ type: "addOne", product });
    } else if (product && count > 1) {
      const products = [];
      for (let i = 0; i < count; i++) products.push(product);
      dispatch({ type: "addMany", products });
    }
  };

  return (
    <Center flexDirection="column" pt="6rem">
      <Heading fontWeight="bold" size="lg" my={5}>
        Product Detail
      </Heading>
      {!product ? (
        <Spinner size="lg" />
      ) : (
        <Box borderRadius="md" borderWidth={1} p={2}>
          <Flex wrap="wrap" justify="center">
            <Image
              my="auto"
              h={250}
              w={220}
              src={product?.image}
              alt={product?.title}
            />

            <Flex direction="column" p={4} maxW={800}>
              <Heading size="lg">{product?.title}</Heading>
              <Text color="gray.400" mt={4}>
                {product?.category}
              </Text>
              <Text my={4}>{product?.description}</Text>
              <Text fontWeight="semibold">${product?.price}</Text>
            </Flex>

            <Flex p={4} direction="column" justifyContent="space-evenly">
              <NumberInput
                value={count}
                onChange={(val) => setCount(parseInt(val))}
                defaultValue={1}
                min={1}
                max={5}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button colorScheme="teal" onClick={addToCart}>
                Add to Cart
              </Button>
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={() => history.push("/cart")}
              >
                View Cart
              </Button>
            </Flex>
          </Flex>
        </Box>
      )}
    </Center>
  );
};
