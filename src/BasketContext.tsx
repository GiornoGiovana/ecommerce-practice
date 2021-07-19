import { useContext } from "react";
import { createContext } from "react";
import { BasketProps } from "./types";

export const BasketContext = createContext({} as BasketProps);

export const useBasket = () => useContext(BasketContext);
