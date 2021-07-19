import React from "react";
import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useBasket } from "./BasketContext";
import { formattedBasket, getTotal } from "./util";
import { CheckProduct } from "./CheckProduct";

export const Checkout: React.FC<{}> = () => {
  const { basket } = useBasket();

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
            {formattedBasket(basket).map((product) => (
              <CheckProduct product={product} />
            ))}
          </Box>

          <Box>
            <Heading size="lg">Total:</Heading>
            <Text my={4} fontWeight="bold">
              ${getTotal(basket).toFixed(2)}
            </Text>
            <Button colorScheme="green">Pay out</Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
