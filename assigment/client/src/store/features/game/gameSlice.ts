import { createSlice } from '@reduxjs/toolkit';
import {gameGrid2} from "../../../moky/gameGrid";
import {compareCellsCoords} from "../../../helpers/cellHelpers";

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
    clearCells: (state) => {
      state.grid.map((cell) => cell.value = 0)
    },
    setCell: (state, action) => {
      const index = state.grid.findIndex(cell => {
        if (compareCellsCoords(cell, action.payload)) {
          return cell
        }
      })
      if (state.grid[index]) {
        state.grid[index].value = action.payload.value
      }
    }
  },
});

export const { setGridSize, setGrid, clearCells, setCell } = slice.actions;
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selectSize = state => state.game.size;
export const selectGrid = state => state.game.grid;
export default slice.reducer;
