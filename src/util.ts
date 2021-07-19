import { Product } from "./types";

export const getTotal = (basket: Product[]) => {
  return basket.reduce((total, product) => total + product.price, 0);
};

export const getNumberOfProduct = (basket: Product[], productId: number) => {
  return basket.reduce(
    (total, product) => total + (product.id === productId ? 1 : 0),
    0
  );
};

export const formattedBasket = (basket: Product[]) => {
  const myObj: any = {}; // {id: true}
  const newArr: Product[] = [];
  basket.forEach((product) => {
    if (!myObj[product.id]) {
      myObj[product.id] = true;
      newArr.push(product);
    }
  });
  return newArr;
};
