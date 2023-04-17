# Redux

#### 1. [Tworzenie magazynu](#tworzenie-magazynu-danych)

#### 2. [Dostarczanie magazynu do aplikacji](#dostarczanie-magazynu-do-aplikacji)

#### 3. [Korzystanie z magazynu](#korzystanie-z-danych)

---

Redux jest alternatywą dla Reactowego kontekstu, czyli dla przechowywania i przetwarzania danych potrzebnym w wielu miejscach w aplikacji, a nie tylko dla jednego komponentu.

Redux jest szybszy od kontekstu, ale wymaga poświęcenia większej ilości czasu żeby go przygotować do uzytku.

## Tworzenie magazynu danych

```js
import { createSlice, configureStore } from "@reduxjs/toolkit";

// Slice jest elementem magazynu, który zajmuje się konkretnym zakresem danych, aby odseparować od siebie dane, które nie są używane razem. W tym przypadku jeden Slice to Counter, a drugi Autektyfikacja użytkownika

const counterInitialState = { counter: 0, showCounter: true };
const counterSlice = createSlice({
  // Nazwa, po której będziemy się dostawać do danego slice'u
  name: "counter",

  // Stan początkowy slice'u
  initialState: counterInitialState,

  // Reduktory dla tego slice'u - czyli funkcje modyfikujące stan, które później zostaną wywołane w odpowienich miejscach, aby ich użyć.
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.payload.amount;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

const authInitialState = { user: null, isAuthenthicated: false };

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    login(state, action) {
      console.log("Login fired");
      state.isAuthenthicated = true;
      state.user = action.payload.user;
    },
    logout(state) {
      state.isAuthenthicated = false;
      state.user = null;
    },
  },
});

// Utworzenie magazynu danych, do którego dostęp będą miały komponenty w całej aplikacji
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
  },
});

// Oprócz magazynu trzeba wyeksportować akcje, czyli metody do zmiany dancyh
export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
export default store;
```

---

## Dostarczanie magazynu do aplikacji

```js
// Aby nasza aplikacja miała dostęp do magazynu danych, należy całą aplikację zawrzeć w Komponencie Provider dostarczonym przez react-redux

import store from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

---

## Korzystanie z danych

```js
// Import Customowych hooków do korzystania z reduxa
import { useSelector, useDispatch } from "react-redux";

// Import metod do zmiany danych
import { counterActions } from "../store";

export default function Counter() {
  // Import odpowiednich danych z magazynu
  const counter = useSelector((state) => state.counter.counter);
  const showCounter = useSelector((state) => state.counter.showCounter);

  // Import funkcji dispatch, która służy do wywoływania metod na danych
  const dispatch = useDispatch();

  // Wywołanie metod na obiekcje counterAction powoduje zmianę danych w magazynie w określony sposób
  const onIncrement = () => {
    dispatch(counterActions.increment());
  };

  const onDecrement = () => {
    dispatch(counterActions.decrement());
  };

  const onIncrease = () => {
    dispatch(counterActions.increase({ amount: 10 }));
  };

  const onToggleCounter = () => {
    dispatch(counterActions.toggleCounter());
  };

  const counterClasses = !showCounter ? `${classes.hidden}` : "";

  return (
    <>
      <div>
        <h1>Counter: {counter}</h1>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onDecrement}>Decrement</button>
        <label>Increase by</label>
        <button onClick={onIncrease}>Increase by 10</button>
        <button onClick={onToggleCounter}>Toggle Counter</button>
      </div>
    </>
  );
}
```

---

## Asynchroniczny kod

```js
// Aby wykonać asynchroniczne akcje przy użyciu Reduxa, należy utworzyć akcję jak poniżej

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch("URL");

      if (!res.ok) throw new Error();
      const data = await res.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.updatecart({ items: data.items }));
    } catch (error) {
      dispatch(ErrorHandlingAction);
    }
  };
};
```
