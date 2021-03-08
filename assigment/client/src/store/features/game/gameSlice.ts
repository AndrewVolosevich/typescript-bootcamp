import { createSlice } from '@reduxjs/toolkit';
import {gameGrid2} from "../../../moky/gameGrid";
import {getCellIdx} from "../../../helpers/cellHelpers";

export const slice = createSlice({
  name: 'game',
  initialState: {
    grid: gameGrid2,
    size: 2,
    playing: false
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
    clearCellValue: (state, action) => {
      const idx = getCellIdx(state.grid, action.payload)
      if (state.grid[idx]) {
        state.grid[idx].value = 0
      }
    },
    setPlaying: (state, action) => {
      state.playing = action.payload
    },
    setCell: (state, action) => {
      const idx = getCellIdx(state.grid, action.payload)
      if (state.grid[idx]) {
        state.grid[idx].value = action.payload.value
      }
    }
  },
});

export const {
  setGridSize, setGrid,
  clearCells, setCell,
  setPlaying, clearCellValue
} = slice.actions;
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selectSize = state => state.game.size;
export const selectGrid = state => state.game.grid;
export const selectPlaying = state => state.game.playing;
export default slice.reducer;
