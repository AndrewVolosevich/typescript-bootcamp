import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './features/game/gameSlice';
import animationReducer from './features/game/animationSlice';

export default configureStore({
  reducer: {
    game: gameReducer,
    animation: animationReducer,
  },
});