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
    case "add": {
      const { id } = action.item.product;
      // Find item's index to check if it's already in the basket
      let idx = state.findIndex((v) => v.product.id === id);
      // if the item is in the basket. Just add the new amount to the previuos one
      if (idx !== -1) {
        let newBasket = state.map((p, i) => {
          if (i === idx) {
            return {
              ...p,
              amount: p.amount + action.item.amount,
            };
          }
          return { ...p };
        });
        return [...newBasket];
      }
      // Else just add new item to the basket with its amount
      return [...state, { ...action.item }];
    }
    case "remove": {
      const { id } = action;
      // Found the index of the item to remove
      let foundItemIdx = state.findIndex((v) => v.product.id === id);
      let newBasket;

      // Check if there is only one item by its amount and remove it from the basket
      if (state[foundItemIdx].amount === 1) {
        newBasket = [...state];
        newBasket.splice(foundItemIdx, 1);
        return [...newBasket];
      }

      // Else just subtract 1 of the item's amount
      newBasket = state.map((item, idx) => {
        if (foundItemIdx === idx) {
          return {
            ...item,
            amount: item.amount - 1,
          };
        }
        return { ...item };
      });

      return [...newBasket];
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
            <Route path="/success" component={Success} />
            <Route path="/cancel" component={Cancel} />
          </Switch>
        </BasketContext.Provider>
      </Router>
    </div>
  );
}

export default App;

const Success = () => (
  <section
    style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <h1>Congratulations, You did it!</h1>
  </section>
);

const Cancel = () => (
  <section
    style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <h1>Maybe next time!</h1>
  </section>
);
