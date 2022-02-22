import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useBasket } from "./BasketContext";
import { getNumberOfProduct } from "./util";

export const Header: React.FC<{}> = () => {
  const { basket } = useBasket();

  return (
    <Box
      py={5}
      bgColor="teal.400"
      position="fixed"
      top={0}
      w="100%"
      zIndex={999}
    >
      <Flex maxW={900} mx="auto" alignItems="center">
        <Box>
          <Heading color="white" size="lg">
            <Link to="/">Super Shop</Link>
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <Text fontWeight="semibold" fontSize="lg">
            <Link to="/cart">Cart: {getNumberOfProduct(basket)}</Link>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
