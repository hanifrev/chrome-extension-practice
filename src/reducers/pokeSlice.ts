import { createSlice } from "@reduxjs/toolkit";
import { action } from "webextension-polyfill";

const initialState = {
  pokeSaved: 0,
  backView: false,
  pokemonCatch: [],
};

const pokeDataSlice = createSlice({
  name: "pokemon",
  initialState: initialState,
  reducers: {
    pokeCount: (state, action) => {
      state.pokeSaved = action.payload;
    },
    btnBackView: (state, action) => {
      state.backView = action.payload;
    },
    pokeCatchData: (state: any, action: any) => {
      state.pokemonCatch.push(action.payload);
    },
  },
});

export const { pokeCount, btnBackView, pokeCatchData } = pokeDataSlice.actions;
export default pokeDataSlice.reducer;
