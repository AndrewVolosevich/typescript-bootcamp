import { createSlice } from '@reduxjs/toolkit';
import {gameGrid2} from "../../../moky/gameGrid";

export const slice = createSlice({
  name: 'game',
  initialState: {
    grid: gameGrid2,
    size: 2
  },
  reducers: {
    setGridSize: (state, action) => {
      state.size = action.payload;
    },
    setGrid: (state, action) => {
      state.grid = action.payload;
    },
  },
});

export const { setGridSize, setGrid } = slice.actions;
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selectSize = state => state.game.size;
export const selectGrid = state => state.game.grid;
export default slice.reducer;
