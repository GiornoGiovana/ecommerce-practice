import { BasketItem } from "./types";

export const getTotal = (basket: BasketItem[]) => {
  return basket.reduce(
    (total, product) => (total += product.product.price * product.amount),
    0
  );
};

export const getNumberOfProduct = (basket: BasketItem[]) => {
  return basket.reduce((total, product) => (total += product.amount), 0);
};

// export const formattedBasket = (basket: Product[]) => {
//   const myObj: any = {}; // {id: true}
//   const newArr: Product[] = [];
//   basket.forEach((product) => {
//     if (!myObj[product.id]) {
//       myObj[product.id] = true;
//       newArr.push(product);
//     }
//   });
//   return newArr;
// };
