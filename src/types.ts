export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export type BasketItem = { product: Product; amount: number };

export type Actions =
  | { type: "add"; item: BasketItem }
  | { type: "remove"; id: number };

export type State = BasketItem[];

export interface BasketProps {
  basket: State;
  dispatch: React.Dispatch<Actions>;
}
