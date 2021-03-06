import { createSlice } from '@reduxjs/toolkit';
const gameGrid = [
  {
    x: -1,
    y: 1,
    z: 0,
    value: 0
  },
  {
    x: -1,
    y: 0,
    z: 1,
    value: 0
  },
  {
    x: 0,
    y: 1,
    z: -1,
    value: 0
  },
  {
    x: 0,
    y: 0,
    z: 0,
    value: 0
  },
  {
    x: 0,
    y: -1,
    z: 1,
    value: 0
  },
  {
    x: 1,
    y: 0,
    z: -1,
    value: 0
  },
  {
    x: 1,
    y: -1,
    z: 0,
    value: 0
  }
]

export const slice = createSlice({
  name: 'game',
  initialState: {
    value: 0,
    grid: [1]
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    addCell: (state, action) => {
      state.grid.push(action.payload);
    }
  },
});

export const { increment,  decrement, addCell, incrementByAmount} = slice.actions;
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const selectGame = state => state.game.value;
export const selectGame2 = state => state.game.grid;
export default slice.reducer;
