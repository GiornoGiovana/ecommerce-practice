import { Box, Button, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { Product } from "./types";

interface ProductProps {
  product: Product;
}

export const ProductDetail: React.FC<ProductProps> = ({ product }) => {
  const history = useHistory();

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image h={300} w="100%" src={product.image} alt={product.title} />

      <Box p={6}>
        <Box mt="1" fontWeight="bold" lineHeight="tight" isTruncated>
          {product.title}
        </Box>

        <Box py={2} color="gray.500">
          <Text noOfLines={3}>{product.description}</Text>
        </Box>

        <Flex fontWeight="semibold" alignItems="center">
          <Text>${product.price}</Text>
          <Spacer />
          <Button
            onClick={() => history.push(`/detail/${product.id}`)}
            colorScheme="teal"
            color="white"
          >
            View
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
