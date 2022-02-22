import React from "react";
import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useBasket } from "./BasketContext";
import { getTotal } from "./util";
import { CheckProduct } from "./CheckProduct";

export const Checkout: React.FC<{}> = () => {
  const { basket } = useBasket();

  const handleSubmit = async () => {
    const apiUrl =
      "https://stripe-basic-v1.herokuapp.com/create-checkout-session";
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(basket),
    };
    try {
      const response = await fetch(apiUrl, init);
      const { url } = await response.json();
      window.location.replace(url);
    } catch (error) {
      console.error(error);
    }
  };

  if (basket.length === 0)
    return (
      <Center mt="6rem">
        <Heading as="h1">Basket is Empty</Heading>
      </Center>
    );

  return (
    <Box mt="6rem">
      <Heading mx="auto" w="fit-content" as="h1" my={8} color="teal.300">
        Checkout
      </Heading>

      <Box mx="auto" maxW={1050}>
        <Flex
          justify="space-evenly"
          wrap="wrap"
          borderWidth={1}
          borderRadius="md"
          p={4}
        >
          <Box maxW={800}>
            {basket.map(({ product, amount }) => (
              <CheckProduct
                key={product.id}
                product={product}
                amount={amount}
              />
            ))}
          </Box>

          <Box>
            <Heading size="lg">Total:</Heading>
            <Text my={4} fontWeight="bold">
              ${getTotal(basket).toFixed(2)}
            </Text>
            <Button colorScheme="green" onClick={handleSubmit}>
              Pay out
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
