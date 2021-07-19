import { useState, useEffect, useReducer } from "react";
import { BasketContext } from "./BasketContext";
import { Header } from "./Header";
import { ProductsFeed } from "./ProductsFeed";
import { Actions, Product, State } from "./types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Detail } from "./Detail";
import { Checkout } from "./Checkout";

const BasketReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "addOne":
      return [...state, action.product];
    case "addMany":
      return [...state, ...action.products];
    case "remove": {
      const index = state.findIndex((product) => product.id === action.id);
      let newBasket = [...state];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket`
        );
      }
      return newBasket;
    }
    default:
      return state;
  }
};

function App() {
  const [basket, dispatch] = useReducer(BasketReducer, []);

  const [products, setProducts] = useState<[Product] | []>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=12").then(async (res) => {
      const data = await res.json();
      setProducts(data);
    });
  }, []);

  return (
    <div className="app">
      <Router>
        <BasketContext.Provider value={{ basket, dispatch }}>
          <Header />
          <Switch>
            <Route exact path="/">
              <ProductsFeed products={products} />
            </Route>
            <Route path="/detail/:id" component={Detail} />
            <Route path="/cart" component={Checkout} />
          </Switch>
        </BasketContext.Provider>
      </Router>
    </div>
  );
}

export default App;
