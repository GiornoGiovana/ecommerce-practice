export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export type Actions =
  | { type: "addOne"; product: Product }
  | { type: "addMany"; products: Product[] }
  | { type: "remove"; id: number };

export type State = Product[];

export interface BasketProps {
  basket: State;
  dispatch: React.Dispatch<Actions>;
}
