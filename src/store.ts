import { configureStore } from "@reduxjs/toolkit";
import pokeReducer from "./reducers/pokeSlice";

const store = configureStore({
  reducer: {
    data: pokeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
