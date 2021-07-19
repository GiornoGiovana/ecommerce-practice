import React from "react";
import { Center, Grid } from "@chakra-ui/react";
import { Product } from "./types";
import { ProductDetail } from "./ProductDetail";

interface ProductsFeedProps {
  products: Product[];
}

export const ProductsFeed: React.FC<ProductsFeedProps> = ({ products }) => {
  return (
    <Center pt="8rem" pb={8} px="5rem">
      <Grid gap={8} templateColumns="repeat(auto-fit, minmax(15rem, 1fr))">
        {products.map((product) => (
          <ProductDetail key={product.id} product={product} />
        ))}
      </Grid>
    </Center>
  );
};
