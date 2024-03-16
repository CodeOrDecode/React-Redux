import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { combineReducers, legacy_createStore } from "redux";

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";
const ADDTOCART = "ADDTOCART";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const themereducer = (state = 0, { type, payload }) => {
  switch (type) {
    case INCREMENT: {
      return payload;
    }
    case DECREMENT: {
      return payload;
    }
    case RESET: {
      return 0;
    }
    default: {
      return state;
    }
  }
};

const cartreducer = (state = [], { type, payload }) => {
  switch (type) {
    case ADDTOCART: {
      return [...state, payload];
    }
    default: {
      return state;
    }
  }
};

const credenreducer = (
  state = { user: null, login: false },
  { type, payload }
) => {
  switch (type) {
    case LOGIN: {
      return {
        ...state,
        ...payload,
      };
    }

    case LOGOUT: {
      return {
        ...state,
        ...payload,
      };
    }
    default: {
      return state;
    }
  }
};

const rootReducer = combineReducers({
  themereducer,
  cartreducer,
  credenreducer,
});

export const store = legacy_createStore(rootReducer);

function App() {
  const state = useSelector((store) => {
    return store;
  });

  const [count, setCount] = useState(0);

  const [cartvalue, setCartvalue] = useState("");

  const dispatch = useDispatch();

  function incrementis(val) {
    setCount(count + 1);
    dispatch({ type: INCREMENT, payload: val });
  }

  function decrementis(val) {
    setCount(count - 1);
    dispatch({ type: DECREMENT, payload: val });
  }

  function handleChange(value) {
    setCartvalue(value);
  }

  function addtocartis() {
    dispatch({ type: ADDTOCART, payload: cartvalue });
  }

  function handleLogin() {
    dispatch({ type: LOGIN, payload: { user: cartvalue, login: true } });
  }

  function handleLogout() {
    dispatch({ type: LOGOUT, payload: { user: null, login: false } });
  }

  return (
    <>
      <pre>{JSON.stringify(state)}</pre>

      <button
        onClick={() => {
          incrementis(count + 1);
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          decrementis(count - 1);
        }}
      >
        Decrement
      </button>
      <input
        type="text"
        value={cartvalue}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default App;
