import { Center, Flex, Heading, Button, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useBasket } from "./BasketContext";
import { Product } from "./types";

interface CheckProductProps {
  product: Product;
  amount: number;
}

export const CheckProduct: React.FC<CheckProductProps> = ({
  product,
  amount,
}) => {
  const { dispatch } = useBasket();

  const addToBasket = (product: Product) => {
    const item = { product, amount: 1 };
    dispatch({ type: "add", item });
  };

  const removeFromBasket = (productId: number) => {
    dispatch({ type: "remove", id: productId });
  };

  return (
    <Center
      borderBottomWidth={1}
      py={4}
      alignItems="center"
      justifyContent="space-between"
      gridGap={4}
    >
      <Image h={110} w={100} src={product.image} alt={product.title} />
      <Flex
        wrap="wrap"
        align="center"
        gridGap={2}
        flex={1}
        justify="space-between"
      >
        <Heading
          fontWeight="semibold"
          fontSize="md"
          wordBreak="break-word"
          maxW={380}
          flex={1}
        >
          {product.title}
        </Heading>

        <Text>${product.price}</Text>
        <Text>Qty: {amount}</Text>
        <Flex h={110} direction="column" justify="space-evenly">
          <Button colorScheme="teal" onClick={() => addToBasket(product)}>
            Add To Basket
          </Button>
          <Button
            colorScheme="red"
            onClick={() => removeFromBasket(product.id)}
          >
            Remove From Basket
          </Button>
        </Flex>
      </Flex>
    </Center>
  );
};
