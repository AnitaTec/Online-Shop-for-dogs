import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice";

const initialState = { value: 0 };
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "increment":
      return { ...state, value: state.value + 1 };
    default:
      return state;
  }
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    basket: basketReducer,
  },
});
